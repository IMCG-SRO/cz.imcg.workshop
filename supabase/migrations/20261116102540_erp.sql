-- v0.1: jeden dokument na prostor, atomické serverové příkazy, bez přímého zápisu klienta.
create table public.erp_workspaces(id text primary key, name text not null, data jsonb not null default '{"customers":[],"products":[],"orders":[],"invoices":[]}');
create table public.erp_members(workspace_id text references public.erp_workspaces(id), user_id uuid references auth.users(id), label text not null, primary key(workspace_id,user_id));
create table public.erp_audit(id bigint generated always as identity primary key, workspace_id text references public.erp_workspaces(id), actor uuid not null, command text not null, created_at timestamptz not null default now());
alter table public.erp_workspaces enable row level security;
alter table public.erp_members enable row level security;
alter table public.erp_audit enable row level security;
create policy own_membership on public.erp_members for select to authenticated using(user_id=auth.uid());
create policy own_workspace on public.erp_workspaces for select to authenticated using(exists(select 1 from public.erp_members m where m.workspace_id=id and m.user_id=auth.uid()));
revoke all on public.erp_workspaces,public.erp_members,public.erp_audit from anon,authenticated;
grant select on public.erp_workspaces,public.erp_members to authenticated;

create function public.erp_snapshot(workspace text) returns jsonb language plpgsql security definer set search_path='' as $$
begin
 if auth.uid() is null or not exists(select 1 from public.erp_members where workspace_id=workspace and user_id=auth.uid()) then raise exception 'Přístup do prostoru zamítnut'; end if;
 return (select data from public.erp_workspaces where id=workspace);
end $$;
revoke all on function public.erp_snapshot(text) from public,anon;
grant execute on function public.erp_snapshot(text) to authenticated;

create function public.erp_apply(workspace text,command jsonb) returns jsonb language plpgsql security definer set search_path='' as $$
declare
 s jsonb; d jsonb:=command->'data'; op text:=command->>'type'; ident text:=command->>'id';
 col text; old jsonb; rec jsonb; rowdata jsonb; cust jsonb; prod jsonb; line jsonb; lines jsonb;
 day text:=to_char(current_timestamp at time zone 'Europe/Prague','YYYY-MM-DD');
 idx integer; n integer; amount bigint; code text; rows jsonb;
begin
 if auth.uid() is null or not exists(select 1 from public.erp_members where workspace_id=workspace and user_id=auth.uid()) then raise exception 'Přístup do prostoru zamítnut'; end if;
 select data into s from public.erp_workspaces where id=workspace for update;
 if op in ('customer','product','import') then
  col:=case when op='product' then 'products' else 'customers' end;
  if op='import' then
   if coalesce(jsonb_typeof(d),'')<>'array' or jsonb_array_length(d)<1 or jsonb_array_length(d)>100 then raise exception 'Import musí obsahovat 1–100 zákazníků';end if;
   rows:=d;
  else rows:=jsonb_build_array(d);end if;
  for rowdata in select value from jsonb_array_elements(rows) loop
   if rowdata->>'id' is null or length(rowdata->>'id') not between 1 and 100 then raise exception 'Chybí identifikátor';end if;
   code:=upper(trim(coalesce(rowdata->>'code','')));
   if length(code) not between 1 and 80 or length(trim(coalesce(rowdata->>'name',''))) not between 1 and 200 then raise exception 'Kód a název jsou povinné (max. 80 / 200 znaků)';end if;
   if exists(select 1 from jsonb_array_elements(s->col) x where upper(x->>'code')=code and (op='import' or x->>'id'<>rowdata->>'id')) then raise exception 'Kód již existuje';end if;
   if op='import' and exists(select 1 from jsonb_array_elements(s->col) x where x->>'id'=rowdata->>'id') then raise exception 'Identifikátor již existuje';end if;
   rec:=jsonb_build_object('id',rowdata->>'id','code',code,'name',trim(rowdata->>'name'));
   if col='customers' then
    if coalesce(rowdata->>'email','')<>'' and (rowdata->>'email') !~ '^[^\s@]+@[^\s@]+\.[^\s@]+$' then raise exception 'Neplatný e-mail';end if;
    if length(coalesce(rowdata->>'email',''))>254 or length(coalesce(rowdata->>'address',''))>500 then raise exception 'Příliš dlouhá adresa';end if;
    rec:=rec||jsonb_build_object('email',coalesce(rowdata->>'email',''),'address',coalesce(rowdata->>'address',''));
   else
    if coalesce(rowdata->>'price','') !~ '^[0-9]+$' or (rowdata->>'price')::numeric not between 1 and 100000000 then raise exception 'Neplatná cena';end if;
    rec:=rec||jsonb_build_object('price',(rowdata->>'price')::bigint);
   end if;
   select coalesce(jsonb_agg(case when x->>'id'=rowdata->>'id' then rec else x end),'[]') into lines from jsonb_array_elements(s->col) x;
   if not exists(select 1 from jsonb_array_elements(s->col) x where x->>'id'=rowdata->>'id') then lines:=lines||jsonb_build_array(rec);end if;
   s:=jsonb_set(s,array[col],lines);
  end loop;
 elsif op='order' then
  ident:=d->>'id';
  if ident is null or length(ident) not between 1 and 100 then raise exception 'Chybí ID objednávky';end if;
  select value into old from jsonb_array_elements(s->'orders') where value->>'id'=ident;
  if old is not null and old->>'status'<>'draft' then raise exception 'Potvrzenou objednávku nelze měnit';end if;
  select value into cust from jsonb_array_elements(s->'customers') where value->>'id'=d->>'customerId';
  if cust is null then raise exception 'Zákazník neexistuje';end if;
  if coalesce(jsonb_typeof(d->'items'),'')<>'array' or jsonb_array_length(d->'items') not between 1 and 100 then raise exception 'Objednávka musí mít 1–100 položek';end if;
  lines:='[]';
  for line in select value from jsonb_array_elements(d->'items') loop
   select value into prod from jsonb_array_elements(s->'products') where value->>'id'=line->>'productId';
   if prod is null or coalesce(line->>'quantity','') !~ '^[0-9]+$' or (line->>'quantity')::numeric not between 1 and 999 then raise exception 'Neplatná položka nebo množství';end if;
   -- U existující položky zachovat cenu; nová položka převezme ceník.
   select value into rec from jsonb_array_elements(coalesce(old->'items','[]')) where value->>'productId'=line->>'productId';
   rec:=coalesce(rec,jsonb_build_object('productId',prod->>'id','name',prod->>'name','price',prod->'price'));
   if exists(select 1 from jsonb_array_elements(lines) x where x->>'productId'=prod->>'id') then raise exception 'Produkt je v objednávce vícekrát';end if;
   lines:=lines||jsonb_build_array(rec||jsonb_build_object('quantity',(line->>'quantity')::int));
  end loop;
  rec:=jsonb_build_object('id',ident,'number',coalesce(old->>'number','OBJ-'||(jsonb_array_length(s->'orders')+1)::text),'customerId',cust->>'id','items',lines,'status','draft','createdOn',coalesce(old->>'createdOn',day));
  select coalesce(jsonb_agg(case when x->>'id'=ident then rec else x end),'[]') into lines from jsonb_array_elements(s->'orders') x;
  if old is null then lines:=lines||jsonb_build_array(rec);end if;
  s:=jsonb_set(s,'{orders}',lines);
 elsif op in ('confirm','invoice') then
  select value into old from jsonb_array_elements(s->'orders') where value->>'id'=ident;
  if old is null then raise exception 'Objednávka neexistuje';end if;
  if op='confirm' then
   if old->>'status'<>'draft' then raise exception 'Potvrdit lze pouze koncept';end if;
   rec:=old||jsonb_build_object('status','confirmed');
  else
   if old->>'status'<>'confirmed' then raise exception 'Fakturovat lze pouze potvrzenou objednávku';end if;
   if exists(select 1 from jsonb_array_elements(s->'invoices') x where x->>'orderId'=ident) then raise exception 'Faktura již existuje';end if;
   if coalesce(command->>'dueOn','') !~ '^\d{4}-\d{2}-\d{2}$' or (command->>'dueOn')::date<day::date then raise exception 'Neplatná splatnost';end if;
   select value into cust from jsonb_array_elements(s->'customers') where value->>'id'=old->>'customerId';
   rec:=jsonb_build_object('id',gen_random_uuid()::text,'number','FA-'||(jsonb_array_length(s->'invoices')+1)::text,'orderId',ident,'customer',cust,'items',old->'items','issuedOn',day,'dueOn',command->>'dueOn','paidOn',null,'paidBy',null);
   s:=jsonb_set(s,'{invoices}',(s->'invoices')||jsonb_build_array(rec));
   rec:=old||jsonb_build_object('status','invoiced');
  end if;
  select jsonb_agg(case when x->>'id'=ident then rec else x end) into lines from jsonb_array_elements(s->'orders') x;
  s:=jsonb_set(s,'{orders}',lines);
 elsif op='pay' then
  select value into old from jsonb_array_elements(s->'invoices') where value->>'id'=ident;
  if old is null then raise exception 'Faktura neexistuje';end if;
  if old->>'paidOn' is null then
   rec:=old||jsonb_build_object('paidOn',day,'paidBy',auth.uid()::text);
   select jsonb_agg(case when x->>'id'=ident then rec else x end) into lines from jsonb_array_elements(s->'invoices') x;
   s:=jsonb_set(s,'{invoices}',lines);
  else return s;end if;
 else raise exception 'Nepovolený příkaz';end if;
 update public.erp_workspaces set data=s where id=workspace;
 insert into public.erp_audit(workspace_id,actor,command) values(workspace,auth.uid(),op);
 return s;
end $$;
revoke all on function public.erp_apply(text,jsonb) from public,anon;
grant execute on function public.erp_apply(text,jsonb) to authenticated;

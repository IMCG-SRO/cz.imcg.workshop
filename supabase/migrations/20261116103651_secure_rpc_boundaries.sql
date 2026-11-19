-- API wrappers run as the caller. Privileged implementations stay outside exposed schemas.
create schema erp_private;
revoke all on schema erp_private from public;
grant usage on schema erp_private to authenticated, service_role;
alter function public.erp_snapshot(text) set schema erp_private;
alter function public.erp_apply(text,jsonb) set schema erp_private;
revoke all on function erp_private.erp_snapshot(text),erp_private.erp_apply(text,jsonb) from public,anon;
grant execute on function erp_private.erp_snapshot(text),erp_private.erp_apply(text,jsonb) to authenticated,service_role;

create function public.erp_snapshot(workspace text) returns jsonb
language sql stable security invoker set search_path='' as $$
 select erp_private.erp_snapshot(workspace);
$$;
create function public.erp_apply(workspace text,command jsonb) returns jsonb
language sql volatile security invoker set search_path='' as $$
 select erp_private.erp_apply(workspace,command);
$$;
revoke all on function public.erp_snapshot(text),public.erp_apply(text,jsonb) from public,anon;
grant execute on function public.erp_snapshot(text),public.erp_apply(text,jsonb) to authenticated,service_role;

-- Explicit default deny: the audit trail is for the administrator, not the application API.
create policy audit_no_client_access on public.erp_audit for all to anon,authenticated using(false) with check(false);

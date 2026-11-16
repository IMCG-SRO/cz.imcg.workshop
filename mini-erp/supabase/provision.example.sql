-- Pouze správce v SQL Editoru. Nejprve vytvořte Auth uživatele.
insert into public.erp_workspaces(id,name) values ('A','Tým A'),('B','Tým B'),('C','Tým C');
-- Skutečné UUID najdete v Auth / Users. Nahraďte zástupnou hodnotu:
-- insert into public.erp_members(workspace_id,user_id,label)
-- values ('A','SKUTECNE_UUID_UZIVATELE','Tým A');
-- Pro společný projekt obdobně prostor MAIN a členství všech účastníků.
-- Před resetem exportujte data. Reset dokumentu provádí jen správce.

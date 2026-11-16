import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { State, Command } from "./types";
import { handlers } from "../modules/commands";
import { seed } from "./seed";
import { today } from "./rules";
const url = import.meta.env.VITE_SUPABASE_URL,
  key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
export const online = Boolean(url || key);
let configError = "";
export let client: SupabaseClient | null = null;
if (online) {
  if (!url || !key)
    configError =
      "Neúplná konfigurace databáze. Je nutná URL i publishable klíč.";
  else {
    try {
      client = createClient(url, key);
    } catch {
      configError = "Neplatná konfigurace databáze.";
    }
  }
}
function checkConfig() {
  if (configError) throw Error(configError);
}
export let state: State = {
  customers: [],
  products: [],
  orders: [],
  invoices: [],
};
export let actor = sessionStorage.getItem("erp-actor") || "ucastnik01";
export let workspace = sessionStorage.getItem("erp-workspace") || "A";
export let memberships: { workspace_id: string; label: string }[] = [];
export function reduce(
  s: State,
  c: Command,
  who = actor,
  day = today(),
): State {
  const next = structuredClone(s);
  const handler = handlers[c.type];
  if (!handler) throw Error("Tato operace ještě není připravena.");
  handler(next, c, { actor: who, today: day });
  return next;
}
export function selectActor(a: string) {
  actor = a;
  sessionStorage.setItem("erp-actor", a);
}
export async function selectWorkspace(w: string) {
  workspace = w;
  sessionStorage.setItem("erp-workspace", w);
  await load();
}
export async function load() {
  checkConfig();
  if (client) {
    const { data, error } = await client.rpc("erp_snapshot", {
      workspace: workspace,
    });
    if (error) throw Error(error.message);
    state = data as State;
    return;
  }
  const data = localStorage.getItem("imcg-erp-v1-" + workspace);
  state = data ? JSON.parse(data) : seed();
  if (!data)
    localStorage.setItem("imcg-erp-v1-" + workspace, JSON.stringify(state));
}
export async function command(c: Command) {
  checkConfig();
  if (client) {
    const { data, error } = await client.rpc("erp_apply", {
      workspace,
      command: c,
    });
    if (error) throw Error(error.message);
    state = data as State;
    return;
  }
  // Demo není sdílená databáze. Před příkazem načti poslední místní stav.
  await load();
  const next = reduce(state, c);
  localStorage.setItem("imcg-erp-v1-" + workspace, JSON.stringify(next));
  state = next;
}
export async function login(name: string, password: string) {
  if (!client) throw Error("Použijte explicitní demonstrační režim.");
  const email = name.includes("@") ? name : name + "@workshop.example";
  const { error } = await client.auth.signInWithPassword({ email, password });
  if (error)
    throw Error("Přihlášení se nezdařilo. Zkontrolujte přidělené údaje.");
  selectActor(name);
  await session();
}
export async function session() {
  checkConfig();
  if (!client) {
    await load();
    return true;
  }
  const {
    data: { session },
  } = await client.auth.getSession();
  if (!session) return false;
  const { data, error } = await client
    .from("erp_members")
    .select("workspace_id,label");
  if (error) throw Error(error.message);
  memberships = data || [];
  if (!memberships.length)
    throw Error("Účet nemá přidělený pracovní prostor. Kontaktujte lektora.");
  if (!memberships.some((m) => m.workspace_id === workspace))
    workspace = memberships[0].workspace_id;
  await load();
  return true;
}
export async function logout() {
  if (client) await client.auth.signOut();
  sessionStorage.removeItem("erp-actor");
  sessionStorage.removeItem("erp-workspace");
  state = { customers: [], products: [], orders: [], invoices: [] };
}
export function resetDemo() {
  if (online) throw Error("Online reset smí provést pouze správce.");
  const backup = JSON.stringify(state, null, 2);
  const a = document.createElement("a");
  a.href = URL.createObjectURL(
    new Blob([backup], { type: "application/json" }),
  );
  a.download = "erp-zaloha-" + workspace + ".json";
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  localStorage.removeItem("imcg-erp-v1-" + workspace);
}

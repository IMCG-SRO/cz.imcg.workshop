import "./style.css";
import { pages } from "./modules/pages";
import {
  state,
  online,
  actor,
  workspace,
  memberships,
  session,
  selectWorkspace,
  load,
  login,
  logout,
  resetDemo,
} from "./core/store";
import { esc, date, today } from "./core/rules";
import { heading, notify, action } from "./core/ui";
const app = document.querySelector<HTMLDivElement>("#app")!;
let authenticated = !online;
const nav = [
  ["home", "Přehled", "◫"],
  ["customers", "Zákazníci", "♧"],
  ["products", "Produkty", "◇"],
  ["orders", "Objednávky", "▤"],
  ["invoices", "Faktury", "▧"],
];
const repo = "https://github.com/IMCG-SRO/cz.imcg.workshop";
const version = import.meta.env.VITE_APP_COMMIT || "0.1.0";
function workshop() {
  return (
    heading(
      "Workshop & vývoj",
      "Malé změny. Jasné zadání. Společný výsledek.",
    ) +
    `<div class="workshop-grid">${[
      [
        "A",
        "Filtr faktur",
        "Vyberte faktury podle úhrady a data splatnosti.",
        20,
      ],
      ["B", "Export faktur", "Připravte přehledný export do CSV.", 21],
      [
        "C",
        "Import zákazníků",
        "Načtěte CSV, ověřte data a potvrďte uložení.",
        22,
      ],
    ]
      .map(
        ([team, name, desc, n]) =>
          `<section class="panel workshop-card"><span class="badge blue">TÝM ${team}</span><h2>${name}</h2><p>${desc}</p><a class="button secondary" href="${repo}/issues/${n}" target="_blank" rel="noopener">Otevřít zadání ↗</a></section>`,
      )
      .join(
        "",
      )}</div><section class="panel callout"><h2>Od požadavku k ověřené změně</h2><p>Issue → vlastní větev → vývoj s AI → automatické testy → kontrola jiným týmem → Pull Request → main</p><p>Rozšíření jsou záměrně ponechaná k dokončení účastníkům.</p><a href="${repo}/blob/main/docs/mini-erp/POSTUP.md" target="_blank" rel="noopener">Pravidla spolupráce ↗</a></section>`
  );
}
export function refresh() {
  if (online && !authenticated) {
    showLogin();
    return;
  }
  const route = location.hash.slice(1) || "home";
  const page = pages[route];
  app.innerHTML = `<aside class="sidebar"><a class="brand" href="#home"><span class="brand-mark">i</span><span>IMCG <small>MINI ERP</small></span></a><div class="sidebar-label">OBCHODNÍ AGENDA</div><nav>${nav.map(([id, label, icon]) => `<a href="#${id}" class="${route === id ? "active" : ""}"><span class="nav-icon">${icon}</span>${label}${id === "invoices" ? `<span class="nav-count">${state.invoices.filter((x) => !x.paidOn).length}</span>` : ""}</a>`).join("")}</nav><div class="sidebar-label second">SPOLUPRÁCE</div><nav><a href="#workshop" class="${route === "workshop" ? "active" : ""}"><span class="nav-icon">⌘</span>Workshop & vývoj</a><a href="${repo}" target="_blank" rel="noopener"><span class="nav-icon">↗</span>Repozitář GitHub</a></nav><div class="sidebar-bottom"><span class="connection-dot"></span> Výukové prostředí<small>Fiktivní data · verze ${esc(version)}</small></div></aside>
 <div class="workspace"><header class="topbar"><span class="company">IMCG s.r.o. <span class="separator">/</span> <strong>Workshop 2</strong></span><div class="topbar-right"><span class="environment ${online ? "online" : ""}">${online ? "● Sdílená databáze" : "● Místní demo"}</span><label class="sr-only" for="workspace">Pracovní prostor</label><select id="workspace">${(online
   ? memberships.map((m) => [m.workspace_id, m.label])
   : [
       ["A", "Tým A"],
       ["B", "Tým B"],
       ["C", "Tým C"],
     ]
 )
   .map(
     ([id, label]) =>
       `<option value="${esc(id)}" ${workspace === id ? "selected" : ""}>${esc(label)}</option>`,
   )
   .join(
     "",
   )}</select><span class="user-avatar">${esc(actor.slice(-2))}</span></div></header>
 ${online ? "" : `<div class="demo-banner"><span>DEMO</span> Data se ukládají pouze v tomto prohlížeči. Sdílená databáze zatím není připojena.</div>`}
 <main>${route === "workshop" ? workshop() : page ? page.render() : heading("Přehled", "Vaše obchodní agenda v souvislostech.") + '<section class="panel callout">Modul se připravuje v samostatném Pull Requestu.</section>'}</main><footer><span>IMCG Mini ERP <span class="separator">·</span> ${esc(date(today()))}</span><div><button class="text-button" id="reload">Obnovit data</button>${!online ? '<button class="text-button" id="reset">Obnovit výchozí demo</button>' : '<button class="text-button" id="logout">Odhlásit</button>'}</div></footer></div>`;
  document.querySelector<HTMLSelectElement>("#workspace")!.onchange = action(
    async () => {
      await selectWorkspace(
        document.querySelector<HTMLSelectElement>("#workspace")!.value,
      );
      refresh();
    },
  );
  document.querySelector("#reload")!.addEventListener(
    "click",
    action(async () => {
      await load();
      refresh();
      notify("Data byla obnovena.");
    }),
  );
  document.querySelector("#reset")?.addEventListener(
    "click",
    action(async () => {
      if (
        confirm(
          "Exportovat současná data a obnovit výchozí demo pouze tohoto týmu?",
        )
      ) {
        resetDemo();
        await load();
        refresh();
        notify("Výchozí data obnovena.");
      }
    }),
  );
  document.querySelector("#logout")?.addEventListener(
    "click",
    action(async () => {
      await logout();
      authenticated = false;
      showLogin();
    }),
  );
  if (route !== "workshop") page?.bind(refresh);
}
function showLogin() {
  app.innerHTML = `<div class="login"><div class="brand"><span class="brand-mark">i</span><span>IMCG <small>MINI ERP</small></span></div><h1>Přihlášení do ERP</h1><p>Použijte cvičný účet přidělený lektorem.</p><form id="login"><label>Přihlašovací jméno<input name="name" autocomplete="username" required placeholder="ucastnik01"></label><label>Heslo<input name="password" type="password" autocomplete="current-password" required></label><p class="error" role="alert"></p><button class="button">Přihlásit se</button></form><p><a href="?mode=demo#home">Vyzkoušet místní demo</a></p></div>`;
  document.querySelector<HTMLFormElement>("#login")!.onsubmit = async (e) => {
    e.preventDefault();
    const f = new FormData(e.target as HTMLFormElement);
    try {
      await login(String(f.get("name")), String(f.get("password")));
      authenticated = true;
      refresh();
    } catch (e) {
      app.querySelector(".error")!.textContent = (e as Error).message;
    }
  };
}
window.addEventListener("hashchange", refresh);
window.addEventListener("storage", () => {
  if (!online)
    void load()
      .then(refresh)
      .catch((e) => notify(e.message, true));
});
void session()
  .then((ok) => {
    authenticated = ok;
    return ok ? refresh() : showLogin();
  })
  .catch((e) => {
    app.innerHTML = `<div class="login"><h1>Data nelze načíst</h1><p>${esc(e.message)}</p><button class="button" onclick="location.reload()">Zkusit znovu</button></div>`;
  });

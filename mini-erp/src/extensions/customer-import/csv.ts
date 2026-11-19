import type { Customer } from "../../core/types";

type CustomerRow = Omit<Customer, "id">;
type Preview = { rows: CustomerRow[]; errors: string[] };
const header = "kod;nazev;email;adresa";

function readRecords(text: string) {
  const records: string[][] = [];
  let record: string[] = [];
  let field = "";
  let mode: "plain" | "quoted" | "closed" = "plain";
  const fail = (reason: string): never => {
    const label = records.length === 0 ? "Hlavička" : `Záznam ${records.length}`;
    throw Error(`${label} – ${reason}`);
  };
  const finishField = () => {
    record.push(field);
    field = "";
    mode = "plain";
  };
  const finishRecord = () => {
    if (record.length || field !== "" || mode === "closed") {
      finishField();
      records.push(record);
      record = [];
    }
  };

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (mode === "quoted") {
      if (char !== '"') field += char;
      else if (text[i + 1] === '"') {
        field += '"';
        i++;
      } else mode = "closed";
    } else if (char === ";") {
      finishField();
    } else if (char === "\r" || char === "\n") {
      finishRecord();
      if (char === "\r" && text[i + 1] === "\n") i++;
    } else if (mode === "closed") {
      fail("Za koncovou uvozovkou musí následovat oddělovač nebo konec záznamu.");
    } else if (char === '"') {
      if (field !== "") fail("Uvozovka smí otevřít pole pouze na jeho začátku.");
      mode = "quoted";
    } else {
      field += char;
    }
  }
  if (mode === "quoted") fail("Chybí koncová uvozovka.");
  finishRecord();
  return records;
}

export function parseCustomers(text: string, existing: readonly Customer[]): Preview {
  const [columns, ...records] = readRecords(text.replace(/^\uFEFF/, ""));
  if (columns?.length !== 4 || columns.join(";") !== header) {
    throw Error(`Hlavička musí být ${header}.`);
  }
  if (records.length === 0) throw Error("Soubor neobsahuje žádné datové záznamy.");
  if (records.length > 100) throw Error("Záznam 101 – soubor může obsahovat nejvýše 100 záznamů.");

  const existingCodes = new Set(existing.map((customer) => customer.code.trim().toUpperCase()));
  const seen = new Set<string>();
  const rows: CustomerRow[] = [];
  const errors: string[] = [];
  records.forEach((fields, index) => {
    const error = (reason: string) => errors.push(`Záznam ${index + 1} – ${reason}`);
    if (fields.length !== 4) {
      error("Očekávají se přesně čtyři sloupce.");
      return;
    }
    const [rawCode, name, email, address] = fields.map((field) => field.trim());
    const code = rawCode.toUpperCase();
    if (!code || code.length > 80) error("Kód je povinný, nejvýše 80 znaků.");
    if (!name || name.length > 200) error("Název je povinný, nejvýše 200 znaků.");
    if (email && (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
      error("E-mail nemá platný formát.");
    }
    if (address.length > 500) error("Adresa může mít nejvýše 500 znaků.");
    if (code && existingCodes.has(code)) error(`Kód ${code} již existuje v tomto prostoru.`);
    if (code && seen.has(code)) error(`Kód ${code} je v souboru vícekrát.`);
    seen.add(code);
    rows.push({ code, name, email, address });
  });
  return { rows: errors.length ? [] : rows, errors };
}

export async function readCustomers(file: File, existing: readonly Customer[]) {
  if (file.size > 100_000) throw Error("Soubor může mít nejvýše 100 kB.");
  const bytes = await file.arrayBuffer();
  let text: string;
  try {
    text = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    throw Error("Soubor musí být uložen v UTF-8.");
  }
  return parseCustomers(text, existing);
}

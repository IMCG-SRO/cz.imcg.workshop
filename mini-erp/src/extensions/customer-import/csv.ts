import type { Customer } from "../../core/types";

const maxBytes = 100_000;
const maxRecords = 100;
const header = ["kod", "nazev", "email", "adresa"];
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type CustomerFields = Omit<Customer, "id">;

export interface ImportPreview {
  rows: { record: number; customer: CustomerFields }[];
  errors: string[];
}

export async function readPreview(
  file: Blob,
  existing: Pick<Customer, "code">[],
): Promise<ImportPreview> {
  const preview: ImportPreview = { rows: [], errors: [] };
  if (file.size > maxBytes) {
    preview.errors.push("Soubor smí mít nejvýše 100 kB.");
    return preview;
  }

  const bytes = await file.arrayBuffer();
  let csv: string;
  try {
    csv = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    preview.errors.push("Soubor musí být v kódování UTF-8.");
    return preview;
  }

  const existingCodes = new Set(
    existing.map(({ code }) => code.trim().toUpperCase()),
  );
  const seen = new Map<string, number>();
  let record = 0;

  try {
    for (const cells of parseRecords(csv)) {
      if (record === 0) {
        if (
          cells.length !== header.length ||
          !header.every((name, index) => name === cells[index])
        ) {
          throw Error("Očekávaná hlavička je kod;nazev;email;adresa.");
        }
        record++;
        continue;
      }
      if (record > maxRecords) {
        throw Error("Import smí obsahovat nejvýše 100 záznamů.");
      }

      const report = (reason: string) =>
        preview.errors.push(`Záznam ${record}: ${reason}`);
      if (cells.length !== header.length) {
        report("Očekávají se 4 sloupce.");
      } else {
        const [rawCode, name, email, address] = cells.map((cell) =>
          cell.trim(),
        );
        const code = rawCode.toUpperCase();
        if (!code) report("Chybí kód.");
        if (!name) report("Chybí název.");
        if (code.length > 80) report("Kód smí mít nejvýše 80 znaků.");
        if (name.length > 200) report("Název smí mít nejvýše 200 znaků.");
        if (email && (email.length > 254 || !emailPattern.test(email))) {
          report("Neplatný e-mail.");
        }
        if (address.length > 500) report("Adresa smí mít nejvýše 500 znaků.");
        if (cells.some((cell) => cell.includes("\0"))) {
          report("Hodnota obsahuje nulový znak.");
        }
        if (existingCodes.has(code))
          report("Kód již existuje v tomto prostoru.");
        const previous = seen.get(code);
        if (previous !== undefined) {
          report(`Kód se opakuje ze záznamu ${previous}.`);
        }
        if (code && previous === undefined) seen.set(code, record);
        preview.rows.push({ record, customer: { code, name, email, address } });
      }
      record++;
    }
    if (record === 0) throw Error("Chybí hlavička kod;nazev;email;adresa.");
    if (record === 1) throw Error("Soubor neobsahuje žádné záznamy.");
  } catch (error) {
    const position = record ? `Záznam ${record}` : "Hlavička";
    preview.errors.push(`${position}: ${(error as Error).message}`);
  }
  return preview;
}

function* parseRecords(csv: string): Generator<string[]> {
  // Sticky matching consumes exactly one field at the current offset.
  const field = /"((?:[^"]|"")*)"|([^";\r\n]*)/y;
  let offset = 0;
  let cells: string[] = [];

  while (offset < csv.length || cells.length > 0) {
    field.lastIndex = offset;
    const match = field.exec(csv)!;
    const separator = csv[field.lastIndex];
    if (separator && !";\r\n".includes(separator)) {
      throw Error("Nesprávné uvozovky v CSV.");
    }
    cells.push(
      match[1] === undefined ? match[2] : match[1].replace(/""/g, '"'),
    );
    offset = field.lastIndex + 1;
    if (separator === ";") continue;
    if (separator === "\r" && csv[offset] === "\n") offset++;
    yield cells;
    cells = [];
  }
}

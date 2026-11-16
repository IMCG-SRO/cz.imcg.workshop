import type { Handler } from "./commands";
export const customerCommand: Handler = (s, c) => {
  if (c.type !== "customer" && c.type !== "import") return;
  const rows = c.type === "import" ? c.data : [c.data];
  if (rows.length < 1 || rows.length > 100)
    throw Error("Import musí mít 1–100 záznamů.");
  for (const original of rows) {
    const d = {
      ...original,
      code: original.code.trim().toUpperCase(),
      name: original.name.trim(),
      email: original.email.trim(),
      address: original.address.trim(),
    };
    if (
      !d.id ||
      d.id.length > 100 ||
      !d.code ||
      d.code.length > 80 ||
      !d.name ||
      d.name.length > 200
    )
      throw Error("Kód a název jsou povinné (max. 80 / 200 znaků).");
    if (
      d.email &&
      (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email) || d.email.length > 254)
    )
      throw Error("Neplatný e-mail.");
    if (d.address.length > 500) throw Error("Adresa je příliš dlouhá.");
    if (
      s.customers.some(
        (x) =>
          (x.code === d.code || x.id === d.id) &&
          (c.type === "import" || x.id !== d.id),
      )
    )
      throw Error("Kód zákazníka již existuje.");
    const i = s.customers.findIndex((x) => x.id === d.id);
    if (i < 0) s.customers.push(d);
    else s.customers[i] = d;
  }
};

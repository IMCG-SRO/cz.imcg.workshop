import type { Handler } from "./commands";
export const productCommand: Handler = (s, c) => {
  if (c.type !== "product") return;
  const d = {
    ...c.data,
    code: c.data.code.trim().toUpperCase(),
    name: c.data.name.trim(),
  };
  if (
    !d.id ||
    d.id.length > 100 ||
    !d.code ||
    d.code.length > 80 ||
    !d.name ||
    d.name.length > 200
  )
    throw Error("Kód a název jsou povinné.");
  if (!Number.isInteger(d.price) || d.price < 1 || d.price > 100000000)
    throw Error("Neplatná cena produktu.");
  if (s.products.some((x) => x.code === d.code && x.id !== d.id))
    throw Error("Kód produktu již existuje.");
  const i = s.products.findIndex((x) => x.id === d.id);
  if (i < 0) s.products.push(d);
  else s.products[i] = d;
};

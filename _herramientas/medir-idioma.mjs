// Mide la traducción al español de cada paquete: textos activos en enUS / esES / esMX (líneas L["..."] = o L.x =).
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
const files = (d, out = []) => { for (const n of readdirSync(d)) { const p = join(d, n); if (statSync(p).isDirectory()) { if (!/^libs?$/i.test(n)) files(p, out); } else if (/\.lua$/i.test(n)) out.push(p); } return out; };
const count = (p) => {
  const s = readFileSync(p, "utf8");
  let on = 0, off = 0;
  for (const l of s.split(/\r?\n/)) {
    if (/^\s*L\s*(\[\s*["'[]|\.\w+\s*=)/.test(l)) on++;
    else if (/^\s*--\s*L\s*(\[|\.\w)/.test(l)) off++;
  }
  return { on, off };
};
for (const pkg of readdirSync(".").filter((n) => n.endsWith("-WoWBolivia")).sort()) {
  const all = files(pkg);
  const row = {};
  for (const loc of ["enUS", "esES", "esMX"]) {
    const f = all.filter((p) => new RegExp(`(^|[^a-z])${loc}([^a-z]|$)`, "i").test(p.split(/[\/]/).slice(-2).join("/")));
    let on = 0, off = 0;
    for (const p of f) { const c = count(p); on += c.on; off += c.off; }
    row[loc] = f.length ? `${on}${off ? ` (+${off} sin traducir)` : ""}` : "—";
  }
  console.log(pkg.padEnd(26), "enUS", String(row.enUS).padEnd(18), "esES", String(row.esES).padEnd(24), "esMX", row.esMX);
}

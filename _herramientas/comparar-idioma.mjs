// Compara los textos en inglés de un addon con los que se cargan en un cliente esMX y lista los que faltan.
// Entiende los formatos más comunes:
//   - AceLocale / tablas L:  L["clave"] = "…", L.clave = "…"           (archivos enUS / esES / esMX)
//   - DBM:                   L = DBM:GetModLocalization("Jefe") + L:Set…Localization({ clave = "…" })
//                            (localization.en.lua / .es.lua / .mx.lua)
// Para cada archivo español detecta si se carga en esMX (if GetLocale() ~= "esES" then return end → no).
//
// Uso: node _herramientas/comparar-idioma.mjs [paquete…]        (sin argumentos: todos)
//      node _herramientas/comparar-idioma.mjs --json DBM-WoWBolivia > faltan.json
import { readdirSync, readFileSync, statSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const CLIENT = "esMX";
const EN = /(^|[._-])(enUS|en|enGB)\.lua$/i;
const ES = /(^|[._-])(esES|esMX|es|mx)\.lua$/i;

const files = (d, out = []) => {
  for (const n of readdirSync(d)) {
    const p = join(d, n);
    if (statSync(p).isDirectory()) { if (!/^(libs?|libraries)$/i.test(n)) files(p, out); }
    else if (/\.lua$/i.test(n)) out.push(p);
  }
  return out;
};

/** ¿Este archivo se ejecuta en un cliente esMX? Mira las guardas de GetLocale() del principio */
function loadsIn(text, locale) {
  const head = text.split(/\r?\n/).slice(0, 40).join("\n");
  const notEq = [...head.matchAll(/GetLocale\(\)\s*~=\s*["'](\w{4})["']/g)].map((m) => m[1]);
  if (/if\s+[^\n]*GetLocale\(\)\s*~=/.test(head) && /then\s+return/.test(head)) return notEq.includes(locale);
  const ace = [...head.matchAll(/NewLocale\(\s*[^,]+,\s*["'](\w{4})["']/g)].map((m) => m[1]);
  if (ace.length) return ace.includes(locale) || ace.includes("enUS"); // enUS es la base
  const eq = [...head.matchAll(/GetLocale\(\)\s*==\s*["'](\w{4})["']/g)].map((m) => m[1]);
  if (eq.length) return eq.includes(locale);
  return true;
}

/** Valor sin la coma final ni el comentario de fin de línea (solo los "--" que están fuera de comillas) */
export function cleanValue(v) {
  let quote = null;
  for (let i = 0; i < v.length; i++) {
    const c = v[i];
    if (quote) {
      if (c === "\\") i++;
      else if (c === quote) quote = null;
    } else if (c === '"' || c === "'") quote = c;
    else if (c === "-" && v[i + 1] === "-") { v = v.slice(0, i); break; }
  }
  return v.trim().replace(/,$/, "").trim();
}

/** Entradas { "sección|clave": texto } del archivo */
export function entries(text) {
  const out = new Map();
  let mod = "", kind = "";
  let depth = 0;
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.replace(/^\s*--.*$/, "");
    const m1 = line.match(/GetModLocalization\(\s*["']([^"']+)["']/);
    if (m1) { mod = m1[1]; kind = ""; }
    const m2 = line.match(/:Set(\w+)Localization\s*\(?\s*\{?/);
    if (m2) { kind = m2[1]; depth = 1; }
    if (/^\s*\}\s*\)?\s*$/.test(line) && kind) { kind = ""; continue; }

    let m;
    if ((m = line.match(/^\s*L\s*\[\s*(["'])(.+?)\1\s*\]\s*=\s*(.+)$/)) || (m = line.match(/^\s*L\s*\.\s*(\w+)\s*=\s*(.+)$/))) {
      const key = m.length === 4 ? m[2] : m[1];
      out.set(`${mod}|L|${key}`, (m.length === 4 ? m[3] : m[2]).trim());
    } else if (kind && (m = line.match(/^\s*(?:\[\s*(["'])(.+?)\1\s*\]|(\w+))\s*=\s*(.+)$/))) {
      out.set(`${mod}|${kind}|${m[2] ?? m[3]}`, m[4].trim());
    }
  }
  return out;
}

// Solo informa si se ejecuta directamente (traducir.mjs lo importa para usar entries())
if (resolve(fileURLToPath(import.meta.url)) === resolve(process.argv[1] ?? "")) main();

function main() {
const json = process.argv.includes("--json");
const pkgs = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const targets = pkgs.length ? pkgs : readdirSync(".").filter((n) => n.endsWith("-WoWBolivia")).sort();
const report = {};

for (const pkg of targets) {
  const all = files(pkg);
  let total = 0, missing = 0;
  const detail = [];
  for (const enFile of all.filter((p) => EN.test(basename(p)))) {
    const dir = dirname(enFile);
    const stem = basename(enFile).replace(EN, "");
    const en = entries(readFileSync(enFile, "utf8"));
    if (!en.size) continue;
    const es = new Map();
    const esFiles = all.filter((p) => dirname(p) === dir && ES.test(basename(p)) && basename(p).replace(ES, "") === stem);
    for (const f of esFiles) {
      const t = readFileSync(f, "utf8");
      if (loadsIn(t, CLIENT)) for (const [k, v] of entries(t)) es.set(k, v);
    }
    // Falta = no está, o está sin traducir (= true en AceLocale, o el mismo texto que en inglés)
    const clean = cleanValue;
    const same = (k) => { const v = clean(es.get(k)); return v === "true" || v === clean(en.get(k)); };
    const falta = [...en.keys()].filter((k) => !es.has(k) || same(k));
    total += en.size;
    missing += falta.length;
    detail.push({ en: enFile, es: esFiles.filter((f) => loadsIn(readFileSync(f, "utf8"), CLIENT)), total: en.size, falta: falta.map((k) => [k, en.get(k)]) });
  }
  report[pkg] = { total, missing, detail };
  if (!json) {
    const pct = total ? Math.round(((total - missing) / total) * 100) : null;
    console.log(`${pkg.padEnd(26)} ${total ? `${pct}% en español (${missing} de ${total} textos en inglés)` : "sin archivos de idioma de este tipo"}`);
  }
}
if (json) console.log(JSON.stringify(report, null, 1));
}

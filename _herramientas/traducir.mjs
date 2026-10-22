// Completa el español (cliente esMX) de los paquetes. No toca _origen: se aplica sobre el paquete ya armado,
// así cada vez que se reempaqueta una versión nueva las traducciones vuelven a ponerse.
//
//   node _herramientas/traducir.mjs pendientes <Paquete-WoWBolivia>   → traducciones/<Paquete>.pendientes.json
//   node _herramientas/traducir.mjs aplicar    <Paquete-WoWBolivia>   → escribe los textos en el paquete
//   node _herramientas/traducir.mjs aplicar    --todos
//
// Origen de cada texto que falta en esMX, por orden:
//   1. otro archivo español del mismo addon (p. ej. el de esES cuando el de esMX está incompleto);
//   2. traducciones/<Paquete>.json  { "sección|tipo|clave": "expresión Lua en español" }  (las escribimos nosotros).
// Se añaden al final del archivo español que carga esMX, dentro de un bloque "WoW Bolivia". Si en esa carpeta
// ningún archivo se carga en esMX, se amplía la guarda del de esES (GetLocale() ~= "esES" → también esMX).
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { cleanValue, entries } from "./comparar-idioma.mjs";

const ROOT = process.cwd();
const CLIENT = "esMX";
const EN = /(^|[._-])(enUS|en|enGB)\.lua$/i;
const ES = /(^|[._-])(esES|esMX|es|mx)\.lua$/i;
const MARK = "-- ==== WoW Bolivia: textos que faltaban en español (_herramientas/traducir.mjs) ====";

const files = (d, out = []) => {
  for (const n of readdirSync(d)) {
    const p = join(d, n);
    if (statSync(p).isDirectory()) { if (!/^(libs?|libraries)$/i.test(n)) files(p, out); }
    else if (/\.lua$/i.test(n)) out.push(p);
  }
  return out;
};

function loadsIn(text, locale) {
  const head = text.split(/\r?\n/).slice(0, 40).join("\n");
  const notEq = [...head.matchAll(/GetLocale\(\)\s*~=\s*["'](\w{4})["']/g)].map((m) => m[1]);
  if (/if\s+[^\n]*GetLocale\(\)\s*~=/.test(head) && /then\s+return/.test(head)) return notEq.includes(locale);
  const ace = [...head.matchAll(/NewLocale\(\s*[^,]+,\s*["'](\w{4})["']/g)].map((m) => m[1]);
  if (ace.length) return ace.includes(locale);
  const eq = [...head.matchAll(/GetLocale\(\)\s*==\s*["'](\w{4})["']/g)].map((m) => m[1]);
  if (eq.length) return eq.includes(locale);
  return true;
}

const clean = cleanValue;
const untranslated = (es, en) => { const v = clean(es); return v === "true" || v === clean(en); };

/** Por cada archivo en inglés: textos, archivo español que carga esMX y lo que se puede rellenar */
function analyze(pkg) {
  const all = files(join(ROOT, pkg));
  const out = [];
  for (const enFile of all.filter((p) => EN.test(basename(p)))) {
    const dir = dirname(enFile);
    const stem = basename(enFile).replace(EN, "");
    const en = entries(readFileSync(enFile, "utf8"));
    if (!en.size) continue;
    const esFiles = all.filter((p) => dirname(p) === dir && ES.test(basename(p)) && basename(p).replace(ES, "") === stem);
    const loaded = new Map(), other = new Map();
    let target = null;
    for (const f of esFiles) {
      const raw = readFileSync(f, "utf8");
      const t = raw.includes(MARK) ? raw.slice(0, raw.indexOf(MARK)) : raw; // sin nuestro bloque: se vuelve a calcular
      const map = loadsIn(t, CLIENT) ? loaded : other;
      if (map === loaded && (!target || /mx/i.test(basename(f)))) target = f;
      for (const [k, v] of entries(t)) if (!untranslated(v, en.get(k) ?? "")) map.set(k, v);
    }
    const missing = [...en.keys()].filter((k) => !loaded.has(k));
    out.push({ enFile, esFiles, target, en, loaded, other, missing });
  }
  return out;
}

const relKey = (pkg, file, key) => `${file.slice(join(ROOT, pkg).length + 1).replace(/\\/g, "/")}#${key}`;

function pendientes(pkg) {
  const res = {};
  let fromOther = 0;
  for (const a of analyze(pkg)) {
    for (const k of a.missing) {
      if (a.other.has(k)) { fromOther++; continue; }
      res[relKey(pkg, a.enFile, k)] = clean(a.en.get(k));
    }
  }
  const path = join(ROOT, "_herramientas", "traducciones", `${pkg}.pendientes.json`);
  writeFileSync(path, JSON.stringify(res, null, 1) + "\n");
  console.log(`${pkg}: ${fromOther} se copian de otro archivo español, ${Object.keys(res).length} hay que traducir → ${path}`);
}

/** Texto Lua para una entrada (L["x"] = … o, en DBM, bloque Set…Localization) */
function render(groups) {
  const lines = [MARK];
  const plain = groups.get("") ?? [];
  if (plain.length) {
    lines.push("if L then");
    for (const [key, value] of plain) lines.push(`\tL[${JSON.stringify(key)}] = ${value}`);
    lines.push("end");
  }
  for (const [mod, kinds] of groups) {
    if (mod === "") continue;
    lines.push("do", `\tlocal L = DBM:GetModLocalization(${JSON.stringify(mod)})`);
    for (const [kind, items] of kinds) {
      lines.push(`\tL:Set${kind}Localization({`);
      for (const [key, value] of items) lines.push(`\t\t[${JSON.stringify(key)}] = ${value},`);
      lines.push("\t})");
    }
    lines.push("end");
  }
  return lines.join("\n");
}

function aplicar(pkg) {
  const tradPath = join(ROOT, "_herramientas", "traducciones", `${pkg}.json`);
  const trad = existsSync(tradPath) ? JSON.parse(readFileSync(tradPath, "utf8")) : {};
  let copied = 0, translated = 0, left = 0;

  for (const a of analyze(pkg)) {
    if (!a.missing.length) continue;
    let target = a.target;
    if (!target) {
      // Ningún archivo español carga en esMX: se amplía la guarda del de esES (si hay)
      const guard = /GetLocale\(\)\s*~=\s*(["'])esES\1(?!\s*and\s*GetLocale)/;
      const ace = /([\w.]+(?:\([^()]*\))?):NewLocale\(([^()]*?)(["'])esES\3([^()]*)\)/;
      const es = a.esFiles.find((f) => { const t = readFileSync(f, "utf8"); return guard.test(t) || ace.test(t); });
      if (!es) { left += a.missing.length; continue; }
      let t = readFileSync(es, "utf8");
      if (guard.test(t)) t = t.replace(guard, 'GetLocale() ~= "esES" and GetLocale() ~= "esMX"');
      // AceLocale: NewLocale(x, "esES") devuelve nil en esMX → se registra también como esMX
      else t = t.replace(ace, (m, obj, pre, q, post) => `${m} or ${obj}:NewLocale(${pre}${q}esMX${q}${post})`);
      writeFileSync(es, t);
      target = es;
      const again = analyze(pkg).find((x) => x.enFile === a.enFile);
      a.missing = again.missing;
      a.other = again.other;
    }

    // mod → kind → [[clave, valor]]; mod "" = archivo de tipo L["x"]
    const groups = new Map();
    const add = (k, v) => {
      const [mod, kind, key] = k.split("|");
      if (kind === "L") {
        if (!groups.has("")) groups.set("", []);
        groups.get("").push([key, v]);
      } else {
        if (!groups.has(mod)) groups.set(mod, new Map());
        const kinds = groups.get(mod);
        if (!kinds.has(kind)) kinds.set(kind, []);
        kinds.get(kind).push([key, v]);
      }
    };
    for (const k of a.missing) {
      const v = a.other.get(k) ? clean(a.other.get(k)) : trad[relKey(pkg, a.enFile, k)];
      if (v === undefined) { left++; continue; }
      a.other.get(k) ? copied++ : translated++;
      add(k, v);
    }
    if (!groups.size) continue;

    let text = readFileSync(target, "utf8");
    const i = text.indexOf(MARK);
    if (i >= 0) text = text.slice(0, i).trimEnd() + "\n"; // reaplicar: se reemplaza el bloque anterior
    const eol = text.includes("\r\n") ? "\r\n" : "\n";
    writeFileSync(target, text.trimEnd() + eol + eol + render(groups).replace(/\n/g, eol) + eol);
  }
  console.log(`${pkg}: ${copied} copiados de otro archivo español, ${translated} traducidos, ${left} siguen en inglés`);
}

const [cmd, arg] = process.argv.slice(2);
const pkgs = arg === "--todos" ? readdirSync(ROOT).filter((n) => n.endsWith("-WoWBolivia")).sort() : [arg];
for (const pkg of pkgs) {
  if (!pkg || !existsSync(join(ROOT, pkg))) { console.error("Uso: traducir.mjs pendientes|aplicar <Paquete-WoWBolivia>|--todos"); process.exit(1); }
  if (cmd === "pendientes") pendientes(pkg);
  else if (cmd === "aplicar") aplicar(pkg);
  else { console.error("Comando: pendientes | aplicar"); process.exit(1); }
}

// Español (esMX) de la interfaz de Questie. Sus traducciones son tablas  ["Texto en inglés"] = { ["esMX"] = false, … }:
// donde esMX es false, se pone el texto de esES si lo hay o el de traducciones/Questie-WoWBolivia.json.
//
//   node _herramientas/questie.mjs pendientes   → traducciones/Questie-WoWBolivia.traducir.json (las que no tienen ni esES)
//   node _herramientas/questie.mjs aplicar
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const BASE = join(ROOT, "Questie-WoWBolivia", "Questie-335", "Localization", "Translations");
const TRAD = join(ROOT, "_herramientas", "traducciones");
const SKIP = /DebugMessages\.lua$/i; // mensajes de depuración: no los ve el jugador

const files = (d, out = []) => {
  for (const n of readdirSync(d)) {
    const p = join(d, n);
    if (statSync(p).isDirectory()) files(p, out);
    else if (/\.lua$/i.test(n) && !SKIP.test(n)) out.push(p);
  }
  return out;
};

const KEY = /^\s*\[\s*"((?:\\.|[^"\\])*)"\s*\]\s*=\s*\{\s*(--.*)?$/; // admite "= { -- 11153" (id de misión)
const LANG = (l) => new RegExp(`^(\\s*\\[\\s*"${l}"\\s*\\]\\s*=\\s*)(.*?)(,?)\\s*$`);

/** Entradas: { file, key, esMXLine (índice), esES (texto Lua o null) } con esMX = false */
function scan() {
  const out = [];
  for (const file of files(BASE)) {
    const lines = readFileSync(file, "utf8").split(/\r?\n/);
    let key = null, mx = -1, es = null;
    const flush = () => { if (key !== null && mx >= 0) out.push({ file, key, mx, es }); };
    for (let i = 0; i < lines.length; i++) {
      const k = lines[i].match(KEY);
      if (k) { flush(); key = k[1]; mx = -1; es = null; continue; }
      if (key === null) continue;
      const m = lines[i].match(LANG("esMX"));
      if (m && m[2] === "false") mx = i;
      const e = lines[i].match(LANG("esES"));
      if (e && e[2] !== "false" && e[2] !== "true") es = e[2];
      if (/^\s*\},?\s*$/.test(lines[i])) { flush(); key = null; }
    }
    flush();
  }
  return out;
}

const [cmd] = process.argv.slice(2);
const entries = scan();

if (cmd === "pendientes") {
  const todo = {};
  for (const e of entries) if (!e.es) todo[`${e.file.slice(BASE.length + 1).replace(/\\/g, "/")}#|L|${e.key}`] = JSON.stringify(e.key.replace(/\\"/g, '"')).replace(/\\\\n/g, "\\n");
  writeFileSync(join(TRAD, "Questie-WoWBolivia.traducir.json"), JSON.stringify(todo, null, 1) + "\n");
  console.log(`Questie: ${entries.length} sin esMX · ${entries.filter((e) => e.es).length} se copian de esES · ${Object.keys(todo).length} para traducir`);
} else if (cmd === "aplicar") {
  const tradPath = join(TRAD, "Questie-WoWBolivia.json");
  const trad = existsSync(tradPath) ? JSON.parse(readFileSync(tradPath, "utf8")) : {};
  const byFile = new Map();
  let copied = 0, translated = 0, left = 0;
  for (const e of entries) {
    const id = `${e.file.slice(BASE.length + 1).replace(/\\/g, "/")}#|L|${e.key}`;
    const value = e.es ?? trad[id];
    if (!value) { left++; continue; }
    e.es ? copied++ : translated++;
    if (!byFile.has(e.file)) byFile.set(e.file, []);
    byFile.get(e.file).push([e.mx, value]);
  }
  for (const [file, changes] of byFile) {
    const raw = readFileSync(file, "utf8");
    const eol = raw.includes("\r\n") ? "\r\n" : "\n";
    const lines = raw.split(/\r?\n/);
    for (const [i, value] of changes) lines[i] = lines[i].replace(LANG("esMX"), (m, pre, v, comma) => `${pre}${value}${comma}`);
    writeFileSync(file, lines.join(eol));
  }
  console.log(`Questie: ${copied} copiados de esES, ${translated} traducidos, ${left} siguen en inglés`);
} else {
  console.error("Uso: questie.mjs pendientes | aplicar");
  process.exit(1);
}

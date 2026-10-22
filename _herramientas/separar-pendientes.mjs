// Separa los pendientes de un paquete en: lo que hay que traducir (texto visible) y lo que no conviene tocar.
//   - "Misc" de DBM: frases que DBM busca en el chat (gritos/emotes): tienen que ser idénticas al cliente, no se inventan.
//   - Expresiones Lua (no empiezan con comillas) y textos sin palabras ("%s", "%d"): ya sirven tal cual.
// Escribe traducciones/<Paquete>.traducir.json  { clave: "texto en inglés (expresión Lua)" }
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const pkg = process.argv[2];
const dir = join(process.cwd(), "_herramientas", "traducciones");
const pend = JSON.parse(readFileSync(join(dir, `${pkg}.pendientes.json`), "utf8"));
const traducir = {};
let misc = 0, expr = 0, nada = 0;
for (let [k, v] of Object.entries(pend)) {
  const [, kind, key] = k.split("#")[1].split("|");
  if (kind === "Misc") { misc++; continue; }
  // AceLocale: L["Texto en inglés"] = true → el texto es la propia clave
  if (v === "true") v = JSON.stringify(key);
  if (!/^["'[]/.test(v)) { expr++; continue; }
  if (!/[A-Za-z]{2,}/.test(v.replace(/%\w|\|c\w{8}|\|r|\$\w+:\d+/g, ""))) { nada++; continue; }
  traducir[k] = v;
}
writeFileSync(join(dir, `${pkg}.traducir.json`), JSON.stringify(traducir, null, 1) + "\n");
console.log(`${pkg}: ${Object.keys(traducir).length} para traducir · se dejan: ${misc} frases de chat (Misc), ${expr} expresiones, ${nada} sin palabras`);

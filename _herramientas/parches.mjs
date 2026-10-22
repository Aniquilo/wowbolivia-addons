// Parches de idioma que no se pueden hacer con traducir.mjs: addons que traen español solo para esES y no lo cargan
// en clientes esMX. Se aplican sobre el paquete armado (empaquetar.mjs los llama), así sobreviven a las actualizaciones.
// Cada parche busca un texto exacto; si el original cambia y ya no lo encuentra, avisa (no falla en silencio).
//
// Uso: node _herramientas/parches.mjs
import { copyFileSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();

const PARCHES = [
  { archivo: "AdiBags-WoWBolivia/AdiBags/Localization.lua", nota: "esMX usa el español de esES",
    buscar: "elseif locale == 'esES' then", poner: "elseif locale == 'esES' or locale == 'esMX' then" },
  { archivo: "xCT-WoWBolivia/xCT+/locales.lua", nota: "esMX usa el español de esES",
    buscar: 'elseif locale == "esES" then', poner: 'elseif locale == "esES" or locale == "esMX" then' },
  { archivo: "Auctionator-WoWBolivia/Auctionator/Locales/esES.lua", nota: "esMX usa la tabla de esES",
    alFinal: "\n-- WoW Bolivia: los clientes esMX usan la traducción de esES\nAtrBuildLTable_esMX = AtrBuildLTable_esES\n" },
  // MoveAnything no tenía español y en clientes que no son ingleses cargaba el ruso: archivo propio antes del ruso
  { copiar: "MoveAnything/Localization.es.lua", archivo: "MoveAnything-WoWBolivia/MoveAnything/Localizations/Localization.es.lua" },
  { archivo: "MoveAnything-WoWBolivia/MoveAnything/MoveAnything.toc", nota: "cargar el español antes que el ruso",
    buscar: "Localizations\\Localization.ru.lua", poner: "Localizations\\Localization.es.lua\r\nLocalizations\\Localization.ru.lua" },
  // IDs: etiquetas de la descripción (solo se muestran; el addon las compara consigo mismas para no repetirlas)
  ...[["Spell ID", "ID de hechizo"], ["Achievement ID", "ID de logro"], ["Quest ID", "ID de misión"], ["Item ID", "ID de objeto"],
    ["NPC ID", "ID de PNJ"], ["Player GUID", "GUID del jugador"], ["Level ", "Nivel "], ["ItemLevel ", "Nivel de objeto "]]
    .map(([en, es]) => ({ archivo: "IDs-WoWBolivia/IDs/IDs.lua", buscar: `"${en}"`, poner: `"${es}"`, todas: true })),
];

let ok = 0, avisos = 0;
for (const p of PARCHES) {
  const path = join(ROOT, p.archivo);
  if (p.copiar) {
    copyFileSync(join(ROOT, "_herramientas", "archivos", p.copiar), path);
    ok++;
    continue;
  }
  if (!existsSync(path)) { console.warn(`AVISO: no existe ${p.archivo}`); avisos++; continue; }
  let s = readFileSync(path, "utf8");
  if (p.alFinal) {
    if (!s.includes(p.alFinal.trim())) s = s.trimEnd() + "\n" + p.alFinal;
  } else if (!s.includes(p.poner)) {
    if (!s.includes(p.buscar)) { console.warn(`AVISO: ${p.archivo}: ya no aparece "${p.buscar}" (¿cambió el addon?)`); avisos++; continue; }
    // El .toc puede venir con CRLF o LF: el texto que se pone usa el mismo final de línea
    const poner = s.includes("\r\n") ? p.poner : p.poner.replace(/\r\n/g, "\n");
    s = p.todas ? s.split(p.buscar).join(poner) : s.replace(p.buscar, poner);
  }
  writeFileSync(path, s);
  ok++;
}
console.log(`Parches de idioma: ${ok} aplicados${avisos ? `, ${avisos} avisos` : ""}`);

// Empaqueta los addons de _origen/ como paquetes "<Nombre>-WoWBolivia/" (una carpeta por addon de Interface/AddOns),
// los firma en el título del .toc como en IDs ("Titulo - [WoW Bolivia]"), conserva el autor original y deja un
// LEEME.md con créditos, origen (repositorio + commit) y licencia. También escribe catalogo.json (lo usa publicar.mjs).
//
// Uso: node _herramientas/empaquetar.mjs        (desde J:\WOWBOLIVIA\ADDONS)
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { basename, dirname, join, relative } from "node:path";

const ROOT = process.cwd();
const ORIGEN = join(ROOT, "_origen");
const FIRMA = "|cff5aa9ffWoW Bolivia|r"; // azul de la web (--wb-link)
const commits = Object.fromEntries(
  readFileSync(join(ORIGEN, "commits.txt"), "utf8").trim().split(/\r?\n/).map((l) => l.split(" ")).map(([r, sha, date]) => [r, { sha, date }]),
);

// rama = nombre de la rama en el repositorio de addons (y del paquete); categoria = clave de config/addons.php de la web
const ADDONS = [
  { rama: "dbm", nombre: "DBM", titulo: "Deadly Boss Mods", repo: "Zidras/DBM-Warmane", categoria: "raids", licencia: "Creative Commons BY-NC-SA 3.0",
    resumen: "Avisos y temporizadores de jefes para mazmorras y bandas de toda la expansión." },
  { rama: "details", nombre: "Details", titulo: "Details! Damage Meter", repo: "Bunny67/Details-WotLK", categoria: "combat", autor: "Terciob (versión 3.3.5: Bunny67)", licencia: "GPL-3.0 (módulos) / del autor",
    resumen: "Medidor de daño, sanación y amenaza con gráficos y desglose por habilidad." },
  { rama: "skada", nombre: "Skada", titulo: "Skada", repo: "bkader/Skada-WoTLK", categoria: "combat", licencia: "MIT",
    resumen: "Medidor de daño y sanación modular y ligero, ideal para bandas." },
  { rama: "weakauras", nombre: "WeakAuras", titulo: "WeakAuras", repo: "NoM0Re/WeakAuras-WotLK", categoria: "buffs", licencia: "GPL-2.0",
    resumen: "Muestra beneficios, perjuicios, tiempos de reutilización y alertas totalmente a tu gusto." },
  { rama: "elvui", nombre: "ElvUI", titulo: "ElvUI", repo: "ElvUI-WotLK/ElvUI", categoria: "ui", licencia: "Sin licencia publicada (del autor)",
    resumen: "Reemplazo completo de la interfaz: marcos, barras, bolsas y chat modernos." },
  { rama: "questie", nombre: "Questie", titulo: "Questie", repo: "Aldori15/Questie", categoria: "quests", licencia: "Sin licencia publicada (del autor)",
    resumen: "Muestra en el mapa y el minimapa dónde están tus misiones, objetivos y PNJ." },
  { rama: "auctionator", nombre: "Auctionator", titulo: "Auctionator", repo: "alchem1ster/WotLK-Auctionator", categoria: "auction", licencia: "Sin licencia publicada (del autor)",
    resumen: "Casa de subastas más fácil: precios claros y publicar en pocos clics." },
  { rama: "bagnon", nombre: "Bagnon", titulo: "Bagnon", repo: "RichSteini/Bagnon-3.3.5", categoria: "bags", licencia: "MIT",
    resumen: "Junta todas tus bolsas en una sola ventana con búsqueda e inventario de tus personajes." },
  { rama: "adibags", nombre: "AdiBags", titulo: "AdiBags", repo: "Sattva-108/AdiBags", categoria: "bags", licencia: "Sin licencia publicada (del autor)",
    resumen: "Bolsas en una sola vista, ordenadas automáticamente por tipo de objeto." },
  { rama: "grid2", nombre: "Grid2", titulo: "Grid2", repo: "bkader/Grid2-WoTLK", categoria: "unitframes", licencia: "Sin licencia publicada (del autor)",
    resumen: "Marcos de grupo y banda compactos, pensados para sanadores." },
  { rama: "immersion", nombre: "Immersion", titulo: "Immersion", repo: "s0h2x/Immersion-WotLK", categoria: "quests", licencia: "Artistic License 2.0",
    resumen: "Ventanas de misiones y conversaciones más bonitas, al estilo de las expansiones modernas." },
  { rama: "leatrix-maps", nombre: "LeatrixMaps", titulo: "Leatrix Maps", repo: "5Buttons/Leatrix-Maps-3.3.5", categoria: "map", licencia: "Sin licencia publicada (del autor)",
    resumen: "Mapa del mundo mejorado: ventana movible, coordenadas, niveles de zona y mapa revelado." },
  { rama: "leatrix-plus", nombre: "LeatrixPlus", titulo: "Leatrix Plus", repo: "Sattva-108/Leatrix_Plus", categoria: "ui", licencia: "Sin licencia publicada (del autor)",
    resumen: "Decenas de mejoras de calidad de vida: misiones, vendedores, chat, marcos y más." },
  { rama: "xct", nombre: "xCT", titulo: "xCT+", repo: "hypopheria2k/xCT_Plus_wotlk", categoria: "combat", licencia: "Sin licencia publicada (del autor)",
    resumen: "Texto de combate flotante limpio y configurable (daño, sanación, recursos)." },
  { rama: "pretty-minimap", nombre: "PrettyMinimap", titulo: "pretty_minimap", repo: "s0h2x/pretty_minimap", categoria: "map", licencia: "Sin licencia publicada (del autor)",
    resumen: "Minimapa con un diseño moderno y limpio." },
  { rama: "carbonite", nombre: "Carbonite", titulo: "Carbonite", repo: "anzz1/Carbonite-3.3.5", categoria: "map", licencia: "Sin licencia publicada (del autor)",
    resumen: "Mapa completo con ayudante de misiones, rutas y recolección." },
  { rama: "moveanything", nombre: "MoveAnything", titulo: "MoveAnything", repo: "sirus-addons/MoveAnything", categoria: "ui", licencia: "Sin licencia publicada (del autor)",
    resumen: "Mueve, escala u oculta casi cualquier elemento de la interfaz." },
];

/** Carpetas con .toc dentro de dir (sin bajar a librerías), como hace el launcher */
function addonFolders(dir) {
  const tocs = [];
  const walk = (d) => {
    for (const name of readdirSync(d)) {
      const p = join(d, name);
      if (statSync(p).isDirectory()) walk(p);
      else if (/\.toc$/i.test(name)) tocs.push([d, name.replace(/\.toc$/i, "")]);
    }
  };
  walk(dir);
  const byDir = new Map();
  for (const [d, stem] of tocs) {
    const cur = byDir.get(d);
    const exact = (s) => s.toLowerCase() === basename(d).toLowerCase();
    if (!cur || (exact(stem) && !exact(cur)) || (exact(stem) === exact(cur) && stem.length < cur.length)) byDir.set(d, stem);
  }
  const dirs = [...byDir.keys()];
  return [...byDir.entries()].filter(([d]) => !dirs.some((o) => o !== d && (d.startsWith(o + "\\") || d.startsWith(o + "/"))));
}

/** Carpeta principal del paquete (de ahí salen autor y versión): la que se llama como el paquete o el addon */
function principal(carpetas, a) {
  const names = [a.nombre, a.titulo, a.nombre + "-Core", "DBM-Core", a.nombre + "-335", "Leatrix_" + a.nombre.replace("Leatrix", ""), a.titulo + "+"]
    .map((n) => n.toLowerCase());
  return [...carpetas].sort((x, y) => {
    const ix = names.indexOf(x.toLowerCase()), iy = names.indexOf(y.toLowerCase());
    return (ix < 0 ? 99 : ix) - (iy < 0 ? 99 : iy);
  });
}

/** Firma el .toc: título "… - [WoW Bolivia]" (también los títulos traducidos) y X-Packaged-By. Conserva BOM y CRLF */
function firmar(tocPath, nota) {
  let s = readFileSync(tocPath, "utf8");
  const bom = s.startsWith("\uFEFF");
  s = s.replace(/^\uFEFF/, "");
  const eol = s.includes("\r\n") ? "\r\n" : "\n";
  let lines = s.split(/\r?\n/).filter((l) => !/^##\s*X-Packaged-By:/i.test(l));
  lines = lines.map((l) => {
    const m = l.match(/^(##\s*Title(?:-[a-zA-Z]{4})?\s*:\s*)(.*)$/);
    if (!m) return l;
    const title = m[2].replace(/\s*-\s*\[\|c[0-9a-fA-F]{8}[^|]*\|r\]\s*$/, "").trimEnd(); // quita firmas anteriores (p. ej. UltimoWoW)
    return `${m[1]}${title} - [${FIRMA}]`;
  });
  const at = lines.findIndex((l) => /^##\s*Author\s*:/i.test(l));
  const extra = [`## X-Packaged-By: WoW Bolivia`];
  if (nota) extra.push(`## X-WoWBolivia-Source: ${nota}`);
  lines.splice(at >= 0 ? at + 1 : lines.findIndex((l) => /^##/.test(l)) + 1, 0, ...extra);
  writeFileSync(tocPath, (bom ? "\uFEFF" : "") + lines.join(eol));
}

function tocField(tocPath, field) {
  const m = readFileSync(tocPath, "utf8").match(new RegExp(`^##\\s*${field}\\s*:\\s*(.+)$`, "mi"));
  return m ? m[1].replace(/\|c[0-9a-fA-F]{8}|\|r/g, "").trim() : "";
}

const catalogo = [];

for (const a of ADDONS) {
  const src = join(ORIGEN, a.repo.replace("/", "_"));
  const commit = commits[a.repo];
  if (!existsSync(src) || !commit?.sha) throw new Error(`Falta ${a.repo} en _origen`);
  const paquete = join(ROOT, `${a.nombre}-WoWBolivia`);
  rmSync(paquete, { recursive: true, force: true });
  mkdirSync(paquete, { recursive: true });

  const carpetas = [];
  for (const [dir, stem] of addonFolders(src)) {
    const destino = join(paquete, stem); // la carpeta se llama como su .toc (lo exige WoW)
    cpSync(dir, destino, { recursive: true });
    carpetas.push(stem);
  }
  carpetas.sort((x, y) => x.localeCompare(y));

  let autor = a.autor || "", version = "";
  for (const c of principal(carpetas, a)) {
    const toc = join(paquete, c, `${c}.toc`);
    if (!existsSync(toc)) continue;
    autor ||= tocField(toc, "Author");
    version ||= tocField(toc, "Version");
    firmar(toc, `https://github.com/${a.repo} @ ${commit.sha.slice(0, 10)}`);
  }

  writeFileSync(join(paquete, "LEEME.md"), [
    `# ${a.titulo} · paquete de WoW Bolivia`,
    "",
    a.resumen,
    "",
    "| | |",
    "|---|---|",
    `| Autor original | ${autor || "ver el repositorio de origen"} |`,
    `| Origen | https://github.com/${a.repo} |`,
    `| Versión de origen | commit \`${commit.sha}\` (${commit.date}) |`,
    `| Licencia | ${a.licencia} |`,
    `| Carpetas para Interface/AddOns | ${carpetas.join(", ")} |`,
    "",
    "WoW Bolivia solo lo empaqueta para instalarlo desde su launcher: el título del .toc lleva la etiqueta",
    "\"[WoW Bolivia]\" y la línea `## X-Packaged-By`. Todo el mérito es de su autor original; el código no se modificó.",
    "",
  ].join("\n"));

  catalogo.push({ ...a, autor, version, carpetas, origen_commit: commit.sha, origen_fecha: commit.date });
  console.log(`${a.nombre}-WoWBolivia: ${carpetas.length} carpetas (${carpetas.slice(0, 4).join(", ")}${carpetas.length > 4 ? "…" : ""})`);
}

// Paquetes propios que ya existían (GearScore e IDs): solo se firman
for (const extra of [
  { rama: "gearscore", nombre: "GearScore", titulo: "GearScore", carpeta: "GearScore-WoWBolivia", categoria: "tooltips", licencia: "Del autor",
    resumen: "Calcula el GearScore de cada jugador y lo muestra en su descripción y en la inspección." },
  { rama: "ids", nombre: "IDs", titulo: "IDs", carpeta: "IDs-WoWBolivia", categoria: "tooltips", licencia: "Del autor",
    resumen: "Muestra el ID de objetos, hechizos, misiones y logros en sus descripciones." },
]) {
  const paquete = join(ROOT, extra.carpeta);
  // IDs venía suelto (J:\WOWBOLIVIA\ADDONS\IDs): se mete en su paquete
  if (extra.rama === "ids" && !existsSync(paquete) && existsSync(join(ROOT, "IDs"))) {
    mkdirSync(paquete, { recursive: true });
    cpSync(join(ROOT, "IDs"), join(paquete, "IDs"), { recursive: true });
  }
  const carpetas = readdirSync(paquete).filter((n) => existsSync(join(paquete, n, `${n}.toc`))).sort();
  let autor = "", version = "";
  for (const c of principal(carpetas, extra)) {
    const toc = join(paquete, c, `${c}.toc`);
    autor ||= tocField(toc, "Author");
    version ||= tocField(toc, "Version");
    firmar(toc, "");
  }
  writeFileSync(join(paquete, "LEEME.md"), [
    `# ${extra.titulo} · paquete de WoW Bolivia`, "", extra.resumen, "",
    "| | |", "|---|---|",
    `| Autor original | ${autor || "—"} |`,
    `| Versión | ${version || "—"} |`,
    `| Carpetas para Interface/AddOns | ${carpetas.join(", ")} |`, "",
    "Paquete mantenido por WoW Bolivia: el título del .toc lleva la etiqueta \"[WoW Bolivia]\". El mérito es de su autor original.", "",
  ].join("\n"));
  catalogo.push({ ...extra, repo: "", autor, version, carpetas, origen_commit: "", origen_fecha: "" });
  console.log(`${extra.carpeta}: ${carpetas.join(", ")}`);
}

writeFileSync(join(ROOT, "_herramientas", "catalogo.json"), JSON.stringify(catalogo, null, 2) + "\n");
console.log(`\n${catalogo.length} paquetes → _herramientas/catalogo.json`);

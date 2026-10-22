// Arma el repositorio de addons (una rama por paquete) y el SQL del catálogo de la web.
//
//   node _herramientas/publicar.mjs            → ramas locales + _herramientas/catalogo-web.sql
//   git push origin --all                      → sube main y todas las ramas a GitHub
//
// Cada rama (dbm, elvui, …) contiene SOLO las carpetas de ese paquete: el launcher descarga el zip del commit
// exacto de la rama (codeload.github.com/<REPO>/zip/<commit>) y no baja los demás addons.
// Volver a ejecutarlo tras cambiar un paquete crea un commit nuevo en su rama; el SQL actualiza install_ref.
import { execFileSync } from "node:child_process";
import { readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const REPO = process.env.WB_ADDONS_REPO || "Aniquilo/wowbolivia-addons"; // dueño/repositorio en GitHub
const catalogo = JSON.parse(readFileSync(join(ROOT, "_herramientas", "catalogo.json"), "utf8"));

const git = (args, opts = {}) => execFileSync("git", args, { cwd: ROOT, encoding: "utf8", ...opts }).trim();

/** Commit en refs/heads/<rama> con el contenido de <carpeta> (sin tocar el directorio de trabajo) */
function commitBranch(rama, carpeta, mensaje) {
  const index = join(ROOT, ".git", `index-${rama}`);
  rmSync(index, { force: true });
  const env = { ...process.env, GIT_INDEX_FILE: index };
  git(["--work-tree", join(ROOT, carpeta), "add", "-A", "."], { env });
  const tree = git(["write-tree"], { env });
  rmSync(index, { force: true });

  let parent = "";
  try { parent = git(["rev-parse", "--verify", "-q", `refs/heads/${rama}`]); } catch { /* rama nueva */ }
  if (parent && git(["rev-parse", `${parent}^{tree}`]) === tree) return parent; // sin cambios

  const commit = git(["commit-tree", tree, ...(parent ? ["-p", parent] : []), "-m", mensaje]);
  git(["update-ref", `refs/heads/${rama}`, commit]);
  return commit;
}

const sql = (v) => `'${String(v ?? "").replace(/\\/g, "\\\\").replace(/'/g, "\\'")}'`;
const filas = [];
const tabla = [];

for (const a of catalogo) {
  const carpeta = a.carpeta || `${a.nombre}-WoWBolivia`;
  const origen = a.repo ? `${a.repo}@${a.origen_commit.slice(0, 10)}` : "paquete propio";
  const commit = commitBranch(a.rama, carpeta, `${a.titulo} (${origen}) · paquete WoW Bolivia`);
  a.rama_commit = commit;

  const descripcion = [
    a.resumen,
    "",
    `Autor original: ${a.autor || "ver el origen"}.`,
    a.repo ? `Origen: https://github.com/${a.repo} (commit ${a.origen_commit.slice(0, 10)}, ${a.origen_fecha}).` : "",
    `Licencia: ${a.licencia}.`,
    `Carpetas: ${a.carpetas.join(", ")}.`,
    "Empaquetado por WoW Bolivia para instalarlo desde el launcher; el código es el original.",
  ].filter(Boolean).join("\n");

  const valores = {
    name: a.titulo, category: a.categoria, version: (a.version || "").slice(0, 30), language: "multi",
    author: (a.autor || "").slice(0, 80), summary: a.resumen.slice(0, 255), description: descripcion,
    url: `https://github.com/${REPO}/tree/${a.rama}`, image: "", screenshots: "", status: 1,
    submitted_by: 0, submitter: "WoW Bolivia",
    install_type: "github", install_source: REPO, install_ref: commit, install_folders: "",
  };
  const cols = Object.keys(valores);
  filas.push(
    `-- ${a.titulo}`,
    `INSERT INTO addons (${cols.join(", ")}, created_at, updated_at)\n  SELECT ${cols.map((c) => sql(valores[c])).join(", ")}, UNIX_TIMESTAMP(), UNIX_TIMESTAMP() FROM DUAL\n  WHERE NOT EXISTS (SELECT 1 FROM addons WHERE name = ${sql(a.titulo)});`,
    `UPDATE addons SET install_type = 'github', install_source = ${sql(REPO)}, install_ref = ${sql(commit)}, version = ${sql(valores.version)}, updated_at = UNIX_TIMESTAMP()\n  WHERE name = ${sql(a.titulo)} AND (install_source = ${sql(REPO)} OR install_source = '');`,
    "",
  );
  tabla.push(`| ${a.titulo} | \`${a.rama}\` | ${a.autor || "—"} | ${a.repo ? `[${a.repo}](https://github.com/${a.repo})` : "propio"} | ${a.licencia} |`);
  console.log(`${a.rama.padEnd(15)} ${commit}`);
}

writeFileSync(join(ROOT, "_herramientas", "catalogo-web.sql"), [
  "-- Catálogo de addons de WoW Bolivia para la web (tabla `addons` del módulo addons, BD del CMS).",
  `-- Generado por _herramientas/publicar.mjs. Repositorio: https://github.com/${REPO}`,
  "-- Importar DESPUÉS de abrir /addons una vez (crea las columnas install_*). Se puede volver a importar:",
  "-- no duplica addons y actualiza la versión publicada (install_ref) de los que ya existen.",
  "",
  ...filas,
].join("\n"));

writeFileSync(join(ROOT, "README.md"), [
  "# Addons de WoW Bolivia",
  "",
  "Addons para **World of Warcraft 3.3.5a** empaquetados por WoW Bolivia para instalarlos desde el launcher",
  "(pestaña *Addons*). Cada addon vive en **su propia rama** con solo sus carpetas de `Interface/AddOns`.",
  "",
  "Los addons son obra de sus autores originales: aquí solo se empaquetan y su título lleva la etiqueta",
  "\"[WoW Bolivia]\". Cada rama tiene un `LEEME.md` con el autor, el repositorio y el commit de origen y la licencia.",
  "",
  "| Addon | Rama | Autor | Origen | Licencia |",
  "|---|---|---|---|---|",
  ...tabla,
  "",
  "## Actualizar un addon",
  "",
  "1. Bajar la versión nueva a `_origen/` (o editar el paquete propio).",
  "2. `node _herramientas/empaquetar.mjs` y `node _herramientas/publicar.mjs`.",
  "3. `git push origin --all` y en la web: Admin → Addons → editar → botón de GitHub, o importar `catalogo-web.sql`.",
  "",
].join("\n"));

writeFileSync(join(ROOT, "_herramientas", "catalogo.json"), JSON.stringify(catalogo, null, 2) + "\n");
console.log(`\nListo: ${catalogo.length} ramas, README.md y _herramientas/catalogo-web.sql`);

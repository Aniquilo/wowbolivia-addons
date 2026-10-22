// Traducción por tandas de traducciones/<Paquete>.traducir.json
//
//   node _herramientas/lote.mjs mostrar <Paquete> <desde> <hasta>   → "n<TAB>texto" (interior de las comillas)
//   node _herramientas/lote.mjs guardar <Paquete> <archivo.tsv>     → añade "n<TAB>traducción" a traducciones/<Paquete>.json
//
// Solo se traducen textos que son una cadena Lua simple ("…" o '…'). El interior se escribe tal cual en Lua:
// se conservan \n, %s, |cff…|r, $spell:… Las expresiones compuestas ("a"..x.."b") se muestran con "EXPR " delante
// y su traducción tiene que ser la expresión Lua completa.
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const [cmd, pkg, a, b] = process.argv.slice(2);
const dir = join(process.cwd(), "_herramientas", "traducciones");
const list = Object.entries(JSON.parse(readFileSync(join(dir, `${pkg}.traducir.json`), "utf8")));

/** Interior de una cadena Lua simple, o null si es una expresión compuesta */
function inner(v) {
  const m = v.match(/^(["'])((?:\\.|(?!\1).)*)\1$/s);
  return m ? m[2] : null;
}

if (cmd === "mostrar") {
  const from = Number(a ?? 0), to = Math.min(Number(b ?? list.length), list.length);
  for (let i = from; i < to; i++) {
    const v = list[i][1];
    const s = inner(v);
    console.log(`${i}\t${s === null ? "EXPR " + v : s}`);
  }
  console.error(`(${to - from} de ${list.length})`);
} else if (cmd === "guardar") {
  const outPath = join(dir, `${pkg}.json`);
  const out = existsSync(outPath) ? JSON.parse(readFileSync(outPath, "utf8")) : {};
  let n = 0;
  for (const line of readFileSync(a, "utf8").split(/\r?\n/)) {
    const m = line.match(/^(\d+)\t(.*)$/);
    if (!m) continue;
    const [key, en] = list[Number(m[1])];
    const es = m[2];
    if (inner(en) === null) out[key] = es; // expresión completa
    else {
      const q = en[0];
      // dentro de comillas: escapar la comilla que delimita si viene sin escapar
      out[key] = q + es.replace(new RegExp(`(?<!\\\\)${q}`, "g"), `\\${q}`) + q;
    }
    n++;
  }
  writeFileSync(outPath, JSON.stringify(out, null, 1) + "\n");
  console.log(`${pkg}: ${n} traducciones guardadas (${Object.keys(out).length} en total)`);
} else {
  console.error("Uso: lote.mjs mostrar <Paquete> <desde> <hasta> | guardar <Paquete> <archivo.tsv>");
  process.exit(1);
}

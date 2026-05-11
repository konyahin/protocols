import { cp, mkdir, readdir, writeFile, readFile } from "node:fs/promises";
import path from "node:path";
import { renderHome } from "./templates/home.ts";
import { renderProtocol } from "./templates/protocol.ts";
import type { Protocol } from "./templates/types.ts";
import { marked, type Tokens } from "marked";
import { build } from "esbuild";

const OUTPUT = "./output";
const INPUT = "./protocols";

await mkdir(OUTPUT, { recursive: true });
await cp("./static", OUTPUT, { recursive: true });
await build({
    entryPoints: ["./client/main.ts", "./client/cache.ts"],
    outdir: OUTPUT,
    bundle: true,
    format: "iife",
    target: "es2022",
    minify: true,
    sourcemap: "linked",
});

const protocolsFiles = await readdir(INPUT);
const protocols: readonly Protocol[] = await Promise.all(protocolsFiles.map(parseProtocol));

await writeFile(path.join(OUTPUT, "index.html"), renderHome({ protocols }));

for (const protocol of protocols) {
    await writeFile(
        path.join(OUTPUT, `${protocol.url}`),
        renderProtocol(protocol),
    );
}

console.log(`Generated ${protocols.length + 1} pages in ${OUTPUT}/`);

async function parseProtocol(file: string): Promise<Protocol> {
    const fileName = path.parse(file).name;
    const markdownContent = await readFile(path.join(INPUT, file), "utf-8")

    const tokens = marked.lexer(markdownContent)
    const h1 = tokens.find(
        (t): t is Tokens.Heading => t.type === "heading" && t.depth === 1
    );
    const title = h1?.text ?? fileName;

    const htmlContent = await marked.parse(markdownContent)
    return { title: title, url: `${fileName}.html`, content: htmlContent };
}

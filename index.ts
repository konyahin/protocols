import { cp, mkdir, readdir, writeFile, readFile } from "node:fs/promises";
import path from "node:path";
import { renderHome } from "./templates/home.ts";
import { renderProtocol } from "./templates/protocol.ts";
import type { Protocol } from "./templates/types.ts";
import { marked } from "marked";

const OUTPUT = "./output";
const INPUT = "./protocols"

await mkdir(OUTPUT, { recursive: true });
await cp("./static", OUTPUT, { recursive: true });

const protocolsFiles = await readdir(INPUT);

const protocols: readonly Protocol[] = await Promise.all(protocolsFiles.map(async (file) => {
    const title = path.parse(file).name;
    const markdownContent = await readFile(path.join(INPUT, file), "utf-8")
    const htmlContent = await marked.parse(markdownContent)
    return { title, url: `${title}.html`, content: htmlContent };
}));

await writeFile(path.join(OUTPUT, "index.html"), renderHome({ protocols }));

for (const protocol of protocols) {
    await writeFile(
        path.join(OUTPUT, `${protocol.title}.html`),
        renderProtocol(protocol),
    );
}

console.log(`Generated ${protocols.length + 1} pages in ${OUTPUT}/`);

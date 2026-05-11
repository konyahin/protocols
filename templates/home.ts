import { renderBase } from "./base.ts";
import type { HomePage } from "./types.ts";

export function renderHome(data: HomePage): string {
    const items = data.protocols
        .map((p) => `            <li><a href="${p.url}">${p.title}</a></li>`)
        .join("\n");

    return renderBase({
        title: "Protocols",
        body: `    <header>
        <hgroup>
            <h1>Protocols</h1>
            <p>A personal collection</p>
        </hgroup>
    </header>
    <main>
        <ul>
${items}
        </ul>
    </main>
    <footer>
        <a id="reset-cache" href="/">Reset cache</a>
    </footer>`,
    });
}

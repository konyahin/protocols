import { renderBase } from "./base.ts";
import type { HomePage } from "./types.ts";

export function renderHome(data: HomePage): string {
    const items = data.protocols
        .map((p) => `
<a href="${p.url}">
    <article>
        <h3>${p.title}</h3>
        ${p.description}
    </article>
</a>`)
        .join("\n");

    return renderBase({
        title: "Protocols",
        body: `
<header>
    <hgroup>
        <h1>protocols</h1>
    </hgroup>
</header>
<main>
    ${items}
</main>
<footer>
    <a id="reset-cache" href="/">Reset cache</a>
</footer>`,
    });
}

import { renderBase } from "./base.ts";
import type { HomePage } from "./types.ts";

export function renderHome(data: HomePage): string {
    const items = data.protocols
        .map((p) => `
<a class="protocol-card" href="${p.url}">
    <article>
        <h3>${p.title}</h3>
        <div class="protocol-card-desc">${p.description}</div>
        <span class="protocol-card-arrow" aria-hidden="true">&rarr;</span>
    </article>
</a>`)
        .join("");

    return renderBase({
        title: "Protocols",
        body: `
<header>
    <hgroup>
        <h1>protocols</h1>
        <p>Step-by-step routines</p>
    </hgroup>
</header>
<main>
    <div class="protocols-grid">
        ${items}
    </div>
</main>
<footer>
    <a id="reset-cache" href="/">Reset cache</a>
</footer>`});
}

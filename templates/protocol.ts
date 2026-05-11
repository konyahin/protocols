import { renderBase } from "./base.ts";
import type { Protocol } from "./types.ts";

export function renderProtocol(data: Protocol): string {
    return renderBase({
        title: data.title,
        body: `    <header>
        <nav><a href="/">&larr; All protocols</a></nav>
    </header>
    <main>
        <article>
            ${data.content}
        </article>
    </main>`,
    });
}

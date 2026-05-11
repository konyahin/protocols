import { renderBase } from "./base.ts";
import type { Protocol } from "./types.ts";

export function renderProtocol(data: Protocol): string {
    const steps = data.steps
        .map((s) => `<article>${s}</article>`)
        .join("\n");
    return renderBase({
        title: data.title,
        body: `    <header>
        <nav><a href="/">&larr; All protocols</a></nav>
    </header>
    <main>
        ${steps}
    </main>`,
    });
}

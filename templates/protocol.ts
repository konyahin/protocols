import { renderBase } from "./base.ts";
import type { Protocol } from "./types.ts";

export function renderProtocol(data: Protocol): string {
    const steps = data.steps
        .map((s, i) => renderStep(i, s))
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

function renderStep(index: number, step: string): string {
    return `
    <article id="${index}" class="step">
    ${step}
    <div style="display: flex;">
        <a class="prev">&larr;Prev</a>
        <a class="next" style="margin-left: auto;">Next&rarr;</a>
    </div>
    </article>
    `
}

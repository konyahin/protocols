import { renderBase } from "./base.ts";
import type { Protocol } from "./types.ts";

export function renderProtocol(data: Protocol): string {
    const steps = data.steps
        .map((s, i) => renderStep(i, s))
        .join("\n");
    return renderBase({
        title: data.title,
        body: `
<header>
    <nav><a href="/">&larr; All protocols</a></nav>
</header>
<main>
    ${steps}
</main>`,
    });
}

function renderStep(index: number, step: string): string {
    return `
<article id="step-${index}" class="step">
    ${step}
    <nav class="step-nav">
        <a href="#" class="prev">&larr;Prev</a>
        <a href="#" class="next">Next&rarr;</a>
    </nav>
</article>`
}

import { renderBase } from "./base.ts";
import type { Protocol } from "./types.ts";

export function renderProtocol(data: Protocol): string {
    const total = data.steps.length;
    const steps = data.steps
        .map((s, i) => renderStep(i, total, s))
        .join("");
    const initialProgress = total > 0 ? (1 / total) * 100 : 0;

    return renderBase({
        title: data.title,
        body: `
<header>
    <nav><a class="back-link" href="/">&larr; All protocols</a></nav>
</header>
<main>
    <section class="protocol-shell" data-total="${total}">
        <div class="protocol-meta">
            <h1 class="protocol-title">${data.title}</h1>
            <p class="protocol-counter" aria-live="polite">
                <span id="step-current">1</span><span class="protocol-counter-sep">/</span><span>${total}</span>
            </p>
        </div>
        <div class="protocol-progress" role="progressbar" aria-valuemin="0" aria-valuemax="${total}" aria-valuenow="1">
            <div class="protocol-progress-fill" id="progress-fill" style="width: ${initialProgress}%"></div>
        </div>
        <div class="steps-container">
            ${steps}
        </div>
        <nav class="protocol-nav">
            <button type="button" class="secondary outline" id="prev-step" disabled>&larr; Prev</button>
            <button type="button" id="next-step"${total <= 1 ? " disabled" : ""}>Next &rarr;</button>
        </nav>
    </section>
</main>`,
    });
}

function renderStep(index: number, total: number, step: string): string {
    const hidden = index === 0 ? "" : " hidden";
    return `
<article id="step-${index}" class="step"${hidden}>
    <div class="step-badge">Step ${index + 1} from ${total}</div>
    <div class="step-content">${step}</div>
</article>`;
}

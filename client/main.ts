if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/cache.js");
}

document.getElementById("reset-cache")?.addEventListener("click", async (e) => {
    e.preventDefault();
    if ("serviceWorker" in navigator) {
        const regs = await navigator.serviceWorker.getRegistrations();
        await Promise.all(regs.map((r) => r.unregister()));
    }
    if ("caches" in window) {
        const keys = await caches.keys();
        await Promise.all(keys.map((k) => caches.delete(k)));
    }
    location.reload();
});

const prev = document.getElementById("prev-step") as HTMLButtonElement;
const next = document.getElementById("next-step") as HTMLButtonElement;
if (prev) {
    let current = 0;

    function show(step: number): void {
        const shell = document.querySelector(".protocol-shell") as HTMLElement;
        const total = Number(shell.dataset["total"] ?? "0");
        if (step < 0 || step >= total || step === current) return;

        const target = document.getElementById(`step-${step}`) as HTMLElement;
        target.hidden = false;

        const previous = document.getElementById(`step-${current}`) as HTMLElement;
        previous.hidden = true;

        const counter = document.getElementById("step-current") as HTMLElement;
        counter.textContent = String(step + 1);

        const fill = document.getElementById("progress-fill") as HTMLElement;
        fill.style.width = `${((step + 1) / total) * 100}%`;

        const progress = shell.querySelector(".protocol-progress") as HTMLElement;
        progress.setAttribute("aria-valuenow", String(step + 1));

        prev.disabled = step === 0;
        next.textContent = step === total - 1 ? "Home →" : "Next →";

        current = step;
    }

    function goForward(): void {
        const shell = document.querySelector(".protocol-shell") as HTMLElement;
        const total = Number(shell.dataset["total"] ?? "0");
        if (current === total - 1) {
            location.href = "/";
        } else {
            show(current + 1);
        }
    }

    prev?.addEventListener("click", () => show(current - 1));
    next?.addEventListener("click", goForward);

    document.addEventListener("keydown", (e) => {
        // we go to the main page with a click, not with an arrow
        if (e.key === "ArrowRight") show(current + 1);
        else if (e.key === "ArrowLeft") show(current - 1);
    });

    const phrases = [
        "Take a breath — you earned it.",
        "Every step forward, no matter how small, is still a step forward.",
        "Keep showing up. It's working.",
        "Done. Move on.",
        "Today's effort, tomorrow's identity.",
        "You did the thing. That counts.",
        "Boring is the strategy.",
        "One thing done. The rest is bonus.",
    ];

    const finalPhrase = document.getElementById("final-phrase") as HTMLElement;
    finalPhrase.textContent = phrases[Math.floor(Math.random() * phrases.length)] ?? "";
}

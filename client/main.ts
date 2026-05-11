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
        next.disabled = step === total - 1;

        current = step;
    }

    prev?.addEventListener("click", () => show(current - 1));
    next?.addEventListener("click", () => show(current + 1));

    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") show(current + 1);
        else if (e.key === "ArrowLeft") show(current - 1);
    });
}

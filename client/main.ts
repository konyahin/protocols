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

let currentStep = 0;
document.querySelectorAll<HTMLElement>(".step").forEach((el) => {
    if (el.id !== "step-" + currentStep) {
        el.hidden = true;
    }

    el.querySelector(".next")?.addEventListener("click", createSliderListener(1));
    el.querySelector(".prev")?.addEventListener("click", createSliderListener(-1));
});

function createSliderListener(step: number) {
    return function (e: Event) {
        e.preventDefault();

        const newStep = currentStep + step;
        if (newStep < 0) {
            return
        }

        const newArticle = document.getElementById("step-" + newStep);
        if (newArticle) {
            newArticle.hidden = false
        } else {
            return
        }

        const currentArticle = document.getElementById("step-" + currentStep);
        if (currentArticle) {
            currentArticle.hidden = true
        }

        currentStep = newStep;
    }
}
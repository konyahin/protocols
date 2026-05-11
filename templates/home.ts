import { renderBase } from "./base.ts";
import type { HomePage } from "./types.ts";

export function renderHome(data: HomePage): string {
    const items = data.protocols
        .map((p) => `            <li><a href="${p.url}">${p.title}</a></li>`)
        .join("\n");

    return renderBase({
        title: "Protocols",
        body: `    <header>
        <hgroup>
            <h1>Protocols</h1>
            <p>A personal collection</p>
        </hgroup>
    </header>
    <main>
        <ul>
${items}
        </ul>
    </main>
    <footer>
        <a id="reset-cache" href="/">Reset cache</a>
    </footer>
    <script>
        document.getElementById("reset-cache").addEventListener("click", async (e) => {
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
    </script>`,
    });
}

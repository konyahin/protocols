/// <reference lib="WebWorker" />
declare const self: ServiceWorkerGlobalScope;
export {};

const CACHE = "protocols-v0.2";
const PRECACHE = [
    "/",
    "/index.html",
    "/main.js",
    "/manifest.json",
    "/pico.min.css",
    "/app.css",
    "/icons/icon-192.svg",
    "/icons/icon-512.svg",
    "/icons/icon-maskable.svg",
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE).then((cache) => cache.addAll(PRECACHE)),
    );
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)),
            ),
        ),
    );
    self.clients.claim();
});

self.addEventListener("fetch", (event) => {
    if (event.request.method !== "GET") return;
    event.respondWith(
        caches.match(event.request).then((cached) => {
            if (cached) return cached;
            return fetch(event.request)
                .then((response) => {
                    if (response.ok && response.type === "basic") {
                        const copy = response.clone();
                        caches.open(CACHE).then((cache) =>
                            cache.put(event.request, copy),
                        );
                    }
                    return response;
                }).catch(() => caches.match("/").then((r) => r ?? Response.error()))
        }),
    );
});

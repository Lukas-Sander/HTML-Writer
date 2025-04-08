const CACHE_NAME = "pwa-cache-v1";
const ASSETS = [
    "/",
    "/index.html",
    "/style/main.css",
    "/script/main.js",
    "/manifest.json",
    "/offline.html"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

// self.addEventListener("fetch", (event) => {
//     event.respondWith(
//         fetch(event.request).catch(() => caches.match("/offline.html"))
//     );
// });

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(keys.map((key) => {
                if (key !== CACHE_NAME) return caches.delete(key);
            }))
        )
    );
});

const version = "0.0.1";
const cacheName = `goeasy-${version}`;
self.addEventListener("install", e => {
    e.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache
                .addAll([
                    `/favicon.ico`,
                    `/goeasy`,
                    `index.html`,
                    `sw.js`,
                    `styles/main.css`,
                    `scripts/goeasy.js`,
                    `scripts/jquery-3.4.1.min.js`
                ])
                .then(() => self.skipWaiting());
        })
    );
});

self.addEventListener("activate", event => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches
            .open(cacheName)
            .then(cache => cache.match(event.request, {ignoreSearch: true}))
            .then(response => {
                return response || fetch(event.request);
            })
    );
});

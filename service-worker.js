const CACHE_NAME = "syabil-daily-adventure-v2";

// ✅ ini penting untuk GitHub Pages
const BASE = "/my-happy-home/";

const ASSETS = [
  BASE,
  BASE + "index.html",
  BASE + "style.css",
  BASE + "script.js",
  BASE + "manifest.json",

  BASE + "assets/icons/icon-192.png",
  BASE + "assets/icons/icon-512.png",

  BASE + "assets/background/intro.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => (k !== CACHE_NAME ? caches.delete(k) : null)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((cached) => cached || fetch(e.request))
  );
});

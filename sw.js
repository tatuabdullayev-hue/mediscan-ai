// DoriYordam service worker: keeps the app shell available offline.
// Only same-origin files are cached; AI, Wikipedia and FDA requests always go to the network.
const CACHE = "doriyordam-v9";
const SHELL = [
  "./", "./index.html", "./style.css?v=9", "./drugs.js?v=9", "./db1.js?v=9", "./db2.js?v=9", "./db3.js?v=9", "./app.js?v=9",
  "./icon.svg", "./icons/icon-192.png", "./icons/icon-512.png", "./manifest.webmanifest",
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

// Network first (fresh content when online), cache as a fallback when offline.
self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.origin !== location.origin) return;
  e.respondWith(
    fetch(e.request)
      .then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return res; })
      .catch(() => caches.match(e.request).then(r => r || caches.match("./index.html")))
  );
});

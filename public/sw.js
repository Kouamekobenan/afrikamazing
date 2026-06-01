const CACHE_NAME = "afrikamazing-cache-v2";
const ASSETS_TO_CACHE = [
  "/logo/logo.png",
  "/logo/logo-or2.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  // Skip non-GET requests
  if (event.request.method !== "GET") return;

  // Let browser handle chrome extensions or external schemas
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // If the cached response was redirected, recreate it to strip the redirected flag
        // and prevent modern browser security errors (FetchEvent network error)
        if (cachedResponse.redirected) {
          return new Response(cachedResponse.body, {
            status: cachedResponse.status,
            statusText: cachedResponse.statusText,
            headers: cachedResponse.headers
          });
        }
        return cachedResponse;
      }

      return fetch(event.request).then((response) => {
        // Do not cache redirects, let the browser handle them naturally
        if (response.status >= 300 && response.status < 400) {
          return response;
        }

        // Cache new static/images assets
        if (response && response.status === 200 && (
          event.request.url.includes("/images/") || 
          event.request.url.includes("/logo/") || 
          event.request.url.includes("/fonts/")
        )) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      }).catch(() => {
        // Offline fallback
        if (event.request.mode === "navigate") {
          return caches.match("/logo/logo.png");
        }
      });
    })
  );
});

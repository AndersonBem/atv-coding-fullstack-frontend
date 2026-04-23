const CACHE_NAME = 'clientes-cache-v1';
const APP_FILES = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  './icons/29.png',
  './icons/40.png',
  './icons/57.png',
  './icons/58.png',
  './icons/60.png',
  './icons/80.png',
  './icons/87.png',
  './icons/114.png',
  './icons/120.png',
  './icons/180.png',
  './icons/192.png',
  './icons/512.png',
  './icons/1024.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_FILES))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});
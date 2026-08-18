const CACHE_VERSION='comprando-grocerias-v23';
const APP_SHELL=[
  './',
  './index.html',
  './selected-design.css?v=unified-list-13',
  './manifest.webmanifest',
  './assets/branding/comprando-grocerias-icon.svg',
  './assets/branding/comprando-grocerias-192.png',
  './assets/branding/comprando-grocerias-512.png',
  './vendor/tesseract/tesseract.min.js',
  'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.css',
  'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.js'
];

self.addEventListener('install',event=>{
  event.waitUntil((async()=>{
    const cache=await caches.open(CACHE_VERSION);
    await Promise.allSettled(APP_SHELL.map(resource=>cache.add(resource)));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    const names=await caches.keys();
    await Promise.all(names
      .filter(name=>name.startsWith('comprando-grocerias-')&&name!==CACHE_VERSION)
      .map(name=>caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch',event=>{
  const request=event.request;
  if(request.method!=='GET')return;

  const url=new URL(request.url);
  if(request.mode==='navigate'){
    event.respondWith((async()=>{
      try{
        const response=await fetch(request);
        if(response.ok)(await caches.open(CACHE_VERSION)).put('./index.html',response.clone());
        return response;
      }catch{
        return (await caches.match('./index.html')) || Response.error();
      }
    })());
    return;
  }

  const cacheable=url.origin===self.location.origin || url.hostname==='cdn.jsdelivr.net';
  if(!cacheable)return;

  event.respondWith((async()=>{
    const cached=await caches.match(request);
    if(cached)return cached;
    const response=await fetch(request);
    if(response.ok || response.type==='opaque'){
      (await caches.open(CACHE_VERSION)).put(request,response.clone());
    }
    return response;
  })());
});

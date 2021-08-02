const cacheName = 'v1'; // version 1

// variable of assets:
const cacheAssets = [
    'index.html',
    '/fonts/nunito-v16-latin/nunito-v16-latin-regular.woff',
    '/fonts/nunito-v16-latin/nunito-v16-latin-700.woff',
    'w3.css',
    'style.css',
    'app.js',
    '/images/mailContact.png',
    'android-chrome-192x192.png',
    'android-chrome-512x512.png',
    'apple-touch-icon.png',
    'favicon-16x16.png',
    'favicon-32x32.png',
    'favicon.ico',
    'manifest.json',
    'maskable_icon.png',
    '/audio/harbor1.ogg',
    '/audio/harbor2.ogg',
    '/audio/harbor3.ogg',
    '/audio/rain1.ogg',
    '/audio/rain2.ogg',
    '/audio/rain3.ogg',
    '/audio/rain4.ogg',
    '/audio/rain5.ogg',
    '/audio/silence.ogg',
    '/audio/seagulls1.ogg',
    '/audio/seagulls2.ogg',
    '/audio/seagulls3.ogg',
    '/audio/seagulls4.ogg',
    '/audio/waves1.ogg',
    '/audio/waves2.ogg',
    '/audio/waves3.ogg',
    '/audio/waves4.ogg',
    '/audio/waves5.ogg',
    '/audio/waves6.ogg',
    '/audio/wind1.ogg',
    '/audio/wind2.ogg',
    '/audio/wind3.ogg',
    '/audio/wind4.ogg',
    '/audio/wind5.ogg',
    '/audio/wind6.ogg',
    'README.md'
];


// call the install event
// attach an event listener to the worker:
self.addEventListener('install', (event) => {
    console.log('ServiceWorker installed.');

    // cache the assets
    event.waitUntil(
        // use caches API
        caches
            .open(cacheName)
            .then(cache => {
                console.log('ServiceWorker: Caching Files..');
                cache.addAll(cacheAssets);
            })
            .then(() => {
                self.skipWaiting()
            })
    )
});

// let's call the activate event: here we want to clean our old cache!
self.addEventListener('activate', (event) => {
    console.log('ServiceWorker activated.');
    // remove unwanted caches
    event.waitUntil(
        // loop thru the caches with condition if the current files are not like the files in te cache : delete
        // gives a promise:
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName){
                        console.log('ServieWorker: Clearing Old Cache');
                        return caches.delete(cache);
                    }
                })
            )
        })
    );
});

// show cached files when we are offline
// call fetch event
self.addEventListener('fetch', event => {
    console.log('Service Worker: Fetching.');
    // if the live site is available then load it, otherwise use the cache
    event.respondWith(// if it fails -> catch
        fetch(event.request).catch(() => caches.match(event.request)
        )
    )
});
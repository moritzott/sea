const cacheName = 'v1'; // version 1

// variable of assets:
const cacheAssets = [
    'index.html',
    './fonts/nunito-v16-latin/nunito-v16-latin-regular.woff',
    './fonts/nunito-v16-latin/nunito-v16-latin-700.woff',
    'w3.css',
    'style.css',
    'app.js',
    'serviceworker.js',
    './images/mailContact.png',
    'android-chrome-192x192.png',
    'android-chrome-512x512.png',
    'apple-touch-icon.png',
    'favicon-16x16.png',
    'favicon-32x32.png',
    'favicon.ico',
    'manifest.json',
    'maskable_icon.png',
    './audio/harbor1.mp3',
    './audio/harbor2.mp3',
    './audio/harbor3.mp3',
    './audio/rain1.mp3',
    './audio/rain2.mp3',
    './audio/rain3.mp3',
    './audio/rain4.mp3',
    './audio/rain5.mp3',
    './audio/silence.mp3',
    './audio/seagulls1.mp3',
    './audio/seagulls2.mp3',
    './audio/seagulls3.mp3',
    './audio/seagulls4.mp3',
    './audio/waves1.mp3',
    './audio/waves2.mp3',
    './audio/waves3.mp3',
    './audio/waves4.mp3',
    './audio/waves5.mp3',
    './audio/waves6.mp3',
    './audio/wind1.mp3',
    './audio/wind2.mp3',
    './audio/wind3.mp3',
    './audio/wind4.mp3',
    './audio/wind5.mp3',
    './audio/wind6.mp3',
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

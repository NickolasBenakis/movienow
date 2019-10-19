'use strict';
const staticCacheName = 'cacheV1';
const filesToCache = [
    './vendor/material.indigo-pink.min.css',
    './vendor/material.min.js',
    './theme/index.css',
    './theme/index.css.br',
    'theme/assets/Roboto-Medium.woff2',
    './theme/assets/video-play-64.png',
    './theme/assets/video-play-128.png',
    './theme/assets/video-play-256.png',
    './theme/assets/video-play-512.png',
    './bundle.js',
    './bundle.js.br',
    './bundle.js.LICENSE',
    'offline.html',
];

self.addEventListener('install', function(event) {
    console.log('Attempting to install service worker and cache static assets');
    event.waitUntil(
        self.skipWaiting(),
        caches.open(staticCacheName).then(function(cache) {
            return cache.addAll(filesToCache);
        })
    );
});

// self.addEventListener('activate',event => {
//     event.waitUntil(
//         caches.keys().then(keys => {
//             console.log(keys);
//             return Promise.all(keys
//                 .filter(key => key !== staticCacheName))
//                 .map(key => caches.delete(key))
//         })
//     )
// })

self.addEventListener('fetch', event => {
    event.respondWith(
        caches
            .match(event.request)
            .then(response => {
                if (response) {
                    console.log('Found ', event.request.url, ' in cache');
                    return response;
                }
                console.log('Network request for ', event.request.url);
                return fetch(event.request).then(response => {
                    if (response.status === 404) {
                        return caches.match('index.html');
                    }
                    return caches.open(staticCacheName).then(cache => {
                        cache.put(event.request.url, response.clone());
                        return response;
                    });
                });
            })
            .catch(error => {
                console.log('TRAVAW OFFLINE PAGE', error);
                return caches.open('cacheV1').then(cache => {
                    return cache.match('offline.html');
                });
            })
    );
});

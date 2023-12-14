self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('v1').then((cache) => {
            return cache.addAll([
                'index.html', 'js/index.js', 
                'css/style.css', 'offline.html', 
                'assets/particlesjs-config.json', 
                'js/particles.min.js',
                'https://p.scdn.co/mp3-preview/a3b5cf9da8473c959c6833e75404379db9226ba7?cid=774b29d4f13844c495f206cafdad9c86',
                'assets/play.svg',
                'assets/4523293.jpg',
                'https://fonts.googleapis.com/css2?family=Poiret+One&Satisfy&display=swap'
            ]);
        })
    )
    self.skipWaiting();
    console.log('SW installed at: ', new Date().toLocaleTimeString());
});

self.addEventListener('activate', event => {
    self.skipWaiting();
    console.log('SW activated at: ', new Date().toLocaleTimeString());
});

self.addEventListener('fetch', async event => {
    console.log(event.request.url);
    if (!navigator.onLine) {
        event.respondWith(
            caches.match(event.request)
            .then((response) => {
                console.log('RESPONSE: ', response);
                if (response) {
                    return response;
                } else {
                    return caches.match(new Request('offline.html'));
                }
            })
        )
    } else {
        console.log('Online!');
        return updateCache(event.request);
    }
});

async function updateCache(request) {
    const response = await fetch(request);
    const cache = await caches.open('v1');
    const data = await cache.put(request, response.clone());
    return response;
}
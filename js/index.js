
function loadSnow() {
    particlesJS.load('particles-js', '../assets/particlesjs-config.json', function() {
        console.log('callback - particles.js config loaded');
    });
}

function start() {
    const introElem = document.querySelector('.intro-screen');
    const mainElem = document.querySelector('main');

    introElem.classList.toggle('hide');
    mainElem.classList.toggle('hide');
    mainElem.classList.toggle('fade-in');
}

function fadeOutVolume(audio) {
    if (audio.volume > 0.2) {
        audio.volume += -0.2;
    }
    console.log(audio.volume);
}

function addEventListeners() {
    const audio = document.querySelector('#player');
    const playButton = document.querySelector('#play');
    const mainElem = document.querySelector('main');

    playButton.addEventListener('click', () => {
        audio.src = 'https://p.scdn.co/mp3-preview/a3b5cf9da8473c959c6833e75404379db9226ba7?cid=774b29d4f13844c495f206cafdad9c86';
        audio.currentTime = 10;
        audio.volume = 1;
        audio.play();

        mainElem.classList.remove('fade-out');

        start();
        loadSnow();
    });

    audio.addEventListener('timeupdate', () => {
        if (parseFloat(audio.currentTime) > 28.5) {
            fadeOutVolume(audio);
        }
    });

    audio.addEventListener('ended', () => {
        mainElem.classList.toggle('fade-out');
        setTimeout(() => start(), 2000);
    });
}

window.addEventListener('offline', () => window.location.href = '/offline.html');
window.addEventListener('online', () => window.location.href = '/   ');

function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js')
        .then(() => console.log('Registered service worker'))
        .catch((error) => console.log('Error register service worker ', error));
    }
}

function checkIfOffline() {
    if (window.navigator.onLine && window.location.href.includes('/offline.html')) {
        window.location.href = '/';
    } else if (!window.navigator.onLine && window.location.href.includes('/offline.html')) {
        setTimeout(() => addEventListeners(), 500);
    }
}

registerServiceWorker();
checkIfOffline();

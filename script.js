/* ============================================
   SCRIPT.JS — For Paramee ♥
   ============================================ */

// ——— YouTube Players ———
const VIDEO_ID = 'rIocYOk6pOY';
let player, songPlayer;
let isMuted = false, playerReady = false, wantSound = false, songPlaying = false;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtubePlayer', {
        videoId: VIDEO_ID,
        playerVars: { autoplay: 1, mute: 1, controls: 0, modestbranding: 1, loop: 1, playlist: VIDEO_ID, rel: 0, iv_load_policy: 3, disablekb: 1, fs: 0, playsinline: 1, origin: window.location.origin },
        events: { onReady: onPlayerReady, onStateChange: onPlayerStateChange, onError: onPlayerError }
    });
    songPlayer = new YT.Player('ourSongPlayer', {
        videoId: VIDEO_ID,
        playerVars: { autoplay: 0, controls: 1, modestbranding: 1, rel: 0, playsinline: 1, origin: window.location.origin },
        events: { onStateChange: onSongStateChange }
    });
}

function onPlayerReady(event) {
    playerReady = true;
    event.target.playVideo();
    if (wantSound) applySound();
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) player.playVideo();
    setPlayingUI(event.data === YT.PlayerState.PLAYING && !isMuted);
}

function onPlayerError() {
    document.getElementById('nowPlaying').classList.add('blocked');
}

function onSongStateChange(event) {
    songPlaying = event.data === YT.PlayerState.PLAYING;
    if (!player || !playerReady) return;
    if (songPlaying) player.pauseVideo();
    else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) player.playVideo();
}

function applySound() {
    player.playVideo();
    player.unMute();
    player.setVolume(80);
    isMuted = false;
    updateVolumeIcon();
}

function unmutePlayer() {
    wantSound = true;
    if (playerReady) applySound();
}

function setPlayingUI(on) {
    document.getElementById('nowPlaying').classList.toggle('playing', on);
}

// ——— Volume Button ———
const volBtn = document.getElementById('volBtn');
const volIconOn = volBtn.querySelector('.vol-icon-on');
const volIconOff = volBtn.querySelector('.vol-icon-off');

function updateVolumeIcon() {
    if (isMuted) {
        volIconOn.style.display = 'none';
        volIconOff.style.display = 'block';
    } else {
        volIconOn.style.display = 'block';
        volIconOff.style.display = 'none';
    }
}

volBtn.addEventListener('click', () => {
    if (player) {
        if (isMuted) {
            if (songPlaying && songPlayer) songPlayer.pauseVideo();
            applySound();
        } else {
            player.mute();
            isMuted = true;
            updateVolumeIcon();
        }
        setPlayingUI(!isMuted);
    }
});

// ——— Intro Screen ———
const introScreen = document.getElementById('introScreen');
const enterBtn = document.getElementById('enterBtn');
const mainWrapper = document.getElementById('mainWrapper');
const volumeControl = document.getElementById('volumeControl');

enterBtn.addEventListener('click', () => {
    // Unmute music with volume UP
    unmutePlayer();

    introScreen.classList.add('fade-out');

    setTimeout(() => {
        introScreen.style.display = 'none';
        mainWrapper.classList.add('visible');
        volumeControl.classList.add('visible');
        document.getElementById('nowPlaying').classList.add('visible');
        document.body.style.overflow = '';
        initObservers();
    }, 900);
});

// Lock scrolling on intro
document.body.style.overflow = 'hidden';

// ——— Intro Particles ———
(function createIntroParticles() {
    const container = document.getElementById('introParticles');
    const count = 35;
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'intro-particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.top = 60 + Math.random() * 40 + '%';
        p.style.animationDelay = Math.random() * 6 + 's';
        p.style.animationDuration = 4 + Math.random() * 4 + 's';
        p.style.width = p.style.height = 2 + Math.random() * 4 + 'px';
        container.appendChild(p);
    }
})();

// ——— Intro Falling Roses ———
(function createIntroRoses() {
    const container = document.getElementById('introRoses');
    const petals = ['🌸', '🌹', '💗', '✿', '❀'];
    const count = 15;
    for (let i = 0; i < count; i++) {
        const r = document.createElement('div');
        r.className = 'intro-rose';
        r.textContent = petals[Math.floor(Math.random() * petals.length)];
        r.style.left = Math.random() * 100 + '%';
        r.style.animationDelay = Math.random() * 8 + 's';
        r.style.animationDuration = 6 + Math.random() * 6 + 's';
        r.style.fontSize = 14 + Math.random() * 14 + 'px';
        container.appendChild(r);
    }
})();

// ——— Main Particles ———
(function createMainParticles() {
    const container = document.getElementById('particles');
    const count = 25;
    const colors = [
        'rgba(255,107,157,0.4)',
        'rgba(184,169,212,0.3)',
        'rgba(240,194,127,0.3)',
        'rgba(238,90,111,0.3)'
    ];

    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.width = p.style.height = 2 + Math.random() * 5 + 'px';
        p.style.background = colors[Math.floor(Math.random() * colors.length)];
        p.style.animationDuration = 10 + Math.random() * 15 + 's';
        p.style.animationDelay = Math.random() * 10 + 's';
        container.appendChild(p);
    }
})();

// ——— Falling Petals (main page) ———
(function createPetals() {
    const container = document.getElementById('petals');
    const petalEmojis = ['🌸', '🌹', '💕', '✿', '❀', '🌷', '💗'];
    const count = 18;

    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'petal';
        p.textContent = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];
        p.style.left = Math.random() * 100 + '%';
        p.style.animationDuration = 12 + Math.random() * 10 + 's';
        p.style.animationDelay = Math.random() * 15 + 's';
        p.style.fontSize = 10 + Math.random() * 14 + 'px';
        container.appendChild(p);
    }
})();

// ——— Quote Mini Hearts ———
(function createQuoteHearts() {
    const container = document.getElementById('quoteHearts');
    if (!container) return;
    const count = 10;
    for (let i = 0; i < count; i++) {
        const h = document.createElement('div');
        h.className = 'quote-mini-heart';
        h.textContent = '♥';
        h.style.left = 10 + Math.random() * 80 + '%';
        h.style.bottom = Math.random() * 30 + '%';
        h.style.color = `hsl(${340 + Math.random() * 30}, 80%, ${55 + Math.random() * 20}%)`;
        h.style.animationDelay = Math.random() * 5 + 's';
        h.style.animationDuration = 4 + Math.random() * 4 + 's';
        container.appendChild(h);
    }
})();

// ——— Footer Hearts ———
(function createFooterHearts() {
    const container = document.getElementById('footerHearts');
    const count = 15;
    for (let i = 0; i < count; i++) {
        const h = document.createElement('div');
        h.className = 'footer-heart';
        h.textContent = '♥';
        h.style.left = Math.random() * 100 + '%';
        h.style.color = `hsl(${340 + Math.random() * 30}, 80%, ${55 + Math.random() * 20}%)`;
        h.style.animationDelay = Math.random() * 6 + 's';
        h.style.animationDuration = 5 + Math.random() * 5 + 's';
        h.style.fontSize = 10 + Math.random() * 14 + 'px';
        container.appendChild(h);
    }
})();

// ——— Scroll Progress Bar ———
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    document.getElementById('scrollProgress').style.width = progress + '%';
});

// ——— Header Show on Scroll ———
const header = document.getElementById('siteHeader');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 200) {
        header.classList.add('visible');
    } else {
        header.classList.remove('visible');
    }
});

// ——— Intersection Observer (Reveal Cards) ———
function initObservers() {
    const elements = document.querySelectorAll('.message-card, .final-quote, .name-reveal, .signature-section, .send-love');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animation slightly
                setTimeout(() => {
                    entry.target.classList.add('in-view');
                }, index * 80);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => observer.observe(el));
}

// ——— Card Glow Follow Cursor (Desktop) ———
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.message-card');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const glow = card.querySelector('.card-glow');
        if (glow) {
            glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,107,157,0.08), transparent 60%)`;
        }
    });
});

// ——— Parallax on Hero ———
window.addEventListener('scroll', () => {
    const hero = document.getElementById('heroSection');
    if (!hero) return;
    const scrollY = window.scrollY;
    const heroHeight = hero.offsetHeight;
    if (scrollY < heroHeight) {
        hero.style.transform = `translateY(${scrollY * 0.3}px)`;
        hero.style.opacity = 1 - (scrollY / heroHeight) * 0.6;
    }
});

// ——— Tap anywhere → little hearts ———
function burstHearts(x, y, count) {
    const layer = document.getElementById('burstLayer');
    const icons = ['♥', '💗', '💕', '🌸'];
    for (let i = 0; i < count; i++) {
        const h = document.createElement('span');
        h.className = 'burst-heart';
        h.textContent = icons[Math.floor(Math.random() * icons.length)];
        const angle = Math.random() * Math.PI * 2, dist = 40 + Math.random() * 70;
        h.style.left = x + 'px';
        h.style.top = y + 'px';
        h.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
        h.style.setProperty('--dy', Math.sin(angle) * dist - 40 + 'px');
        h.style.fontSize = 12 + Math.random() * 14 + 'px';
        layer.appendChild(h);
        setTimeout(() => h.remove(), 1400);
    }
}

document.addEventListener('click', (e) => {
    if (e.target.closest('button, a, iframe, .song-frame')) return;
    if (!mainWrapper.classList.contains('visible')) return;
    burstHearts(e.clientX, e.clientY, 7);
});

// ——— Send all my love → heart rain ———
function heartRain() {
    const layer = document.getElementById('burstLayer');
    const icons = ['💗', '💖', '💕', '♥', '🌹', '🌸', '🤍'];
    for (let i = 0; i < 70; i++) {
        const h = document.createElement('span');
        h.className = 'rain-heart';
        h.textContent = icons[Math.floor(Math.random() * icons.length)];
        h.style.left = Math.random() * 100 + 'vw';
        h.style.fontSize = 14 + Math.random() * 22 + 'px';
        h.style.animationDuration = 2.5 + Math.random() * 2.5 + 's';
        h.style.animationDelay = Math.random() * 1.5 + 's';
        layer.appendChild(h);
        setTimeout(() => h.remove(), 6500);
    }
}

document.getElementById('sendLoveBtn').addEventListener('click', (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    burstHearts(r.left + r.width / 2, r.top + r.height / 2, 18);
    heartRain();
    document.getElementById('sendLoveMsg').classList.add('show');
    if (navigator.vibrate) navigator.vibrate([60, 80, 60]);
});

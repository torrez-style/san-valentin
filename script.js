/* ================================================
   SAN VALENTÍN — SCRIPT PROFESIONAL
   GSAP + tsParticles + Howler.js + Interacciones
   ================================================ */

// Esperar a que todo cargue
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // === REFERENCIAS ===
    const envelope = document.getElementById('envelope');
    const envelopeFlap = document.getElementById('envelopeFlap');
    const waxSeal = document.getElementById('waxSeal');
    const letter = document.getElementById('letter');
    const instruction = document.getElementById('instruction');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const musicBtn = document.getElementById('musicBtn');
    const reasons = document.querySelectorAll('.reason');

    let isOpen = false;
    let isMusicPlaying = false;

    // === HOWLER.JS — AUDIO MEJORADO ===
    const bgMusic = new Howl({
        src: ['https://cdn.pixabay.com/audio/2022/03/10/audio_4a468f92c2.mp3'],
        loop: true,
        volume: 0,
        preload: true
    });

    // === SONIDOS AMBIENTALES (Web Audio API) ===
    let audioCtx = null;
    function getAudioCtx() {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        return audioCtx;
    }

    // Sonido sutil de hover (tono suave ascendente)
    function playHoverSound() {
        try {
            const ac = getAudioCtx();
            const osc = ac.createOscillator();
            const g = ac.createGain();
            osc.type = 'sine';
            osc.connect(g);
            g.connect(ac.destination);
            osc.frequency.setValueAtTime(800, ac.currentTime);
            osc.frequency.exponentialRampToValueAtTime(1200, ac.currentTime + 0.08);
            g.gain.setValueAtTime(0.04, ac.currentTime);
            g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.1);
            osc.start(ac.currentTime);
            osc.stop(ac.currentTime + 0.1);
        } catch (e) {}
    }

    // Sonido de clic (pop suave)
    function playClickSound() {
        try {
            const ac = getAudioCtx();
            const osc = ac.createOscillator();
            const g = ac.createGain();
            osc.type = 'sine';
            osc.connect(g);
            g.connect(ac.destination);
            osc.frequency.setValueAtTime(500, ac.currentTime);
            osc.frequency.exponentialRampToValueAtTime(300, ac.currentTime + 0.1);
            g.gain.setValueAtTime(0.07, ac.currentTime);
            g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.12);
            osc.start(ac.currentTime);
            osc.stop(ac.currentTime + 0.12);
        } catch (e) {}
    }

    // Sonido de scroll (ticking suave)
    function playScrollTick() {
        try {
            const ac = getAudioCtx();
            const osc = ac.createOscillator();
            const g = ac.createGain();
            osc.type = 'triangle';
            osc.connect(g);
            g.connect(ac.destination);
            osc.frequency.setValueAtTime(1400 + Math.random() * 200, ac.currentTime);
            g.gain.setValueAtTime(0.015, ac.currentTime);
            g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.04);
            osc.start(ac.currentTime);
            osc.stop(ac.currentTime + 0.04);
        } catch (e) {}
    }

    // Sonido de apertura modal (acorde suave)
    function playModalSound() {
        try {
            const ac = getAudioCtx();
            [523, 659, 784].forEach((freq, i) => {
                const osc = ac.createOscillator();
                const g = ac.createGain();
                osc.type = 'sine';
                osc.connect(g);
                g.connect(ac.destination);
                osc.frequency.setValueAtTime(freq, ac.currentTime + i * 0.06);
                g.gain.setValueAtTime(0.035, ac.currentTime + i * 0.06);
                g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + i * 0.06 + 0.3);
                osc.start(ac.currentTime + i * 0.06);
                osc.stop(ac.currentTime + i * 0.06 + 0.3);
            });
        } catch (e) {}
    }

    // Sonido de cierre (tono descendente suave)
    function playCloseSound() {
        try {
            const ac = getAudioCtx();
            const osc = ac.createOscillator();
            const g = ac.createGain();
            osc.type = 'sine';
            osc.connect(g);
            g.connect(ac.destination);
            osc.frequency.setValueAtTime(600, ac.currentTime);
            osc.frequency.exponentialRampToValueAtTime(250, ac.currentTime + 0.15);
            g.gain.setValueAtTime(0.05, ac.currentTime);
            g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.18);
            osc.start(ac.currentTime);
            osc.stop(ac.currentTime + 0.18);
        } catch (e) {}
    }

    // Sonido sintetizado de sello de cera rompiéndose
    function playSealSound() {
        try {
            const ac = new (window.AudioContext || window.webkitAudioContext)();
            // Pop tonal suave
            const osc = ac.createOscillator();
            const g = ac.createGain();
            osc.connect(g);
            g.connect(ac.destination);
            osc.frequency.setValueAtTime(600, ac.currentTime);
            osc.frequency.exponentialRampToValueAtTime(150, ac.currentTime + 0.12);
            g.gain.setValueAtTime(0.18, ac.currentTime);
            g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.15);
            osc.start(ac.currentTime);
            osc.stop(ac.currentTime + 0.15);
            // Crujido de cera
            const buf = ac.createBuffer(1, ac.sampleRate * 0.1, ac.sampleRate);
            const d = buf.getChannelData(0);
            for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 4) * 0.12;
            const n = ac.createBufferSource();
            n.buffer = buf;
            const ng = ac.createGain();
            n.connect(ng);
            ng.connect(ac.destination);
            ng.gain.setValueAtTime(0.15, ac.currentTime);
            ng.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.1);
            n.start(ac.currentTime + 0.02);
        } catch (e) { /* Audio no soportado */ }
    }

    // === tsParticles — PÉTALOS DE LIRIO ===
    const petalColors = [
        { r: 226, g: 213, b: 240 }, // lavanda pastel
        { r: 212, g: 196, b: 232 }, // lila suave
        { r: 237, g: 227, b: 247 }, // lavanda claro
        { r: 195, g: 210, b: 240 }, // azul lila suave
        { r: 210, g: 200, b: 235 }, // periwinkle pastel
        { r: 185, g: 205, b: 238 }, // azul lavanda
        { r: 220, g: 215, b: 242 }, // lila pálido
    ];

    function createPetalSVG(r, g, b) {
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-10 -12 20 24">
            <path d="M0,-10 C6,-6 8,3 0,10 C-8,3 -6,-6 0,-10 Z" fill="rgba(${r},${g},${b},0.6)"/>
            <path d="M0,-8 Q0.5,0 0,8" stroke="rgba(${Math.max(0,r-20)},${Math.max(0,g-20)},${Math.max(0,b-20)},0.25)" stroke-width="0.5" fill="none"/>
        </svg>`;
        return `data:image/svg+xml,${encodeURIComponent(svg)}`;
    }

    const petalImages = petalColors.map(c => ({
        src: createPetalSVG(c.r, c.g, c.b),
        width: 20,
        height: 24
    }));

    // Cargar tsParticles con pétalos de lirio
    tsParticles.load("tsparticles", {
        fullScreen: false,
        fpsLimit: 60,
        particles: {
            number: {
                value: 28,
                density: { enable: true, area: 900 }
            },
            shape: {
                type: "image",
                options: {
                    image: petalImages
                }
            },
            opacity: {
                value: { min: 0.15, max: 0.45 }
            },
            size: {
                value: { min: 6, max: 14 }
            },
            move: {
                enable: true,
                speed: { min: 0.4, max: 1.0 },
                direction: "bottom",
                straight: false,
                outModes: { default: "out" }
            },
            rotate: {
                value: { min: 0, max: 360 },
                direction: "random",
                animation: {
                    enable: true,
                    speed: { min: 3, max: 10 }
                }
            },
            wobble: {
                enable: true,
                distance: { min: 5, max: 18 },
                speed: { min: 4, max: 12 }
            },
            tilt: {
                enable: true,
                value: { min: 0, max: 360 },
                direction: "random",
                animation: {
                    enable: true,
                    speed: 8
                }
            },
            roll: {
                enable: true,
                darken: { enable: true, value: 15 },
                enlighten: { enable: true, value: 10 },
                speed: { min: 5, max: 15 }
            }
        },
        detectRetina: true
    });

    // Función para crear explosión de pétalos SVG (al abrir sobre)
    function createPetalBurst() {
        for (let i = 0; i < 18; i++) {
            const c = petalColors[Math.floor(Math.random() * petalColors.length)];
            const size = Math.random() * 16 + 8;
            const petal = document.createElement('div');
            petal.innerHTML = `<svg viewBox="-10 -12 20 24" width="${size}" height="${size * 1.2}"><path d="M0,-10 C6,-6 8,3 0,10 C-8,3 -6,-6 0,-10 Z" fill="rgba(${c.r},${c.g},${c.b},0.65)"/><path d="M0,-8 Q0.5,0 0,8" stroke="rgba(${c.r-20},${c.g-20},${c.b-20},0.2)" stroke-width="0.5" fill="none"/></svg>`;
            petal.style.cssText = `position:fixed;left:${window.innerWidth/2}px;top:${window.innerHeight*0.4}px;pointer-events:none;z-index:6;`;
            document.body.appendChild(petal);

            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 200 + 80;
            gsap.to(petal, {
                x: Math.cos(angle) * distance,
                y: Math.sin(angle) * distance - Math.random() * 120,
                rotation: Math.random() * 540 - 270,
                opacity: 0,
                scale: Math.random() * 0.4 + 0.2,
                duration: Math.random() * 2 + 1.5,
                ease: 'power2.out',
                onComplete: () => petal.remove()
            });
        }
    }

    // === ANIMACIÓN DE HOVER DEL SOBRE ===
    envelope.addEventListener('mouseenter', () => {
        if (!isOpen) {
            gsap.to(envelope, {
                scale: 1.04,
                y: -4,
                duration: 0.4,
                ease: 'power2.out'
            });
            gsap.to(waxSeal, {
                scale: 1.1,
                duration: 0.3,
                ease: 'power2.out'
            });
        }
    });

    envelope.addEventListener('mouseleave', () => {
        if (!isOpen) {
            gsap.to(envelope, {
                scale: 1,
                y: 0,
                duration: 0.4,
                ease: 'power2.out'
            });
            gsap.to(waxSeal, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        }
    });

    // === PULSO SUTIL DEL SOBRE ===
    if (typeof gsap !== 'undefined') {
        gsap.to(envelope, {
            scale: 1.015,
            duration: 2,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1
        });
    }

    // === ABRIR EL SOBRE ===
    const letterClose = document.getElementById('letterClose');
    const envelopeWrapper = document.getElementById('envelopeWrapper');

    envelope.addEventListener('click', (e) => {
        if (isOpen) return;
        isOpen = true;

        // Ocultar instrucción
        instruction.classList.add('hidden');

        // Detener pulso
        gsap.killTweensOf(envelope);

        // Timeline de apertura con GSAP
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // 1. Sello de cera se rompe (con sonido)
        tl.to(waxSeal, {
            scale: 0,
            rotation: 360,
            opacity: 0,
            duration: 0.5,
            ease: 'back.in(2)',
            onStart: () => playSealSound()
        });

        // 2. Tapa del sobre se abre
        tl.to(envelopeFlap, {
            rotateX: -180,
            duration: 0.8,
            ease: 'power2.inOut'
        }, '-=0.2');

        // 3. Carta sale del sobre (responsive, compatible con texto largo)
        const padV = window.innerWidth <= 600 ? 28 : 55;

        // Medir la altura natural de la carta para animar correctamente
        const clone = letter.cloneNode(true);
        clone.style.cssText = `
            visibility:hidden; position:absolute; max-height:none;
            padding-top:${padV}px; padding-bottom:${padV}px;
            width:${letter.offsetWidth}px; opacity:0; pointer-events:none;
        `;
        letter.parentNode.appendChild(clone);
        const targetH = clone.scrollHeight;
        clone.remove();

        tl.to(letter, {
            scale: 1,
            opacity: 1,
            maxHeight: targetH,
            paddingTop: padV,
            paddingBottom: padV,
            pointerEvents: 'auto',
            duration: 1.2,
            ease: 'power3.out',
            onStart: () => {
                letter.classList.add('revealed');
            },
            onComplete: () => {
                gsap.set(letter, { maxHeight: 'none' });
                letter.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, '-=0.3');

        // 4. Ocultar el sobre completamente
        tl.to(envelope, {
            opacity: 0,
            scale: 0.7,
            y: 30,
            duration: 0.6,
            ease: 'power2.inOut',
            onComplete: () => {
                envelopeWrapper.classList.add('envelope-hidden');
                gsap.set(envelope, { display: 'none' });
            }
        }, '-=0.5');

        // 5. Efecto de brillo
        tl.call(createBurstEffect, [], '-=0.6');

        // 6. Explosión de pétalos de lirio
        tl.call(createPetalBurst, [], '-=0.5');
    });

    // === CERRAR LA CARTA (volver al sobre) ===
    letterClose.addEventListener('click', (e) => {
        e.stopPropagation();
        playCloseSound();
        closeLetter();
    });

    function closeLetter() {
        const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } });

        // 1. Carta se encoge y desaparece
        tl.to(letter, {
            scale: 0.85,
            opacity: 0,
            maxHeight: 0,
            paddingTop: 0,
            paddingBottom: 0,
            duration: 0.8,
            ease: 'power2.in',
            onStart: () => {
                letter.classList.remove('revealed');
            },
            onComplete: () => {
                gsap.set(letter, { pointerEvents: 'none' });
                // Resetear typewriter y firma para re-animarlos
                resetTypewriterAndSignature();
            }
        });

        // 2. Mostrar el sobre de nuevo
        tl.call(() => {
            envelopeWrapper.classList.remove('envelope-hidden');
            gsap.set(envelope, { display: '', opacity: 0, scale: 0.7, y: 30 });
        }, [], '-=0.3');

        tl.to(envelope, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out'
        });

        // 3. Cerrar la solapa del sobre
        tl.to(envelopeFlap, {
            rotateX: 0,
            duration: 0.6,
            ease: 'power2.inOut'
        }, '-=0.3');

        // 4. Restaurar el sello de cera
        tl.to(waxSeal, {
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'back.out(2)'
        }, '-=0.2');

        // 5. Restaurar apariencia del sobre
        tl.to('.envelope-back, .envelope-front, .envelope-flap', {
            opacity: 1,
            scale: 1,
            duration: 0.4
        }, '-=0.4');

        // 6. Mostrar instrucción y restaurar estado
        tl.call(() => {
            isOpen = false;
            instruction.classList.remove('hidden');
            // Reactivar pulso del sobre
            gsap.to(envelope, {
                scale: 1.015,
                duration: 2,
                ease: 'sine.inOut',
                yoyo: true,
                repeat: -1
            });
        });
    }

    // === EFECTO DE BRILLO AL ABRIR ===
    function createBurstEffect() {
        const burst = document.createElement('div');
        burst.style.cssText = `
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: radial-gradient(circle at 50% 45%, rgba(212,196,232,0.2) 0%, transparent 60%);
            z-index: 5;
            pointer-events: none;
        `;
        document.body.appendChild(burst);

        gsap.fromTo(burst,
            { opacity: 0, scale: 0.5 },
            {
                opacity: 1,
                scale: 1.5,
                duration: 1.2,
                ease: 'power2.out',
                onComplete: () => burst.remove()
            }
        );

        // Partículas luminosas
        for (let i = 0; i < 20; i++) {
            createSparkle(
                window.innerWidth / 2 + (Math.random() - 0.5) * 300,
                window.innerHeight * 0.45 + (Math.random() - 0.5) * 200
            );
        }
    }

    function createSparkle(x, y) {
        const sparkle = document.createElement('div');
        const size = Math.random() * 4 + 2;
        sparkle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, rgba(226,213,240,0.8) 0%, rgba(212,196,232,0) 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 100;
        `;
        document.body.appendChild(sparkle);

        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 100 + 50;

        gsap.to(sparkle, {
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
            opacity: 0,
            scale: 0,
            duration: Math.random() * 1 + 0.8,
            ease: 'power2.out',
            onComplete: () => sparkle.remove()
        });
    }

    // === MODAL ===
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });

    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });

    function openModal() {
        playModalSound();
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Animar razones con GSAP
        reasons.forEach((reason, i) => {
            gsap.fromTo(reason,
                { opacity: 0, y: 20, x: -10 },
                {
                    opacity: 1,
                    y: 0,
                    x: 0,
                    duration: 0.5,
                    delay: 0.15 + i * 0.1,
                    ease: 'power3.out',
                    onStart: () => reason.classList.add('visible')
                }
            );
        });

        // Partículas al abrir modal
        for (let i = 0; i < 12; i++) {
            setTimeout(() => {
                createSparkle(
                    window.innerWidth / 2 + (Math.random() - 0.5) * 400,
                    window.innerHeight / 2 + (Math.random() - 0.5) * 300
                );
            }, i * 50);
        }
    }

    function closeModal() {
        playCloseSound();
        gsap.to('.modal', {
            scale: 0.9,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
                modalOverlay.classList.remove('active');
                document.body.style.overflow = '';
                gsap.set('.modal', { scale: 1, opacity: 1 });
                reasons.forEach(r => r.classList.remove('visible'));
            }
        });
    }

    // === SCROLL DE LA CARTA (táctil + ratón + teclado) ===
    const letterScroll = document.getElementById('letterScroll');
    const scrollHint = document.getElementById('scrollHint');

    // Ocultar indicador de scroll cuando llega al final
    let lastScrollTick = 0;
    if (letterScroll) {
        letterScroll.addEventListener('scroll', () => {
            const { scrollTop, scrollHeight, clientHeight } = letterScroll;
            if (scrollTop + clientHeight >= scrollHeight - 10) {
                scrollHint.classList.add('hidden');
            } else {
                scrollHint.classList.remove('hidden');
            }
            // Scroll tick sound (throttled)
            const now = Date.now();
            if (now - lastScrollTick > 120) {
                playScrollTick();
                lastScrollTick = now;
            }
        });
    }

    // Soporte de flechas del teclado para scroll de la carta
    document.addEventListener('keydown', (e) => {
        if (!letterScroll || !isOpen) return;
        // No interferir si el modal está abierto
        if (modalOverlay.classList.contains('active')) return;

        const scrollAmount = 60;
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            letterScroll.scrollBy({ top: scrollAmount, behavior: 'smooth' });
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            letterScroll.scrollBy({ top: -scrollAmount, behavior: 'smooth' });
        }
    });

    // === MÚSICA (Howler.js con fade) ===
    musicBtn.addEventListener('click', () => {
        if (isMusicPlaying) {
            bgMusic.fade(bgMusic.volume(), 0, 800);
            setTimeout(() => bgMusic.pause(), 850);
            musicBtn.classList.remove('playing');
        } else {
            bgMusic.play();
            bgMusic.fade(0, 0.5, 1200);
            musicBtn.classList.add('playing');
        }
        isMusicPlaying = !isMusicPlaying;
    });

    // === EFECTO MOUSE TRAIL SUTIL ===
    let lastTrailTime = 0;
    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastTrailTime < 150) return;
        if (Math.random() > 0.4) return;
        lastTrailTime = now;

        const dot = document.createElement('div');
        const size = Math.random() * 6 + 3;
        dot.style.cssText = `
            position: fixed;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, rgba(226,213,240,0.5) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 3;
        `;
        document.body.appendChild(dot);

        gsap.to(dot, {
            y: -30 - Math.random() * 20,
            x: (Math.random() - 0.5) * 20,
            opacity: 0,
            scale: 0.3,
            duration: 1.2,
            ease: 'power2.out',
            onComplete: () => dot.remove()
        });
    });

    // === CONSOLA CON ESTILO ===
    console.log(
        '%c✿ Para ti, con cariño ✿',
        'color: #c4b0db; font-size: 18px; font-weight: 400; font-family: Georgia, serif; padding: 8px;'
    );
    console.log(
        '%cSan Valentín 2026',
        'color: #d4c4e8; font-size: 13px; font-family: Georgia, serif;'
    );

    // === EFECTO TYPEWRITER ===
    const letterTextEl = document.getElementById('letterText');
    const principitoEl = document.getElementById('principitoQuotes');
    const closingEl = document.getElementById('letterClosing');
    let typewriterDone = false;

    // Obtener todos los contenedores de texto en orden
    function getAllTypewriterContainers() {
        return [letterTextEl, principitoEl, closingEl].filter(Boolean);
    }

    // Restaurar texto original al cerrar carta
    function resetTypewriterAndSignature() {
        typewriterDone = false;
        // Restaurar HTML original de los párrafos en todos los contenedores
        getAllTypewriterContainers().forEach(container => {
            const paragraphs = container.querySelectorAll('p, .quote-number');
            paragraphs.forEach(p => {
                const chars = p.querySelectorAll('.tw-char');
                if (chars.length > 0) {
                    p.textContent = [...chars].map(c => c.textContent).join('');
                }
            });
        });
        // Resetear firma
        const sigImg = document.getElementById('signatureImg');
        if (sigImg) {
            sigImg.classList.remove('animate');
            sigImg.style.opacity = '0';
            sigImg.style.transform = 'translateY(10px) scale(0.95)';
        }
    }

    function initTypewriter() {
        if (typewriterDone) return;

        // Procesar todos los contenedores en orden
        getAllTypewriterContainers().forEach(container => {
            // Seleccionar párrafos y también los números de sección (I, II, III)
            const textElements = container.querySelectorAll('p, .quote-number');

            textElements.forEach(el => {
                const text = el.textContent;
                el.innerHTML = '';
                [...text].forEach(char => {
                    const span = document.createElement('span');
                    span.classList.add('tw-char');
                    span.textContent = char;
                    el.appendChild(span);
                });
            });
        });
    }

    function runTypewriter() {
        if (typewriterDone) return;
        typewriterDone = true;

        // Recopilar TODOS los caracteres en orden de todos los contenedores
        const allChars = [];
        getAllTypewriterContainers().forEach(container => {
            container.querySelectorAll('.tw-char').forEach(c => allChars.push(c));
        });

        const scrollContainer = document.getElementById('letterScroll');

        const charDelay = 35; // ms por carácter
        allChars.forEach((char, i) => {
            setTimeout(() => {
                char.classList.add('visible');
                // Auto-scroll: cada 30 caracteres, hacer scroll suave al último carácter visible
                if (scrollContainer && i % 30 === 0) {
                    const charRect = char.getBoundingClientRect();
                    const containerRect = scrollContainer.getBoundingClientRect();
                    // Si el carácter está por debajo de la zona visible, hacer scroll
                    if (charRect.bottom > containerRect.bottom - 40) {
                        scrollContainer.scrollBy({
                            top: charRect.bottom - containerRect.bottom + 60,
                            behavior: 'smooth'
                        });
                    }
                }
            }, i * charDelay);
        });

        // Activar firma animada al terminar el typewriter
        const totalTime = allChars.length * charDelay + 200;
        setTimeout(() => {
            animateSignature();
        }, totalTime);
    }

    // === FIRMA ANIMADA ===
    function animateSignature() {
        const sigImg = document.getElementById('signatureImg');
        if (sigImg) {
            sigImg.classList.add('animate');
        }
    }

    // === GALERÍA DE FOTOS CARRUSEL ===
    const galleryTrack = document.getElementById('galleryTrack');
    const galleryPrev = document.getElementById('galleryPrev');
    const galleryNext = document.getElementById('galleryNext');
    const galleryDots = document.getElementById('galleryDots');
    let currentSlide = 0;

    if (galleryTrack && galleryPrev && galleryNext && galleryDots) {
        // Mezclar slides en orden aleatorio (Fisher-Yates)
        const slidesArr = [...galleryTrack.querySelectorAll('.gallery-slide')];
        for (let i = slidesArr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            galleryTrack.appendChild(slidesArr[j]);
            slidesArr[j] = slidesArr[i];
        }
        slidesArr.forEach(s => galleryTrack.appendChild(s));

        const slides = galleryTrack.querySelectorAll('.gallery-slide');
        const totalSlides = slides.length;

        // Generar dots dinámicamente
        galleryDots.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('span');
            dot.classList.add('gallery-dot');
            if (i === 0) dot.classList.add('active');
            galleryDots.appendChild(dot);
        }
        const dots = galleryDots.querySelectorAll('.gallery-dot');

        // Contador de fotos
        const counterEl = document.createElement('div');
        counterEl.classList.add('gallery-counter');
        counterEl.textContent = `1 / ${totalSlides}`;
        galleryDots.parentElement.appendChild(counterEl);

        function goToSlide(index) {
            currentSlide = ((index % totalSlides) + totalSlides) % totalSlides;
            gsap.to(galleryTrack, {
                x: `-${currentSlide * 100}%`,
                duration: 0.5,
                ease: 'power2.out'
            });
            dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
            counterEl.textContent = `${currentSlide + 1} / ${totalSlides}`;
        }

        galleryPrev.addEventListener('click', () => { playClickSound(); goToSlide(currentSlide - 1); });
        galleryNext.addEventListener('click', () => { playClickSound(); goToSlide(currentSlide + 1); });
        dots.forEach((dot, i) => dot.addEventListener('click', () => { playClickSound(); goToSlide(i); }));

        // Swipe en móviles para la galería
        let touchStartX = 0;
        galleryTrack.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        }, { passive: true });

        galleryTrack.addEventListener('touchend', (e) => {
            const diff = touchStartX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 40) {
                goToSlide(diff > 0 ? currentSlide + 1 : currentSlide - 1);
            }
        }, { passive: true });

        // Auto-play sutil
        let autoplayInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
        const gallery = document.getElementById('photoGallery');
        gallery.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
        gallery.addEventListener('mouseleave', () => {
            autoplayInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
        });
    }

    // === EFECTO PARALLAX ===
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    function handleParallax(e) {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const moveX = (clientX - centerX) / centerX;
        const moveY = (clientY - centerY) / centerY;

        parallaxElements.forEach(el => {
            const depth = parseFloat(el.dataset.parallax) || 0.03;
            const x = moveX * depth * 100;
            const y = moveY * depth * 100;
            gsap.to(el, {
                x: x,
                y: y,
                duration: 0.8,
                ease: 'power2.out',
                overwrite: 'auto'
            });
        });
    }

    // Solo activar parallax en pantallas grandes (no táctiles)
    if (window.matchMedia('(hover: hover) and (min-width: 768px)').matches) {
        document.addEventListener('mousemove', handleParallax);
    }

    // === CONECTAR TYPEWRITER CON LA APERTURA DE LA CARTA ===
    // Se inyecta en la timeline de apertura existente
    const originalRevealCallback = () => {
        initTypewriter();
        setTimeout(runTypewriter, 600);
    };

    // Observer para detectar cuando la carta se revela
    const letterObserver = new MutationObserver((mutations) => {
        mutations.forEach(m => {
            if (m.type === 'attributes' && m.attributeName === 'class') {
                const target = m.target;
                if (target.classList.contains('revealed') && !typewriterDone) {
                    initTypewriter();
                    setTimeout(runTypewriter, 800);
                }
            }
        });
    });

    letterObserver.observe(letter, { attributes: true });

    // === HOVER SOUNDS EN BOTONES ===
    const hoverTargets = document.querySelectorAll(
        '.gallery-btn, .music-btn, .letter-close, .modal-close, .wax-seal'
    );
    hoverTargets.forEach(btn => {
        btn.addEventListener('mouseenter', playHoverSound);
    });
});

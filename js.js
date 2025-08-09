
        // ==== Data ====
        const messages = [
            '🌟 <strong style="color:#FFB703;">Sinai</strong>, tu pasión y dedicación te llevarán lejos. <em>Nunca dejes de soñar en grande</em> y luchar por lo que quieres.',
            '📚 <q style="font-style:italic; color:#F77F00;">El éxito es la suma de pequeños esfuerzos repetidos día tras día.</q> – <strong>Robert Collier</strong>. Sigue adelante, estás construyendo tu camino.',
            '🚀 Cada paso que das es un avance hacia tus metas. Recuerda que los grandes logros empiezan con <span style="font-weight:600;">pequeños intentos</span>.',
            '🎓 Eres una maestra excepcional y una profesional en formación. Tu <span style="font-weight:700;">paciencia y esfuerzo</span> son el motor de tu crecimiento.',
            '💡 No temas equivocarte; los errores son <em>lecciones valiosas</em> que te acercan más a tu propósito.',
            '🌱 <q style="font-style:italic; color:#F77F00;">La educación es el arma más poderosa para cambiar el mundo.</q> – <strong>Nelson Mandela</strong>. Tu aprendizaje impactará a muchos.',
            '🔥 Mantén viva esa chispa de <span style="color:#F77F00; font-weight:600;">curiosidad</span> y ganas de aprender. El futuro está lleno de oportunidades para ti.',
            '🤝 Cuando necesites apoyo o simplemente alguien que escuche, recuerda que siempre estaré <strong>aquí para ti</strong>.',
            '✨ Cada día es una nueva página para escribir tu historia. Llénala de <em>valentía, esfuerzo y alegría</em>.',
            '🦋 <q style="font-style:italic; color:#F77F00;">No es la montaña lo que conquistamos, sino a nosotros mismos.</q> – <strong>Sir Edmund Hillary</strong>. Eres más fuerte de lo que crees.',
            '🌈 Sigue cultivando tus sueños con pasión y constancia. La recompensa llegará, paso a paso.',
            '🌟 <strong>Sinai</strong>, tu talento y dedicación son luz para quienes te rodean. No subestimes el poder de tu <span style="color:#FFB703;">influencia positiva</span>.',
            '📖 <q style="font-style:italic; color:#F77F00;">La verdadera enseñanza no es dar respuestas, sino enseñar a pensar.</q> – <strong>Sócrates</strong>. Sigue creciendo como profesional y persona.',
            '🎯 Apunta alto, enfócate en tus metas y no te dejes vencer por las dificultades. Eres capaz de lograr todo lo que te propongas.',
            '🌻 Tu esfuerzo hoy es la semilla del éxito de mañana. Cultívala con <em>amor y paciencia</em>.'
        ];


        // ==== Elements ====
        const randomMsgBtn = document.getElementById('randomMsgBtn');
        const messagesList = document.getElementById('messagesList');
        const voiceToggle = document.getElementById('voiceToggle');
        const letter = document.getElementById('letter');
        const celebrateBtn = document.getElementById('celebrateBtn');
        const openLetterBtn = document.getElementById('openLetterBtn');
        const overlay = document.getElementById('overlay');
        const closeOverlay = document.getElementById('closeOverlay');
        const overlayCelebrate = document.getElementById('overlayCelebrate');
        const bgMusic = document.getElementById('bgMusic');
        const playMusic = document.getElementById('playMusic');
        const stopMusic = document.getElementById('stopMusic');
        // Variables para manejar el modal y los mensajes
        const messageOverlay = document.getElementById('messageOverlay');
        const modalMessage = document.getElementById('modalMessage');
        const modalCloseBtn = document.getElementById('modalCloseBtn');
        const prevMsgBtn = document.getElementById('prevMsgBtn');
        const nextMsgBtn = document.getElementById('nextMsgBtn');

        let currentMsgIndex = 0;

        function showMessage(index) {
            if (index < 0) index = messages.length - 1;
            if (index >= messages.length) index = 0;
            currentMsgIndex = index;
            modalMessage.innerHTML = messages[currentMsgIndex];

            if (voiceOn) speakText(modalMessage.textContent);
        }

        randomMsgBtn.addEventListener('click', () => {
            showMessage(Math.floor(Math.random() * messages.length));
            messageOverlay.style.display = 'grid'; // para que se active display grid y animación
            setTimeout(() => messageOverlay.classList.add('show'), 20); // animación fade-in
            messageOverlay.setAttribute('aria-hidden', 'false');
            modalCloseBtn.focus();
        });

        function closeModal() {
            messageOverlay.classList.remove('show');
            setTimeout(() => {
                messageOverlay.style.display = 'none';
                messageOverlay.setAttribute('aria-hidden', 'true');
            }, 280); // debe coincidir con la transición CSS
            window.speechSynthesis.cancel();
        }

        modalCloseBtn.addEventListener('click', closeModal);

        prevMsgBtn.addEventListener('click', () => {
            showMessage(currentMsgIndex - 1);
        });

        nextMsgBtn.addEventListener('click', () => {
            showMessage(currentMsgIndex + 1);
        });

        window.addEventListener('keydown', e => {
            if (e.key === 'Escape' && messageOverlay.classList.contains('show')) {
                closeModal();
            }
        });



        // ==== Voice Toggle ====
        let voiceOn = false;
        voiceToggle.addEventListener('click', () => {
            voiceOn = !voiceOn;
            voiceToggle.textContent = voiceOn ? '🔈 Voz: on' : '🔈 Voz: off';

            // Si se activa la voz, leer la carta inmediatamente
            if (voiceOn) {
                readLetter();
            } else {
                window.speechSynthesis.cancel(); // Detener lectura si estaba en curso
            }
        });

        // ==== Función para leer la carta ====
        function readLetter() {
            if (!letter) return;

            // Obtener todo el texto de la carta
            const text = letter.innerText;

            // Crear objeto de lectura
            const speech = new SpeechSynthesisUtterance(text);
            speech.lang = 'es-ES'; // Español
            speech.rate = 1;       // Velocidad normal
            speech.pitch = 1;      // Tono normal

            // Reproducir
            window.speechSynthesis.speak(speech);
        }

        // random message action
        function pushMessage(text) {
            const el = document.createElement('div');
            el.className = 'msg';
            el.textContent = text;
            messagesList.prepend(el);
            // keep only 6 recent
            while (messagesList.children.length > 6) messagesList.removeChild(messagesList.lastChild);
            // optional voice
            if (voiceOn && 'speechSynthesis' in window) {
                speakText(text);
            }
        }

        randomMsgBtn.addEventListener('click', () => {
            const text = messages[Math.floor(Math.random() * messages.length)];
            pushMessage(text);
            // small celebratory confetti
            confetti({
                particleCount: 50,
                spread: 60,
                origin: { y: 0.4 }
            });
        });

        // confetti
        celebrateBtn.addEventListener('click', () => {
            confetti({
                particleCount: 120,
                spread: 110,
                origin: { y: 0.35 }
            });
        });

        overlayCelebrate.addEventListener('click', () => {
            pushMessage("Te mando un abrazo grande — ¡lo logras paso a paso!");
            confetti({ particleCount: 100, spread: 140, origin: { y: 0.4 } });
        });

        // modal open/close
        openLetterBtn.addEventListener('click', () => { overlay.classList.add('show'); overlay.setAttribute('aria-hidden', 'false'); });
        closeOverlay.addEventListener('click', () => { overlay.classList.remove('show'); overlay.setAttribute('aria-hidden', 'true'); });

        // music
        playMusic.addEventListener('click', () => bgMusic.play());
        stopMusic.addEventListener('click', () => bgMusic.pause());

        // speech
        function speakText(text) {
            if (!('speechSynthesis' in window)) return;
            speechSynthesis.cancel();
            const u = new SpeechSynthesisUtterance(text);
            u.lang = 'es-MX';
            u.rate = 0.95;
            u.pitch = 1;
            speechSynthesis.speak(u);
        }

        // Keyboard shortcuts
        window.addEventListener('keydown', (e) => {
            if (e.key === 'm') randomMsgBtn.click();
            if (e.key === 'c') celebrateBtn.click();
            if (e.key === 'l') openLetterBtn.click();
        });

        // ==== Petal particle system (sunflower petals / small emoji) ====
        (function petalSystem() {
            const canvas = document.getElementById('petalCanvas');
            const ctx = canvas.getContext('2d');
            let W, H, particles = [];

            function resize() {
                W = canvas.width = canvas.clientWidth;
                H = canvas.height = canvas.clientHeight;
            }
            window.addEventListener('resize', resize);
            resize();

            function rand(min, max) { return Math.random() * (max - min) + min; }

            class Petal {
                constructor() {
                    this.reset();
                }
                reset() {
                    this.x = rand(-50, W + 50);
                    this.y = rand(-H * 0.3, -20);
                    this.vx = rand(-0.3, 0.9);
                    this.vy = rand(0.6, 2.2);
                    this.size = rand(12, 28);
                    this.rotation = rand(0, Math.PI * 2);
                    this.angularV = rand(-0.02, 0.02);
                    this.opacity = rand(0.6, 1);
                    // choose emoji or drawn petal
                    this.emoji = Math.random() > 0.6 ? "🌻" : null;
                }
                update() {
                    this.x += this.vx;
                    this.y += this.vy;
                    this.vx += Math.sin(this.y / 1200) * 0.01;
                    this.rotation += this.angularV;
                    if (this.y > H + 30 || this.x < -80 || this.x > W + 80) this.reset();
                }
                draw() {
                    ctx.save();
                    ctx.globalAlpha = this.opacity;
                    ctx.translate(this.x, this.y);
                    ctx.rotate(this.rotation);
                    if (this.emoji) {
                        ctx.font = `${this.size}px serif`;
                        ctx.fillText(this.emoji, -this.size / 2, this.size / 2);
                    } else {
                        // draw simple petal shape
                        ctx.fillStyle = "#FFCF73";
                        ctx.beginPath();
                        ctx.ellipse(0, 0, this.size * 0.6, this.size, 0, 0, Math.PI * 2);
                        ctx.fill();
                        ctx.fillStyle = "rgba(255,170,50,0.85)";
                        ctx.beginPath();
                        ctx.ellipse(0, -this.size * 0.15, this.size * 0.25, this.size * 0.6, 0, 0, Math.PI * 2);
                        ctx.fill();
                    }
                    ctx.restore();
                }
            }

            // populate
            for (let i = 0; i < 28; i++) particles.push(new Petal());

            function loop() {
                ctx.clearRect(0, 0, W, H);
                for (let p of particles) { p.update(); p.draw(); }
                requestAnimationFrame(loop);
            }
            loop();
        })();

        // small welcome message on load
        // Mensajes de bienvenida
        const welcomeMessages = [
            "Tu familia ya lo hace pero, aun asi en el cielo te cuida tu abuelito👴🏻y yo te cuido aqui abajo🛡",
            "Tal vez no sea mucho🌻, ni algo caro y que muchas personas te lo digan pero estoy muy orgulloso de ti.👩🏻‍🏫",
            "Hola Sinai🙂, se que no hablamos tan constante 😆y se te pierdes mucho pero no ay dia que no me preocupe de que te encuentres bien🫂, le pido al cielo y a mi dios🙏🏻 que te acompañe todos los dias de tu vida"
        ];

        // Tiempo de espera antes de mostrar los mensajes (ms)
        const WELCOME_DELAY = 700;

        // Mostrar mensajes cuando cargue el contenido principal
        window.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                welcomeMessages.forEach(pushMessage);
            }, WELCOME_DELAY);
        });

        document.querySelectorAll('.image-card').forEach(card => {
            card.addEventListener('click', () => {
                const overlayId = card.getAttribute('data-overlay');
                const overlay = document.getElementById(overlayId);
                if (overlay) overlay.style.display = 'flex';
            });
        });

        document.querySelectorAll('.image-overlay .image-close-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                btn.parentElement.style.display = 'none';
            });
        });

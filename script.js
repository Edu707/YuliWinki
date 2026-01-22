// ================= TEXTO  =================
const messageText =
"Mi Amor TE AMO de una manera tan bonita que a veces siento que las palabras no alcanzan para expresarlo. Tú mi amor eres la única estrella que brilla para mi, la que llego sin aviso y se quedo en mi corazón....TE AMO MI VIDA.";

let textIndex = 0;
const textEl = document.getElementById("typewriter-text");

function typeWriter() {
    if (textIndex < messageText.length) {
        textEl.innerHTML += messageText.charAt(textIndex++);
        setTimeout(typeWriter, 600);
    }
}

// ================= CANVAS =================
const canvas = document.getElementById("treeCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    const size = Math.min(560, canvas.parentElement.clientWidth);
    canvas.width = size;
    canvas.height = size;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const cx = () => canvas.width / 2;
const cy = () => canvas.height / 2 + 60;
const ground = () => canvas.height - 20;

// ================= ESTADOS =================
let seedY = 0;
let stage = 0;
let heartScale = 0;

// ================= FUNCIÓN CORAZÓN =================
function heartPoint(t) {
    return {
        x: 16 * Math.pow(Math.sin(t), 3),
        y: -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t))
    };
}

function drawHeart(scale) {
    ctx.save();
    ctx.translate(cx(), cy());
    ctx.scale(scale, scale);

    ctx.shadowColor = "rgba(255,40,100,0.95)";
    ctx.shadowBlur = 90;
    ctx.fillStyle = "#ff1f5b";

    ctx.beginPath();
    for (let t = 0; t <= Math.PI * 2; t += 0.01) {
        const p = heartPoint(t);
        ctx.lineTo(p.x, p.y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}

// ================= ANIMACIÓN =================
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#5c4033";
    ctx.beginPath();
    ctx.moveTo(40, ground());
    ctx.lineTo(canvas.width - 40, ground());
    ctx.stroke();

    if (stage === 0) {
        ctx.fillStyle = "#6b4226";
        ctx.beginPath();
        ctx.arc(cx(), seedY, 7, 0, Math.PI * 2);
        ctx.fill();
        seedY += 3.2;

        if (seedY >= ground()) stage = 1;
    }

    if (stage >= 1) {
        if (heartScale < 8.4) heartScale += 0.045;

        const pulse = 1 + Math.sin(Date.now() / 1100) * 0.025;
        drawHeart(heartScale * pulse);

        // ================= OSO SOBRE EL CORAZÓN =================
        const heartImg = document.getElementById("heartImage");
        if (heartScale > 5) {
            heartImg.style.opacity = 1;
        }

        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";

        ctx.font = "bold 64px 'Dancing Script'";
        ctx.fillText("Yulitza", cx(), cy() - 40);

        ctx.font = "32px 'Nunito'";
        ctx.fillText("mi niña hermosa", cx(), cy() + 5);

        ctx.font = "bold 28px 'Dancing Script'";
        ctx.fillText("TE AMO", cx(), cy() + 40);

        if (heartScale > 4 && textIndex === 0) {
            setTimeout(typeWriter, 1200);
        }
    }

    requestAnimationFrame(animate);
}

animate();

// ================= PÉTALOS =================
const petalsContainer = document.getElementById("petals-container");

setInterval(() => {
    const petal = document.createElement("div");
    petal.className = "petal";
    petal.style.left = Math.random() * 100 + "vw";
    petal.style.animationDuration = 10 + Math.random() * 6 + "s";
    petal.style.opacity = Math.random() * 0.5 + 0.4;
    petalsContainer.appendChild(petal);

    setTimeout(() => petal.remove(), 16000);
}, 420);

// ================= TEMPORIZADOR =================
const startDate = new Date("2025-08-22T23:05:00");

function updateTimer() {
    const now = new Date();
    const diff = now - startDate;

    if (diff < 0) return;

    const totalSeconds = Math.floor(diff / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours   = Math.floor(totalMinutes / 60);
    const totalDays    = Math.floor(totalHours / 24);

    document.getElementById("days").textContent = totalDays;
    document.getElementById("hours").textContent = totalHours % 24;
    document.getElementById("minutes").textContent = totalMinutes % 60;
    document.getElementById("seconds").textContent = totalSeconds % 60;
}

updateTimer();
setInterval(updateTimer, 1000);

// ================= CARRUSEL =================
const slides = document.querySelectorAll(".carousel-item");
let currentSlide = 0;

function showNextSlide() {
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("active");
}

setInterval(showNextSlide, 4000);

// ================= BOTÓN  =================
window.addEventListener("load", () => {
    const audioBtn = document.getElementById("audioBtn");
    const audio = document.getElementById("loveAudio");

    // VOLUMEN 
    audio.volume = 0.3;

    audioBtn.addEventListener("click", () => {
        if (audio.paused) {
            audio.play().then(() => {
                audioBtn.textContent = "🎵 Pausar música";
            }).catch(err => {
                console.error("No se pudo reproducir el audio:", err);
            });
        } else {
            audio.pause();
            audioBtn.textContent = "🎵 Reproducir música";
        }
    });
});






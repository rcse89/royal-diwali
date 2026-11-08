
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

let particles = [];

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("resize", resize);
resize();

function launchFirework() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height * 0.55;

    const colors = [
        "#ffd700", "#ff6347",
        "#ff69b4", "#00ffff",
        "#ffffff", "#ffa500"
    ];

    const color = colors[
        Math.floor(Math.random() * colors.length)
    ];

    for (let i = 0; i < 65; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4 + 1;

        particles.push({
            x, y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 1,
            color
        });
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.025;
        p.life -= 0.012;

        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = p.color;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
    });

    particles = particles.filter(p => p.life > 0);

    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;

    requestAnimationFrame(animate);
}

setInterval(launchFirework, 850);
animate();

// Personalized wishes
document.getElementById("wishBtn").addEventListener("click", () => {
    const name = document.getElementById("friend").value.trim();

    document.getElementById("personal").textContent =
        name
        ? "Happy Diwali, " + name + " ❤️"
        : "To My Dear Friends ❤️";

    launchFirework();
    launchFirework();
});

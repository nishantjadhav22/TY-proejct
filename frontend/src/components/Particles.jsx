import { useEffect } from "react";

const Particles = () => {
  useEffect(() => {
    const canvas = document.getElementById("particle-canvas");
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let particles = [];

    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2,
        dx: Math.random() * 0.3,
        dy: Math.random() * 0.3,
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "#00f6ff";
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;

        if (p.x > canvas.width) p.x = 0;
        if (p.y > canvas.height) p.y = 0;
      });

      requestAnimationFrame(animate);
    }

    animate();

    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  return <canvas id="particle-canvas"></canvas>;
};

export default Particles;

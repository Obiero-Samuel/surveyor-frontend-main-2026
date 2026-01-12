import { useEffect, useRef } from 'react';

class Particle {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = `rgba(59, 130, 246, ${Math.random() * 0.3 + 0.1})`;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > this.canvas.width) this.x = 0;
        else if (this.x < 0) this.x = this.canvas.width;
        if (this.y > this.canvas.height) this.y = 0;
        else if (this.y < 0) this.y = this.canvas.height;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
}

const ParticleBackground = ({ particleCount = 100, className = "" }) => {
    const canvasRef = useRef(null);
    const particles = useRef([]);
    const animationRef = useRef();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        // Set canvas size
        const resize = () => {
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
        };

        resize();
        window.addEventListener('resize', resize);

        // Create particles
        particles.current = Array.from({ length: particleCount }, () =>
            new Particle(canvas, ctx)
        );

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw particles
            particles.current.forEach(particle => {
                particle.update();
                particle.draw();
            });

            // Draw connections
            ctx.strokeStyle = 'rgba(59, 130, 246, 0.05)';
            ctx.lineWidth = 0.5;

            for (let i = 0; i < particles.current.length; i++) {
                for (let j = i + 1; j < particles.current.length; j++) {
                    const dx = particles.current[i].x - particles.current[j].x;
                    const dy = particles.current[i].y - particles.current[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particles.current[i].x, particles.current[i].y);
                        ctx.lineTo(particles.current[j].x, particles.current[j].y);
                        ctx.stroke();
                    }
                }
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationRef.current);
        };
    }, [particleCount]);

    return (
        <canvas
            ref={canvasRef}
            className={`absolute inset-0 ${className}`}
            style={{ pointerEvents: 'none' }}
        />
    );
};

export default ParticleBackground;

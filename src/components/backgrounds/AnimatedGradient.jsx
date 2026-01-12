import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const AnimatedGradient = ({
    colors = ["#3b82f6", "#8b5cf6", "#ec4899", "#10b981", "#f59e0b"],
    speed = 10,
    className = ""
}) => {
    const [gradientPositions, setGradientPositions] = useState(
        colors.map(() => ({
            x: Math.random() * 100,
            y: Math.random() * 100,
        }))
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setGradientPositions(prev =>
                prev.map(pos => ({
                    x: (pos.x + (Math.random() - 0.5) * 2) % 100,
                    y: (pos.y + (Math.random() - 0.5) * 2) % 100,
                }))
            );
        }, speed * 100);

        return () => clearInterval(interval);
    }, [speed]);

    const gradientString = colors
        .map((color, i) => {
            const pos = gradientPositions[i];
            return `radial-gradient(at ${pos.x}% ${pos.y}%, ${color}20 0px, transparent 50%)`;
        })
        .join(', ');

    return (
        <motion.div
            className={`absolute inset-0 ${className}`}
            style={{
                background: gradientString,
                transition: 'background 2s ease-in-out',
            }}
            animate={{
                opacity: [0.5, 0.7, 0.5],
            }}
            transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        />
    );
};

export default AnimatedGradient;

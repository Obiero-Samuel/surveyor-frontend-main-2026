import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ParallaxSection = ({ children, className = "", speed = 0.5 }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100]);

    return (
        <section ref={ref} className={`relative overflow-hidden ${className}`}>
            <motion.div style={{ y }} className="will-change-transform">
                {children}
            </motion.div>
        </section>
    );
};

export default ParallaxSection;

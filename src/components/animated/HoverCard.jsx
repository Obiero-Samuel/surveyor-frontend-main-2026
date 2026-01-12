import { motion } from 'framer-motion';
import { useState } from 'react';

const HoverCard = ({ children, className = "", scale = 1.05, rotate = 0 }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className={`relative ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            animate={{
                scale: isHovered ? scale : 1,
                rotate: isHovered ? rotate : 0,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            whileHover={{ y: -5 }}
            style={{ transformStyle: "preserve-3d" }}
        >
            {children}
        </motion.div>
    );
};

export default HoverCard;

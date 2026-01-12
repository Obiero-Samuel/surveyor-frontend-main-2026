import { useState } from 'react';
import { motion } from 'framer-motion';

const FlipCard = ({ front, back, className = "" }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleFlip = () => {
        if (!isAnimating) {
            setIsAnimating(true);
            setIsFlipped(!isFlipped);
            setTimeout(() => setIsAnimating(false), 300);
        }
    };

    return (
        <div
            className={`relative w-64 h-80 cursor-pointer ${className}`}
            onClick={handleFlip}
            style={{ perspective: '1000px' }}
        >
            <motion.div
                className="relative w-full h-full"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* Front side */}
                <div
                    className="absolute w-full h-full rounded-2xl p-6"
                    style={{
                        backfaceVisibility: 'hidden',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                    }}
                >
                    {front}
                </div>
                {/* Back side */}
                <div
                    className="absolute w-full h-full rounded-2xl p-6"
                    style={{
                        backfaceVisibility: 'hidden',
                        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                        transform: 'rotateY(180deg)'
                    }}
                >
                    {back}
                </div>
            </motion.div>
            {/* Shine effect */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </div>
        </div>
    );
};

export default FlipCard;

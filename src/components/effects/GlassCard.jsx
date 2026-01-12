import { motion } from 'framer-motion';

const GlassCard = ({ children, className = "", blur = "8px", opacity = 0.2 }) => {
    return (
        <motion.div
            className={`relative ${className}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Glass effect background */}
            <div
                className="absolute inset-0 rounded-2xl"
                style={{
                    background: `linear-gradient(135deg, rgba(255,255,255,${opacity}) 0%, rgba(255,255,255,${opacity * 0.5}) 100%)`,
                    backdropFilter: `blur(${blur})`,
                    WebkitBackdropFilter: `blur(${blur})`,
                    border: "1px solid rgba(255,255,255,0.2)",
                    boxShadow: `0 8px 32px 0 rgba(31,38,135,0.07), inset 0 0 0 1px rgba(255,255,255,0.1)`
                }}
            />
            {/* Border gradient */}
            <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                    background: `linear-gradient(135deg, rgba(59,130,246,0.1), rgba(147,51,234,0.1), rgba(236,72,153,0.1))`,
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "exclude",
                    padding: "1px",
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor"
                }}
            />
            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
};

export default GlassCard;

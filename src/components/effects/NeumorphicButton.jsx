import { motion } from 'framer-motion';

const NeumorphicButton = ({
    children,
    onClick,
    className = "",
    type = "button",
    variant = "primary",
    disabled = false
}) => {
    const getColors = () => {
        switch (variant) {
            case 'primary':
                return {
                    bg: 'bg-gradient-to-br from-blue-50 to-indigo-50',
                    shadow: 'shadow-neu-primary',
                    activeShadow: 'shadow-neu-primary-inset'
                };
            case 'secondary':
                return {
                    bg: 'bg-gradient-to-br from-gray-50 to-blue-50',
                    shadow: 'shadow-neu-secondary',
                    activeShadow: 'shadow-neu-secondary-inset'
                };
            default:
                return {
                    bg: 'bg-gradient-to-br from-gray-50 to-blue-50',
                    shadow: 'shadow-neu-default',
                    activeShadow: 'shadow-neu-default-inset'
                };
        }
    };

    const colors = getColors();

    return (
        <motion.button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`
        ${colors.bg}
        rounded-xl
        px-6 py-3
        font-medium
        transition-all duration-300
        relative
        overflow-hidden
        ${className}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
            whileHover={!disabled ? { scale: 1.05 } : {}}
            whileTap={!disabled ? { scale: 0.95 } : {}}
            style={{
                boxShadow: `10px 10px 20px rgba(0,0,0,0.1), -10px -10px 20px rgba(255,255,255,0.8), inset 0 0 0 1px rgba(255,255,255,0.5)`
            }}
        >
            {/* Ripple effect */}
            <span className="absolute inset-0 overflow-hidden">
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </span>
            {/* Text/content */}
            <span className="relative z-10 flex items-center justify-center gap-2">
                {children}
            </span>
        </motion.button>
    );
};

export default NeumorphicButton;

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MicroInteractionInput = ({
    label,
    type = "text",
    value,
    onChange,
    placeholder,
    error,
    success,
    className = "",
    icon: Icon,
    ...props
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(!!value);

    const handleChange = (e) => {
        onChange(e);
        setHasValue(!!e.target.value);
    };

    return (
        <div className={`relative ${className}`}>
            {/* Label with animation */}
            <motion.label
                initial={false}
                animate={{
                    y: isFocused || hasValue ? -24 : 0,
                    scale: isFocused || hasValue ? 0.85 : 1,
                    color: error ? '#ef4444' : success ? '#10b981' : isFocused ? '#3b82f6' : '#6b7280'
                }}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 origin-left pointer-events-none transition-colors"
                style={{ zIndex: 10 }}
            >
                {label}
            </motion.label>
            {/* Input field */}
            <div className="relative">
                {Icon && (
                    <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                )}
                <input
                    type={type}
                    value={value}
                    onChange={handleChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className={`
            w-full px-4 py-3 rounded-lg border-2
            ${Icon ? 'pl-10' : 'pl-4'}
            transition-all duration-300
            bg-white/50 backdrop-blur-sm
            ${error
                            ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                            : success
                                ? 'border-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20'
                                : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                        }
            shadow-sm hover:shadow-md
          `}
                    placeholder={isFocused ? placeholder : ''}
                    {...props}
                />
                {/* Focus border animation */}
                <motion.div
                    initial={false}
                    animate={{
                        scaleX: isFocused ? 1 : 0,
                        opacity: isFocused ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    style={{ transformOrigin: 'left' }}
                />
                {/* Success/Error indicators */}
                <AnimatePresence>
                    {(error || success) && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                            {error ? (
                                <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
                                    <span className="text-red-500 text-sm">!</span>
                                </div>
                            ) : success ? (
                                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                                    <span className="text-green-500 text-sm">✓</span>
                                </div>
                            ) : null}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            {/* Character counter (for textarea/input) */}
            {props.maxLength && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isFocused ? 1 : 0.5 }}
                    className="text-xs text-gray-400 mt-1 text-right"
                >
                    {value?.length || 0} / {props.maxLength}
                </motion.div>
            )}
            {/* Error message */}
            {error && (
                <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1 flex items-center gap-1"
                >
                    <span>⚠</span> {error}
                </motion.p>
            )}
        </div>
    );
};

export default MicroInteractionInput;

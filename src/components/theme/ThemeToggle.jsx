import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.button
            onClick={toggleTheme}
            className={`
        relative w-14 h-8 rounded-full p-1
        transition-colors duration-300
        ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
      `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            <motion.div
                className={`
          w-6 h-6 rounded-full flex items-center justify-center
          ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}
          shadow-lg
        `}
                layout
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
                <motion.div
                    initial={false}
                    animate={{ rotate: theme === 'light' ? 0 : 180, scale: theme === 'light' ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <SunIcon className="w-4 h-4 text-yellow-500" />
                </motion.div>
                <motion.div
                    initial={false}
                    animate={{ rotate: theme === 'dark' ? 0 : -180, scale: theme === 'dark' ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute"
                >
                    <MoonIcon className="w-4 h-4 text-blue-300" />
                </motion.div>
            </motion.div>
            {/* Stars in dark mode */}
            {theme === 'dark' && (
                <>
                    <div className="absolute top-1 left-2 w-1 h-1 rounded-full bg-blue-300" />
                    <div className="absolute top-3 right-3 w-0.5 h-0.5 rounded-full bg-blue-300" />
                    <div className="absolute bottom-2 right-2 w-0.5 h-0.5 rounded-full bg-blue-300" />
                </>
            )}
        </motion.button>
    );
};

export default ThemeToggle;

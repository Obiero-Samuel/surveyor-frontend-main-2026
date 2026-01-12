export const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.4, ease: "easeInOut" }
};

export const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
};

export const staggerContainer = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

export const scaleIn = {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { type: "spring", stiffness: 100 }
};

export const slideInFromLeft = {
    initial: { x: -50, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.5 }
};

export const slideInFromRight = {
    initial: { x: 50, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.5 }
};

export const rotateIn = {
    initial: { rotate: -10, opacity: 0 },
    animate: { rotate: 0, opacity: 1 },
    transition: { duration: 0.5 }
};

export const floatingAnimation = {
    animate: {
        y: [0, -10, 0],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};

export const pulseAnimation = {
    animate: {
        scale: [1, 1.05, 1],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};

export const typingEffect = {
    initial: { width: "0%" },
    animate: { width: "100%" },
    transition: { duration: 1, ease: "easeInOut" }
};

import { motion } from 'framer-motion';
import { forwardRef } from 'react';

/* Transitions and Animations */

// Scale
const scaleVariant = {
  show: {
    opacity: 1,
    scale: 1,
  },
  hide: {
    opacity: 0,
    scale: 0,
  },
};

export interface ScaleTransitionProps {
  children: React.ReactNode;
}
export const ScaleTransition = forwardRef<HTMLDivElement, ScaleTransitionProps>(function ScaleTransition({ children }: ScaleTransitionProps, ref) {
  return (
    <motion.div initial="hide" animate="show" exit="hide" variants={scaleVariant} ref={ref}>
      {children}
    </motion.div>
  );
});

// ScaleX
const scaleXVariant = {
  show: {
    opacity: 1,
    scaleX: 1,
    originX: 0,
  },
  hide: {
    opacity: 0,
    scaleX: 0,
    originX: 1,
  },
};

export interface ScaleXTransitionProps {
  children: React.ReactNode;
}
export const ScaleXTransition = forwardRef<HTMLDivElement, ScaleXTransitionProps>(function ScaleXTransition({ children }: ScaleTransitionProps, ref) {
  return (
    <motion.div initial="hide" animate="show" exit="hide" variants={scaleXVariant} style={{ width: '100%' }} ref={ref}>
      {children}
    </motion.div>
  );
});

// Blur
const blurVariant = {
  focus: {
    opacity: 1,
    filter: 'blur(0px)',
  },
  blur: {
    opacity: 0,
    filter: 'blur(50px)',
  },
};

export interface BlurTransitionProps {
  children: React.ReactNode;
}
export const BlurTransition = forwardRef<HTMLDivElement, BlurTransitionProps>(function BlurTransition({ children }: BlurTransitionProps, ref) {
  return (
    <motion.div initial="blur" animate="focus" exit="blur" variants={blurVariant} style={{ width: '100%' }} ref={ref}>
      {children}
    </motion.div>
  );
});

// SlideUp
const slideUpVariant = {
  in: {
    y: 0,
  },
  down: {
    y: '10rem',
  },
  up: {
    y: '-10rem',
  },
};

export interface SlideUpTransitionProps {
  children: React.ReactNode;
}
export const SlideUpTransition = forwardRef<HTMLDivElement, SlideUpTransitionProps>(function SlideUpTransition({ children }: SlideUpTransitionProps, ref) {
  return (
    <motion.div initial="down" animate="in" exit="up" variants={slideUpVariant} ref={ref}>
      {children}
    </motion.div>
  );
});

// Ghost
const ghostVariant = {
  grow: {
    filter: 'blur(1rem)',
  },
  shrink: {
    filter: 'blur(2rem)',
  },
};

export interface GhostAnimationProps {
  children: React.ReactNode;
}
export const GhostAnimation = forwardRef<HTMLDivElement, GhostAnimationProps>(function GhostAnimation({ children }: GhostAnimationProps, ref) {
  return (
    <motion.div
      initial="grow"
      animate="shrink"
      variants={ghostVariant} 
      transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: 'reverse' }}
      ref={ref}
    >
      {children}
    </motion.div>
  );
});

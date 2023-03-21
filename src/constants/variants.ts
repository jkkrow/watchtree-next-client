import { Variants } from 'framer-motion';

export const opacityVariants: Variants = {
  active: { opacity: 1 },
  inActive: { opacity: 0 },
};

export const rotate180Variants: Variants = {
  active: { rotate: 180 },
  inActive: { rotate: 0 },
};

export const toggleVariants: Variants = {
  active: { x: '50%' },
  inActive: { x: '-50%' },
};

export const menuVariants: Record<'top' | 'center' | 'bottom', Variants> = {
  top: {
    active: { y: 0, rotate: 135 },
    inActive: { y: -6 },
  },
  center: {
    active: { rotate: 135 },
    inActive: { rotate: 0 },
  },
  bottom: {
    active: { y: 0, rotate: 45 },
    inActive: { y: 6 },
  },
};

export const searchVariants: Record<'button' | 'input', Variants> = {
  button: {
    active: { x: 0 },
    inActive: { x: 160, transition: { type: 'tween' } },
  },
  input: {
    active: { scaleX: 1, opacity: 1 },
    inActive: { scaleX: 0, opacity: 0, transition: { type: 'tween' } },
  },
};

export const modalVariants: Record<'container' | 'window', Variants> = {
  container: opacityVariants,
  window: {
    active: { y: 0 },
    inActive: { y: -500, transition: { bounce: 0 } },
  },
};

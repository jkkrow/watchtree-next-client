import { Variants } from 'framer-motion';

export const opacityVariants: Variants = {
  active: { opacity: 1 },
  inActive: { opacity: 0 },
};

export const transformYVariants: Variants = {
  active: { y: '0%' },
  inActive: { y: '-100%' },
};

export const rotate180Variants: Variants = {
  active: { rotate: 180 },
  inActive: { rotate: 0 },
};

export const toggleVariants: Variants = {
  active: { x: '50%' },
  inActive: { x: '-50%' },
};

export const loaderVariants: Record<'container' | 'item', Variants> = {
  container: {
    active: { opacity: 1, transition: { staggerChildren: 0.2 } },
    inActive: { opacity: 0 },
  },
  item: {
    active: {
      scale: [0, 1, 0],
      opacity: [0, 1, 0],
      transition: { duration: 1, repeat: Infinity },
    },
  },
};

export const videoModalVariants: Record<'container' | 'window', Variants> = {
  container: opacityVariants,
  window: {
    active: { opacity: 1, y: 0, transition: { ease: 'easeOut' } },
    inActive: { opacity: 0, y: '20%', transition: { ease: 'easeOut' } },
  },
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
    inActive: { x: '10rem', transition: { type: 'tween' } },
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

export const playerDropdownVariants: Record<
  'container' | 'index' | 'main',
  Variants
> = {
  container: opacityVariants,
  index: {
    active: { x: 0 },
    inActive: { x: '-100%' },
  },
  main: {
    active: { x: 0 },
    inActive: { x: '100%' },
  },
};

export const playerModalVariants: Variants = {
  active: { x: 0 },
  inActive: { x: '100%' },
};

export const uploadPopupVariants: Record<
  'container' | 'alert' | 'list',
  Variants
> = {
  container: {
    active: {
      width: '32rem',
      height: '16rem',
      borderRadius: '10px',
      transition: { duration: 0.25, delayChildren: 0.25 },
    },
    inActive: {
      width: '6rem',
      height: '6rem',
      borderRadius: '50px',
      transition: { duration: 0.25 },
    },
  },
  alert: {
    active: { opacity: 1, transition: { duration: 0.25, delay: 0.25 } },
    inActive: { opacity: 0, transition: { duration: 0 } },
  },
  list: {
    active: { opacity: 1, transition: { duration: 0.25, delay: 0.25 } },
    inActive: { opacity: 0, transition: { duration: 0 } },
  },
};

export const heroVariants: Record<
  'container' | 'text' | 'image' | 'button',
  Variants
> = {
  container: {
    active: { opacity: 1, transition: { staggerChildren: 0.5 } },
    inActive: { opacity: 0 },
  },
  text: {
    active: { opacity: 1, x: 0, transition: { ease: 'easeOut' } },
    inActive: { opacity: 0, x: -50 },
  },
  image: opacityVariants,
  button: opacityVariants,
};

export const featureVariants: Record<'container' | 'left' | 'right', Variants> =
  {
    container: {
      active: {
        opacity: 1,
        transition: { delayChildren: 0.5, staggerChildren: 0.25 },
      },
      inActive: { opacity: 0 },
    },
    left: {
      active: { opacity: 1, x: 0, transition: { ease: 'easeOut' } },
      inActive: { opacity: 0, x: -100 },
    },
    right: {
      active: { opacity: 1, x: 0, transition: { ease: 'easeOut' } },
      inActive: { opacity: 0, x: 100 },
    },
  };

export const visualVariants: Record<'player' | 'selection', Variants> = {
  player: {
    active: {
      x: 0,
      transition: { ease: 'easeOut', duration: 0.3 },
    },
    inActive: {
      x: '100%',
      transition: { ease: 'easeOut', duration: 0.3 },
    },
    exit: {
      x: '-100%',
      transition: { ease: 'easeOut', duration: 0.3 },
    },
  },
  selection: {
    active: {
      opacity: 1,
      y: 0,
      transition: { ease: 'easeOut', duration: 0.3 },
    },
    inActive: {
      opacity: 0,
      y: '2rem',
      transition: { ease: 'easeOut', duration: 0.3 },
    },
  },
};

export const sampleVariants: Variants = {
  active: { opacity: 1, x: 0, transition: { ease: 'easeOut' } },
  inActive: { opacity: 0, x: -20 },
};

export const footerVariants: Variants = {
  active: { opacity: 1, y: 0, transition: { ease: 'easeOut' } },
  inActive: { opacity: 0, y: 50 },
};

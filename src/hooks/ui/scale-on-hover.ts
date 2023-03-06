import { useReducer, useRef, useCallback } from 'react';

import { useTimeout } from '../util/time';

type State = {
  active: boolean;
  origin: string;
  zIndex: number;
};

type Action =
  | { type: 'START'; origin: string }
  | { type: 'STOP'; origin?: undefined }
  | { type: 'FINISH'; origin?: undefined };

const scaleReducer = (state: State, { type, origin }: Action): State => {
  switch (type) {
    case 'START':
      return { ...state, active: true, origin, zIndex: 1 };
    case 'STOP':
      return { ...state, active: false };
    case 'FINISH':
      return { ...state, zIndex: 0 };
    default:
      return { ...state };
  }
};

const initialState: State = {
  active: false,
  origin: 'intial',
  zIndex: 0,
};

export function useScaleOnHover(options?: {
  scaleBy?: number;
  duration?: number;
}) {
  const [{ active, origin, zIndex }, dispatch] = useReducer(
    scaleReducer,
    initialState
  );

  const [setStartTimeout, clearStartTimeout] = useTimeout();
  const [setFinishTimeout, clearFinishTimeout] = useTimeout();

  const itemRef = useRef<HTMLDivElement>(null);
  const scaleByRef = useRef(options?.scaleBy || 1.3);
  const durationRef = useRef(options?.duration || 200);

  const start = useCallback(() => {
    if (active || !itemRef.current) return;
    clearFinishTimeout();

    let originX = '50%';
    let originY = '50%';
    const container = document.documentElement;

    const { left: containerLeft, width: containerWidth } =
      container.getBoundingClientRect();
    const { top, bottom, left, width, height } =
      itemRef.current.getBoundingClientRect();

    const itemLeft = left - containerLeft;
    const itemRight = itemLeft + width;
    const viewHeight = window.innerHeight;
    const headerHeight = 80;

    const scaledWidth = width * scaleByRef.current;
    const scaledHeight = height * scaleByRef.current;

    if (scaledWidth > containerWidth || scaledHeight > viewHeight) {
      return;
    }
    if (scaledWidth + (containerWidth - itemRight) > containerWidth) {
      originX = '0%';
    }
    if (itemLeft + scaledWidth > containerWidth) {
      originX = '100%';
    }
    if (scaledHeight + (viewHeight - bottom) > viewHeight - headerHeight) {
      originY = '0%';
    }
    if (top + scaledHeight > viewHeight) {
      originY = '100%';
    }

    const origin = `${originX} ${originY}`;
    setStartTimeout(() => dispatch({ type: 'START', origin }), 500);
  }, [active, clearFinishTimeout, setStartTimeout]);

  const stop = useCallback(() => {
    clearStartTimeout();
    setFinishTimeout(() => dispatch({ type: 'FINISH' }), durationRef.current);
    active && dispatch({ type: 'STOP' });
  }, [active, clearStartTimeout, setFinishTimeout]);

  return {
    start,
    stop,
    itemRef,
    active,
    style: {
      transitionDuration: `${durationRef.current}ms`,
      transformOrigin: origin,
      transform: `scale(${active ? scaleByRef.current : 1})`,
      zIndex: zIndex,
    },
  };
}

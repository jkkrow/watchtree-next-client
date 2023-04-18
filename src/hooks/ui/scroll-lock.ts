import { useEffect, useRef } from 'react';

export function useScrollLock(on: boolean) {
  const scrollPositionRef = useRef(0);

  useEffect(() => {
    const { classList, style, scrollTop, scrollHeight, clientHeight } =
      document.documentElement;

    if (on && scrollHeight > clientHeight) {
      style.top = `-${scrollTop}px`;
      classList.add('fixed');
      classList.add('overflow-y-scroll');
      classList.add('w-full');
      scrollPositionRef.current = scrollTop;
    }

    if (!on) {
      classList.remove('fixed');
      classList.remove('overflow-y-scroll');
      classList.remove('w-full');
      style.removeProperty('top');
      document.documentElement.scrollTop = scrollPositionRef.current;
    }
  }, [on]);

  useEffect(() => {
    return () => {
      const { style, classList } = document.documentElement;

      classList.remove('fixed');
      classList.remove('overflow-y-scroll');
      classList.remove('w-full');
      style.removeProperty('top');
    };
  }, []);
}

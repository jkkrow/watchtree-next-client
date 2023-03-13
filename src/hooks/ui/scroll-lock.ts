import { useEffect, useRef } from 'react';

export function useScrollLock(on: boolean) {
  const scrollPositionRef = useRef(0);

  useEffect(() => {
    const { classList, style, scrollTop, scrollHeight, clientHeight } =
      document.documentElement;

    if (on) {
      if (scrollHeight <= clientHeight) return;
      scrollPositionRef.current = scrollTop;
      style.top = `-${scrollTop}px`;
      classList.add('fixed');
      classList.add('overflow-y-scroll');
      classList.add('w-full');
      classList.add('disabled');
    } else {
      classList.remove('fixed');
      classList.remove('overflow-y-scroll');
      classList.remove('w-full');
      classList.remove('disabled');
      document.documentElement.scrollTop = scrollPositionRef.current;
      style.removeProperty('top');
    }
  }, [on]);
}

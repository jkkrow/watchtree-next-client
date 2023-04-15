import { useEffect, useRef } from 'react';

export function useScrollLock(on: boolean, keepScroll?: boolean) {
  const scrollPositionRef = useRef(0);

  useEffect(() => {
    const { classList, style, scrollTop, scrollHeight, clientHeight } =
      document.documentElement;

    if (on) {
      if (scrollHeight <= clientHeight) return;
      scrollPositionRef.current = scrollTop;
      if (keepScroll) {
        style.top = `-${scrollTop}px`;
        classList.add('fixed');
        classList.add('overflow-y-scroll');
        classList.add('w-full');
        classList.add('disabled');
      } else {
        classList.add('overflow-y-hidden');
      }
    } else {
      if (keepScroll) {
        classList.remove('fixed');
        classList.remove('overflow-y-scroll');
        classList.remove('w-full');
        classList.remove('disabled');
        document.documentElement.scrollTop = scrollPositionRef.current;
        style.removeProperty('top');
      } else {
        classList.remove('overflow-y-hidden');
      }
    }
  }, [on, keepScroll]);
}

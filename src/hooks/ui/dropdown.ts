import { PointerEventHandler, useState, useRef } from 'react';
import { useClickOutside } from '@react-hookz/web';

import { useTimeout } from '../util/time';

export function useDropdown() {
  const [active, setActive] = useState(false);
  const [setClosingTimeout, clearClosingTimeout] = useTimeout();
  const containerRef = useRef(null);

  const open: PointerEventHandler = (event) => {
    if (event.pointerType !== 'mouse') return;
    clearClosingTimeout();
    setActive(true);
  };

  const close = () => {
    setClosingTimeout(() => {
      setActive(false);
    }, 300);
  };

  const toggle = () => {
    setActive((prev) => !prev);
  };

  useClickOutside(containerRef, () => {
    setActive(false);
  });

  return { active, containerRef, open, close, toggle };
}

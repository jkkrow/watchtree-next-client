import { PointerEventHandler, useState } from 'react';

import { useClickOutside } from './click-outside';
import { useTimeout } from '../util/time';

export function useDropdown() {
  const [active, setActive] = useState(false);
  const [setClosingTimeout, clearClosingTimeout] = useTimeout();
  const containerRef = useClickOutside(() => setActive(false));

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

  return { active, containerRef, open, close, toggle };
}

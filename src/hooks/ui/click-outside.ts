import { useEffect, useRef } from 'react';

export function useClickOutside<T extends HTMLElement>(
  callback: () => void,
  mounted?: boolean,
  events: (keyof DocumentEventMap)[] = ['mousedown', 'touchstart']
) {
  const targetRef = useRef<T>(null);
  const callbackRef = useRef(callback);
  const eventsRef = useRef(events);

  useEffect(() => {
    if (mounted !== undefined && !mounted) return;

    const events = eventsRef.current;
    const cb = callbackRef.current;

    const handler = (event: Event) => {
      if (!targetRef.current) return;
      if (!targetRef.current.contains(event.target as Node)) {
        cb();
      }
    };

    events.forEach((name) => document.addEventListener(name, handler));

    return () => {
      events.forEach((name) => document.removeEventListener(name, handler));
    };
  }, [mounted]);

  return targetRef;
}

import { useEffect, useRef } from 'react';

export function useClickOutside(
  callback: () => void,
  events: (keyof DocumentEventMap)[] = ['mousedown', 'touchstart']
) {
  const targetRef = useRef<any>(null);
  const callbackRef = useRef(callback);
  const eventsRef = useRef(events);

  useEffect(() => {
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
  }, []);

  return targetRef;
}

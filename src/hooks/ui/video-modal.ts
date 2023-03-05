import { useRouter } from 'next/router';
import { useMemo, useEffect, useRef, useCallback } from 'react';

export function useVideoModal(videoId?: string) {
  const router = useRouter();
  const scrollPositionRef = useRef(0);

  const itemId = useMemo(() => {
    const { item } = router.query;
    return item instanceof Array ? item[0] : item;
  }, [router.query]);

  useEffect(() => {
    if (videoId) return;

    const { classList, style, scrollTop } = document.documentElement;

    if (itemId) {
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
  }, [videoId, itemId]);

  const open = useCallback(() => {
    if (!videoId) return;
    router.push({ query: { item: videoId } }, undefined, { scroll: false });
  }, [videoId, router]);

  const close = useCallback(() => {
    router.push({ query: '' }, undefined, { scroll: false });
  }, [router]);

  return { itemId, active: itemId === videoId, open, close };
}

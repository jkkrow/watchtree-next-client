import { useRouter } from 'next/router';
import { useMemo, useCallback } from 'react';

export function useVideoModal(videoId?: string) {
  const router = useRouter();

  const itemId = useMemo(() => {
    const { item } = router.query;
    return item instanceof Array ? item[0] : item;
  }, [router.query]);

  const open = useCallback(() => {
    if (!videoId) return;
    router.push({ query: { item: videoId } }, undefined, { scroll: false });
  }, [videoId, router]);

  const close = useCallback(() => {
    router.push({ query: '' }, undefined, { scroll: false });
  }, [router]);

  return { itemId, active: itemId === videoId, open, close };
}

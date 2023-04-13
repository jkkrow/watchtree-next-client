import { useRouter } from 'next/router';
import { useMemo, useCallback } from 'react';

import { VideoTreeEntryWithData } from '@/store/features/video/video.type';
import { encodeObject, decodeObject } from '@/utils/serialize';

export function useVideoModal(video?: VideoTreeEntryWithData) {
  const router = useRouter();

  const { active, item } = useMemo(() => {
    const { item } = router.query;
    const param = item instanceof Array ? item[0] : item;

    const decoded = param ? decodeObject<VideoTreeEntryWithData>(param) : null;
    const active = decoded?.id === video?.id;

    return { active, item: decoded };
  }, [router.query, video]);

  const open = useCallback(() => {
    if (!video) return;
    const encoded = encodeObject(video);
    const query = { ...router.query, item: encoded };
    router.push({ query }, undefined, { scroll: false });
  }, [video, router]);

  const close = useCallback(() => {
    const { item, ...rest } = router.query;
    const query = rest;
    router.push({ query }, undefined, { scroll: false });
  }, [router]);

  return { item, active, open, close };
}

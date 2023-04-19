import { useRouter } from 'next/router';
import {
  PropsWithChildren,
  createContext,
  useState,
  useRef,
  useMemo,
  useCallback,
  RefObject,
} from 'react';

import VideoModal from '@/components/features/Video/Modal';
import { useScrollLock } from '@/hooks/ui/scroll-lock';
import { VideoTreeEntryWithData } from '@/store/features/video/video.type';
import { encodeObject, decodeObject } from '@/utils/serialize';

interface VideoModalItem {
  video: VideoTreeEntryWithData;
  scrollPosition: number | null;
}

interface ContextState {
  item: VideoModalItem | null;
  layoutAnimation: boolean;
  headerRef: RefObject<HTMLHeadingElement> | null;
  open: (video: VideoTreeEntryWithData) => void;
  close: () => void;
}

const defaultContext: ContextState = {
  item: null,
  layoutAnimation: false,
  headerRef: null,
  open: () => {},
  close: () => {},
};

export const VideoModalContext = createContext(defaultContext);

export const VideoModalProvider = ({ children }: PropsWithChildren) => {
  const [layoutAnimation, setLayoutAnimation] = useState(false);
  const router = useRouter();
  const routerRef = useRef(router);
  const headerRef = useRef<HTMLHeadingElement>(null);

  const item = useMemo(() => {
    const { item } = router.query;
    const param = item instanceof Array ? item[0] : item;

    return param ? decodeObject<VideoModalItem>(param) : null;
  }, [router.query]);

  useScrollLock(!!item, 'video-modal', item?.scrollPosition || undefined);

  const open = useCallback(
    (video: VideoTreeEntryWithData) => {
      const { documentElement } = document;
      const { scrollTop, scrollHeight, clientHeight } = documentElement;
      const scrollPosition = scrollHeight <= clientHeight ? null : scrollTop;

      const encoded = encodeObject({ video, scrollPosition });
      const query = { ...router.query, item: encoded };

      setLayoutAnimation(true);
      routerRef.current.push({ query }, undefined, { scroll: false });
    },
    [router.query]
  );

  const close = useCallback(() => {
    routerRef.current.back();
  }, []);

  return (
    <VideoModalContext.Provider
      value={{ item, layoutAnimation, headerRef, open, close }}
    >
      {children}
      <VideoModal />
    </VideoModalContext.Provider>
  );
};

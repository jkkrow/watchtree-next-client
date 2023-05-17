import { useRouter } from 'next/router';
import {
  PropsWithChildren,
  createContext,
  useState,
  useRef,
  useMemo,
  useCallback,
  RefObject,
  useEffect,
} from 'react';

import VideoModal from '@/components/features/Video/Modal';
import { useScrollLock } from '@/hooks/ui/scroll-lock';
import { VideoTreeEntryWithData } from '@/store/features/video/video.type';
import { encodeObject, decodeObject } from '@/utils/serialize';

interface VideoModalItem {
  video: VideoTreeEntryWithData;
  scrollPosition: number | null;
  label: string | undefined;
  path: string;
}

interface OpenModalOptions {
  label?: string;
  layoutAnimation?: boolean;
}

interface ContextState {
  item: VideoModalItem | null;
  layoutAnimation: boolean;
  headerRef: RefObject<HTMLHeadingElement> | null;
  open: (video: VideoTreeEntryWithData, options: OpenModalOptions) => void;
  close: () => void;
  removeLayoutAnimation: () => void;
}

const defaultContext: ContextState = {
  item: null,
  layoutAnimation: false,
  headerRef: null,
  open: () => {},
  close: () => {},
  removeLayoutAnimation: () => {},
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
  useEffect(() => {
    if (!item) return;
    const handler = (path: string) => {
      item.path !== path && setLayoutAnimation(false);
    };

    const router = routerRef.current;
    router.events.on('routeChangeStart', handler);

    return () => {
      router.events.off('routeChangeStart', handler);
    };
  }, [item]);

  const open = useCallback(
    (
      video: VideoTreeEntryWithData,
      { label, layoutAnimation = true }: OpenModalOptions
    ) => {
      const { documentElement } = document;
      const { scrollTop, scrollHeight, clientHeight } = documentElement;
      const scrollPosition = scrollHeight <= clientHeight ? null : scrollTop;

      const encoded = encodeObject({
        video,
        scrollPosition,
        label,
        path: router.asPath,
      });

      setLayoutAnimation(layoutAnimation);
      const query = { ...router.query, item: encoded };
      routerRef.current.push({ query }, undefined, { scroll: false });
    },
    [router.query, router.asPath]
  );

  const close = useCallback(() => {
    const { item, ...rest } = router.query;
    routerRef.current.push({ query: rest }, undefined, { scroll: false });
  }, [router.query]);

  const removeLayoutAnimation = () => {
    setLayoutAnimation(false);
  };

  return (
    <VideoModalContext.Provider
      value={{
        item,
        layoutAnimation,
        headerRef,
        open,
        close,
        removeLayoutAnimation,
      }}
    >
      {children}
      <VideoModal />
    </VideoModalContext.Provider>
  );
};

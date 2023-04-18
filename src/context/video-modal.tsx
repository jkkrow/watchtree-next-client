import { useRouter } from 'next/router';
import {
  PropsWithChildren,
  createContext,
  useState,
  useRef,
  useMemo,
  useCallback,
  useEffect,
} from 'react';

import VideoModal from '@/components/features/Video/Modal';
import { VideoTreeEntryWithData } from '@/store/features/video/video.type';
import { encodeObject, decodeObject } from '@/utils/serialize';

interface VideoModalItem {
  video: VideoTreeEntryWithData;
  scrollPosition: number | null;
}

interface ContextState {
  item: VideoModalItem | null;
  layoutAnimation: boolean;
  open: (video: VideoTreeEntryWithData) => void;
  close: () => void;
}

const defaultContext: ContextState = {
  item: null,
  layoutAnimation: false,
  open: () => {},
  close: () => {},
};

export const VideoModalContext = createContext(defaultContext);

export const VideoModalProvider = ({ children }: PropsWithChildren) => {
  const [layoutAnimation, setLayoutAnimation] = useState(false);
  const router = useRouter();
  const routerRef = useRef(router);
  const scrollPositionRef = useRef<number>(0);

  const item = useMemo(() => {
    const { item } = router.query;
    const param = item instanceof Array ? item[0] : item;

    return param ? decodeObject<VideoModalItem>(param) : null;
  }, [router.query]);

  useEffect(() => {
    const { style, classList } = document.documentElement;

    if (item) {
      if (item.scrollPosition === null) return;
      style.top = `-${item.scrollPosition}px`;
      classList.add('fixed');
      classList.add('overflow-y-scroll');
      classList.add('w-full');
      scrollPositionRef.current = item.scrollPosition;
    } else {
      classList.remove('fixed');
      classList.remove('overflow-y-scroll');
      classList.remove('w-full');
      style.removeProperty('top');
      document.documentElement.scrollTop = scrollPositionRef.current;
    }
  }, [item]);

  useEffect(() => {
    return () => {
      const { style, classList } = document.documentElement;

      classList.remove('fixed');
      classList.remove('overflow-y-scroll');
      classList.remove('w-full');
      style.removeProperty('top');
    };
  }, []);

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
    <VideoModalContext.Provider value={{ item, layoutAnimation, open, close }}>
      {children}
      <VideoModal />
    </VideoModalContext.Provider>
  );
};

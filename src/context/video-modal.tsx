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

interface ContextState {
  item: VideoTreeEntryWithData | null;
  open: (video: VideoTreeEntryWithData) => void;
  close: () => void;
}

const defaultContext: ContextState = {
  item: null,
  open: () => {},
  close: () => {},
};

export const VideoModalContext = createContext(defaultContext);

export const VideoModalProvider = ({ children }: PropsWithChildren) => {
  const [lockChildren, setLockChildren] = useState(false);
  const [hideChildren, setHideChildren] = useState(false);
  const router = useRouter();
  const routerRef = useRef(router);

  const item = useMemo(() => {
    const { item } = router.query;
    const param = item instanceof Array ? item[0] : item;

    return param ? decodeObject<VideoTreeEntryWithData>(param) : null;
  }, [router.query]);

  useEffect(() => {
    if (!lockChildren && item) {
      setHideChildren(true);
    }
  }, [lockChildren, item]);

  useEffect(() => {
    if (!router.isReady) return;
    if (!item) setHideChildren(false);
  }, [router.isReady, item]);

  const open = useCallback(
    (video: VideoTreeEntryWithData) => {
      const encoded = encodeObject(video);
      const query = { ...router.query, item: encoded };
      setLockChildren(true);
      routerRef.current.push(
        { query },
        { pathname: router.pathname, query: { item: video.id } },
        { scroll: false }
      );
    },
    [router.query, router.pathname]
  );

  const close = useCallback(() => {
    routerRef.current.back();
  }, []);

  return (
    <VideoModalContext.Provider value={{ item, open, close }}>
      {!hideChildren ? children : null}
      <VideoModal />
    </VideoModalContext.Provider>
  );
};

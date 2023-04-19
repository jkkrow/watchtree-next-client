import { useMemo } from 'react';

import Header from './_fragments/Header';
import Overview from './_fragments/Overview';
import Details from './_fragments/Details';
import Controls from './_fragments/Controls';
import NodeList from './_fragments/NodeList';
import ScrollToTop from './_fragments/ScrollToTop';
import { useGetVideoQuery } from '@/store/features/video/video.api';
import { useCurtain } from '@/hooks/ui/curtain';
import {
  VideoTreeEntryWithData,
  VideoTreeWithData,
} from '@/store/features/video/video.type';

interface VideoModalContentProps {
  video: VideoTreeEntryWithData;
}

export default function VideoModalContent({
  video: tempVideo,
}: VideoModalContentProps) {
  const { data, isLoading } = useGetVideoQuery(tempVideo.id);
  const { open: watch } = useCurtain();

  const video: VideoTreeEntryWithData | VideoTreeWithData = useMemo(
    () => (data ? data.videoTree : tempVideo),
    [tempVideo, data]
  );

  const watchVideoHandler = (nodeId?: string) => () => {
    const history = video.history;
    const defaultNodeId = history && !history.ended ? history.activeNodeId : '';
    const progress = history && !history.ended ? history.progress : 0;

    watch({
      id: video.id,
      nodeId: nodeId || defaultNodeId,
      progress: nodeId && nodeId !== history?.activeNodeId ? 0 : progress,
    });
  };

  return (
    <>
      <section className="relative flex flex-col min-h-[500px] bg-neutral-900 text-neutral-50 selection:text-neutral-900 selection:bg-neutral-100">
        <Header />
        <Overview video={video} onWatch={watchVideoHandler} />
        <Details video={data?.videoTree} loading={isLoading} />
      </section>
      <section className="p-6">
        <Controls video={video} />
        <NodeList
          video={video}
          loading={isLoading}
          onWatch={watchVideoHandler}
        />
      </section>
      <ScrollToTop />
    </>
  );
}

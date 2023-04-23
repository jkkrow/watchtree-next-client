import { useContext } from 'react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import VideoThumbnail from '../UI/VideoThumbnail';
import VideoTitle from '../UI/VideoTitle';
import VideoDuration from '../UI/VideoDuration';
import VideoViews from '../UI/VideoViews';
import VideoFavorites from '../UI/VideoFavorites';
import VideoCreator from '../UI/VideoCreator';
import Button from '@/components/common/Element/Button';
import PlayIcon from '@/assets/icons/play.svg';
import InfoIcon from '@/assets/icons/info.svg';
import { VideoModalContext } from '@/context/video-modal';
import { useCurtain } from '@/hooks/ui/curtain';
import { VideoTreeEntryWithData } from '@/store/features/video/video.type';

interface VideoCarouselProps {
  items: VideoTreeEntryWithData[] | undefined;
}

export default function VideoCarousel({ items }: VideoCarouselProps) {
  const { open } = useContext(VideoModalContext);
  const { open: watch } = useCurtain();

  const watchVideoHandler =
    (item: VideoTreeEntryWithData) => (event: React.MouseEvent) => {
      event.stopPropagation();

      const history = item.history;
      const defaultNodeId =
        history && !history.ended ? history.activeNodeId : '';
      const progress = history && !history.ended ? history.progress : 0;

      watch({ id: item.id, nodeId: defaultNodeId, progress });
    };

  const openModalHandler = (item: VideoTreeEntryWithData) => () => {
    open(item, { layoutAnimation: false });
  };

  return items ? (
    <div className="group relative bg-neutral-900 text-neutral-50 shadow-lg">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        pagination={{ clickable: true }}
        fadeEffect={{ crossFade: true }}
        autoplay={{
          delay: 3000,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}
        speed={700}
        navigation
        loop
      >
        {items.map((item) => (
          <SwiperSlide key={item.id} className="relative">
            <div className="relative ml-auto w-[1800px] max-w-full [&_*]:text-[clamp(0.5rem,2vw,1rem)]">
              <VideoThumbnail title={item.title} url={item.thumbnail} large />
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-r via-transparent from-neutral-900" />
                <div className="absolute inset-0 bg-gradient-to-t via-transparent from-neutral-900" />
                <div className="absolute inset-0 bg-neutral-900/30" />
              </div>
            </div>

            <div
              className="absolute inset-0 flex flex-col justify-center p-[6vw] gap-4 cursor-pointer"
              onClick={openModalHandler(item)}
            >
              <div className="w-[max(500px,25%)] max-w-full">
                <VideoTitle title={item.title} large />
              </div>
              <VideoDuration
                max={item.maxDuration}
                min={item.minDuration}
                brief
              />
              <div className="flex gap-4">
                <VideoViews count={item.views} />
                <VideoFavorites
                  id={item.id}
                  count={item.favorites}
                  active={item.favorited}
                />
              </div>
              <VideoCreator creator={item.creator} />

              <div className="relative hidden mt-4 gap-4 lg:flex">
                <Button small onClick={watchVideoHandler(item)}>
                  <PlayIcon className="w-4 h-4" />
                  <span>Watch</span>
                </Button>
                <Button small onClick={openModalHandler(item)}>
                  <InfoIcon className="w-6 h-6" />
                  <span>Details</span>
                </Button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  ) : null;
}

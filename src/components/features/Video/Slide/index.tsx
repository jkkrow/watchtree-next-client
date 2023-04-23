import Link from 'next/link';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import VideoItem from '../Item';
import AngleRightDoubleIcon from '@/assets/icons/angle-right-double.svg';
import { VideoTreeEntryWithData } from '@/store/features/video/video.type';
import styles from './index.module.scss';

const INITIAL_WIDTH = 1073;
const INITIAL_COUNT = 3;
const BASE_WIDTH = 1417;
const BASE_COUNT = 4;
const STEP_WIDTH = 344;

const breakpoints: { [key: number]: any } = {
  [INITIAL_WIDTH]: {
    slidesPerView: INITIAL_COUNT,
    slidesPerGroup: INITIAL_COUNT,
  },
  [BASE_WIDTH]: {
    slidesPerView: BASE_COUNT,
    slidesPerGroup: BASE_COUNT,
  },
};

for (let i = 1; i < 20; i++) {
  const step = BASE_WIDTH + i * STEP_WIDTH;
  const count = BASE_COUNT + i;

  breakpoints[step] = {
    slidesPerView: count,
    slidesPerGroup: count,
  };
}

interface VideoSlideProps {
  label?: string;
  to?: string;
  items: VideoTreeEntryWithData[] | undefined;
}

export default function VideoSlide({ label, to, items }: VideoSlideProps) {
  return items && items.length ? (
    <div className="group w-full hover:z-10">
      {label ? (
        <h3 className="text-xl font-bold mb-4">
          {to ? (
            <Link
              className="flex items-center w-fit gap-4 hover:text-hover transition-colors"
              href={to}
            >
              <span>{label}</span>
              <AngleRightDoubleIcon className="w-4 h-4 opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          ) : (
            label
          )}
        </h3>
      ) : null}
      <Swiper
        className={styles.container}
        modules={[Navigation]}
        slidesPerView={2}
        slidesPerGroup={2}
        breakpoints={breakpoints}
        spaceBetween={24}
        speed={700}
        navigation
      >
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <VideoItem label={label} item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  ) : null;
}

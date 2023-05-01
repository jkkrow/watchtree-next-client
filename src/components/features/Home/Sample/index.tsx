import { motion } from 'framer-motion';

import VideoFillIcon from '@/assets/icons/video-fill.svg';
import PlayIcon from '@/assets/icons/play.svg';
import { useCurtain } from '@/hooks/ui/curtain';
import { sampleVariants } from '@/constants/variants';

export default function Sample() {
  const { open } = useCurtain();

  const watchSampleHandler = () => {
    const sampleId = process.env.NEXT_PUBLIC_SAMPLE_VIDEO_ID || '';
    open({ id: sampleId });
  };

  return (
    <section className="w-full max-w-6xl py-64 m-auto">
      <motion.div
        className="flex flex-col justify-between gap-6 lg:gap-12 lg:flex-row"
        variants={sampleVariants}
        initial="inActive"
        whileInView="active"
        viewport={{ amount: 'all', once: true }}
      >
        <div className="flex flex-col justify-center max-w-full gap-12 lg:w-1/2 lg:max-w-[500px] lg:py-12">
          <h3 className="font-bold text-3xl">Experience it Live!</h3>
          <div className="flex flex-col gap-6">
            <p className="text-xl tracking-wide font-medium">
              Discover our tree-structured format through this sample video.
            </p>

            <button
              className="flex items-center w-max border-2 p-4 border-secondary rounded-md gap-4 transition-colors hover:bg-hover"
              onClick={watchSampleHandler}
            >
              <div className="w-12 h-12 p-4 bg-inversed text-inversed rounded-full">
                <PlayIcon />
              </div>
              <div className="text-xl font-bold">Watch Sample</div>
            </button>
          </div>
        </div>

        <div
          className="hidden lg:block aspect-video hover:text-hover transition-colors cursor-pointer"
          onClick={watchSampleHandler}
        >
          <VideoFillIcon className="w-[450px] h-[450px] drop-shadow-2xl" />
        </div>
      </motion.div>
    </section>
  );
}

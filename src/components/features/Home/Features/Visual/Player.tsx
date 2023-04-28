import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import VideoFilmImage from '@/assets/images/video-film.svg';
import VideoEducationImage from '@/assets/images/video-education.svg';
import VideoProductImage from '@/assets/images/video-product.svg';
import { visualVariants } from '@/constants/variants';

export default function PlayerVisual() {
  const [visualList, setVisualList] = useState([
    { name: 'film', image: <VideoFilmImage /> },
    { name: 'education', image: <VideoEducationImage /> },
    { name: 'product', image: <VideoProductImage /> },
  ]);
  const [activeIndex, setActiveIndex] = useState(0);

  const navigateListHandler = (index: number) => () => {
    setActiveIndex(visualList[index + 1] ? index + 1 : 0);
  };

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="w-80 h-80 overflow-hidden">
        <ul className="flex w-max">
          <AnimatePresence initial={false} mode="wait">
            {visualList.map(({ name, image }, index) =>
              activeIndex === index ? (
                <motion.li
                  key={name}
                  className="w-80 h-80 cursor-pointer hover:text-hover transition-colors"
                  variants={visualVariants.player}
                  initial="inActive"
                  animate="active"
                  exit="exit"
                  onClick={navigateListHandler(index)}
                >
                  {image}
                </motion.li>
              ) : null
            )}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
}

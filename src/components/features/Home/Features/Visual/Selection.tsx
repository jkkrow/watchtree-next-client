import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import ScreenIcon from '@/assets/icons/screen.svg';
import Button from '@/components/common/Element/Button';
import { useTimeout } from '@/hooks/util/time';
import { getEmojis, getRandomEmojis } from '@/utils/emoji';
import { visualVariants } from '@/constants/variants';

export default function SelectionVisual() {
  const [emojis, setEmojis] = useState(getEmojis(4));
  const [activeEmoji, setActiveEmoji] = useState('');
  const [prevEmoji, setPrevEmoji] = useState('');
  const [setEmojiTimeout] = useTimeout();

  const updateEmojiHandler = (emoji: string) => () => {
    const prevEmojis = emojis;

    setActiveEmoji(emoji);
    setEmojis([]);

    setEmojiTimeout(() => {
      setPrevEmoji(emoji);
      setActiveEmoji('');
      setEmojis(getRandomEmojis(4, prevEmojis));
    }, 500);
  };

  return (
    <div className="relative flex flex-col justify-center items-center w-full h-full gap-2">
      <div
        className="relative flex justify-center items-center mb-16"
        key="screen"
      >
        <ScreenIcon className="w-40 h-40" />
        {prevEmoji ? (
          <div className="absolute top-12 text-4xl">{prevEmoji}</div>
        ) : null}
        {activeEmoji ? (
          <motion.div
            layoutId={activeEmoji}
            className="absolute top-12 text-4xl"
          >
            {activeEmoji}
          </motion.div>
        ) : null}
      </div>
      <div className="absolute flex flex-wrap bottom-12 gap-2" key="buttons">
        <AnimatePresence>
          {emojis.map((emoji) => (
            <motion.div
              key={emoji}
              layoutId={emoji}
              variants={visualVariants.selection}
              initial="inActive"
              animate="active"
              exit="inActive"
              onClick={updateEmojiHandler(emoji)}
            >
              <Button small inversed>
                {emoji}
              </Button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

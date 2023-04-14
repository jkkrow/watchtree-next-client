import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

import AngleLeftIcon from '@/assets/icons/angle-left.svg';
import { rotate180Variants } from '@/constants/variants';

interface VideoDescriptionProps {
  text: string;
  brief?: boolean;
}

export default function VideoDescription({
  text,
  brief,
}: VideoDescriptionProps) {
  const [minimized, setMinimized] = useState(brief);
  const [showButton, setShowButton] = useState(false);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!minimized || !paragraphRef.current) return;

    const { clientHeight, scrollHeight } = paragraphRef.current;
    setShowButton(scrollHeight > clientHeight);
  }, [minimized]);

  const toggleHandler = () => {
    setMinimized((prev) => !prev);
  };

  return text ? (
    <div>
      <article className="overflow-hidden">
        <p
          className="whitespace-pre-wrap data-[minimized=true]:line-clamp-4"
          ref={paragraphRef}
          data-minimized={minimized}
        >
          {text}
        </p>
      </article>
      {brief && showButton ? (
        <button
          className="flex items-center gap-2 mt-4 font-medium"
          onClick={toggleHandler}
        >
          <span>{minimized ? 'Show more' : 'Show less'}</span>
          <motion.span
            className="w-6 h-6"
            variants={rotate180Variants}
            initial="inActive"
            animate={minimized ? 'active' : 'inActive'}
          >
            <AngleLeftIcon className="rotate-90" />
          </motion.span>
        </button>
      ) : null}
    </div>
  ) : null;
}

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

import AngleLeftIcon from '@/assets/icons/angle-left.svg';
import { useTimeout } from '@/hooks/util/time';
import { rotate180Variants } from '@/constants/variants';

interface VideoDescriptionProps {
  text: string;
  brief?: boolean;
}

export default function VideoDescription({
  text,
  brief,
}: VideoDescriptionProps) {
  const [collapsed, setCollapsed] = useState(brief);
  const [maxHeight, setMaxHeight] = useState<string | number>('100vh');
  const [showButton, setShowButton] = useState(false);
  const [showMore, setShowMore] = useState(true);
  const [setCollapseTimeout] = useTimeout();
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const collapsedHeightRef = useRef(0);

  useEffect(() => {
    if (!collapsed || !paragraphRef.current) return;

    const { clientHeight, scrollHeight } = paragraphRef.current;
    setShowButton(scrollHeight > clientHeight);
  }, [collapsed]);

  useEffect(() => {
    if (!paragraphRef.current) return;

    const { clientHeight } = paragraphRef.current;
    setMaxHeight(clientHeight);
  }, [collapsed]);

  const toggleHandler = () => {
    if (!paragraphRef.current) return;

    if (collapsed) {
      const { clientHeight } = paragraphRef.current;
      collapsedHeightRef.current = clientHeight;
      setShowMore(false);
      setCollapsed(false);
    }

    if (!collapsed) {
      setShowMore(true);
      setMaxHeight(collapsedHeightRef.current);
      setCollapseTimeout(() => setCollapsed(true), 200);
    }
  };

  return text ? (
    <div className="relative">
      {brief && showButton ? (
        <button
          className="absolute bottom-0 flex items-center gap-2 font-medium transition-opacity hover:opacity-70"
          onClick={toggleHandler}
        >
          <span>{showMore ? 'Show more' : 'Show less'}</span>
          <motion.span
            className="w-6 h-6"
            variants={rotate180Variants}
            initial="active"
            animate={showMore ? 'active' : 'inActive'}
          >
            <AngleLeftIcon className="rotate-90" />
          </motion.span>
        </button>
      ) : null}
      <article
        className="overflow-hidden mb-10 transition-all duration-200"
        style={{ maxHeight }}
      >
        <p
          className="whitespace-pre-wrap data-[collapsed=true]:line-clamp-4"
          ref={paragraphRef}
          data-collapsed={collapsed}
        >
          {text}
        </p>
      </article>
    </div>
  ) : null;
}

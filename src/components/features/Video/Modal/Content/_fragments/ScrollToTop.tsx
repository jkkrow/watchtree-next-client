import { useContext, useState, useEffect } from 'react';

import ArrowLeftIcon from '@/assets/icons/arrow-left.svg';
import { VideoModalContext } from '@/context/video-modal';

export default function ScrollToTop() {
  const { headerRef } = useContext(VideoModalContext);
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    if (!headerRef || !headerRef.current) return;

    const header = headerRef.current;
    const observer = new IntersectionObserver(([entry]) => {
      setIsTop(entry.isIntersecting);
    });

    observer.observe(header);

    return () => {
      observer.disconnect();
    };
  }, [headerRef]);

  const scrollToTopHandler = () => {
    if (!headerRef || !headerRef.current) return;
    headerRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className="sticky bottom-0 opacity-0 pointer-events-none transition-opacity data-[visible=true]:opacity-100 data-[visible=true]:pointer-events-auto"
      data-visible={!isTop}
    >
      <button
        className="absolute bottom-6 right-6 p-3 bg-inversed text-inversed rounded-full shadow-md transition-colors hover:bg-hover-inversed"
        onClick={scrollToTopHandler}
      >
        <ArrowLeftIcon className="w-6 h-6 rotate-90" />
      </button>
    </div>
  );
}

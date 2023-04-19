import { useContext } from 'react';

import ArrowLeftIcon from '@/assets/icons/arrow-left.svg';
import { VideoModalContext } from '@/context/video-modal';

export default function Header() {
  const { headerRef, close } = useContext(VideoModalContext);

  return (
    <header className="relative top-0 w-full p-6 z-[1]" ref={headerRef}>
      <button
        className="w-6 h-6 hover:opacity-70 transition-opacity"
        onClick={close}
      >
        <ArrowLeftIcon />
      </button>
    </header>
  );
}

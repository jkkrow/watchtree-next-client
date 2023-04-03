import { useState, useRef, useCallback, useEffect } from 'react';

import { useTimeout } from '../util/time';

export interface KeyActionHandle {
  rewind: HTMLDivElement;
  skip: HTMLDivElement;
}

interface Dependencies {
  active?: boolean;
  onProgress: (direction: 1 | 0) => void;
  onVolume: (direction: 1 | 0) => void;
  onPlayback: () => void;
  onSelect: (index: number) => void;
}

export const useKeyControls = ({
  active,
  onProgress,
  onVolume,
  onPlayback,
  onSelect,
}: Dependencies) => {
  const [displayKeyAction, setDisplayKeyAction] = useState(false);

  const videoKeyActionRef = useRef<KeyActionHandle>(null);

  const [setKeyActionVolumeTimeout] = useTimeout();

  const animateProgress = useCallback((direction: 1 | 0) => {
    const container = videoKeyActionRef.current![direction ? 'skip' : 'rewind'];
    const element = container.firstElementChild as HTMLElement;

    container.animate(
      [{ opacity: 0 }, { opacity: 1 }, { opacity: 1 }, { opacity: 0 }],
      {
        duration: 1000,
        easing: 'ease-out',
        fill: 'forwards',
      }
    );
    element.animate(
      [
        { opacity: 1, transform: 'translateX(0)' },
        { opacity: 0, transform: `translateX(${direction ? '20%' : '-20%'})` },
      ],
      {
        duration: 1000,
        easing: 'ease-in-out',
        fill: 'forwards',
      }
    );
  }, []);

  const keyEventHandler = useCallback(
    (event: KeyboardEvent) => {
      const activeElement = document.activeElement;

      if (
        !activeElement ||
        (activeElement.localName === 'input' &&
          (activeElement as HTMLInputElement).type !== 'range') ||
        activeElement.localName === 'textarea'
      ) {
        return;
      }

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          onProgress(0);
          animateProgress(0);
          break;

        case 'ArrowRight':
          event.preventDefault();
          onProgress(1);
          animateProgress(1);
          break;

        case 'ArrowUp':
          event.preventDefault();
          onVolume(1);
          setDisplayKeyAction(true);
          setKeyActionVolumeTimeout(() => {
            setDisplayKeyAction(false);
          }, 1500);

          break;
        case 'ArrowDown':
          event.preventDefault();
          onVolume(0);
          setDisplayKeyAction(true);
          setKeyActionVolumeTimeout(() => {
            setDisplayKeyAction(false);
          }, 1500);
          break;

        case ' ':
          event.preventDefault();
          onPlayback();
          break;

        case '1':
        case '2':
        case '3':
        case '4':
          event.preventDefault();
          onSelect(+event.key - 1);
      }
    },
    [
      animateProgress,
      onProgress,
      onVolume,
      onPlayback,
      onSelect,
      setKeyActionVolumeTimeout,
    ]
  );

  useEffect(() => {
    if (active) {
      document.addEventListener('keydown', keyEventHandler);
    } else {
      document.removeEventListener('keydown', keyEventHandler);
    }

    return () => {
      document.removeEventListener('keydown', keyEventHandler);
    };
  }, [active, keyEventHandler]);

  return { displayKeyAction, videoKeyActionRef };
};

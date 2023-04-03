import { memo } from 'react';

import Btn from '../Btn';
import FullscreenIcon from '@/assets/icons/fullscreen.svg';
import FullscreenExitIcon from '@/assets/icons/fullscreen-exit.svg';

interface FullscreenProps {
  isFullscreen: boolean;
  onToggle: () => void;
}

const Fullscreen = ({ isFullscreen, onToggle }: FullscreenProps) => (
  <div>
    <Btn
      label={isFullscreen ? 'Fullscreen Off' : 'Fullscreen'}
      onClick={onToggle}
    >
      {!isFullscreen && <FullscreenIcon />}
      {isFullscreen && <FullscreenExitIcon />}
    </Btn>
  </div>
);

export default memo(Fullscreen);

import { memo } from 'react';

import styles from './index.module.scss';

interface ProgressProps {
  videoDuration: number;
  currentProgress: number;
  bufferProgress: number;
  progressTooltip: string;
  progressTooltipPosition: string;
  selectionStartPoint: number;
  selectionEndPoint: number;
  editMode?: boolean;
  onHover: (event: React.MouseEvent<HTMLInputElement>) => void;
  onTouch: (event: React.TouchEvent<HTMLInputElement>) => void;
  onSeek: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Progress = ({
  bufferProgress,
  currentProgress,
  videoDuration,
  progressTooltip,
  progressTooltipPosition,
  selectionStartPoint,
  selectionEndPoint,
  editMode,
  onHover,
  onTouch,
  onSeek,
}: ProgressProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.range}>
        <div data-type="background" />
        <div data-type="buffer" style={{ width: bufferProgress + '%' }} />
        {editMode && (
          <div
            data-type="selection-time"
            style={{
              left: (selectionStartPoint / videoDuration) * 100 + '%',
              width:
                ((selectionEndPoint - selectionStartPoint) / videoDuration) *
                  100 +
                '%',
            }}
          />
        )}
        <div
          data-type="current"
          style={{ width: (currentProgress / videoDuration) * 100 + '%' }}
        >
          <div data-type="thumb" />
        </div>
        <input
          type="range"
          data-type="seek"
          step="any"
          max={videoDuration}
          value={currentProgress}
          onMouseMove={onHover}
          onTouchMove={onTouch}
          onChange={onSeek}
        />
      </div>

      <span style={{ left: progressTooltipPosition }}>{progressTooltip}</span>
    </div>
  );
};

export default memo(Progress);

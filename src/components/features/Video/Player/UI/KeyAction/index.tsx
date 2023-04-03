import { memo, forwardRef, useRef, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import VolumeHighIcon from '@/assets/icons/volume-high.svg';
import VolumeMiddleIcon from '@/assets/icons/volume-middle.svg';
import VolumeLowIcon from '@/assets/icons/volume-low.svg';
import VolumeMuteIcon from '@/assets/icons/volume-mute.svg';
import TrackRewindIcon from '@/assets/icons/track-rewind.svg';
import TrackSkipIcon from '@/assets/icons/track-skip.svg';
import { KeyActionHandle } from '@/hooks/player/key-control';
import { opacityVariants, transformYVariants } from '@/constants/variants';
import styles from './index.module.scss';

interface KeyActionProps {
  on: boolean;
  volume: number;
}

const KeyAction = forwardRef<KeyActionHandle, KeyActionProps>(
  function KeyAction({ on, volume }, ref) {
    const rewindRef = useRef<HTMLDivElement>(null);
    const skipRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
      get rewind() {
        return rewindRef.current!;
      },
      get skip() {
        return skipRef.current!;
      },
    }));

    return (
      <div className={styles.container}>
        <AnimatePresence>
          {on ? (
            <motion.div
              className={styles.volume}
              variants={opacityVariants}
              initial="inActive"
              animate="active"
              exit="inActive"
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <motion.div
                className={styles.volumeContainer}
                variants={transformYVariants}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                <div className={styles.volumeIcon}>
                  {volume > 0.7 && <VolumeHighIcon />}
                  {volume <= 0.7 && volume > 0.3 && <VolumeMiddleIcon />}
                  {volume <= 0.3 && volume > 0 && <VolumeLowIcon />}
                  {volume === 0 && <VolumeMuteIcon />}
                </div>
                <div className={styles.volumeRange}>
                  <div data-type="background" />
                  <div
                    data-type="current"
                    style={{ width: `${volume * 100}%` }}
                  />
                </div>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div className={styles.progress} data-type="rewind" ref={rewindRef}>
          <div className={styles.progressContainer}>
            <TrackRewindIcon />
            <span>- 10 seconds</span>
          </div>
        </div>
        <div className={styles.progress} data-type="skip" ref={skipRef}>
          <div className={styles.progressContainer}>
            <TrackSkipIcon />
            <span>+ 10 seconds</span>
          </div>
        </div>
      </div>
    );
  }
);

export default memo(KeyAction);

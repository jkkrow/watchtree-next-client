import { useState, memo, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import ArrowLeftIcon from '@/assets/icons/arrow-left.svg';
import { useClickOutside } from '@/hooks/ui/click-outside';
import { playerDropdownVariants } from '@/constants/variants';
import styles from './index.module.scss';

type SettingsType = 'resolution' | 'speed';

interface SettingsDropdownProps {
  on: boolean;
  resolutions: shaka.extern.TrackList;
  playbackRates: number[];
  activeResolutionHeight: number | 'auto';
  activePlaybackRate: number;
  onClose: () => void;
  onChangeResolution: (resolution: shaka.extern.Track | 'auto') => void;
  onChangePlaybackRate: (playbackRate: number) => void;
}

const SettingsDropdown = ({
  on,
  resolutions,
  playbackRates,
  activeResolutionHeight,
  activePlaybackRate,
  onClose,
  onChangeResolution,
  onChangePlaybackRate,
}: SettingsDropdownProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isIndex, setIsIndex] = useState(true);
  const [activeType, setActiveType] = useState<SettingsType>('resolution');
  const [dropdownHeight, setDropdownHeight] = useState<'initial' | number>(
    'initial'
  );

  const dropdownRef = useClickOutside<HTMLDivElement>(onClose, isMounted, [
    'click',
  ]);

  useEffect(() => {
    setIsMounted(on);
    if (!on) {
      setIsMounted(false);
      setIsIndex(true);
      setDropdownHeight('initial');
    }
  }, [on]);

  useEffect(() => {
    if (!on) return;

    const dropdown = dropdownRef.current!;
    const index = dropdown.children[0] as HTMLElement;
    const main = dropdown.children[1] as HTMLElement;
    const menu = isIndex ? index : main;

    setDropdownHeight(menu?.offsetHeight || 'initial');
  }, [on, dropdownRef, isIndex]);

  const selectMenuHandler = useCallback(
    (activeType: SettingsType) => () => {
      setIsIndex(false);
      setActiveType(activeType);
    },
    []
  );

  const changeResolutionHandler = useCallback(
    (resolution: shaka.extern.Track | 'auto') => () => {
      onChangeResolution(resolution);
      setIsIndex(true);
    },
    [onChangeResolution]
  );

  const changePlaybackRateHandler = useCallback(
    (playbackRate: number) => () => {
      onChangePlaybackRate(playbackRate);
      setIsIndex(true);
    },
    [onChangePlaybackRate]
  );

  const isValidResolution = !!resolutions.find(
    (resolution) => resolution.height === activeResolutionHeight
  );
  const autoResolutionHeight = resolutions.find(
    (resolution) => resolution.active
  )?.height;

  const indexMenu = (
    <ul className={styles.list}>
      {resolutions.length > 0 && (
        <li className={styles.item} onClick={selectMenuHandler('resolution')}>
          <span>Resolution</span>
          <span>
            {activeResolutionHeight === 'auto' || !isValidResolution
              ? `Auto (${autoResolutionHeight}p)`
              : `${activeResolutionHeight}p`}
          </span>
        </li>
      )}
      <li className={styles.item} onClick={selectMenuHandler('speed')}>
        <span>Speed</span>
        <span>x {activePlaybackRate}</span>
      </li>
    </ul>
  );

  const resolutionList = (
    <ul className={styles.list}>
      {resolutions.map((resolution) => (
        <li
          key={resolution.id}
          className={styles.item}
          data-active={activeResolutionHeight === resolution.height}
          onClick={changeResolutionHandler(resolution)}
        >
          {resolution.height}p
        </li>
      ))}
      <li
        className={styles.item}
        data-active={activeResolutionHeight === 'auto'}
        onClick={changeResolutionHandler('auto')}
      >
        <span>Auto</span>
      </li>
    </ul>
  );

  const playbackRateList = (
    <ul className={styles.list}>
      {playbackRates.map((playbackRate) => (
        <li
          key={playbackRate}
          className={styles.item}
          data-active={activePlaybackRate === playbackRate}
          onClick={changePlaybackRateHandler(playbackRate)}
        >
          {playbackRate}
        </li>
      ))}
    </ul>
  );

  const mainMenu = (
    <>
      <div className={styles.label} onClick={() => setIsIndex(true)}>
        <ArrowLeftIcon />
        {activeType === 'resolution' ? <span>Resolution</span> : null}
        {activeType == 'speed' ? <span>Speed</span> : null}
      </div>
      {activeType === 'resolution' && resolutionList}
      {activeType === 'speed' && playbackRateList}
    </>
  );

  return (
    <AnimatePresence>
      {on ? (
        <motion.div
          className={styles.container}
          ref={dropdownRef}
          variants={playerDropdownVariants.container}
          initial="inActive"
          animate="active"
          exit="inActive"
          style={{ height: dropdownHeight }}
          transition={{ ease: 'easeOut' }}
        >
          <motion.div
            className={styles.menu}
            variants={playerDropdownVariants.index}
            initial="active"
            animate={isIndex ? 'active' : 'inActive'}
            transition={{ ease: 'easeOut' }}
          >
            {indexMenu}
          </motion.div>
          <motion.div
            className={styles.menu}
            variants={playerDropdownVariants.main}
            initial="inActive"
            animate={!isIndex ? 'active' : 'inActive'}
            transition={{ ease: 'easeOut' }}
          >
            {mainMenu}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default memo(SettingsDropdown);

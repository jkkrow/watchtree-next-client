import { useCallback, useMemo } from 'react';

import Controls from './Controls';
import VideoHeader from './UI/Header';
import Playback from './Controls/Playback';
import Volume from './Controls/Volume';
import Time from './Controls/Time';
import Progress from './Controls/Progress';
import Fullscreen from './Controls/Fullscreen';
import Settings from './Controls/Settings';
import SettingsDropdown from './Controls/SettingsDropdown';
import Records from './Controls/Records';
import RecordsModal from './Controls/RecordsModal';
import Loader from './UI/Loader';
import Skip from './Controls/Skip';
import Rewind from './Controls/Rewind';
import Error from './UI/Error';
import Selector from './UI/Selector';
import KeyAction from './UI/KeyAction';
import { usePlayer } from '@/hooks/player';
import { useControls } from '@/hooks/player/controls';
import { usePlayback } from '@/hooks/player/playback';
import { useVolume } from '@/hooks/player/volume';
import { useTime } from '@/hooks/player/time';
import { useProgress } from '@/hooks/player/progress';
import { useFullscreen } from '@/hooks/player/fullscreen';
import { useSettings } from '@/hooks/player/settings';
import { useResolution } from '@/hooks/player/resolution';
import { usePlaybackRate } from '@/hooks/player/playback-rate';
import { useRecords } from '@/hooks/player/records';
import { useLoader } from '@/hooks/player/loader';
import { useSelector } from '@/hooks/player/selector';
import { useNavigation } from '@/hooks/player/navigation';
import { useError } from '@/hooks/player/error';
import { useKeyControls } from '@/hooks/player/key-control';
import { VideoPlayerProps } from '@/hooks/player';
import styles from './index.module.scss';

export default function VideoPlayer(props: VideoPlayerProps) {
  /**
   * HOOKS
   */

  const videoPlayerDependencies = usePlayer(props);

  const {
    displayControls,
    displayCursor,
    showControls,
    hideControls,
    hideControlsInSeconds,
  } = useControls(videoPlayerDependencies);

  const { playbackState, setPlaybackState, togglePlayback, startAutoPlay } =
    usePlayback(videoPlayerDependencies);

  const {
    volumeState,
    volumeChangeHandler,
    changeVolumeWithInput,
    changeVolumeWithKey,
    configureVolume,
    toggleMute,
  } = useVolume(videoPlayerDependencies);

  const { currentTimeUI, remainedTimeUI, updateTime } = useTime(
    videoPlayerDependencies
  );

  const {
    currentProgress,
    bufferProgress,
    videoDuration,
    progressTooltip,
    progressTooltipPosition,
    updateProgress,
    updateTooltip,
    updateTooltipMobile,
    changeProgressWithInput,
    changeProgressWithKey,
    configureDuration,
  } = useProgress(videoPlayerDependencies);

  const { fullscreenState, toggleFullscreen } = useFullscreen(
    videoPlayerDependencies
  );

  const { displaySettings, toggleSettings, closeSettings } = useSettings();

  const {
    resolutions,
    activeResolutionHeight,
    changeResolution,
    configureResolution,
  } = useResolution(videoPlayerDependencies);

  const {
    playbackRates,
    activePlaybackRate,
    changePlaybackRate,
    configurePlaybackRate,
  } = usePlaybackRate(videoPlayerDependencies);

  const {
    records,
    displayRecords,
    closeRecords,
    toggleRecords,
    navigateToSelectedVideo,
  } = useRecords(videoPlayerDependencies);

  const { displayLoader, showLoader, hideLoader } = useLoader();

  const {
    displaySelector,
    displaySelectorTimer,
    leftTime,
    nextVideos,
    updateSelector,
    selectNextVideo,
    videoEndedHandler,
  } = useSelector(videoPlayerDependencies);

  const { navigateToNextVideo, navigateToPreviousVideo, navigateToFirstVideo } =
    useNavigation(videoPlayerDependencies);

  const { videoError, errorHandler } = useError(videoPlayerDependencies);

  const keyControlsDependencies = useMemo(
    () => ({
      active: videoPlayerDependencies.active,
      onPlayback: togglePlayback,
      onProgress: changeProgressWithKey,
      onVolume: changeVolumeWithKey,
      onSelect: selectNextVideo,
    }),
    [
      videoPlayerDependencies.active,
      togglePlayback,
      changeProgressWithKey,
      changeVolumeWithKey,
      selectNextVideo,
    ]
  );

  const { displayKeyAction, videoKeyActionRef } = useKeyControls(
    keyControlsDependencies
  );

  /**
   * EVENT HANDLERS
   */

  const videoPlayHandler = useCallback(() => {
    hideControlsInSeconds();
    setPlaybackState(true);
  }, [hideControlsInSeconds, setPlaybackState]);

  const videoPauseHandler = useCallback(() => {
    showControls();
    setPlaybackState(false);
  }, [showControls, setPlaybackState]);

  const timeChangeHandler = useCallback(() => {
    updateTime();
    updateProgress();
    updateSelector();
  }, [updateTime, updateProgress, updateSelector]);

  const videoLoadedHandler = useCallback(() => {
    timeChangeHandler();
    configureVolume();
    configureDuration();
    configureResolution();
    configurePlaybackRate();
    startAutoPlay();
  }, [
    timeChangeHandler,
    configureVolume,
    configureDuration,
    configureResolution,
    configurePlaybackRate,
    startAutoPlay,
  ]);

  /**
   * RENDER
   */

  return (
    <div
      className={styles.container}
      style={{ cursor: displayCursor ? 'default' : 'none' }}
      onMouseMove={showControls}
      onTouchMove={showControls}
      onMouseLeave={hideControls}
      onContextMenu={(e) =>
        process.env.NODE_ENV !== 'development' && e.preventDefault()
      }
    >
      {!videoPlayerDependencies.editMode && (
        <VideoHeader hideOn={!displayControls || displaySelector} />
      )}
      <video
        ref={videoPlayerDependencies.videoRef}
        onLoadedMetadata={videoLoadedHandler}
        onClick={togglePlayback}
        onPlay={videoPlayHandler}
        onPause={videoPauseHandler}
        onEnded={videoEndedHandler}
        onVolumeChange={volumeChangeHandler}
        onTimeUpdate={timeChangeHandler}
        onDoubleClick={toggleFullscreen}
        onSeeking={showLoader}
        onSeeked={hideLoader}
        onWaiting={showLoader}
        onCanPlay={hideLoader}
        onError={errorHandler}
      />
      <Loader on={displayLoader} />
      <KeyAction
        ref={videoKeyActionRef}
        on={displayKeyAction}
        volume={volumeState}
      />
      <Selector
        on={displaySelector}
        timerOn={displaySelectorTimer}
        leftTime={leftTime}
        next={nextVideos}
        onSelect={selectNextVideo}
      />
      <Error error={videoError} />
      <RecordsModal
        on={displayRecords}
        records={records}
        onClose={closeRecords}
        onSelect={navigateToSelectedVideo}
      />
      <Controls hideOn={!displayControls || displaySelector}>
        <SettingsDropdown
          on={displaySettings}
          resolutions={resolutions}
          playbackRates={playbackRates}
          activeResolutionHeight={activeResolutionHeight}
          activePlaybackRate={activePlaybackRate}
          onClose={closeSettings}
          onChangeResolution={changeResolution}
          onChangePlaybackRate={changePlaybackRate}
        />
        <section>
          <Time time={currentTimeUI} />
          <Progress
            bufferProgress={bufferProgress}
            currentProgress={currentProgress}
            videoDuration={videoDuration}
            progressTooltip={progressTooltip}
            progressTooltipPosition={progressTooltipPosition}
            selectionStartPoint={videoPlayerDependencies.selectionTimeStart}
            selectionEndPoint={videoPlayerDependencies.selectionTimeEnd}
            editMode={videoPlayerDependencies.editMode}
            onHover={updateTooltip}
            onTouch={updateTooltipMobile}
            onSeek={changeProgressWithInput}
          />
          <Time time={remainedTimeUI} />
        </section>
        <section>
          <div>
            <Volume
              volume={volumeState}
              onToggle={toggleMute}
              onSeek={changeVolumeWithInput}
            />
          </div>
          <div>
            <Rewind
              onRestart={navigateToFirstVideo}
              onPrev={navigateToPreviousVideo}
            />
            <Playback isPaused={playbackState} onToggle={togglePlayback} />
            <Skip onNext={navigateToNextVideo(nextVideos)} />
          </div>
          <div>
            <Settings onToggle={toggleSettings} />
            <Records onToggle={toggleRecords} />
            <Fullscreen
              isFullscreen={fullscreenState}
              onToggle={toggleFullscreen}
            />
          </div>
        </section>
      </Controls>
    </div>
  );
}

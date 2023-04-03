import { useState, useEffect, useCallback } from 'react';

import { VideoPlayerDependencies } from '.';
import { useInterval } from '../util/time';
import { setResolution as dispatchResolution } from '@/store/features/video/video.slice';
import { useAppSelector, useAppDispatch } from '@/hooks/store';

export const useResolution = ({ player, active }: VideoPlayerDependencies) => {
  const videoResolution = useAppSelector((state) => state.video.resolution);
  const dispatch = useAppDispatch();

  const [resolutions, setResolutions] = useState<shaka.extern.TrackList>([]);
  const [activeResolutionHeight, setActiveResolutionHeight] = useState<
    number | 'auto'
  >(videoResolution || 'auto');

  const [setResolutionInterval, clearResolutionInterval] = useInterval();

  const changeResolution = useCallback(
    (resolution: shaka.extern.Track | 'auto') => {
      if (!player) return;

      let resolutionHeight: number | 'auto' = 'auto';

      if (resolution === 'auto') {
        player.configure({ abr: { enabled: true } });
      } else {
        player.configure({ abr: { enabled: false } });
        player.selectVariantTrack(resolution);

        resolutionHeight = resolution.height || 'auto';
      }

      setActiveResolutionHeight(resolutionHeight);
      dispatch(dispatchResolution(resolutionHeight));
    },
    [player, dispatch]
  );

  const configureResolution = useCallback(() => {
    if (!player) return;

    let resolutionHeight: number | 'auto' = 'auto';
    const tracks = player.getVariantTracks();
    const matchedResolution = tracks.find(
      (track) => track.height === videoResolution
    );

    if (videoResolution === 'auto' || !matchedResolution) {
      player.configure({ abr: { enabled: true } });
    } else {
      player.configure({ abr: { enabled: false } });
      player.selectVariantTrack(matchedResolution);

      resolutionHeight = matchedResolution.height || 'auto';
    }

    setResolutions(tracks);
    setActiveResolutionHeight(resolutionHeight);
  }, [player, videoResolution]);

  useEffect(() => {
    if (activeResolutionHeight !== 'auto') {
      clearResolutionInterval();
      return;
    }

    setResolutionInterval(() => {
      if (!player) return;
      setResolutions(player.getVariantTracks());
    }, 5000);
  }, [
    player,
    activeResolutionHeight,
    setResolutionInterval,
    clearResolutionInterval,
  ]);

  useEffect(() => {
    if (active) return;
    configureResolution();
  }, [active, configureResolution]);

  return {
    resolutions,
    activeResolutionHeight,
    changeResolution,
    configureResolution,
  };
};

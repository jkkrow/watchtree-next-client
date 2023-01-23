import { Fragment } from 'react';

import { wrapper } from '@/store';
import { useAppDispatch } from '@/hooks/store.hook';
import { getVideos } from '@/store/features/video/video.api';
import { setVolume, setActiveNode } from '@/store/features/video/video.action';

export default function BrowsePage() {
  const dispatch = useAppDispatch();

  const setVolumeHandler = () => {
    dispatch(setVolume(0.3));
    dispatch(setActiveNode('asdf'));
  };

  return (
    <Fragment>
      <h2 onClick={setVolumeHandler}>Browse Page</h2>
    </Fragment>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(({ dispatch }) => {
  return async (context) => {
    const { data } = await dispatch(getVideos.initiate({}));

    return { props: { data } };
  };
});

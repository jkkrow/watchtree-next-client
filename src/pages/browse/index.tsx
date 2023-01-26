import { Fragment } from 'react';

import { wrapper } from '@/store';
import { getVideos } from '@/store/features/video/video.api';

export default function BrowsePage() {
  return (
    <Fragment>
      <h2>Browse Page</h2>
    </Fragment>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(({ dispatch }) => {
  return async (context) => {
    const { data } = await dispatch(getVideos.initiate());

    return { props: { data: data || null } };
  };
});

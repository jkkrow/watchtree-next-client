import { useRouter } from 'next/router';
import { Fragment } from 'react';

import { useGetVideosQuery } from '@/store/features/video/video.api';
import {
  useSigninMutation,
  useSignoutMutation,
} from '@/store/features/user/user.api';

export default function Browse() {
  const router = useRouter();
  const { data } = useGetVideosQuery();

  const [signin] = useSigninMutation();
  const [signout] = useSignoutMutation();

  return (
    <Fragment>
      <h2 onClick={() => router.push('/')}>Browse Page</h2>
      <button
        onClick={() => signin({ email: 'test@test.com', password: 'Test!234' })}
      >
        signin
      </button>
      <button onClick={() => signout()}>signout</button>
    </Fragment>
  );
}

import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { useEffect } from 'react';

import {
  useSigninMutation,
  useSignoutMutation,
} from '@/store/features/user/user.api';
import {
  useGetHistoriesQuery,
  useSaveHistoryMutation,
  useDeleteHistoryMutation,
} from '@/store/features/history/history.api';
import { useAppSelector } from '@/hooks/store.hook';

export default function Browse() {
  const router = useRouter();
  const { info } = useAppSelector((state) => state.user);
  const { data } = useGetHistoriesQuery({ max: 30, skipEnded: true });

  const [signin] = useSigninMutation();
  const [signout] = useSignoutMutation();

  const [saveHistory] = useSaveHistoryMutation();
  const [deleteHistory] = useDeleteHistoryMutation();

  useEffect(() => {
    console.log(data);
  }, [data]);

  const signinHandler = () => {
    signin({ email: 'test@test.com', password: 'Test!234' });
  };

  const signoutHandler = () => {
    signout();
  };

  const saveHistoryHandler = () => {
    saveHistory({
      videoId: 'f44f0ffd-6fed-4bf8-a86e-d07a1cfd87e9',
      activeNodeId: '8abf015a-6f31-4c94-87b4-82f5c0a8d5e9',
      progress: 134,
      totalProgress: 324,
      ended: true,
    });
  };

  const deleteHistoryHandler = () => {
    deleteHistory('f44f0ffd-6fed-4bf8-a86e-d07a1cfd87e9');
  };

  return (
    <Fragment>
      <h2 onClick={() => router.push('/')}>Browse Page</h2>
      <div className="flex flex-col gap-1 m-2">
        <button onClick={signinHandler}>signin</button>
        <button onClick={signoutHandler}>signout</button>
      </div>
      <div className="flex flex-col gap-1 m-2">
        <button onClick={saveHistoryHandler}>Save History</button>
        <button onClick={deleteHistoryHandler}>Delete History</button>
      </div>
    </Fragment>
  );
}

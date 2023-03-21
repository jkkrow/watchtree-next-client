import Head from 'next/head';
import { ReactElement } from 'react';

import UserLayout from '@/components/features/User/_layout';
import SubscriptionHeader from '@/components/features/User/Subscription/Header';
import SubscriptionGrid from '@/components/features/User/Subscription/grid';
import SkeletonGrid from '@/components/common/UI/Skeleton/Grid';
import Spinner from '@/components/common/UI/Spinner';
import { ListContextProvider } from '@/context/List';
import { useAppSelector } from '@/hooks/store';
import { useInfiniteQuery } from '@/hooks/query/infinite';
import { getSubscribes } from '@/store/features/channel/channel.api';
import { NextPageWithLayout } from '../_app';

const MAX = 30;

const Subscribes: NextPageWithLayout = () => {
  const user = useAppSelector((state) => state.user.info);
  const { data, isFetchingMore, listRef } = useInfiniteQuery(
    getSubscribes,
    { max: MAX },
    { skip: !user }
  );

  return (
    <>
      <Head>
        <title>Subscribes</title>
      </Head>

      <ListContextProvider label="subscribes" items={data?.items || []}>
        <SubscriptionGrid ref={listRef} />
      </ListContextProvider>
      <SkeletonGrid on={!data} count={MAX} type="subscription" />
      <Spinner on={isFetchingMore} size={64} />
    </>
  );
};

Subscribes.getLayout = function getLayout(page: ReactElement) {
  return (
    <UserLayout>
      <SubscriptionHeader />
      {page}
    </UserLayout>
  );
};

export default Subscribes;

import Head from 'next/head';
import { ReactElement } from 'react';

import UserLayout from '@/components/features/User/_layout';
import SubscriptionHeader from '@/components/features/User/Subscription/Header';
import SubscriptionGrid from '@/components/features/User/Subscription/grid';
import SkeletonGrid from '@/components/common/UI/Skeleton/Grid';
import Pagination from '@/components/common/UI/Pagination';
import { ListContextProvider } from '@/context/List';
import { useAppSelector } from '@/hooks/store';
import { usePaginationQuery } from '@/hooks/query/pagination';
import { getSubscribers } from '@/store/features/channel/channel.api';
import { NextPageWithLayout } from '../_app';

const MAX = 30;

const Subscribers: NextPageWithLayout = () => {
  const user = useAppSelector((state) => state.user.info);
  const { data, page } = usePaginationQuery(
    getSubscribers,
    { max: MAX, withCount: true },
    { skip: !user }
  );

  return (
    <>
      <Head>
        <title>Subscribers</title>
      </Head>

      <ListContextProvider label="subscribers" items={data?.items || []}>
        <SubscriptionGrid />
      </ListContextProvider>
      <SkeletonGrid on={!data} count={MAX} type="subscription" />
      <Pagination count={data?.count || 0} size={MAX} page={page} />
    </>
  );
};

Subscribers.getLayout = function getLayout(page: ReactElement) {
  return (
    <UserLayout>
      <SubscriptionHeader />
      {page}
    </UserLayout>
  );
};

export default Subscribers;
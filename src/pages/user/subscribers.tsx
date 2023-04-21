import Head from 'next/head';

import UserLayout from '@/components/features/User/_layout';
import SubscriptionContainer from '@/components/features/User/Subscription/Container';
import SubscriptionGrid from '@/components/features/User/Subscription/grid';
import SkeletonGrid from '@/components/common/UI/Skeleton/Grid';
import Pagination from '@/components/common/UI/Pagination';
import { usePaginationQuery } from '@/hooks/query/pagination';
import { getSubscribers } from '@/store/features/channel/channel.api';
import { NextPageWithLayout } from '../_app';

const MAX = 30;

const Subscribers: NextPageWithLayout = () => {
  const { data, error, page } = usePaginationQuery(getSubscribers, {
    max: MAX,
    withCount: true,
  });

  return (
    <>
      <Head>
        <title>Subscribers - WatchTree</title>
      </Head>

      <SkeletonGrid on={!data && !error} count={MAX} type="subscription" />
      <SubscriptionGrid items={data?.items} />
      <Pagination count={data?.count || 0} size={MAX} page={page} />
    </>
  );
};

Subscribers.getLayout = function getLayout(page) {
  return (
    <UserLayout>
      <SubscriptionContainer>{page}</SubscriptionContainer>
    </UserLayout>
  );
};

export default Subscribers;

import Head from 'next/head';

import UserLayout from '@/components/features/User/_layout';
import SubscriptionContainer from '@/components/features/User/Subscription/Container';
import SubscriptionGrid from '@/components/features/User/Subscription/grid';
import SkeletonGrid from '@/components/common/UI/Skeleton/Grid';
import Spinner from '@/components/common/UI/Spinner';
import NotFound from '@/components/common/UI/NotFound';
import SubscribeUsersIcon from '@/assets/icons/subscribe-users.svg';
import { useInfiniteQuery } from '@/hooks/query/infinite';
import { getSubscribes } from '@/store/features/channel/channel.api';
import { NextPageWithLayout } from '../_app';

const MAX = 30;

const Subscribes: NextPageWithLayout = () => {
  const { data, error, isFetchingMore, listRef } = useInfiniteQuery(
    getSubscribes,
    { max: MAX }
  );

  return (
    <>
      <Head>
        <title>Subscribes</title>
      </Head>

      <SubscriptionGrid items={data?.items || []} ref={listRef} />
      <SkeletonGrid on={!data && !error} count={MAX} type="subscription" />
      <NotFound
        items={data?.items}
        label="Subscribe"
        icon={SubscribeUsersIcon}
      />
      <Spinner on={isFetchingMore} size={64} />
    </>
  );
};

Subscribes.getLayout = function getLayout(page) {
  return (
    <UserLayout>
      <SubscriptionContainer>{page}</SubscriptionContainer>
    </UserLayout>
  );
};

export default Subscribes;

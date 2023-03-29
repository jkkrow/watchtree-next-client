import Head from 'next/head';

import UserLayout from '@/components/features/User/_layout';
import SubscriptionContainer from '@/components/features/User/Subscription/Container';
import SubscriptionGrid from '@/components/features/User/Subscription/grid';
import SkeletonGrid from '@/components/common/UI/Skeleton/Grid';
import Pagination from '@/components/common/UI/Pagination';
import NotFound from '@/components/common/UI/NotFound';
import SubscribeUsersIcon from '@/assets/icons/subscribe-users.svg';
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

      <SubscriptionGrid items={data?.items || []} />
      <SkeletonGrid on={!data} count={MAX} type="subscription" />
      <NotFound
        items={data?.items}
        label="Subscriber"
        icon={SubscribeUsersIcon}
      />
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

import Head from 'next/head';
import dynamic from 'next/dynamic';

import UserLayout from '@/components/features/User/_layout';
import { NextPageWithLayout } from '../_app';

const Dashboard = dynamic(
  () => import('@/components/features/User/Account/Dashboard'),
  { ssr: false }
);

const Account: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Account</title>
      </Head>

      <Dashboard />
    </>
  );
};

Account.getLayout = function getLayout(page) {
  return <UserLayout>{page}</UserLayout>;
};

export default Account;

import Head from 'next/head';
import dynamic from 'next/dynamic';

import UserLayout from '@/components/features/User/_layout';
const Dashboard = dynamic(
  () => import('@/components/features/User/Account/Dashboard'),
  { ssr: false }
);

export default function Account() {
  return (
    <>
      <Head>
        <title>Account</title>
      </Head>
      <UserLayout>
        <Dashboard />
      </UserLayout>
    </>
  );
}

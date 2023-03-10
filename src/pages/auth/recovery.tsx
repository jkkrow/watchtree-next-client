import Head from 'next/head';

import AuthLayout from '@/components/features/Auth/_layout';
import RecoveryForm from '@/components/features/Auth/Form/RecoveryForm';

export default function Recovery() {
  return (
    <>
      <Head>
        <title>Recovery</title>
      </Head>
      <AuthLayout>
        <RecoveryForm />
      </AuthLayout>
    </>
  );
}

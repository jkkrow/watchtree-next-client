import Head from 'next/head';

import AuthLayout from '@/components/features/Auth/_layout';
import VerificationForm from '@/components/features/Auth/Form/VerificationForm';

export default function Verification() {
  return (
    <>
      <Head>
        <title>Verification</title>
      </Head>
      <AuthLayout>
        <VerificationForm />
      </AuthLayout>
    </>
  );
}

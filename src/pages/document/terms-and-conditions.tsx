import Head from 'next/head';

import DocumentLayout from '@/components/features/Document/_layout';
import TermsAndConditionsComponent from '@/components/features/Document/TermsAndConditions';
import { NextPageWithLayout } from '../_app';

const TermsAndConditions: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Terms and Conditions - WatchTree</title>
      </Head>

      <TermsAndConditionsComponent />
    </>
  );
};

TermsAndConditions.getLayout = function (page) {
  return <DocumentLayout>{page}</DocumentLayout>;
};

export default TermsAndConditions;

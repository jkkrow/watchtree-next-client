import Head from 'next/head';

import DocumentLayout from '@/components/features/Document/_layout';
import PrivatePolicyComponent from '@/components/features/Document/PrivatePolicy';
import { NextPageWithLayout } from '../_app';

const PrivatePolicy: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Private Policy - WatchTree</title>
      </Head>

      <PrivatePolicyComponent />
    </>
  );
};

PrivatePolicy.getLayout = function (page) {
  return <DocumentLayout>{page}</DocumentLayout>;
};

export default PrivatePolicy;

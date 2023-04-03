import Head from 'next/head';

import UploadLayout from '@/components/features/Upload/_layout';
import UploadPreview from '@/components/features/Upload/Preview';
import UploadDashboard from '@/components/features/Upload/Dashboard';
import UploadTree from '@/components/features/Upload/TreeView/Tree';
import { NextPageWithLayout } from '../_app';

const Upload: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Upload Video</title>
      </Head>

      <UploadPreview />
      <UploadDashboard />
      <UploadTree />
    </>
  );
};

Upload.getLayout = function getLayout(page) {
  return <UploadLayout>{page}</UploadLayout>;
};

export default Upload;

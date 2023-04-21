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
        <title>Upload Video - WatchTree</title>
      </Head>

      <UploadPreview />
      <div className="flex flex-col gap-4 lg:flex-row">
        <UploadDashboard />
        <UploadTree />
      </div>
    </>
  );
};

Upload.getLayout = function getLayout(page) {
  return <UploadLayout>{page}</UploadLayout>;
};

export default Upload;

import { memo } from 'react';

import Spinner from '@/components/common/UI/Spinner';

interface LoaderProps {
  on: boolean;
}

const Loader: React.FC<LoaderProps> = ({ on }) => {
  return <Spinner on={on} size={40} overlay />;
};

export default memo(Loader);

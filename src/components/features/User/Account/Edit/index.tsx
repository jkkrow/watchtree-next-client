import Link from 'next/link';

import EditName from './_fragments/EditName';
import EditPassword from './_fragments/EditPassword';
import EditPicture from './_fragments/EditPicture';
import ArrowLeftIcon from '@/assets/icons/arrow-left.svg';

interface EditProps {
  type: 'name' | 'password' | 'picture';
}

export default function Edit({ type }: EditProps) {
  return (
    <div className="relative flex justify-center items-center">
      <Link className="absolute top-0 left-0 w-6 h-6" href="/user/account">
        <ArrowLeftIcon />
      </Link>
      <div className="w-64">
        {type === 'name' ? <EditName /> : null}
        {type === 'password' ? <EditPassword /> : null}
        {type === 'picture' ? <EditPicture /> : null}
      </div>
    </div>
  );
}

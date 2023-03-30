import { useRouter } from 'next/router';

import Profile from '../Profile';
import Edit from '../Edit';
import { useAppSelector } from '@/hooks/store';
import { useMemo } from 'react';

const EDIT_TYPE = ['name', 'password', 'picture'] as const;

export default function AccountDashboard() {
  const user = useAppSelector((state) => state.user.info);
  const router = useRouter();

  const editMode = useMemo(() => {
    const { edit } = router.query;
    const type = edit ? (edit instanceof Array ? edit[0] : edit) : '';
    return EDIT_TYPE.includes(type as any)
      ? (type as typeof EDIT_TYPE[number])
      : null;
  }, [router.query]);

  return user ? (
    <div className="w-2/3 min-w-[350px] max-w-2xl p-6 border-[1.5px] border-secondary rounded-md">
      {editMode ? <Edit type={editMode} /> : <Profile user={user} />}
    </div>
  ) : null;
}

import { useRouter } from 'next/router';

import Button from '@/components/common/Element/Button';
import { useModal } from '@/hooks/ui/modal';
import { useSignoutMutation } from '@/store/features/auth/auth.api';

export default function Signout() {
  const router = useRouter();
  const { complete, cancel } = useModal();
  const [signout, { isLoading }] = useSignoutMutation();
  // TODO: Add statement if there is unfinished upload

  const signoutHandler = async () => {
    await signout();
    complete();
  };

  return (
    <div className="flex flex-col p-6 gap-6">
      <div className="p-2 font-bold text-center">Do you want to sign out?</div>
      <div className="flex w-64 ml-auto gap-2">
        <Button onClick={cancel}>Cancel</Button>
        <Button inversed loading={isLoading} onClick={signoutHandler}>
          Sign out
        </Button>
      </div>
    </div>
  );
}

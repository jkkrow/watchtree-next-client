import { useRouter } from 'next/router';

import Button from '@/components/common/Element/Button';
import { useModal } from '@/hooks/ui/modal';

export default function Signin() {
  const router = useRouter();
  const { complete, cancel } = useModal();

  const signoutHandler = () => {
    router.push({
      pathname: '/auth/signin',
      query: { redirect: router.pathname },
    });
    complete();
  };

  return (
    <div className="flex flex-col p-6 gap-6">
      <div className="p-2 font-bold text-center">
        This action requires sign in
      </div>
      <div className="flex w-64 ml-auto gap-2">
        <Button onClick={cancel}>Cancel</Button>
        <Button inversed onClick={signoutHandler}>
          Sign in
        </Button>
      </div>
    </div>
  );
}

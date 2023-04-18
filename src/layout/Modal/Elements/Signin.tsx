import { useRouter } from 'next/router';

import PromptModal from '../Template/Prompt';
import { useModal } from '@/hooks/ui/modal';

export default function Signin() {
  const router = useRouter();
  const { complete, cancel } = useModal();

  const signinHandler = () => {
    router.push({
      pathname: '/auth/signin',
      query: { redirect: router.pathname },
    });
    complete();
  };

  return (
    <PromptModal
      title="Sign in"
      action="Sign in"
      header="This action requires sign in."
      onCancel={cancel}
      onClick={signinHandler}
    />
  );
}

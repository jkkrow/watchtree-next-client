import PromptModal from '../Template/Prompt';
import { useAppSelector } from '@/hooks/store';
import { useModal } from '@/hooks/ui/modal';
import { useSignoutMutation } from '@/store/features/auth/auth.api';

export default function Signout() {
  const tree = useAppSelector((state) => state.upload.uploadTree);
  const { complete, cancel } = useModal();
  const [signout, { isLoading }] = useSignoutMutation();

  const signoutHandler = async () => {
    await signout().unwrap();
    complete();
  };

  return (
    <PromptModal
      title="Sign out"
      action="Sign out"
      header="Do you want to sign out?"
      body={
        tree
          ? 'There is an unfinished upload process. The unsaved changes will be lost if you sign out. Are you sure to continue?'
          : undefined
      }
      warning={!!tree}
      loading={isLoading}
      onCancel={cancel}
      onClick={signoutHandler}
    />
  );
}

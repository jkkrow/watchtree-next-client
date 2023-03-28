import Button from '@/components/common/Element/Button';
import { useAppSelector } from '@/hooks/store';
import { useModal } from '@/hooks/ui/modal';
import { useSignoutMutation } from '@/store/features/auth/auth.api';

export default function Signout() {
  const tree = useAppSelector((state) => state.upload.uploadTree);
  const { complete, cancel } = useModal();
  const [signout, { isLoading }] = useSignoutMutation();

  const signoutHandler = async () => {
    await signout();
    complete();
  };

  return (
    <div className="flex flex-col p-6 gap-6">
      <h3 className="text-xl font-bold">Sign out</h3>
      <div className="font-medium">Do you want to sign out?</div>
      {tree ? (
        <div className="flex flex-col gap-2">
          <h4 className="text-warning font-bold">&#9888; WARNING!</h4>
          <div className="max-w-lg">
            There is an unfinished upload process. The unsaved changes will be
            lost if you sign out. Are you sure to continue?
          </div>
        </div>
      ) : null}
      <div className="flex w-64 ml-auto gap-2">
        <Button onClick={cancel}>Cancel</Button>
        <Button inversed loading={isLoading} onClick={signoutHandler}>
          Sign out
        </Button>
      </div>
    </div>
  );
}

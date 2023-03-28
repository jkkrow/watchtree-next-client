import { useRouter } from 'next/router';

import Avatar from '@/components/common/UI/Avatar';
import Button from '@/components/common/Element/Button';
import EditIcon from '@/assets/icons/edit.svg';
import { useModal } from '@/hooks/ui/modal';
import { useSendVerificationMutation } from '@/store/features/auth/auth.api';
import { User } from '@/store/features/user/user.type';

interface AccountProfileProps {
  user: User;
}

export default function Profile({ user }: AccountProfileProps) {
  const router = useRouter();
  const { open } = useModal();
  const [sendVerification, { isLoading }] = useSendVerificationMutation();

  const verifyHandler = () => {
    sendVerification(user.email);
  };

  const editHandler = (type: 'name' | 'password' | 'picture') => () => {
    router.push({ query: { edit: type } });
  };

  const deleteHandler = () => {
    open('delete-account');
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="relative px-8 py-4 mx-auto mb-4 border-[1.5px] border-transparent">
        <Avatar src={user.picture} size={96} />
        <button
          className="absolute top-0 right-0 w-5 h-5"
          onClick={editHandler('picture')}
        >
          <EditIcon />
        </button>
      </div>
      <div className="flex justify-between font-medium">
        <div>Name</div>
        <div className="flex items-center gap-3">
          <div>{user.name}</div>
          <button className="w-5 h-5" onClick={editHandler('name')}>
            <EditIcon />
          </button>
        </div>
      </div>
      <div className="flex justify-between font-medium">
        <div>Email</div>
        <div>{user.email}</div>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {!user.verified ? (
          <Button inversed loading={isLoading} onClick={verifyHandler}>
            Verify Email
          </Button>
        ) : null}
        {user.type === 'native' ? (
          <Button onClick={editHandler('password')}>Change Password</Button>
        ) : null}
        <Button invalid onClick={deleteHandler}>
          Delete Account
        </Button>
      </div>
    </div>
  );
}

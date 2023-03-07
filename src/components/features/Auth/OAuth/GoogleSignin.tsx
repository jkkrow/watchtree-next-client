import Button from '@/components/common/Element/Button';
import GoogleIcon from '@/assets/icons/google.svg';
import { useGoogleAuth } from '@/hooks/auth/google-auth';
import { useAppDispatch } from '@/hooks/store';
import { setMessage } from '@/store/features/ui/ui.slice';

interface GoogleSigninProps {
  label: string;
  loading?: boolean;
  onVerify: (credential: string) => void;
}

export default function GoogleSignin({
  label,
  loading,
  onVerify,
}: GoogleSigninProps) {
  const dispatch = useAppDispatch();
  const { buttonRef, loaded } = useGoogleAuth((response) => {
    if (!response.credential) {
      const subject = 'Google Signin Failed';
      const content = 'Invalid google credential';
      return dispatch(setMessage({ type: 'error', subject, content }));
    }

    onVerify(response.credential);
  });

  return (
    <Button loading={loading || !loaded}>
      <div className="group flex justify-center items-center w-full h-full">
        <div ref={buttonRef} />
        <div className="absolute inset-0 flex justify-center items-center gap-4 bg-inversed pointer-events-none transition-opacity group-hover:opacity-0">
          <GoogleIcon className="w-4 h-4" />
          <span>{label}</span>
        </div>
      </div>
    </Button>
  );
}

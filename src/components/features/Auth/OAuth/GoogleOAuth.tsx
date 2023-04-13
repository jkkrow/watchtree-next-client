import Button from '@/components/common/Element/Button';
import GoogleIcon from '@/assets/icons/google.svg';
import { useGoogleAuth } from '@/hooks/auth/google-auth';
import { useAppDispatch } from '@/hooks/store';
import { setMessage } from '@/store/features/ui/ui.slice';

interface GoogleSigninProps {
  label: string;
  loading?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  inversed?: boolean;
  onVerify: (credential: string) => void;
}

export default function GoogleOAuth({
  label,
  loading,
  disabled,
  invalid,
  inversed,
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
    <Button
      type="button"
      loading={loading || !loaded}
      disabled={disabled}
      invalid={invalid}
      inversed={inversed}
    >
      <div
        className="group flex bg-inherit text-inherit justify-center items-center w-full h-full data-[disabled=true]:pointer-events-none"
        data-disabled={disabled}
      >
        <div ref={buttonRef} />
        <div className="absolute inset-0 flex justify-center items-center gap-4 bg-inherit text-inherit pointer-events-none transition-opacity group-hover:opacity-0">
          <GoogleIcon className="w-4 h-4" />
          <span>{label}</span>
        </div>
      </div>
    </Button>
  );
}

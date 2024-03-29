import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';

import Input from '@/components/common/Element/Input';
import Button from '@/components/common/Element/Button';
import GoogleOAuth from '../OAuth/GoogleOAuth';
import { useSigninMutation } from '@/store/features/auth/auth.api';
import { useSigninGoogleMutation } from '@/store/features/auth/auth.api';
import { isEmail } from '@/utils/validate';

interface SigninInputs {
  email: string;
  password: string;
}

export default function SigninForm() {
  const router = useRouter();
  const [signin, { isLoading: signinLoading }] = useSigninMutation();
  const [signinGoogle, { isLoading: signinGoogleLoading }] =
    useSigninGoogleMutation();

  const { register, handleSubmit, formState } = useForm({
    defaultValues: { email: '', password: '' },
  });

  const signinHandler: SubmitHandler<SigninInputs> = async (data) => {
    await signin(data).unwrap();
    redirectHandler();
  };

  const googleSigninhandler = async (credential: string) => {
    await signinGoogle(credential).unwrap();
    redirectHandler();
  };

  const redirectHandler = () => {
    if (router.query && router.query.redirect) {
      router.replace(router.query.redirect as string);
    } else {
      router.replace('/browse/featured');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(signinHandler)}>
        <Input
          type="text"
          invalid={!!formState.errors.email}
          autoComplete="email"
          {...register('email', {
            required: true,
            pattern: isEmail,
          })}
        />
        <Input
          type="password"
          invalid={!!formState.errors.password}
          autoComplete="current-password"
          {...register('password', {
            required: true,
          })}
        />
        <Link className="mr-2 ml-auto text-sm" href="/auth/recovery">
          Forgot Password
        </Link>
        <Button inversed loading={signinLoading} disabled={signinGoogleLoading}>
          Sign in
        </Button>
      </form>

      <GoogleOAuth
        label="Google Sign in"
        loading={signinGoogleLoading}
        disabled={signinLoading}
        inversed
        onVerify={googleSigninhandler}
      />
      <p className="flex justify-center mt-4 gap-2">
        <span>{"Don't have an Account?"}</span>
        <Link href={{ pathname: '/auth/signup', query: router.query }}>
          Sign up
        </Link>
      </p>
    </div>
  );
}

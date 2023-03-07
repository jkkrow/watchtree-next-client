import Link from 'next/link';
import { useForm } from 'react-hook-form';

import Input from '@/components/common/Element/Input';
import Button from '@/components/common/Element/Button';
import GoogleSignin from '../OAuth/GoogleSignin';
import { SigninRequest } from '@/store/features/user/user.type';
import { isEmail, isPassword } from '@/utils/validate';

export default function SigninForm() {
  const { register, handleSubmit, formState } = useForm({
    defaultValues: { email: '', password: '' },
  });

  const signinHandler = (data: SigninRequest) => {
    console.log(data);
  };

  const googleSigninhandler = (credential: string) => {
    console.log(credential);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(signinHandler)}>
        <Input
          type="text"
          invalid={!!formState.errors.email}
          {...register('email', {
            required: true,
            pattern: isEmail,
          })}
        />
        <Input
          type="password"
          invalid={!!formState.errors.password}
          {...register('password', {
            required: true,
          })}
        />
        <Link className="mr-2 ml-auto text-sm" href="/auth/recovery">
          Forgot Password
        </Link>
        <Button loading={false}>SIGN IN</Button>
      </form>

      <GoogleSignin label="GOOGLE SIGN IN" onVerify={googleSigninhandler} />
      <p className="flex justify-center mt-2 gap-2">
        <span>{"Don't have an Account?"}</span>
        <Link href="/auth/signup">Sign up</Link>
      </p>
    </div>
  );
}

import Link from 'next/link';
import { useForm } from 'react-hook-form';

import Input from '@/components/common/Element/Input';
import Button from '@/components/common/Element/Button';
import { SignupRequest } from '@/store/features/user/user.type';
import { isEmail, isPassword } from '@/utils/validate';

export default function SignupForm() {
  const { register, handleSubmit, formState } = useForm({
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  });

  const signupHandler = (data: SignupRequest) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(signupHandler)}>
        <Input
          type="text"
          invalid={!!formState.errors.name}
          message="At least 4 characters"
          autoFocus
          {...register('name', {
            required: true,
            minLength: 4,
          })}
        />
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
          message="At least 8 characters with lowercase, uppercase, number, and special character"
          {...register('password', {
            required: true,
            pattern: isPassword,
          })}
        />
        <Input
          type="password"
          invalid={!!formState.errors.confirmPassword}
          {...register('confirmPassword', {
            required: true,
            pattern: isPassword,
            validate: (value, { password }) => value === password,
          })}
        />
        <Button loading={false}>SIGN UP</Button>
      </form>

      <p className="text-xs text-center my-4 pl-2">
        <span>{'By clicking "SIGN UP", you agree to our '}</span>
        <Link href="/private-policy">private policy</Link>
        <span>{' and '}</span>
        <Link href="/terms-and-conditions">terms and conditions</Link>
      </p>

      <p className="flex justify-center mt-2 gap-2">
        <span>{'Already have an Account?'}</span>
        <Link href="/auth/signin">Sign in</Link>
      </p>
    </div>
  );
}

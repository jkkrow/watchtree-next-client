import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import Input from '@/components/common/Element/Input';
import Button from '@/components/common/Element/Button';
import Spinner from '@/components/common/UI/Spinner';
import { useCheckRecoveryMutation } from '@/store/features/auth/auth.api';
import { useResetPasswordMutation } from '@/store/features/auth/auth.api';
import { AppBaseQueryError } from '@/store';
import { isPassword } from '@/utils/validate';

interface ResetPasswordInputs {
  password: string;
  confirmPassword: string;
}

export default function ResetPasswordForm() {
  const router = useRouter();
  const [checkRecovery, { isLoading: checkRecoveryLoading, data, error }] =
    useCheckRecoveryMutation();
  const [resetPassword, { isLoading: resetPasswordLoading }] =
    useResetPasswordMutation();

  const { register, handleSubmit, formState } = useForm({
    defaultValues: { password: '', confirmPassword: '' },
  });

  const token = useMemo(() => {
    const { token } = router.query;
    return token instanceof Array ? token[0] : token;
  }, [router.query]);

  const errorResponse = useMemo(() => {
    let subject = '';
    let content = '';

    if (data || (!data && !error)) {
      return null;
    }

    if (error) {
      const { data: err } = error as AppBaseQueryError;
      subject = 'Unknown Error';
      content = 'Please try again later';
      subject = typeof err === 'string' ? err : err?.error || subject;
      content = typeof err === 'string' ? content : err?.message || content;
    }

    return { subject, content };
  }, [data, error]);

  useEffect(() => {
    if (!token) return;
    checkRecovery(token);
  }, [token, checkRecovery]);

  const resetPasswordHandler: SubmitHandler<ResetPasswordInputs> = async (
    data
  ) => {
    if (!token) return;
    const result: any = await resetPassword({ ...data, token });
    if (!result.error) router.replace('/auth/signin');
  };

  return (
    <div className="relative">
      <Spinner on={checkRecoveryLoading} size={64} overlay position="top" />
      {errorResponse ? (
        <div className="p-4 shadow-md rounded-md bg-invalid">
          <h3 className="font-bold">{errorResponse.subject}</h3>
          <div>{errorResponse.content}</div>
        </div>
      ) : null}

      {data ? (
        <form onSubmit={handleSubmit(resetPasswordHandler)}>
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
          <Button inversed loading={resetPasswordLoading}>
            RESET PASSWORD
          </Button>
        </form>
      ) : null}
    </div>
  );
}

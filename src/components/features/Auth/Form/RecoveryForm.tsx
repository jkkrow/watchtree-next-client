import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';

import Input from '@/components/common/Element/Input';
import Button from '@/components/common/Element/Button';
import { useSendRecoveryMutation } from '@/store/features/auth/auth.api';
import { isEmail } from '@/utils/validate';

interface RecoveryInputs {
  email: string;
}

export default function RecoveryForm() {
  const router = useRouter();
  const [sendRecovery, { isLoading }] = useSendRecoveryMutation();

  const { register, handleSubmit, formState } = useForm({
    defaultValues: { email: '' },
  });

  const sendRecoveryHandler: SubmitHandler<RecoveryInputs> = async ({
    email,
  }) => {
    const result: any = await sendRecovery(email);
    if (!result.error) router.push('/auth/signin');
  };

  return (
    <div>
      <form onSubmit={handleSubmit(sendRecoveryHandler)}>
        <Input
          type="text"
          invalid={!!formState.errors.email}
          message="Type your email to send a recovery link"
          autoFocus
          {...register('email', {
            required: true,
            pattern: isEmail,
          })}
        />
        <Button inversed loading={isLoading}>
          Send Email
        </Button>
      </form>
      <p className="flex justify-center mt-4 gap-2">
        <span>Back to </span>
        <Link href="/auth/signin">Sign in</Link>
      </p>
    </div>
  );
}

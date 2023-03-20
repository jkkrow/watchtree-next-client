import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import Input from '@/components/common/Element/Input';
import Button from '@/components/common/Element/Button';
import { useUpdatePasswordMutation } from '@/store/features/user/user.api';
import { isPassword } from '@/utils/validate';

interface EditPasswordInputs {
  password: string;
  newPassword: string;
  confirmPassword: string;
}

export default function EditPassword() {
  const router = useRouter();
  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();

  const { register, handleSubmit, formState } = useForm({
    defaultValues: { password: '', newPassword: '', confirmPassword: '' },
  });

  const saveHandler = async (data: EditPasswordInputs) => {
    const result: any = await updatePassword(data);
    if (!result.error) router.push('/user/account');
  };

  return (
    <form
      className="flex flex-col gap-2 [&_button]:mt-2"
      onSubmit={handleSubmit(saveHandler)}
    >
      <Input
        type="password"
        autoFocus
        message="Type current password"
        invalid={!!formState.errors.password}
        {...register('password', {
          required: true,
        })}
      />
      <Input
        type="password"
        invalid={!!formState.errors.newPassword}
        message="At least 8 characters with lowercase, uppercase, number, and special character"
        {...register('newPassword', {
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
          validate: (value, { newPassword }) => value === newPassword,
        })}
      />
      <Button inversed loading={isLoading}>
        Save
      </Button>
    </form>
  );
}
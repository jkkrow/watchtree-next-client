import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import Input from '@/components/common/Element/Input';
import Button from '@/components/common/Element/Button';
import { useAppSelector } from '@/hooks/store';
import { useUpdateNameMutation } from '@/store/features/user/user.api';

interface EditNameInputs {
  name: string;
}

export default function EditName() {
  const user = useAppSelector((state) => state.user.info!);
  const router = useRouter();
  const [updateName, { isLoading }] = useUpdateNameMutation();

  const { register, handleSubmit, formState } = useForm({
    defaultValues: { name: user.name },
  });

  const saveHandler = async ({ name }: EditNameInputs) => {
    await updateName(name).unwrap();
    router.push('/user/account');
  };

  return (
    <form
      className="flex flex-col gap-2 [&_button]:mt-2"
      onSubmit={handleSubmit(saveHandler)}
    >
      <Input
        type="text"
        invalid={!!formState.errors.name}
        message="At least 4 characters"
        autoComplete="off"
        autoFocus
        {...register('name', {
          required: true,
          minLength: 4,
        })}
      />
      <Button inversed loading={isLoading} disabled={!formState.isDirty}>
        Save
      </Button>
    </form>
  );
}

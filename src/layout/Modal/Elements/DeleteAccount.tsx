import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { decodeJwt } from 'jose';

import PromptModal from '../Template/Prompt';
import Input from '@/components/common/Element/Input';
import GoogleOAuth from '@/components/features/Auth/OAuth/GoogleOAuth';
import { useAppSelector } from '@/hooks/store';
import { useModal } from '@/hooks/ui/modal';
import { useSignoutMutation } from '@/store/features/auth/auth.api';
import { useDeleteAccountMutation } from '@/store/features/user/user.api';
import { useDeleteGoogleAccountMutation } from '@/store/features/user/user.api';

interface DeleteAccountInputs {
  confirm: string;
  password?: string;
  token?: string;
}

export default function DeleteAccount() {
  const router = useRouter();
  const user = useAppSelector((state) => state.user.info);
  const { cancel, complete } = useModal();

  const [signout] = useSignoutMutation();
  const [deleteAccount, { isLoading: deleteLoading }] =
    useDeleteAccountMutation();
  const [deleteGoogleAccount, { isLoading: deleteGoogleLoading }] =
    useDeleteGoogleAccountMutation();

  const { register, handleSubmit, formState, setValue, setError } = useForm({
    defaultValues:
      user?.type === 'native'
        ? { confirm: '', password: '' }
        : { confirm: '', token: '' },
    mode: 'onChange',
  });

  const submitHandler = async (data: DeleteAccountInputs) => {
    if (!user) return;

    if (user.type === 'native') {
      await deleteAccount(data.password!).unwrap();
    }

    if (user.type === 'google') {
      await deleteGoogleAccount(data.token!).unwrap();
    }

    await signout();
    complete();
    router.push('/');
  };

  const verifyGoogleHandler = (credential: string) => {
    const result = decodeJwt(credential) as GoogleTokenPayload;
    const isValid = result.email === user?.email;

    if (isValid) {
      setValue('token', credential, {
        shouldValidate: true,
        shouldDirty: true,
      });
    } else {
      setValue('token', '', { shouldDirty: true });
      setError('token', { message: 'Invalid google credential' });
    }
  };

  return user ? (
    <PromptModal
      title="Delete Account"
      action="Delete"
      header="Do you really want to delete your account?"
      body={
        <>
          <p>
            This process <b>cannot</b> be undone. Your <b>account</b> and{' '}
            <b>created contents</b> will no longer be available.
          </p>
          <p>
            To proceed to delete your account, type <b>delete my account</b> and
            verify with your{' '}
            <b>{user.type === 'native' ? 'password' : 'google account'}</b>.
          </p>
        </>
      }
      field={
        <>
          <Input
            type="text"
            message='Type "delete my account"'
            invalid={!!formState.errors.confirm}
            {...register('confirm', {
              required: true,
              validate: (value) => value === 'delete my account',
            })}
          />
          {user.type === 'native' ? (
            <Input
              type="text"
              invalid={!!formState.errors.password}
              {...register('password', {
                required: true,
              })}
            />
          ) : null}
          {user.type === 'google' ? (
            <>
              <input hidden {...register('token', { required: true })} />
              <GoogleOAuth
                label="Verify with Google"
                invalid={!!formState.errors.token}
                disabled={
                  !formState.errors.token && formState.dirtyFields.token
                }
                onVerify={verifyGoogleHandler}
              />
              <p className="text-invalid text-xs my-2">
                {formState.errors.token?.message}
              </p>
            </>
          ) : null}
        </>
      }
      danger
      loading={deleteLoading || deleteGoogleLoading}
      disabled={!formState.isValid}
      onCancel={cancel}
      onSubmit={handleSubmit(submitHandler)}
    />
  ) : null;
}

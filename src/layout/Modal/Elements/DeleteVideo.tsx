import { useForm } from 'react-hook-form';

import PromptModal from '../Template/Prompt';
import Input from '@/components/common/Element/Input';
import { useModal } from '@/hooks/ui/modal';
import { DeleteVideoModal } from '@/store/features/ui/ui.type';
import { useDeleteUploadMutation } from '@/store/features/upload/upload.api';

export default function DeleteVideo() {
  const [deleteVideo, { isLoading }] = useDeleteUploadMutation();
  const { modal, cancel, complete } = useModal<DeleteVideoModal>();
  const { register, handleSubmit, formState } = useForm({
    defaultValues: { title: '' },
  });

  const submitHandler = async () => {
    modal && (await deleteVideo(modal.videoId).unwrap());
    complete();
  };

  return (
    <PromptModal
      title="Delete Video"
      action="Delete"
      header="Do you really want to delete this video?"
      body={
        <>
          <p>
            This process <b>cannot</b> be undone. The video will no longer be
            available.
          </p>
          <p>
            To proceed, type the video title <b>{modal?.title || ''}</b>
          </p>
        </>
      }
      field={
        <Input
          type="text"
          {...register('title', {
            required: true,
            validate: (value) => value === modal?.title,
          })}
        />
      }
      danger
      loading={isLoading}
      disabled={!formState.isValid}
      onCancel={cancel}
      onSubmit={handleSubmit(submitHandler)}
    />
  );
}

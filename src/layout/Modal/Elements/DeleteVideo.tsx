import { useForm } from 'react-hook-form';

import Input from '@/components/common/Element/Input';
import Button from '@/components/common/Element/Button';
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
    modal && (await deleteVideo(modal.videoId));
    complete();
  };

  return (
    <div className="flex flex-col p-6 gap-6">
      <h3 className="text-xl font-bold">Delete Video</h3>
      <div className="flex flex-col gap-2">
        <h4 className="text-invalid font-bold">&#9888; WARNING!</h4>
        <p>
          This process <b>cannot</b> be undone. The video will no longer be
          available.
        </p>
        <p>
          To proceed, type the video title <b>{modal?.title || ''}</b>
        </p>
      </div>
      <form className="flex flex-col" onSubmit={handleSubmit(submitHandler)}>
        <Input type="text" {...register('title', { required: true })} />
        <div className="flex mt-4 ml-auto gap-2">
          <Button type="button" small onClick={cancel}>
            Cancel
          </Button>
          <Button
            inversed
            invalid
            small
            loading={isLoading}
            disabled={!formState.isValid}
          >
            Delete Account
          </Button>
        </div>
      </form>
    </div>
  );
}

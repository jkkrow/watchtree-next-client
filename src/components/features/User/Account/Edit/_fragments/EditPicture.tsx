import { useRouter } from 'next/router';
import { useState } from 'react';

import FileInput from '@/components/common/Element/FileInput';
import Avatar from '@/components/common/UI/Avatar';
import Button from '@/components/common/Element/Button';
import { useAppSelector } from '@/hooks/store';
import { useUpdatePictureMutation } from '@/store/features/user/user.api';
import { useDeletePictureMutation } from '@/store/features/user/user.api';

export default function EditPicture() {
  const user = useAppSelector((state) => state.user.info!);
  const router = useRouter();
  const [picture, setPicture] = useState(user.picture);
  const [file, setFile] = useState<File | null>(null);

  const [updatePicture, { isLoading: updateLoading }] =
    useUpdatePictureMutation();
  const [deletePicture, { isLoading: deleteLoading }] =
    useDeletePictureMutation();

  const fileHandler = (files: File[]) => {
    setFile(files[0]);
    setPicture(URL.createObjectURL(files[0]));
  };

  const clearPictureHandler = () => {
    setPicture('');
    setFile(null);
  };

  const savePictureHandler = async () => {
    const result: any = file
      ? await updatePicture(file)
      : await deletePicture();

    if (!result.error) router.push('/user/account');
  };

  return (
    <div className="flex flex-col gap-4">
      <FileInput type="image" onFile={fileHandler}>
        <Avatar src={picture} size={96} />
      </FileInput>
      <div className="flex flex-col gap-2">
        <Button disabled={!picture} onClick={clearPictureHandler}>
          Remove Picture
        </Button>
        <Button
          inversed
          loading={updateLoading || deleteLoading}
          disabled={picture === user.picture}
          onClick={savePictureHandler}
        >
          Save
        </Button>
      </div>
    </div>
  );
}

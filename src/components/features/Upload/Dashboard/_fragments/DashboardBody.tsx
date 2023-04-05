import { useMemo, useState } from 'react';

import Button from '@/components/common/Element/Button';
import FileInput from '@/components/common/Element/FileInput';
import Tooltip from '@/components/common/UI/Tooltip';
import ImageIcon from '@/assets/icons/image.svg';
import UndoIcon from '@/assets/icons/undo.svg';
import SaveIcon from '@/assets/icons/save.svg';
import { useAppSelector } from '@/hooks/store';
import { useModal } from '@/hooks/ui/modal';
import {
  useUploadThumbnailMutation,
  useDeleteThumbnailMutation,
  useSaveUploadMutation,
  useCompleteUploadMutation,
} from '@/store/features/upload/upload.api';
import { formatSize, formatTime } from '@/utils/format';
import { traverseNodes } from '@/store/features/video/video.util';
import { ImageModal } from '@/store/features/ui/ui.type';

export default function DashboardBody() {
  const tree = useAppSelector((state) => state.upload.uploadTree!);
  const progresses = useAppSelector((state) => state.upload.progresses);
  const saved = useAppSelector((state) => state.upload.saved);
  const { open: openImageModal } = useModal<ImageModal>();
  const { open: openUndoModal } = useModal();

  const [thumbnail, setThumbnail] = useState(tree.thumbnail);
  const [uploadThumbnail, { isLoading: uploadThumbnailLoading }] =
    useUploadThumbnailMutation();
  const [deleteThumbnail, { isLoading: deleteThumbnailLoading }] =
    useDeleteThumbnailMutation();
  const [saveUpload, { isLoading: saveUploadLoading }] =
    useSaveUploadMutation();
  const [completeUpload, { isLoading: completeUploadLoading }] =
    useCompleteUploadMutation();

  const isUnfinished = useMemo(() => !!progresses.length, [progresses.length]);
  const disableSubmit = useMemo(() => {
    let message = '';
    const nodes = traverseNodes(tree.root);
    const isTitleEmpty = !tree.title;
    const isEmptyNode = nodes.find((node) => !node.url);

    if (isTitleEmpty) {
      message = 'Title is empty';
    }

    if (isEmptyNode) {
      message = 'Empty node exists';
    }

    if (isUnfinished) {
      message = 'Video upload is unfinished';
    }

    return message;
  }, [tree, isUnfinished]);

  const uploadThumbnailHandler = async (files: File[]) => {
    const file = files[0];
    setThumbnail(URL.createObjectURL(file));
    await uploadThumbnail(file);
  };

  const showThumbnailHandler = () => {
    openImageModal('image', { src: thumbnail, alt: 'Thumbnail' });
  };

  const deleteThumbnailHandler = async () => {
    const result: any = await deleteThumbnail();
    if (!result.error) setThumbnail('');
  };

  const undoUploadHandler = () => {
    openUndoModal('undo-upload');
  };

  const saveUploadHandler = () => {
    saveUpload();
  };

  const completeUploadHandler = () => {
    completeUpload();
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <FileInput
          type="image"
          loading={uploadThumbnailLoading}
          onFile={uploadThumbnailHandler}
        >
          <div className="flex items-center gap-2">
            <ImageIcon width={32} height={32} />
            <div>{thumbnail ? 'Replace' : 'Add'} Thumbnail</div>
          </div>
        </FileInput>
        {thumbnail ? (
          <div className="flex gap-2">
            <Button onClick={showThumbnailHandler}>Show</Button>
            <Button
              inversed
              loading={deleteThumbnailLoading}
              onClick={deleteThumbnailHandler}
            >
              Remove
            </Button>
          </div>
        ) : null}
      </div>
      <div className="flex flex-col w-full gap-2 font-medium [&_div]:flex [&_div]:justify-between [&_div]:before:content-[attr(data-label)]">
        <div data-label="Size">{formatSize(tree.size)}</div>
        <div data-label="Min Duration">{formatTime(tree.minDuration)}</div>
        <div data-label="Max Duration">{formatTime(tree.maxDuration)}</div>
      </div>
      <div className="relative grid grid-cols-[1fr_1fr_3fr] py-2 gap-2 [&_svg]:w-6 [&_svg]:h-6">
        <Button onClick={undoUploadHandler}>
          <UndoIcon />
        </Button>
        <Button
          inversed
          disabled={saved || isUnfinished}
          loading={saveUploadLoading}
          onClick={saveUploadHandler}
        >
          <SaveIcon />
        </Button>
        <Tooltip text={disableSubmit} direction="bottom" invalid>
          <Button
            inversed
            disabled={!!disableSubmit}
            loading={completeUploadLoading}
            onClick={completeUploadHandler}
          >
            Complete
          </Button>
        </Tooltip>
      </div>
    </div>
  );
}

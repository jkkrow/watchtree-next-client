import { useCallback, useState, PropsWithChildren } from 'react';

import Spinner from '../../UI/Spinner';

interface FileInputProps {
  id?: string;
  type: string;
  multiple?: boolean;
  maxFile?: number;
  loading?: boolean;
  brief?: boolean;
  onFile: (files: File[]) => void;
}

export default function FileInput({
  id,
  type,
  multiple,
  maxFile,
  loading,
  brief,
  onFile,
  children,
}: PropsWithChildren<FileInputProps>) {
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string>('');

  const handleFiles = useCallback(
    (files: FileList) => {
      const selectedFiles = [...files];
      const invalidName = selectedFiles.find((file) => file.name.length > 50);
      const invalidType = selectedFiles.find(
        (file) => file.type.split('/')[0] !== type
      );

      if (invalidName) {
        return setError('Too long file name (max: 100 characters)');
      }

      if (invalidType) {
        return setError('Invalid file type');
      }

      if (maxFile && maxFile < selectedFiles.length) {
        return setError('Exceeded max file number');
      }

      onFile(selectedFiles);
      setError('');
    },
    [onFile, maxFile, type]
  );

  const dragEnterHandler = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const dragLeaveHandler = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setDragging(false);
  }, []);

  const dragOverHandler = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!e.dataTransfer.files) return;
    setDragging(true);
  }, []);

  const dropHandler = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();

      setDragging(false);
      if (!e.dataTransfer.files) return;
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  const fileChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;
      handleFiles(e.target.files);
      e.target.value = '';
    },
    [handleFiles]
  );

  return (
    <label
      className="relative flex flex-col items-center w-full p-4 gap-2 cursor-pointer overflow-hidden bg-primary border-secondary rounded-md border-[1.5px] transition-colors data-[invalid=true]:text-invalid data-[dragging=true]:bg-hover hover:bg-hover data-[loading=true]:pointer-events-none"
      data-invalid={!!error}
      data-dragging={dragging}
      data-loading={loading}
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragOverHandler}
      onDrop={dropHandler}
    >
      <Spinner on={loading} size={32} overlay />
      <input
        type="file"
        hidden
        id={id}
        accept={`${type}/*`}
        multiple={multiple}
        onChange={fileChangeHandler}
      />
      <div>{children}</div>
      {!brief ? (
        <div className="text-sm">
          {error || `Drag and Drop ${type} file${multiple ? 's' : ''}`}
        </div>
      ) : null}
    </label>
  );
}

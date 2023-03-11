import { useCallback, useState, PropsWithChildren } from 'react';

interface FileInputProps {
  id?: string;
  type: string;
  multiple?: boolean;
  maxFile?: number;
  onFile: (files: File[]) => void;
}

export default function FileInput({
  id,
  type,
  multiple,
  maxFile,
  onFile,
  children,
}: PropsWithChildren<FileInputProps>) {
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string>('');

  const handleFiles = useCallback(
    (files: FileList) => {
      const selectedFiles = [...files];
      const invalidFile = selectedFiles.find(
        (file) => file.type.split('/')[0] !== type
      );

      if (invalidFile) {
        return setError('Invalid file type');
      }

      if (maxFile && maxFile < selectedFiles.length) {
        return setError('Invalid file number');
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
      className="flex flex-col items-center gap-2 cursor-pointer data-[invalid=true]:text-invalid data-[dragging=true]:opacity-70 hover:opacity-70 transition-opacity"
      data-invalid={!!error}
      data-dragging={dragging}
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragOverHandler}
      onDrop={dropHandler}
    >
      <input
        type="file"
        hidden
        id={id}
        accept={`${type}/*`}
        multiple={multiple}
        onChange={fileChangeHandler}
      />
      <div>{children}</div>
      <div>{error || `Drag and Drop ${type} file${multiple ? 's' : ''}`}</div>
    </label>
  );
}

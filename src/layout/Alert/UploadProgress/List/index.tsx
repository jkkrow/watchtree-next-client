import UploadProgressItem from '../Item';
import { useAppSelector } from '@/hooks/store';

export default function UploadProgressList() {
  const progresses = useAppSelector((state) => state.upload.progresses);

  // TODO: Make it draggable and minimize
  return progresses.length ? (
    <ul className="flex flex-col justify-center w-full h-max bg-primary border-[1.5px] border-secondary shadow-md rounded-md overflow-hidden">
      <header className="font-medium p-4 bg-hover">Upload Progress</header>
      {progresses.map((progress) => (
        <UploadProgressItem key={progress.fileName} progress={progress} />
      ))}
    </ul>
  ) : null;
}

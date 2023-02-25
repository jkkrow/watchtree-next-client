import LoaderIcon from '@/assets/icons/loader.svg';

export default function Spinner() {
  return (
    <div className="w-16 h-16 animate-spin">
      <LoaderIcon />
    </div>
  );
}

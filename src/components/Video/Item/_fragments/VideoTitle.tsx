import Link from 'next/link';

interface VideoTitleProps {
  id: string;
  title: string;
}

export default function VideoTitle({ id, title }: VideoTitleProps) {
  return <Link href={`/watch/${id}`}>{title}</Link>;
}

interface VideoTitleProps {
  title: string;
  large?: boolean;
}

export default function VideoTitle({ title, large }: VideoTitleProps) {
  const normalText = 'text-base font-medium';
  const largeText = 'text-2xl font-bold tracking-wider';
  const text = large ? largeText : normalText;

  return <h2 className={text}>{title}</h2>;
}

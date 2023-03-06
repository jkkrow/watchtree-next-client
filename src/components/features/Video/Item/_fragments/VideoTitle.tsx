interface VideoTitleProps {
  title: string;
}

export default function VideoTitle({ title }: VideoTitleProps) {
  return <h2 className="w-full font-semibold">{title}</h2>;
}

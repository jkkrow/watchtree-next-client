interface VideoTitleProps {
  title: string;
}

export default function VideoTitle({ title }: VideoTitleProps) {
  return <h2 className="w-full text-base font-medium  ">{title}</h2>;
}

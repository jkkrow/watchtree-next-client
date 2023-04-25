interface RowProps {
  header: string;
  description: JSX.Element;
}

export default function Row({ header, description }: RowProps) {
  return (
    <li className="flex flex-col gap-4 lg:flex-row lg:[&:nth-of-type(even)]:flex-row-reverse">
      <div className="flex-shrink-0 bg-hover w-full h-80 shadow-md lg:w-2/5 lg:max-w-lg"></div>
      <div className="flex flex-col w-full p-4 gap-4">
        <h3 className="font-medium text-2xl">{header}</h3>
        <div className="flex flex-col gap-4 text-lg">{description}</div>
      </div>
    </li>
  );
}

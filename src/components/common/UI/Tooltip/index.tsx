import { PropsWithChildren } from 'react';

interface TooltipProps {
  text: string;
  invalid?: boolean;
  direction?: 'top' | 'left' | 'bottom' | 'right';
}

export default function Tooltip({
  text,
  direction = 'right',
  invalid = false,
  children,
}: PropsWithChildren<TooltipProps>) {
  const opposite = {
    top: 'bottom',
    bottom: 'top',
    right: 'left',
    left: 'right',
  } as const;

  const position = {
    top: 'top-full',
    bottom: 'bottom-full',
    right: 'right-full',
    left: 'left-full',
  };
  const borders = {
    top: 'border-transparent border-t-primary',
    bottom: 'border-transparent border-b-primary',
    right: 'border-transparent border-r-primary',
    left: 'border-transparent border-l-primary',
  };
  const margins = {
    top: 'mb-2',
    bottom: 'mt-2',
    right: 'ml-2',
    left: 'mr-2',
  };

  return (
    <div className="group relative flex justify-center items-center z-10">
      {children}
      {text ? (
        <div
          className={`absolute flex justify-center items-center w-max pointer-events-none ${
            margins[direction]
          } ${
            position[opposite[direction]]
          } opacity-0 transition-opacity group-hover:opacity-100 group-hover:pointer-events-auto`}
        >
          <span
            className={`absolute border-8 ${position[direction]} ${borders[direction]}`}
          />
          <span
            className="p-4 border-[1.5px] border-secondary rounded-md bg-primary data-[invalid=true]:bg-invalid"
            data-invalid={invalid}
          >
            {text}
          </span>
        </div>
      ) : null}
    </div>
  );
}

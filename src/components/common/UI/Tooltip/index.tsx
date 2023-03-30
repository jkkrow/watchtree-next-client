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

  const shorthand = {
    top: 't',
    bottom: 'b',
    right: 'r',
    left: 'l',
  } as const;

  const borders = Object.entries(shorthand)
    .map(([key, value]) =>
      key === direction
        ? `border-${value}-primary`
        : `border-${value}-transparent`
    )
    .join(' ');

  const margin = `m${shorthand[opposite[direction]]}-2`;

  return (
    <div className="group relative flex justify-center items-center">
      {children}
      {text ? (
        <div
          className={`absolute flex justify-center items-center w-max ${margin} ${opposite[direction]}-full opacity-0 pointer-events-none transition-opacity group-hover:opacity-100 group-hover:pointer-events-auto`}
        >
          <span
            className={`absolute border-8 ${direction}-full ${borders}`}
          ></span>
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

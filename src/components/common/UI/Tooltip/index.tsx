import { PropsWithChildren } from 'react';

interface TooltipProps {
  text: string;
  invalid?: boolean;
  direction?: 'top' | 'left' | 'bottom' | 'right';
}

export default function Tooltip({
  text,
  invalid,
  direction,
  children,
}: PropsWithChildren<TooltipProps>) {
  return (
    <div
      className="relative flex justify-center items-center z-10"
      data-text={text}
      data-invalid={invalid}
      data-direction={direction}
    >
      {children}
    </div>
  );
}

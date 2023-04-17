import { PropsWithChildren } from 'react';

export default function VideoLayout({ children }: PropsWithChildren) {
  return (
    <div className="absolute inset-0 z-30 bg-black text-white">{children}</div>
  );
}

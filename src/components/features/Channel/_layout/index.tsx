import { PropsWithChildren } from 'react';

export default function ChannelLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col max-w-9xl p-6 gap-20 mx-auto">{children}</div>
  );
}

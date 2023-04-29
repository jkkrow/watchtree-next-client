import { PropsWithChildren } from 'react';

export default function HomeLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col px-8 py-12 gap-20 sm:px-12 overflow-hidden">
      {children}
    </div>
  );
}

import { PropsWithChildren } from 'react';

export default function BrowseLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col p-6 pb-64 gap-12 overflow-hidden">
      {children}
    </div>
  );
}

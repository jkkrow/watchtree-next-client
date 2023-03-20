import { PropsWithChildren } from 'react';

export default function BrowseLayout({ children }: PropsWithChildren) {
  return <div className="p-6">{children}</div>;
}

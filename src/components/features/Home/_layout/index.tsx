import { PropsWithChildren } from 'react';

export default function HomeLayout({ children }: PropsWithChildren) {
  return <div className="flex flex-col p-12 gap-12">{children}</div>;
}

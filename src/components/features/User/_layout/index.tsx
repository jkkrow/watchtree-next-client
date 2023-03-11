import { PropsWithChildren } from 'react';

export default function UserLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col justify-center items-center max-w-7xl p-6 mx-auto">
      {children}
    </div>
  );
}

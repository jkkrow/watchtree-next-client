import { PropsWithChildren } from 'react';

export default function HistoryLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col justify-center items-center max-w-9xl p-6 mx-auto">
      {children}
    </div>
  );
}

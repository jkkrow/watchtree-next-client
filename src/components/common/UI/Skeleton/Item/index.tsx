import { PropsWithChildren } from 'react';

export default function SkeletonItem({ children }: PropsWithChildren) {
  return (
    <div className="relative w-full h-full bg-primary isolate overflow-hidden shadow-lg dark:ring-1 dark:ring-tertiary before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-neutral-300/50 before:to-transparent dark:before:via-neutral-700/50">
      {children}
    </div>
  );
}

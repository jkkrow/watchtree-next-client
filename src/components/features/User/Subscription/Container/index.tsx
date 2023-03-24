import Link from 'next/link';
import { useRouter } from 'next/router';
import { parse } from 'path';
import { motion } from 'framer-motion';
import { PropsWithChildren } from 'react';

export default function SubscriptionContainer({ children }: PropsWithChildren) {
  const tabs = ['subscribes', 'subscribers'];
  const router = useRouter();

  const { name: currentTab } = parse(router.pathname);

  return (
    <div className="flex flex-col w-full max-w-md lg:max-w-5xl">
      <header className="flex w-full px-4 mb-8 text-lg font-bold">
        {tabs.map((tab) => (
          <div className="relative flex w-full" key={tab}>
            <Link
              className="flex justify-center w-full p-4 capitalize hover:bg-hover transition-colors"
              href={`/user/${tab}`}
            >
              {tab}
            </Link>
            {currentTab === tab ? (
              <motion.div
                className="absolute w-full bottom-0 h-[2px] bg-inversed"
                layoutId="subscription-header"
              />
            ) : null}
          </div>
        ))}
      </header>
      {children}
    </div>
  );
}

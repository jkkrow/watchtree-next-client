import Link from 'next/link';
import { useRouter } from 'next/router';
import { parse } from 'path';
import { motion } from 'framer-motion';

export default function SubscriptionHeader() {
  const tabs = ['subscribes', 'subscribers'];
  const router = useRouter();

  const { name: currentTab } = parse(router.pathname);

  return (
    <header className="flex mb-8 w-auto text-lg font-bold">
      {tabs.map((tab) => (
        <div className="relative flex" key={tab}>
          <Link
            className="px-10 py-4 capitalize hover:bg-hover transition-colors"
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
  );
}

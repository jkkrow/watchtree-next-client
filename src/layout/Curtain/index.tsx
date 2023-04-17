import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { useCurtain } from '@/hooks/ui/curtain';
import { useTimeout } from '@/hooks/util/time';
import { opacityVariants } from '@/constants/variants';

const DELAY = 300;

export default function Curtain() {
  const { curtain, close } = useCurtain();
  const [setCurtainTimeout] = useTimeout();
  const router = useRouter();

  useEffect(() => {
    if (!curtain) return;
    const { id, nodeId, progress } = curtain;
    const pathname = `/video/${id}`;
    const query = { nodeId, progress };
    setCurtainTimeout(() => router.push({ pathname, query }), DELAY);
  }, [router, curtain, setCurtainTimeout]);

  useEffect(() => {
    const handler = () => {
      if (!curtain) return;
      close();
    };

    router.events.on('routeChangeComplete', handler);

    return () => {
      router.events.off('routeChangeComplete', handler);
    };
  }, [router.events, curtain, close]);

  return (
    <AnimatePresence>
      {curtain ? (
        <motion.div
          className="absolute inset-0 z-30 bg-black"
          variants={opacityVariants}
          transition={{ duration: DELAY / 1000 }}
          initial="inActive"
          animate="active"
          exit="inActive"
        />
      ) : null}
    </AnimatePresence>
  );
}

import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

import Button from '@/components/common/Element/Button';
import { useAppSelector } from '@/hooks/store';
import { footerVariants } from '@/constants/variants';

export default function Footer() {
  const user = useAppSelector((state) => state.user.info);
  const router = useRouter();

  const getStartedHandler = () => {
    router.push(user ? '/user/videos' : '/auth/signin');
  };

  const browseHandler = () => {
    router.push('/browse/featured');
  };

  return (
    <section className="w-full max-w-8xl py-32 m-auto">
      <motion.div
        className="flex flex-col px-12 py-20 gap-12 rounded-md bg-hover"
        variants={footerVariants}
        initial="inActive"
        whileInView="active"
        viewport={{ amount: 'all', once: true }}
      >
        <h3 className="font-bold text-3xl">Are you ready to begin?</h3>
        <div className="flex gap-4">
          <Button small inversed onClick={getStartedHandler}>
            Get Started
          </Button>
          <Button small onClick={browseHandler}>
            Browse Videos
          </Button>
        </div>
      </motion.div>
    </section>
  );
}

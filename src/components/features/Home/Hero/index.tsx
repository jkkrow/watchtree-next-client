import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

import Button from '@/components/common/Element/Button';
import TreeImage from '@/assets/images/tree.svg';
import AngleRightDoubleIcon from '@/assets/icons/angle-right-double.svg';
import { useAppSelector } from '@/hooks/store';
import { heroVariants } from '@/constants/variants';

export default function Hero() {
  const [showArrow, setShowArrow] = useState(false);
  const user = useAppSelector((state) => state.user.info);
  const router = useRouter();
  const containerRef = useRef<HTMLElement>(null);

  const getStartedHandler = () => {
    router.push(user ? '/user/videos' : '/auth/signin');
  };

  const browseHandler = () => {
    router.push('/browse/featured');
  };

  const scrollDownHandler = () => {
    if (!containerRef.current) return;
    const nextSection = containerRef.current.nextElementSibling;
    nextSection?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => setShowArrow(entry.isIntersecting),
      { threshold: 1 }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <motion.section
      className="relative flex justify-center w-full max-w-7xl h-[calc(100vh-12rem)] m-auto"
      ref={containerRef}
      variants={heroVariants.container}
      initial="inActive"
      whileInView="active"
      viewport={{ once: true }}
    >
      <div className="relative flex items-center w-full h-max m-auto">
        <motion.div
          className="absolute bottom-0 flex w-[550px] max-w-full right-0 text-tertiary lg:w-7/12 lg:text-secondary -lg:[&_*]:filter-none"
          variants={heroVariants.image}
        >
          <TreeImage className="w-full h-full [&_*]:h-full translate-x-6 translate-y-2" />
        </motion.div>
        <motion.div
          className="relative flex flex-col flex-shrink-0 justify-center w-[450px] max-w-full gap-6"
          variants={heroVariants.text}
        >
          <h1 className="text-5xl tracking-tight font-bold">WatchTree</h1>
          <h2 className="text-3xl font-bold tracking-wide">
            A Video Streaming Platform for Enthusiastic Creators
          </h2>
          <p className="font-medium text-lg">
            Publish creative contents with{' '}
            <b
              className="font-bold py-1 border-b-4 border-primary border-dashed cursor-pointer hover:text-hover hover:border-hover transition-colors"
              onClick={scrollDownHandler}
            >
              Tree-Structured Video
            </b>
          </p>
          <div className="flex gap-4">
            <Button small inversed onClick={getStartedHandler}>
              Get Started
            </Button>
            <Button small onClick={browseHandler}>
              Browse Videos
            </Button>
          </div>
        </motion.div>
      </div>
      <motion.div className="absolute bottom-0" variants={heroVariants.button}>
        <button
          className="animate-bounce [transition:opacity_400ms,color_200ms] hover:text-hover data-[hidden=true]:opacity-0 data-[hidden=true]:pointer-events-none"
          data-hidden={!showArrow}
          onClick={scrollDownHandler}
        >
          <AngleRightDoubleIcon className="w-12 h-12 rotate-90" />
        </button>
      </motion.div>
    </motion.section>
  );
}

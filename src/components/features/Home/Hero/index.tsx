import { useRouter } from 'next/router';

import Button from '@/components/common/Element/Button';
import TreeImage from '@/assets/images/tree.svg';
import { useAppSelector } from '@/hooks/store';

export default function Hero() {
  const user = useAppSelector((state) => state.user.info);
  const router = useRouter();

  const getStartedHandler = () => {
    router.push(user ? '/user/videos' : '/auth/signin');
  };

  const browseHandler = () => {
    router.push('/browse/featured');
  };

  return (
    <section className="flex justify-start max-w-7xl h-[calc(100vh-12rem)] p-12 m-auto">
      <div className="relative flex items-center w-full h-max m-auto">
        <div className="absolute bottom-0 flex w-[550px] max-w-full right-0 text-tertiary lg:w-7/12 lg:text-primary">
          <TreeImage className="w-full h-full" />
        </div>
        <div className="relative flex flex-col flex-shrink-0 justify-center w-[450px] max-w-full gap-6">
          <h1 className="text-5xl tracking-tight font-extrabold">WatchTree</h1>
          <h2 className="text-3xl font-bold tracking-wide">
            A Video streaming platform for enthusiastic creators
          </h2>
          <p className="font-medium">
            Publish creative contents with tree-structured videos
          </p>
          <div className="flex gap-4">
            <Button small inversed onClick={getStartedHandler}>
              Get Started
            </Button>
            <Button small onClick={browseHandler}>
              Browse Videos
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

import HomeLayout from '@/components/features/Home/_layout';
import Hero from '@/components/features/Home/Hero';
import Features from '@/components/features/Home/Features';
import { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Hero />
      <Features />
    </>
  );
};

Home.getLayout = function (page) {
  return <HomeLayout>{page}</HomeLayout>;
};

export default Home;

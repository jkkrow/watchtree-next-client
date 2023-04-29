import HomeLayout from '@/components/features/Home/_layout';
import Hero from '@/components/features/Home/Hero';
import Features from '@/components/features/Home/Features';
import Footer from '@/components/features/Home/Footer';
import { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Hero />
      <Features />
      <Footer />
    </>
  );
};

Home.getLayout = function (page) {
  return <HomeLayout>{page}</HomeLayout>;
};

export default Home;

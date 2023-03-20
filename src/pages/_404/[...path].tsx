import { GetServerSideProps } from 'next';

export default function NotFound() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async () => {
  return { redirect: { destination: '/', permanent: false } };
};

import { useGetVideosQuery } from '@/store/features/video/video.api';

export default function Home() {
  const { data, isFetching, isLoading } = useGetVideosQuery({ max: 5 });

  return <div></div>;
}

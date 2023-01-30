import { useRouter } from 'next/router';

import { useAppDispatch } from '@/hooks/store.hook';
import { setVolume } from '@/store/features/video/video.slice';

export default function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  return (
    <div>
      <h1
        className="text-3xl font-bold underline"
        onClick={() => router.push('/browse')}
      >
        Hello World
      </h1>
      <button onClick={() => dispatch(setVolume(0.3))}>set volume</button>
    </div>
  );
}

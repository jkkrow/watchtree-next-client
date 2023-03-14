import Link from 'next/link';

import SigninIcon from '@/assets/icons/signin.svg';
import SignoutIcon from '@/assets/icons/signout.svg';
import TimeIcon from '@/assets/icons/time.svg';
import UserIcon from '@/assets/icons/user.svg';
import VideoIcon from '@/assets/icons/video.svg';
import FavoriteIcon from '@/assets/icons/favorite.svg';
import SubscribeIcon from '@/assets/icons/subscribe-users.svg';
import { useAppSelector } from '@/hooks/store';
import { useModal } from '@/hooks/ui/modal';

interface NavLink {
  href: string;
  name: string;
  icon: JSX.Element;
}

const userRoutes: NavLink[] = [
  { href: '/user/account', name: 'Account', icon: <UserIcon /> },
  { href: '/user/videos', name: 'Your Videos', icon: <VideoIcon /> },
  { href: '/user/favorites', name: 'Favorites', icon: <FavoriteIcon /> },
  { href: '/user/subscribes', name: 'Subscriptions', icon: <SubscribeIcon /> },
  { href: '/history', name: 'Watch History', icon: <TimeIcon /> },
  { href: '/', name: 'Sign Out', icon: <SignoutIcon /> },
];

const guestRoutes: NavLink[] = [
  { href: '/auth/signin', name: 'Sign In', icon: <SigninIcon /> },
  { href: '/history', name: 'Watch History', icon: <TimeIcon /> },
];

export default function MenuNavigation() {
  const { info } = useAppSelector((state) => state.user);
  const { open } = useModal();

  const links = info ? userRoutes : guestRoutes;
  const signoutHandler = () => {
    open('signout');
  };

  return (
    <ul>
      {links.map(({ href, name, icon }) => (
        <li key={name}>
          {name === 'Sign Out' ? (
            <button
              className="flex w-full p-4 gap-4 hover:bg-hover transition-colors"
              onClick={signoutHandler}
            >
              <span className="w-6 h-6">{icon}</span>
              <span>{name}</span>
            </button>
          ) : (
            <Link
              className="flex p-4 gap-4 hover:bg-hover transition-colors"
              href={href}
            >
              <span className="w-6 h-6">{icon}</span>
              <span>{name}</span>
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}

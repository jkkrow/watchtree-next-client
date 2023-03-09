import Link from 'next/link';

import SigninIcon from '@/assets/icons/signin.svg';
import SignoutIcon from '@/assets/icons/signout.svg';
import TimeIcon from '@/assets/icons/time.svg';
import UserIcon from '@/assets/icons/user.svg';
import VideoIcon from '@/assets/icons/video.svg';
import FavoriteIcon from '@/assets/icons/favorite.svg';
import SubscribeIcon from '@/assets/icons/subscribe-users.svg';
import { useAppSelector } from '@/hooks/store';
import { useSignoutMutation } from '@/store/features/auth/auth.api';

interface NavLink {
  href: string;
  name: string;
  icon: JSX.Element;
  onClick?: () => void;
}

const userRoutes = (signout: () => void): NavLink[] => [
  { href: '/user/account', name: 'Account', icon: <UserIcon /> },
  { href: '/user/videos', name: 'Your Videos', icon: <VideoIcon /> },
  { href: '/user/favorites', name: 'Favorites', icon: <FavoriteIcon /> },
  { href: '/user/subscribes', name: 'Subscriptions', icon: <SubscribeIcon /> },
  { href: '/histories', name: 'Watch History', icon: <TimeIcon /> },
  { href: '/', name: 'Sign Out', icon: <SignoutIcon />, onClick: signout },
];

const guestRoutes = (): NavLink[] => [
  { href: '/auth/signin', name: 'Sign In', icon: <SigninIcon /> },
  { href: '/histories', name: 'Watch History', icon: <TimeIcon /> },
];

export default function MenuNavigation() {
  const { info } = useAppSelector((state) => state.user);
  const [signout] = useSignoutMutation();

  const links = info ? userRoutes(signout) : guestRoutes();

  return (
    <ul>
      {links.map(({ href, name, icon, onClick }) => (
        <li key={name}>
          <Link
            className="flex p-4 gap-4 hover:bg-hover transition"
            href={href}
            onClick={onClick}
          >
            <span className="w-6 h-6">{icon}</span>
            <span>{name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

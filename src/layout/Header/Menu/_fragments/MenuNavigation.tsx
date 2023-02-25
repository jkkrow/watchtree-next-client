import Link from 'next/link';

import SigninIcon from '@/assets/icons/signin.svg';
import TimeIcon from '@/assets/icons/time.svg';

export default function MenuNavigation() {
  const links = [
    { href: '/auth/signin', name: 'Sign In', icon: <SigninIcon /> },
    { href: '/histories', name: 'Watch History', icon: <TimeIcon /> },
  ];

  return (
    <ul>
      {links.map(({ href, name, icon }) => (
        <li key={name}>
          <Link
            className="flex p-4 gap-2 hover:bg-hover transition"
            href={href}
          >
            <span className="w-6 h-6">{icon}</span>
            <span>{name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

import Link from 'next/link';

import LogoIcon from '@/assets/icons/logo.svg';

export default function Logo() {
  return (
    <Link href="/" className="relative flex w-8 h-8 my-auto">
      <LogoIcon />
    </Link>
  );
}

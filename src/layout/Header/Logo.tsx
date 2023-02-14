import Link from 'next/link';

import LogoIcon from '@/assets/icons/logo.svg';

export default function Logo() {
  return (
    <Link href="/" className="relative min-w-8 min-h-8 w-8 h-8 my-auto">
      <LogoIcon />
    </Link>
  );
}

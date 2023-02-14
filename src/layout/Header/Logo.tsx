import Link from 'next/link';
import Image from 'next/image';

export default function Logo() {
  return (
    <Link href="/" className="relative min-w-8 min-h-8 w-8 h-8 my-auto">
      <Image src="logo.svg" alt="logo" fill priority />
    </Link>
  );
}

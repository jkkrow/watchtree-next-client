import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { PropsWithChildren } from 'react';

interface LinkProps {
  href: string;
}

export default function Link({ href, children }: PropsWithChildren<LinkProps>) {
  const router = useRouter();

  return (
    <NextLink
      href={href}
      className="hover:text-primary aria-selected:text-primary text-secondary transition"
      aria-selected={router.pathname === href}
    >
      {children}
    </NextLink>
  );
}

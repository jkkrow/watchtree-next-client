import Link from 'next/link';
import { useRouter } from 'next/router';

interface NavigationListProps {
  links: { href: string; name: string }[];
}

export default function NavigationList({ links }: NavigationListProps) {
  const router = useRouter();

  return (
    <ul className="md:flex hidden px-4 gap-5">
      {links.map(({ href, name }) => (
        <li key={name}>
          <Link
            href={href}
            className="flex gap-2 hover:text-primary data-[active=true]:text-primary text-secondary transition"
            data-active={router.pathname === href}
          >
            {name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

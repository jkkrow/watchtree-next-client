import Link from '@/components/common/Element/Link';

interface NavigationListProps {
  links: { href: string; name: string }[];
}

export default function NavigationList({ links }: NavigationListProps) {
  return (
    <ul className="md:flex hidden px-4 gap-5">
      {links.map(({ href, name }) => (
        <li key={name}>
          <Link href={href}>{name}</Link>
        </li>
      ))}
    </ul>
  );
}

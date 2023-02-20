import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const links = [
    { href: '/private-policy', name: 'Private Policy' },
    { href: '/terms-and-conditions', name: 'Terms and Conditions' },
  ];

  return (
    <footer className="absolute flex flex-col justify-center items-center w-full bottom-0 p-6 gap-2 text-xs">
      <nav>
        <ul className="flex gap-6">
          {links.map(({ href, name }) => (
            <li key={name}>
              <Link className="hover:text-secondary transition" href={href}>
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <p>&copy; {currentYear} WatchTree. All rights reserved</p>
    </footer>
  );
}

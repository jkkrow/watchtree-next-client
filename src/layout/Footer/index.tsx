import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const links = [
    { href: '/document/private-policy', name: 'Private Policy' },
    { href: '/document/terms-and-conditions', name: 'Terms and Conditions' },
  ];

  return (
    <footer className="flex flex-col justify-center items-center w-full bottom-0 p-6 mt-auto gap-2 text-xs">
      <nav>
        <ul className="flex gap-6">
          {links.map(({ href, name }) => (
            <li key={name}>
              <Link className="hover:text-hover transition" href={href}>
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

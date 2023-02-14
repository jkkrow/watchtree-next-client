import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navigation() {
  const router = useRouter();
  const navLinks = [
    { href: '/', name: 'Home' },
    { href: '/browse', name: 'Recent' },
    { href: '/featured', name: 'Featured' },
  ];

  return (
    <nav className="group relative flex justify-center items-center h-full mr-auto mx-8 font-semibold">
      <div className="md:hidden w-8 h-full relative flex justify-center items-center after:absolute after:border-t-8 after:border-t-black after:border-x-8 after:border-x-transparent cursor-pointer" />
      <ul className="md:visible md:opacity-100 md:relative md:transition-none md:flex-row md:top-0 md:gap-5 md:border-none group-hover:opacity-100 group-hover:visible group-hover:transition invisible opacity-0 transition absolute flex flex-col justify-center items-center top-full gap-0 border border-black">
        {navLinks.map(({ href, name }) => (
          <li key={name} className="md:p-0 px-12 py-4">
            <Link
              href={href}
              className="hover:text-black aria-selected:text-black text-gray-500 transition"
              aria-selected={router.pathname === href}
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

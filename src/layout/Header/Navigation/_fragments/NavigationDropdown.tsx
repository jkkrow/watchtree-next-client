import Link from 'next/link';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';

import { opacityVariants } from '@/constants/variants';

interface NavigationDropdownProps {
  links: { href: string; name: string }[];
  active: boolean;
}

export default function NavigationDropdown({
  links,
  active,
}: NavigationDropdownProps) {
  const router = useRouter();

  return (
    <AnimatePresence>
      {active ? (
        <motion.ul
          className="absolute text-center top-full bg-primary border-2 border-tertiary shadow-lg"
          variants={opacityVariants}
          transition={{ duration: 0.1 }}
          initial="inActive"
          animate="active"
          exit="inActive"
        >
          {links.map(({ href, name }) => (
            <li key={name}>
              <Link
                className="block px-10 py-4 hover:bg-hover data-[active=true]:text-primary text-secondary transition"
                data-active={router.pathname === href}
                href={href}
              >
                {name}
              </Link>
            </li>
          ))}
        </motion.ul>
      ) : null}
    </AnimatePresence>
  );
}

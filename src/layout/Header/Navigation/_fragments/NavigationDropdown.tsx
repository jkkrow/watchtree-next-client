import Link from 'next/link';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';

const dropdownVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

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
          className="absolute text-center top-full bg-primary ring-1 ring-secondary"
          variants={dropdownVariants}
          transition={{ duration: 0.1 }}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {links.map(({ href, name }) => (
            <li key={name}>
              <Link
                className="block px-10 py-4 hover:bg-hover aria-selected:text-primary text-secondary transition"
                aria-selected={router.pathname === href}
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

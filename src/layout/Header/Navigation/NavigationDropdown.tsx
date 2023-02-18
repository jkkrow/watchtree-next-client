import { AnimatePresence, motion } from 'framer-motion';

import Link from '@/components/common/Element/Link';

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
            <li key={name} className="[&>*]:block [&>*]:px-10 [&>*]:py-4">
              <Link href={href}>{name}</Link>
            </li>
          ))}
        </motion.ul>
      ) : null}
    </AnimatePresence>
  );
}

import NavigationList from './NavigationList';
import NavigationToggle from './NavigationToggle';
import NavigationDropdown from './NavigationDropdown';
import { useDropdown } from '@/hooks/ui';

export default function Navigation() {
  const links = [
    { href: '/', name: 'Home' },
    { href: '/browse', name: 'Recent' },
    { href: '/featured', name: 'Featured' },
  ];

  const { active, ref, open, close, toggle } = useDropdown();

  return (
    <nav className="group relative flex justify-center items-center h-full mr-auto font-semibold">
      <NavigationList links={links} />
      <div
        className="md:hidden w-8 h-full relative flex justify-center cursor-pointer"
        ref={ref}
        onPointerEnter={open}
        onMouseLeave={close}
      >
        <NavigationToggle active={active} onClick={toggle} />
        <NavigationDropdown links={links} active={active} />
      </div>
    </nav>
  );
}

import NavigationList from './_fragments/NavigationList';
import NavigationToggle from './_fragments/NavigationToggle';
import NavigationDropdown from './_fragments/NavigationDropdown';
import { useDropdown } from '@/hooks/ui/dropdown';

export default function Navigation() {
  const links = [
    { href: '/', name: 'Home' },
    { href: '/browse/featured', name: 'Featured' },
    { href: '/browse/recent', name: 'Recent' },
  ];

  const { active, containerRef, open, close, toggle } =
    useDropdown<HTMLDivElement>();

  return (
    <nav className="group relative flex justify-center items-center h-full mr-auto font-semibold">
      <NavigationList links={links} />
      <div
        className="md:hidden w-8 h-full relative flex justify-center cursor-pointer"
        ref={containerRef}
        onPointerEnter={open}
        onMouseLeave={close}
      >
        <NavigationToggle active={active} onClick={toggle} />
        <NavigationDropdown links={links} active={active} />
      </div>
    </nav>
  );
}

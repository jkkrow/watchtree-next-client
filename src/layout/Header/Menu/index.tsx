import MenuToggle from './_fragments/MenuToggle';
import MenuDropdown from './_fragments/MenuDropdown';
import { useDropdown } from '@/hooks/ui/dropdown';

export default function Menu() {
  const { active, containerRef, open, close, toggle } =
    useDropdown<HTMLDivElement>();

  return (
    <div
      className="relative flex items-center h-full"
      ref={containerRef}
      onPointerEnter={open}
      onMouseLeave={close}
    >
      <MenuToggle active={active} onClick={toggle} />
      <MenuDropdown active={active} />
    </div>
  );
}

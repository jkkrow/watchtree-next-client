import MenuToggle from './_fragments/MenuToggle';
import MenuDropdown from './_fragments/MenuDropdown';
import { useDropdown } from '@/hooks/ui';

export default function Menu() {
  const { active, ref, open, close, toggle } = useDropdown();

  return (
    <div
      className="relative flex items-center h-full"
      ref={ref}
      onPointerEnter={open}
      onMouseLeave={close}
    >
      <MenuToggle active={active} onClick={toggle} />
      <MenuDropdown active={active} />
    </div>
  );
}

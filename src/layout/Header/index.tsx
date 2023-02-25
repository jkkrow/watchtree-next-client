import Logo from './Logo';
import Navigation from './Navigation';
import Search from './Search';
import Menu from './Menu';

export default function Header() {
  return (
    <header className="sticky flex items-center top-0 w-full h-20 px-4 gap-4 backdrop-blur-md z-10 hover:bg-primary transition">
      <Logo />
      <Navigation />
      <Search />
      <Menu />
    </header>
  );
}

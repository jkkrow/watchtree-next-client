import Logo from './Logo';
import Navigation from './Navigation';
import Search from './Search';
import ThemeToggler from './ThemeToggler';

export default function Header() {
  return (
    <header className="sticky flex items-center top-0 w-full h-20 px-5">
      <Logo />
      <Navigation />
      <Search />
    </header>
  );
}

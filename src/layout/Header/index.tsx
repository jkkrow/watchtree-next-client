import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

import Logo from './Logo';
import Navigation from './Navigation';
import Search from './Search';
const Menu = dynamic(() => import('./Menu'), { ssr: false });

export default function Header() {
  const [isTop, setIsTop] = useState(false);
  const headerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!headerRef.current) return;

    const header = headerRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => setIsTop(entry.isIntersecting),
      { threshold: 1 }
    );

    observer.observe(header);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div className="absolute invisible top-0 w-full" ref={headerRef} />
      <header
        className="sticky flex items-center top-0 w-full h-20 px-4 gap-4 z-10 bg-primary ring-secondary transition-shadow md:px-8 md:gap-8 data-[top=false]:shadow-lg dark:data-[top=false]:ring-1"
        data-top={isTop}
      >
        <Logo />
        <Navigation />
        <Search />
        <Menu />
      </header>
    </>
  );
}

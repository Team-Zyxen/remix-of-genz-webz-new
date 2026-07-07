"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Header: React.FC = () => {
  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    sessionStorage.setItem('showLoading', 'true');
    window.location.href = '/';
  };

  const handleWorkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    sessionStorage.setItem('skipLoading', 'true');
  };

    const navLinks = [
      { href: "/#crafted", label: "Work", onClick: handleWorkClick },
      { href: "/about", label: "About" },
      { href: "/blogs", label: "Blogs" },
      { href: "/contact", label: "Contact" },
    ];
  
    return (
      <header className="fixed top-0 left-0 right-0 z-[100] w-full bg-black/60 backdrop-blur-md border-b border-white/[0.05] transition-all duration-500">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" onClick={handleLogoClick} className="flex items-center gap-2 smooth-transition hover:opacity-80">
            <Image
              src="/previews/logo.png"
              alt="ZYXEN Logo"
              width={32}
              height={32}
              className="w-8 h-8 object-contain filter invert"
            />
            <span className="text-logo text-white font-bold tracking-tighter">
              <span className="text-[1.5rem]">Z</span>YXEN
            </span>
          </a>
  
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={link.onClick}
                  className="text-[10px] uppercase tracking-[0.3em] text-gray-400 hover:text-white smooth-transition font-medium"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Mobile Navigation */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <button className="p-2 text-white/60 hover:text-white transition-colors">
                    <Menu size={24} />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-black/95 border-white/10 backdrop-blur-xl">
                  <SheetHeader>
                    <SheetTitle className="text-white font-bold tracking-tighter text-left mb-8">
                      <span className="text-[1.5rem]">Z</span>YXEN
                    </SheetTitle>
                  </SheetHeader>
                  <nav className="flex flex-col gap-8 mt-12">
                    {navLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        onClick={link.onClick}
                        className="text-2xl font-bold tracking-tighter text-white/60 hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </header>
  );
};

export default Header;
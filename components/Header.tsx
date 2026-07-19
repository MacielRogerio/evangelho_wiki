'use client';

import React, { useState } from 'react';
import { Search, Moon, Sun } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  const [isDark, setIsDark] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: 'Início', href: '#' },
    { name: 'Antigo Testamento', href: '/antigo-testamento' },
    { name: 'Novo Testamento', href: '/novo-testamento' },
    { name: 'Atualidade', href: '/atualidade' },
    { name: 'Recursos', href: '/recursos' },
    { name: 'Sobre', href: '/sobre' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-navy/80 backdrop-blur-md border-b border-gold/20">
      <div className="container mx-auto px-4 py-5">
        <div className="flex min-h-12 items-center justify-between gap-4 lg:gap-8">
          {/* Logo */}
          <Link href="/" className="flex flex-shrink-0 items-center py-1 pr-3">
            <div className="whitespace-nowrap text-lg font-bold leading-none text-gold sm:text-xl md:text-2xl">
              evangelho.wiki
            </div>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden items-center gap-8 lg:flex">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center text-sm font-medium text-gray-300 hover:text-gold transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex flex-shrink-0 items-center gap-2 sm:gap-4">
            {/* Search Icon */}
            <button className="flex items-center justify-center p-2 rounded-lg hover:bg-navy-light transition-colors duration-200">
              <Search size={20} className="text-gold" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="flex items-center justify-center p-2 rounded-lg hover:bg-navy-light transition-colors duration-200"
            >
              {isDark ? (
                <Sun size={20} className="text-gold" />
              ) : (
                <Moon size={20} className="text-gold" />
              )}
            </button>

            {/* Sign In Button */}
            <button className="hidden items-center px-4 py-2 rounded-lg bg-gradient-to-r from-gold to-gold-light text-navy font-semibold hover:shadow-glow-gold transition-all duration-200 md:flex">
              Entrar
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center justify-center p-2 rounded-lg hover:bg-navy-light transition-colors duration-200 lg:hidden"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-gold/20 pt-4">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-2 text-sm font-medium text-gray-300 hover:text-gold transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
            <button className="w-full mt-4 px-4 py-2 rounded-lg bg-gradient-to-r from-gold to-gold-light text-navy font-semibold hover:shadow-glow-gold transition-all duration-200">
              Entrar
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}

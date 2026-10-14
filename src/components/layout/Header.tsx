'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Bell, Globe, Compass, ShieldAlert, Sparkles, Building2, Newspaper, Calendar, Store, Users, User } from 'lucide-react';

export function Header() {
  const { language, toggleLanguage, t, setIsNotificationsOpen } = useApp();
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/map', label: t.nav.map },
    { href: '/report', label: t.nav.report, highlight: true },
    { href: '/issues', label: t.nav.issues },
    { href: '/directory', label: t.nav.directory },
    { href: '/news', label: t.nav.news },
    { href: '/events', label: t.nav.events },
    { href: '/community', label: t.nav.community },
    { href: '/businesses', label: t.nav.businesses },
    { href: '/admin', label: t.nav.admin },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-warm-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-3">
          {/* Logo & Locality */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-civic-800 text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:bg-civic-700 transition-colors">
              <span className="text-amber-400 font-black">ನ</span>
              <span className="text-white text-xs ml-0.5 font-bold">GBN</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-900 tracking-tight text-base sm:text-lg leading-tight group-hover:text-civic-800 transition-colors">
                  {t.appName}
                </span>
                <span className="hidden md:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-civic-100 text-civic-800 border border-civic-200">
                  Prototype
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                Gauribidanur Taluk • Chikkaballapur
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              if (link.highlight) {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-600 text-white hover:bg-amber-700 shadow-sm transition-all"
                  >
                    <span>+</span>
                    <span>{link.label}</span>
                  </Link>
                );
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-civic-50 text-civic-800 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              aria-label="Toggle language between English and Kannada"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold border border-warm-300 bg-warm-50 text-slate-800 hover:bg-warm-100 transition-colors shadow-2xs"
            >
              <Globe className="w-3.5 h-3.5 text-civic-700" />
              <span className="font-bold">{t.languageToggle}</span>
            </button>

            {/* Notifications Bell */}
            <button
              onClick={() => setIsNotificationsOpen(true)}
              aria-label="View notifications"
              className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white animate-pulse" />
            </button>

            {/* Profile / More Button */}
            <Link
              href="/profile"
              aria-label="User Profile and Settings"
              className="p-1.5 sm:p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              <User className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

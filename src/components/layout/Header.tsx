'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  Bell,
  Globe,
  User,
  PlusCircle,
  ChevronDown,
  Building2,
  Calendar,
  MessageSquare,
  Store,
  Sparkles,
  Info,
  ShieldCheck,
} from 'lucide-react';

export function Header() {
  const { language, toggleLanguage, t, setIsNotificationsOpen } = useApp();
  const pathname = usePathname();
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsMoreDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setIsMoreDropdownOpen(false);
  }, [pathname]);

  const primaryNav = [
    { href: '/', label: t.nav.home },
    { href: '/map', label: t.nav.map },
    { href: '/issues', label: t.nav.issues },
    { href: '/directory', label: t.nav.directory },
    { href: '/news', label: t.nav.news },
  ];

  const moreItems = [
    { href: '/departments', label: t.nav.departments, icon: Building2 },
    { href: '/events', label: t.nav.events, icon: Calendar },
    { href: '/community', label: t.nav.community, icon: MessageSquare },
    { href: '/businesses', label: t.nav.businesses, icon: Store },
    { href: '/influencers', label: t.nav.creators, icon: Sparkles },
    { href: '/about', label: t.nav.about, icon: Info },
    { href: '/admin', label: t.nav.admin, icon: ShieldCheck },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-3">
          {/* Brand Logo & Locality */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-civic-700 text-white flex items-center justify-center font-bold text-base shadow-xs group-hover:bg-civic-800 transition-colors">
              <span className="text-amber-300 font-black">ನ</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 tracking-tight text-base sm:text-lg leading-tight group-hover:text-civic-800 transition-colors">
                  {t.appName}
                </span>
                <span className="hidden sm:inline-flex items-center px-1.5 py-0.2 rounded text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                  Prototype
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                Gauribidanur • Chikkaballapur
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {primaryNav.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-civic-50 text-civic-800 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Desktop "More" Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsMoreDropdownOpen(!isMoreDropdownOpen)}
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  isMoreDropdownOpen ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
                aria-expanded={isMoreDropdownOpen}
              >
                <span>{t.nav.more}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isMoreDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isMoreDropdownOpen && (
                <div className="absolute right-0 mt-1 w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 animate-in fade-in zoom-in-95 duration-100 z-50">
                  {moreItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-2.5 px-3.5 py-2 text-xs sm:text-sm text-slate-700 hover:bg-slate-50 hover:text-civic-800 transition-colors"
                      >
                        <Icon className="w-4 h-4 text-slate-400" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Prominent Desktop "Report Issue" Action */}
            <Link
              href="/report"
              className="inline-flex items-center gap-1.5 ml-2 px-3.5 py-1.5 rounded-lg text-sm font-semibold bg-civic-700 text-white hover:bg-civic-800 shadow-xs transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t.nav.report}</span>
            </Link>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              aria-label="Toggle language between English and Kannada"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100 transition-colors"
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
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white" />
            </button>

            {/* Profile / Preferences Link */}
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

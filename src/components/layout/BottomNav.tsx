'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  Home,
  MapPin,
  PlusCircle,
  Newspaper,
  Menu,
  X,
  Building2,
  Users,
  Calendar,
  MessageSquare,
  Store,
  Sparkles,
  Info,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export function BottomNav() {
  const { t } = useApp();
  const pathname = usePathname();
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const mainTabs = [
    { href: '/', label: t.nav.home, icon: Home },
    { href: '/map', label: t.nav.map, icon: MapPin },
    { href: '/report', label: t.nav.report, icon: PlusCircle, isReport: true },
    { href: '/news', label: t.nav.news, icon: Newspaper },
  ];

  const secondaryLinks = [
    { href: '/issues', label: t.nav.issues, icon: CheckCircle2, desc: 'Browse all complaints and status history' },
    { href: '/directory', label: t.nav.directory, icon: Users, desc: 'Public officials, phone numbers & offices' },
    { href: '/departments', label: t.nav.departments, icon: Building2, desc: 'CMC, Taluk Office, BESCOM & Police' },
    { href: '/events', label: t.nav.events, icon: Calendar, desc: 'Cultural fairs, science days & community drives' },
    { href: '/community', label: t.nav.community, icon: MessageSquare, desc: 'Moderated notices & volunteer board' },
    { href: '/businesses', label: t.nav.businesses, icon: Store, desc: 'Local shops, eateries & agricultural supplies' },
    { href: '/influencers', label: t.nav.creators, icon: Sparkles, desc: 'Local video journalists & regional creators' },
    { href: '/about', label: t.nav.about, icon: Info, desc: 'Platform transparency & data methodology' },
    { href: '/admin', label: t.nav.admin, icon: ShieldCheck, desc: 'Simulated administrator dashboard' },
  ];

  return (
    <>
      {/* Bottom Bar - Mobile Only */}
      <nav
        aria-label="Mobile Navigation"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-warm-200 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]"
      >
        <div className="grid grid-cols-5 items-end justify-items-center h-16 max-w-md mx-auto">
          {/* Home */}
          <Link
            href="/"
            className={`flex flex-col items-center justify-center w-full h-full py-1 ${
              pathname === '/' ? 'text-civic-800 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Home className={`w-5 h-5 ${pathname === '/' ? 'stroke-[2.5px]' : 'stroke-2'}`} />
            <span className="text-[10px] mt-1 tracking-tight">{t.nav.home}</span>
          </Link>

          {/* Map */}
          <Link
            href="/map"
            className={`flex flex-col items-center justify-center w-full h-full py-1 ${
              pathname === '/map' ? 'text-civic-800 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <MapPin className={`w-5 h-5 ${pathname === '/map' ? 'stroke-[2.5px]' : 'stroke-2'}`} />
            <span className="text-[10px] mt-1 tracking-tight">{t.nav.map}</span>
          </Link>

          {/* Report (Prominent Raised Center Action) */}
          <Link
            href="/report"
            className="flex flex-col items-center justify-center -translate-y-3 group"
          >
            <div className="w-13 h-13 rounded-full bg-gradient-to-tr from-amber-600 to-amber-500 text-white flex items-center justify-center shadow-lg shadow-amber-600/30 ring-4 ring-white group-active:scale-95 transition-transform">
              <PlusCircle className="w-7 h-7 stroke-[2.2px]" />
            </div>
            <span className="text-[10px] font-bold text-amber-800 mt-1 tracking-tight">
              {t.nav.report}
            </span>
          </Link>

          {/* News */}
          <Link
            href="/news"
            className={`flex flex-col items-center justify-center w-full h-full py-1 ${
              pathname.startsWith('/news') ? 'text-civic-800 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Newspaper className={`w-5 h-5 ${pathname.startsWith('/news') ? 'stroke-[2.5px]' : 'stroke-2'}`} />
            <span className="text-[10px] mt-1 tracking-tight">{t.nav.news}</span>
          </Link>

          {/* More Menu Trigger */}
          <button
            onClick={() => setIsMoreOpen(true)}
            aria-label="Open More Menu"
            className={`flex flex-col items-center justify-center w-full h-full py-1 ${
              isMoreOpen ? 'text-civic-800 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Menu className="w-5 h-5 stroke-2" />
            <span className="text-[10px] mt-1 tracking-tight">{t.nav.more}</span>
          </button>
        </div>
      </nav>

      {/* "More" Drawer / Modal for Mobile */}
      {isMoreOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="bg-white rounded-t-2xl max-h-[85vh] overflow-y-auto p-4 pb-8 shadow-2xl animate-in slide-in-from-bottom duration-200"
            role="dialog"
            aria-modal="true"
            aria-label="Additional Navigation Options"
          >
            <div className="flex items-center justify-between pb-3 border-b border-warm-200">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Namma Gauribidanur</h3>
                <p className="text-xs text-slate-500">Taluk Civic & Community Hub</p>
              </div>
              <button
                onClick={() => setIsMoreOpen(false)}
                className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
              {secondaryLinks.map((item) => {
                const Icon = item.icon;
                const isItemActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMoreOpen(false)}
                    className={`flex items-start gap-3 p-3 rounded-xl border transition-colors ${
                      isItemActive
                        ? 'border-civic-600 bg-civic-50 text-civic-900'
                        : 'border-warm-200 hover:bg-warm-50 text-slate-800'
                    }`}
                  >
                    <div className="w-9 h-9 rounded-lg bg-warm-100 flex items-center justify-center flex-shrink-0 text-civic-800 mt-0.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{item.label}</div>
                      <p className="text-xs text-slate-500 line-clamp-1">{item.desc}</p>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="mt-5 pt-3 border-t border-warm-200 text-center text-xs text-slate-500">
              Independent civic prototype • Gauribidanur Taluk, Karnataka
            </div>
          </div>
        </div>
      )}
    </>
  );
}

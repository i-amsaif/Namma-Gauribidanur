'use client';

import React, { useState, useEffect } from 'react';
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
  Settings,
  ChevronRight,
} from 'lucide-react';

export function BottomNav() {
  const { t } = useApp();
  const pathname = usePathname();
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  // Close drawer on route change
  useEffect(() => {
    setIsMoreOpen(false);
  }, [pathname]);

  // Prevent background scrolling when more menu is open
  useEffect(() => {
    if (isMoreOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMoreOpen]);

  const secondarySections = [
    {
      category: 'Civic Services',
      items: [
        {
          href: '/issues',
          label: t.nav.issues,
          desc: 'View all reported civic grievances & status',
          icon: CheckCircle2,
          color: 'text-amber-600 bg-amber-50',
        },
        {
          href: '/directory',
          label: t.nav.directory,
          desc: 'Officials grouped by department & direct office lines',
          icon: Users,
          color: 'text-civic-700 bg-civic-50',
        },
        {
          href: '/departments',
          label: t.nav.departments,
          desc: 'CMC, Taluk Office, BESCOM & Police escalation',
          icon: Building2,
          color: 'text-blue-600 bg-blue-50',
        },
      ],
    },
    {
      category: 'Community & Culture',
      items: [
        {
          href: '/events',
          label: t.nav.events,
          desc: 'Science fairs, cultural walks & community drives',
          icon: Calendar,
          color: 'text-indigo-600 bg-indigo-50',
        },
        {
          href: '/community',
          label: t.nav.community,
          desc: 'Moderated citizen notices & volunteer requests',
          icon: MessageSquare,
          color: 'text-emerald-600 bg-emerald-50',
        },
        {
          href: '/businesses',
          label: t.nav.businesses,
          desc: 'Local stores, eateries & agricultural supplies',
          icon: Store,
          color: 'text-orange-600 bg-orange-50',
        },
        {
          href: '/influencers',
          label: t.nav.creators,
          desc: 'Local creators, historians & video journalists',
          icon: Sparkles,
          color: 'text-purple-600 bg-purple-50',
        },
      ],
    },
    {
      category: 'Settings & Transparency',
      items: [
        {
          href: '/profile',
          label: 'Settings & Language',
          desc: 'Switch English/Kannada and manage local data',
          icon: Settings,
          color: 'text-slate-600 bg-slate-100',
        },
        {
          href: '/about',
          label: t.nav.about,
          desc: 'Platform transparency, non-affiliation & DPDP',
          icon: Info,
          color: 'text-slate-600 bg-slate-100',
        },
        {
          href: '/admin',
          label: t.nav.admin,
          desc: 'Simulated department complaint triage',
          icon: ShieldCheck,
          color: 'text-slate-600 bg-slate-100',
        },
      ],
    },
  ];

  return (
    <>
      {/* Bottom Bar - Mobile Only */}
      <nav
        aria-label="Mobile Navigation"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-[0_-2px_10px_rgba(0,0,0,0.04)] px-3 pb-[max(0.6rem,env(safe-area-inset-bottom))]"
      >
        <div className="flex items-center justify-between h-16 max-w-md mx-auto">
          {/* Home */}
          <Link
            href="/"
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
              pathname === '/' ? 'text-civic-800 font-semibold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Home className={`w-5 h-5 ${pathname === '/' ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
            <span className="text-xs mt-1 tracking-tight">{t.nav.home}</span>
          </Link>

          {/* Map */}
          <Link
            href="/map"
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
              pathname === '/map' ? 'text-civic-800 font-semibold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <MapPin className={`w-5 h-5 ${pathname === '/map' ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
            <span className="text-xs mt-1 tracking-tight">{t.nav.map}</span>
          </Link>

          {/* Report - Clean Prominent Primary Action */}
          <Link
            href="/report"
            className="flex flex-col items-center justify-center flex-1 -translate-y-2 group"
          >
            <div className="w-12 h-12 rounded-full bg-civic-700 text-white flex items-center justify-center shadow-md shadow-civic-900/20 ring-4 ring-white group-active:scale-95 transition-all">
              <PlusCircle className="w-6 h-6 stroke-[2.2px]" />
            </div>
            <span className="text-xs font-bold text-civic-800 mt-1 tracking-tight">
              {t.nav.report}
            </span>
          </Link>

          {/* News */}
          <Link
            href="/news"
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
              pathname.startsWith('/news') ? 'text-civic-800 font-semibold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Newspaper className={`w-5 h-5 ${pathname.startsWith('/news') ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
            <span className="text-xs mt-1 tracking-tight">{t.nav.news}</span>
          </Link>

          {/* More Menu Trigger */}
          <button
            onClick={() => setIsMoreOpen(true)}
            aria-label="Open More Options"
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
              isMoreOpen ? 'text-civic-800 font-semibold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Menu className="w-5 h-5 stroke-[1.8px]" />
            <span className="text-xs mt-1 tracking-tight">{t.nav.more}</span>
          </button>
        </div>
      </nav>

      {/* "More" Drawer for Mobile */}
      {isMoreOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
          {/* Backdrop click dismiss */}
          <div className="flex-1" onClick={() => setIsMoreOpen(false)} />

          <div
            className="bg-white rounded-t-2xl max-h-[88vh] overflow-y-auto p-5 pb-10 shadow-2xl border-t border-slate-200 animate-in slide-in-from-bottom duration-200 space-y-5"
            role="dialog"
            aria-modal="true"
            aria-label="More Features"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Namma Gauribidanur</h3>
                <p className="text-xs text-slate-500">Taluk Civic & Community Directory</p>
              </div>
              <button
                onClick={() => setIsMoreOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Grouped Secondary Destinations */}
            {secondarySections.map((section) => (
              <div key={section.category} className="space-y-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                  {section.category}
                </span>
                <div className="space-y-1.5">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isItemActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMoreOpen(false)}
                        className={`flex items-center justify-between p-3 rounded-xl border transition-colors ${
                          isItemActive
                            ? 'border-civic-500 bg-civic-50/70 text-civic-900'
                            : 'border-slate-100 bg-slate-50/50 hover:bg-slate-100/70 text-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${item.color}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-semibold truncate">{item.label}</div>
                            <p className="text-xs text-slate-500 truncate">{item.desc}</p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0 ml-2" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}

            <div className="pt-2 text-center text-xs text-slate-400">
              Independent Community Civic Prototype • Gauribidanur
            </div>
          </div>
        </div>
      )}
    </>
  );
}

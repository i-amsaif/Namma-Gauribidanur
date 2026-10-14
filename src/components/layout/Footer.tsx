'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { ShieldCheck, RefreshCw, Heart, MapPin, ExternalLink, Globe } from 'lucide-react';

export function Footer() {
  const { t, language, toggleLanguage, resetAllDemoData } = useApp();

  const handleReset = () => {
    if (window.confirm(t.common.resetDemoConfirm)) {
      resetAllDemoData();
      alert('Prototype demo data has been reset to initial seed state.');
      window.location.reload();
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-10 pb-24 lg:pb-12 border-t border-slate-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand & Purpose */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-civic-700 text-white flex items-center justify-center font-bold text-sm">
                <span className="text-amber-400">ನ</span>
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                {t.appName}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              &quot;{t.tagline}&quot;
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              An independent, community-driven civic technology prototype for Gauribidanur town and taluk in Chikkaballapur district, Karnataka.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 text-[11px] font-medium text-amber-300 border border-slate-700">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Independent Platform (Non-Government)</span>
            </div>
          </div>

          {/* Civic Services */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Civic Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/report" className="hover:text-white transition-colors">
                  Report a Civic Problem
                </Link>
              </li>
              <li>
                <Link href="/map" className="hover:text-white transition-colors">
                  Interactive Issue Map
                </Link>
              </li>
              <li>
                <Link href="/issues" className="hover:text-white transition-colors">
                  Public Complaint Registry
                </Link>
              </li>
              <li>
                <Link href="/directory" className="hover:text-white transition-colors">
                  Officials & Department Directory
                </Link>
              </li>
              <li>
                <Link href="/departments" className="hover:text-white transition-colors">
                  Local Government Wings (CMC & Taluk)
                </Link>
              </li>
            </ul>
          </div>

          {/* Community & Town Life */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Community & Culture
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/news" className="hover:text-white transition-colors">
                  Sourced Local News & Research
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-white transition-colors">
                  Fairs, Heritage & Science Events
                </Link>
              </li>
              <li>
                <Link href="/community" className="hover:text-white transition-colors">
                  Moderated Citizen Noticeboard
                </Link>
              </li>
              <li>
                <Link href="/businesses" className="hover:text-white transition-colors">
                  Local Businesses & Artisans
                </Link>
              </li>
              <li>
                <Link href="/influencers" className="hover:text-white transition-colors">
                  Regional Content Creators
                </Link>
              </li>
            </ul>
          </div>

          {/* Transparency & Demo Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-1">
              Governance & Prototype
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About the Project & Trust
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition-colors text-amber-400 font-medium">
                  Administrator Demo Dashboard
                </Link>
              </li>
            </ul>

            <div className="pt-2 border-t border-slate-800 space-y-2">
              <button
                onClick={toggleLanguage}
                className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-xs text-white border border-slate-700 transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                <span>Switch Language: {t.languageToggle}</span>
              </button>

              <button
                onClick={handleReset}
                className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 rounded bg-slate-800 hover:bg-rose-950/40 text-xs text-rose-300 border border-rose-900/40 hover:border-rose-700 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{t.common.resetDemo}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Disclaimer & Legal Note */}
        <div className="pt-6 border-t border-slate-800 text-[11px] text-slate-400 space-y-2">
          <p className="leading-relaxed">
            <strong className="text-slate-300">Important Disclaimer:</strong> Namma Gauribidanur is an independent civic technology prototype developed for community research and demonstration. It is not an official government portal and does not hold official authorization or endorsement from the City Municipal Council, District Administration, or Government of Karnataka. Official government emblems and emblems of state are intentionally omitted. Demonstrations of complaints, status progressions, and metrics are simulated for usability testing.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 text-slate-400">
            <span>© {new Date().getFullYear()} Namma Gauribidanur Community Project.</span>
            <span>Gauribidanur • Vidurashwatha • Hosur • D-Palya • Thondebhavi</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

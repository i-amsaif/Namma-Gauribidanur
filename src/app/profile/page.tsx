'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { User, Globe, Bell, ShieldCheck, RefreshCw, CheckCircle2, MapPin, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const { t, language, setLanguage, toggleLanguage, complaints, resetAllDemoData } = useApp();

  const handleReset = () => {
    if (window.confirm(t.common.resetDemoConfirm)) {
      resetAllDemoData();
      alert('Demo data reset successfully.');
      window.location.reload();
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Citizen Profile & Preferences
          </h1>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-civic-100 text-civic-800 border border-civic-200">
            Demo Session
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Manage language, view your simulated submissions, and control prototype local storage.
        </p>
      </div>

      {/* User Card */}
      <div className="bg-white rounded-2xl border border-warm-200 p-6 shadow-xs flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-civic-800 text-white flex items-center justify-center font-bold text-xl shadow-xs">
          GBN
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Gauribidanur Resident (Demo Session)
          </h2>
          <p className="text-xs text-slate-500">
            Ward 5, MG Road / Market Area • Local Citizen
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
              Browser Session Active
            </span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-warm-100 text-slate-600">
              No External Cloud Login Required
            </span>
          </div>
        </div>
      </div>

      {/* Language Preferences */}
      <div className="bg-white rounded-2xl border border-warm-200 p-6 shadow-xs space-y-3">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Globe className="w-4 h-4 text-civic-700" />
          <span>Language Preferences / ಭಾಷಾ ಆಯ್ಕೆ</span>
        </h3>
        <p className="text-xs text-slate-500">
          Switch interface language dynamically across all routes.
        </p>

        <div className="grid grid-cols-2 gap-3 pt-1">
          <button
            onClick={() => setLanguage('en')}
            className={`p-3 rounded-xl border text-left transition-all ${
              language === 'en'
                ? 'border-civic-700 bg-civic-50 font-bold text-civic-900 ring-2 ring-civic-700/20'
                : 'border-warm-200 hover:bg-warm-50 text-slate-700'
            }`}
          >
            <div className="text-sm">English</div>
            <div className="text-[11px] text-slate-500 font-normal">Default Language</div>
          </button>

          <button
            onClick={() => setLanguage('kn')}
            className={`p-3 rounded-xl border text-left transition-all ${
              language === 'kn'
                ? 'border-civic-700 bg-civic-50 font-bold text-civic-900 ring-2 ring-civic-700/20'
                : 'border-warm-200 hover:bg-warm-50 text-slate-700'
            }`}
          >
            <div className="text-sm">ಕನ್ನಡ (Kannada)</div>
            <div className="text-[11px] text-slate-500 font-normal">ಸ್ಥಳೀಯ ಭಾಷೆ</div>
          </button>
        </div>
      </div>

      {/* Tracked Complaints */}
      <div className="bg-white rounded-2xl border border-warm-200 p-6 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">
            Your Tracked Demo Complaints ({complaints.length})
          </h3>
          <Link href="/issues" className="text-xs font-bold text-civic-700 hover:underline">
            View All Issues
          </Link>
        </div>

        <div className="divide-y divide-warm-100">
          {complaints.slice(0, 3).map((c) => (
            <div key={c.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
              <div>
                <span className="font-mono font-bold text-slate-500 text-[10px] block">{c.id}</span>
                <Link href={`/issues/${c.id}`} className="font-bold text-slate-900 hover:text-civic-800">
                  {c.title}
                </Link>
                <span className="text-slate-400 text-[11px] block">{c.location.wardOrVillage}</span>
              </div>
              <span className="font-semibold text-[11px] px-2 py-0.5 rounded bg-warm-100 text-slate-700">
                {c.status.replace(/_/g, ' ')}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Demo Reset Card */}
      <div className="bg-white rounded-2xl border border-warm-200 p-6 shadow-xs space-y-3">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <RefreshCw className="w-4 h-4 text-slate-500" />
          <span>Reset Prototype Data</span>
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed">
          If you want to clear your created test reports, noticeboard submissions, and reset complaints to the initial seed state, use the button below.
        </p>

        <button
          onClick={handleReset}
          className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-300 text-rose-800 font-bold text-xs transition-colors"
        >
          {t.common.resetDemo}
        </button>
      </div>
    </div>
  );
}

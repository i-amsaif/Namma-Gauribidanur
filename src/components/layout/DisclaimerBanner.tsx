'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Info } from 'lucide-react';
import Link from 'next/link';

export function DisclaimerBanner() {
  const { t } = useApp();

  return (
    <div className="bg-amber-50 border-b border-amber-200/80 px-3 py-1.5 text-xs text-amber-900 flex items-center justify-between gap-2">
      <div className="flex items-center gap-1.5 overflow-hidden">
        <Info className="w-3.5 h-3.5 flex-shrink-0 text-amber-700" />
        <span className="truncate font-medium">{t.prototypeBanner}</span>
        <span className="hidden sm:inline text-amber-700/80">• Demonstration Platform</span>
      </div>
      <Link
        href="/about"
        className="text-[11px] underline font-semibold text-amber-800 hover:text-amber-950 flex-shrink-0"
      >
        Learn More
      </Link>
    </div>
  );
}

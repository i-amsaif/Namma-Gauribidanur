'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Info } from 'lucide-react';

export function MapLegend() {
  const { t } = useApp();

  return (
    <div className="bg-white p-3.5 rounded-xl border border-warm-200 shadow-xs space-y-3 text-xs">
      <div className="flex items-center justify-between pb-2 border-b border-warm-100">
        <span className="font-bold text-slate-800">Map Legend & Boundaries</span>
        <span className="text-[10px] text-slate-400 font-medium">Illustrative GIS</span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded border border-amber-600 bg-amber-400/30" />
          <span className="text-[11px] text-slate-700 font-medium">{t.map.legendTown}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded border border-dashed border-teal-700 bg-teal-600/10" />
          <span className="text-[11px] text-slate-700 font-medium">{t.map.legendTaluk}</span>
        </div>
      </div>

      <div className="pt-2 border-t border-warm-100 space-y-1.5">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
          Issue Status Markers
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-500" />
            <span className="text-[11px] text-slate-600">Newly Reported</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <span className="text-[11px] text-slate-600">Under Review</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span className="text-[11px] text-slate-600">In Progress</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-[11px] text-slate-600">Resolved</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <span className="text-[11px] text-slate-600">Reopened / Disputed</span>
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-warm-100 flex items-start gap-1.5 text-[10px] text-slate-400">
        <Info className="w-3 h-3 flex-shrink-0 text-amber-600 mt-0.5" />
        <span>{t.map.approxBoundaryNotice}</span>
      </div>
    </div>
  );
}

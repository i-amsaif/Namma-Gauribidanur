'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { MapContainer } from '@/components/map/MapContainer';
import { MapLegend } from '@/components/map/MapLegend';
import { IssueCategory, IssueStatus } from '@/types';
import Link from 'next/link';
import {
  MapPin,
  Filter,
  PlusCircle,
  AlertCircle,
  CheckCircle2,
  Clock,
  Layers,
  Info,
} from 'lucide-react';

export default function IssueMapPage() {
  const { t, complaints } = useApp();
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  // Filter complaints count
  const filteredCount = complaints.filter((c) => {
    const matchCat = selectedCategory === 'ALL' || c.category === selectedCategory;
    const matchStatus =
      selectedStatus === 'ALL'
        ? true
        : selectedStatus === 'ACTIVE'
        ? c.status !== 'RESOLVED'
        : c.status === selectedStatus;
    return matchCat && matchStatus;
  }).length;

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-8 space-y-4 sm:space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {t.map.title}
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-civic-100 text-civic-800 border border-civic-200">
              Taluk & Town GIS
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {t.map.subtitle}
          </p>
        </div>

        {/* Action Button: Report */}
        <Link
          href="/report"
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{t.home.quickReport}</span>
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-3 sm:p-4 rounded-xl border border-warm-200 shadow-2xs space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Status Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedStatus('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedStatus === 'ALL'
                  ? 'bg-slate-900 text-white'
                  : 'bg-warm-100 text-slate-600 hover:bg-warm-200'
              }`}
            >
              All ({complaints.length})
            </button>
            <button
              onClick={() => setSelectedStatus('ACTIVE')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedStatus === 'ACTIVE'
                  ? 'bg-amber-600 text-white'
                  : 'bg-warm-100 text-slate-600 hover:bg-warm-200'
              }`}
            >
              Active Only
            </button>
            <button
              onClick={() => setSelectedStatus('RESOLVED')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedStatus === 'RESOLVED'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-warm-100 text-slate-600 hover:bg-warm-200'
              }`}
            >
              Resolved
            </button>
            <button
              onClick={() => setSelectedStatus('REOPENED')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedStatus === 'REOPENED'
                  ? 'bg-rose-600 text-white'
                  : 'bg-warm-100 text-slate-600 hover:bg-warm-200'
              }`}
            >
              Disputed / Reopened
            </button>
          </div>

          {/* Category Dropdown */}
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full md:w-auto bg-warm-50 border border-warm-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 font-medium focus:outline-hidden focus:ring-2 focus:ring-civic-600"
            >
              <option value="ALL">All Categories</option>
              <option value="GARBAGE_SANITATION">Garbage & Sanitation</option>
              <option value="ROADS_POTHOLES">Roads & Potholes</option>
              <option value="DRAINAGE_SEWAGE">Drainage & Overflow</option>
              <option value="STREETLIGHTS">Streetlights</option>
              <option value="WATER_SUPPLY">Drinking Water</option>
              <option value="PUBLIC_INFRASTRUCTURE">Public Infrastructure</option>
              <option value="PARKS_PLAYGROUNDS">Parks & Green Spaces</option>
            </select>
          </div>
        </div>

        {/* Counter readout */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          <span>
            Showing <strong className="text-slate-800 font-bold">{filteredCount}</strong> issues on map
          </span>
          <span className="text-[11px] text-civic-700 font-medium">
            Click any pin to inspect details
          </span>
        </div>
      </div>

      {/* Main Map Display Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* The Interactive Map (Span 3 on desktop) */}
        <div className="lg:col-span-3">
          <MapContainer
            complaints={complaints}
            selectedCategory={selectedCategory}
            selectedStatus={selectedStatus}
            height="560px"
          />
        </div>

        {/* Sidebar Legend and Information (Span 1 on desktop) */}
        <div className="space-y-4">
          <MapLegend />

          {/* Taluk Boundary Context Card */}
          <div className="bg-white p-4 rounded-xl border border-warm-200 shadow-2xs space-y-2 text-xs">
            <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-civic-700" />
              <span>Administrative Boundaries</span>
            </h3>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              The inner amber boundary outlines the <strong>23 municipal wards of Gauribidanur City Municipal Council (CMC)</strong>. The outer dashed line represents the <strong>Gauribidanur Taluk administrative boundary</strong> encompassing rural Gram Panchayats such as Vidurashwatha, Hosur, and Thondebhavi.
            </p>
            <div className="pt-2 border-t border-warm-100 flex items-center justify-between">
              <span className="text-[10px] text-slate-400">Pannable region: 77.36°E – 77.68°E</span>
            </div>
          </div>

          {/* Quick Report Callout */}
          <div className="bg-civic-50 p-4 rounded-xl border border-civic-200 text-xs space-y-2">
            <h4 className="font-bold text-civic-900">Spotted a new problem?</h4>
            <p className="text-civic-700 leading-relaxed text-[11px]">
              Tap the report button to pick your exact spot on the map and register a tracked grievance.
            </p>
            <Link
              href="/report"
              className="inline-flex items-center justify-center w-full py-2 rounded-lg bg-civic-800 hover:bg-civic-900 text-white font-bold transition-colors"
            >
              Report at My Location
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

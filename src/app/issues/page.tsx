'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { ComplaintCard } from '@/components/complaint/ComplaintCard';
import { IssueCategory, IssueStatus } from '@/types';
import Link from 'next/link';
import { Search, Filter, PlusCircle, CheckCircle2 } from 'lucide-react';

export default function IssuesListPage() {
  const { t, complaints } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const filteredComplaints = complaints.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.location.wardOrVillage.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'ALL' || c.category === selectedCategory;

    const matchesStatus =
      selectedStatus === 'ALL'
        ? true
        : selectedStatus === 'ACTIVE'
        ? c.status !== 'RESOLVED'
        : c.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {t.nav.issues}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Transparent public register of civic grievances across Gauribidanur Town and Taluk.
          </p>
        </div>

        <Link
          href="/report"
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{t.home.quickReport}</span>
        </Link>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-white p-4 rounded-xl border border-warm-200 shadow-2xs space-y-3">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by ID (e.g. GBN-DEMO-000101), street, ward, or keyword..."
            className="w-full pl-10 pr-4 py-2 bg-warm-50 border border-warm-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-civic-600"
          />
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-1">
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
      </div>

      {/* Grid of Complaints */}
      {filteredComplaints.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredComplaints.map((c) => (
            <ComplaintCard key={c.id} complaint={c} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-warm-200 p-8 text-center space-y-3">
          <p className="text-sm font-semibold text-slate-700">
            No complaints found matching your search criteria.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedStatus('ALL');
              setSelectedCategory('ALL');
            }}
            className="text-xs font-bold text-civic-700 hover:text-civic-900 underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}

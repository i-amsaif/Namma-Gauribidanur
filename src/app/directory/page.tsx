'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { OfficialCard } from '@/components/directory/OfficialCard';
import { DepartmentFinder } from '@/components/directory/DepartmentFinder';
import { Search, Filter, ShieldCheck, Building2, HelpCircle } from 'lucide-react';

export default function DirectoryPage() {
  const { t, officials, departments } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('ALL');

  const filteredOfficials = officials.filter((o) => {
    const matchesSearch =
      o.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.responsibility.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.officeLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.departmentName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDept = selectedDept === 'ALL' || o.departmentId === selectedDept;

    return matchesSearch && matchesDept;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Page Title */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {t.directory.title}
          </h1>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-civic-100 text-civic-800 border border-civic-200">
            Civic Directory
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          {t.directory.subtitle}
        </p>
      </div>

      {/* Smart Department Finder Component */}
      <DepartmentFinder />

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-warm-200 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search Box */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t.directory.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2 bg-warm-50 border border-warm-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-civic-600"
            />
          </div>

          {/* Department Filter */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full sm:w-auto bg-warm-50 border border-warm-300 rounded-xl px-3 py-2 text-xs text-slate-800 font-medium focus:outline-hidden focus:ring-2 focus:ring-civic-600"
            >
              <option value="ALL">{t.directory.allDepartments}</option>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.shortCode} - {d.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          <span>
            Showing <strong className="text-slate-800 font-bold">{filteredOfficials.length}</strong> public officials
          </span>
          <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Public office lines verified against district directories</span>
          </span>
        </div>
      </div>

      {/* Officials Cards Grid */}
      {filteredOfficials.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredOfficials.map((official) => (
            <OfficialCard key={official.id} official={official} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-warm-200 p-8 text-center space-y-2">
          <p className="text-sm font-semibold text-slate-700">
            {t.directory.emptyResults}
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedDept('ALL');
            }}
            className="text-xs font-bold text-civic-700 hover:text-civic-900 underline"
          >
            Reset search
          </button>
        </div>
      )}
    </div>
  );
}

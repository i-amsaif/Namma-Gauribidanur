'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import { OfficialCard } from '@/components/directory/OfficialCard';
import {
  Search,
  Building2,
  Phone,
  ChevronDown,
  ShieldCheck,
  Building,
  Users,
  MapPin,
  X,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';

export default function DirectoryPage() {
  const { t, officials, departments } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDeptId, setSelectedDeptId] = useState<string>('ALL');
  
  // Track expanded department cards (all expanded by default for easy scanning, or toggled)
  const [expandedDepts, setExpandedDepts] = useState<Record<string, boolean>>({
    'dept-cmc-01': true,
    'dept-taluk-rev-02': true,
    'dept-taluk-panch-03': false, // 35 GPs, start collapsed to avoid huge page height
    'dept-police-05': true,
    'dept-bescom-04': true,
    'dept-health-06': true,
  });

  const toggleDept = (deptId: string) => {
    setExpandedDepts((prev) => ({
      ...prev,
      [deptId]: !prev[deptId],
    }));
  };

  // Group officials by department
  const groupedData = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();

    // First filter individual officials
    const filtered = officials.filter((o) => {
      if (!term) return true;
      return (
        o.name.toLowerCase().includes(term) ||
        o.designation.toLowerCase().includes(term) ||
        o.responsibility.toLowerCase().includes(term) ||
        o.officeLocation.toLowerCase().includes(term) ||
        o.departmentName.toLowerCase().includes(term) ||
        (o.publicPhone && o.publicPhone.includes(term))
      );
    });

    // Bucket into departments
    const groups: {
      department: (typeof departments)[0] | { id: string; name: string; nameKn?: string; shortCode: string; officialHelpline?: string; jurisdiction?: string };
      officials: typeof officials;
    }[] = [];

    // Map each known department
    departments.forEach((dept) => {
      if (selectedDeptId !== 'ALL' && selectedDeptId !== dept.id) {
        return;
      }
      const deptOfficials = filtered.filter((o) => o.departmentId === dept.id);
      if (deptOfficials.length > 0 || !term) {
        groups.push({
          department: dept,
          officials: deptOfficials,
        });
      }
    });

    // Unresolved or other department records (ensure ZERO data loss)
    const knownDeptIds = new Set(departments.map((d) => d.id));
    const unresolvedOfficials = filtered.filter((o) => !o.departmentId || !knownDeptIds.has(o.departmentId));

    if (unresolvedOfficials.length > 0 && (selectedDeptId === 'ALL' || selectedDeptId === 'UNRESOLVED')) {
      groups.push({
        department: {
          id: 'UNRESOLVED',
          name: 'Other Public Authorities & Desk Records',
          nameKn: 'ಇತರ ಸಾರ್ವಜನಿಕ ಪ್ರಾಧಿಕಾರಗಳು',
          shortCode: 'OTHER',
          officialHelpline: '112',
          jurisdiction: 'TALUK_PANCHAYAT',
        },
        officials: unresolvedOfficials,
      });
    }

    return {
      groups,
      totalMatches: filtered.length,
    };
  }, [officials, departments, searchTerm, selectedDeptId]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {t.directory.title}
          </h1>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-civic-50 text-civic-800 border border-civic-200">
            Public Roster
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
          {t.directory.subtitle} Verified public office contacts for municipal administration, taluk revenue, emergency grid, and all 38 Gram Panchayats.
        </p>
      </div>

      {/* Search & Department Selector */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by official name, designation, Gram Panchayat, or phone..."
              className="w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-civic-600 focus:bg-white transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Department Filter Dropdown */}
          <div className="w-full sm:w-auto">
            <select
              value={selectedDeptId}
              onChange={(e) => setSelectedDeptId(e.target.value)}
              className="w-full sm:w-auto bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 font-medium focus:outline-hidden focus:ring-2 focus:ring-civic-600 cursor-pointer"
            >
              <option value="ALL">{t.directory.allDepartments} (All)</option>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.shortCode} - {d.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Filter Department Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar">
          <button
            onClick={() => setSelectedDeptId('ALL')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedDeptId === 'ALL'
                ? 'bg-civic-700 text-white'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            All Departments ({officials.length})
          </button>
          {departments.map((d) => {
            const count = officials.filter((o) => o.departmentId === d.id).length;
            const isSelected = selectedDeptId === d.id;
            return (
              <button
                key={d.id}
                onClick={() => setSelectedDeptId(isSelected ? 'ALL' : d.id)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  isSelected
                    ? 'bg-civic-700 text-white'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {d.shortCode} ({count})
              </button>
            );
          })}
        </div>

        {/* Status bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs text-slate-500 pt-1 border-t border-slate-100">
          <span>
            Displaying <strong className="text-slate-900 font-bold">{groupedData.totalMatches}</strong> contacts grouped across {groupedData.groups.length} departments
          </span>
          <span className="text-emerald-700 font-medium flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Public telephone lines verified from government rosters</span>
          </span>
        </div>
      </div>

      {/* Grouped Department Accordion & Cards */}
      <div className="space-y-6">
        {groupedData.groups.map(({ department, officials: deptOfficials }) => {
          const isExpanded = searchTerm ? true : expandedDepts[department.id] ?? true;

          return (
            <div
              key={department.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden transition-all"
            >
              {/* Department Header Bar (Clickable Accordion) */}
              <div
                onClick={() => toggleDept(department.id)}
                className="p-4 sm:p-5 flex items-center justify-between gap-3 cursor-pointer select-none bg-slate-50/50 hover:bg-slate-100/60 transition-colors border-b border-slate-100"
              >
                <div className="flex items-start sm:items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-civic-100 text-civic-800 flex items-center justify-center font-bold text-xs flex-shrink-0">
                    {department.shortCode}
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                        {department.name}
                      </h2>
                      {department.jurisdiction && (
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                          {department.jurisdiction.replace('_', ' ')}
                        </span>
                      )}
                    </div>
                    {department.nameKn && (
                      <p className="text-xs text-slate-500 mt-0.5 font-medium truncate">
                        {department.nameKn}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                  {department.officialHelpline && (
                    <a
                      href={`tel:${department.officialHelpline.split('/')[0].trim()}`}
                      onClick={(e) => e.stopPropagation()}
                      className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-slate-800 font-semibold text-xs shadow-2xs transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-civic-700" />
                      <span>{department.officialHelpline}</span>
                    </a>
                  )}

                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-200 text-slate-800">
                    {deptOfficials.length} {deptOfficials.length === 1 ? 'contact' : 'contacts'}
                  </span>

                  <button
                    type="button"
                    aria-label={`Toggle ${department.name}`}
                    className="p-1 rounded-md text-slate-400 hover:text-slate-700"
                  >
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-200 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Department Officials Grid (When Expanded) */}
              {isExpanded && (
                <div className="p-4 sm:p-5">
                  {deptOfficials.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                      {deptOfficials.map((official) => (
                        <OfficialCard key={official.id} official={official} />
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500 italic py-2">
                      No officials match the current search term in this department.
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {/* Empty State when zero results across all departments */}
        {groupedData.groups.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center space-y-3">
            <Users className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No Officials Found</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              No contacts matched &quot;{searchTerm}&quot;. Try searching with a broader name, office, or Gram Panchayat keyword.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedDeptId('ALL');
              }}
              className="px-4 py-2 rounded-xl bg-civic-700 text-white font-semibold text-xs shadow-2xs hover:bg-civic-800 transition-colors"
            >
              Reset Search & Filters
            </button>
          </div>
        )}
      </div>

      {/* Additional Administrative Breakdown Link */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div>
          <span className="font-bold text-slate-900 block text-sm">
            Need Municipal or Taluk Escalation Procedures?
          </span>
          <p className="text-slate-600 mt-0.5">
            View detailed department hierarchies, Citizen Charters, and official escalation SLAs on the Departments page.
          </p>
        </div>
        <Link
          href="/departments"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-slate-200 text-civic-800 font-bold hover:bg-slate-100 transition-colors self-start sm:self-auto flex-shrink-0"
        >
          <span>View Department Guides</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import Link from 'next/link';
import { Building2, Phone, Mail, Clock, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';

export default function DepartmentsPage() {
  const { departments } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Local Government Departments & Wings
          </h1>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-civic-100 text-civic-800 border border-civic-200">
            Administrative Wings
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Governing bodies responsible for municipal wards, taluk revenue, rural panchayats, power supply, and healthcare in Gauribidanur.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {departments.map((dept) => (
          <div
            key={dept.id}
            className="bg-white rounded-2xl border border-warm-200 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-civic-800 text-white flex items-center justify-center font-bold text-xs shadow-2xs flex-shrink-0">
                    {dept.shortCode}
                  </div>
                  <div>
                    <h2 className="font-bold text-slate-900 text-base leading-snug">
                      {dept.name}
                    </h2>
                    <span className="text-xs text-civic-700 font-medium">
                      {dept.nameKn}
                    </span>
                  </div>
                </div>

                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-warm-100 text-slate-600 border border-warm-200 flex-shrink-0">
                  {dept.jurisdiction.replace(/_/g, ' ')}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {dept.description}
              </p>

              <div className="space-y-2 text-xs text-slate-500 pt-2 border-t border-warm-100">
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-civic-700 mt-0.5 flex-shrink-0" />
                  <span>{dept.headOfficeAddress}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span>{dept.workingHours}</span>
                </div>
                {dept.officialHelpline && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-civic-700 flex-shrink-0" />
                    <span className="font-mono font-bold text-slate-800">{dept.officialHelpline}</span>
                  </div>
                )}
              </div>

              {/* Responsible categories tags */}
              <div className="pt-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Responsible Civic Areas
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {dept.responsibleCategories.map((cat) => (
                    <span
                      key={cat}
                      className="text-[10px] font-medium bg-warm-100 text-slate-700 px-2 py-0.5 rounded-md"
                    >
                      {cat.replace(/_/g, ' ')}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-warm-100 flex items-center justify-between">
              <span className="text-[10px] text-slate-400">
                Verified: {dept.lastVerifiedDate}
              </span>
              <Link
                href={`/directory?dept=${dept.id}`}
                className="text-xs font-bold text-civic-700 hover:text-civic-900 inline-flex items-center gap-1"
              >
                <span>View Officials</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

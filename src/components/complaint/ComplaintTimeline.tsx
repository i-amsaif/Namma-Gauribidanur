'use client';

import React from 'react';
import { ComplaintTimelineEntry } from '@/types';
import { StatusBadge } from './StatusBadge';
import { CheckCircle2, User, Building, Shield, Clock, Camera } from 'lucide-react';

interface ComplaintTimelineProps {
  timeline: ComplaintTimelineEntry[];
}

export function ComplaintTimeline({ timeline }: ComplaintTimelineProps) {
  const getRoleIcon = (role: ComplaintTimelineEntry['authorRole']) => {
    switch (role) {
      case 'CMC_OFFICER':
      case 'TALUK_ADMIN':
        return Building;
      case 'SYSTEM':
        return Shield;
      default:
        return User;
    }
  };

  const getRoleBadge = (role: ComplaintTimelineEntry['authorRole']) => {
    switch (role) {
      case 'CMC_OFFICER':
        return { label: 'CMC Municipality', bg: 'bg-amber-100 text-amber-900' };
      case 'TALUK_ADMIN':
        return { label: 'Taluk Administration', bg: 'bg-teal-100 text-teal-900' };
      case 'SYSTEM':
        return { label: 'System Notice', bg: 'bg-slate-100 text-slate-800' };
      default:
        return { label: 'Citizen Reporter', bg: 'bg-slate-100 text-slate-700' };
    }
  };

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {timeline.map((entry, idx) => {
          const isLast = idx === timeline.length - 1;
          const RoleIcon = getRoleIcon(entry.authorRole);
          const roleBadge = getRoleBadge(entry.authorRole);
          const formattedDate = new Date(entry.timestamp).toLocaleString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          });

          return (
            <li key={entry.id}>
              <div className="relative pb-8">
                {!isLast && (
                  <span
                    className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-warm-200"
                    aria-hidden="true"
                  />
                )}
                <div className="relative flex items-start space-x-3">
                  {/* Icon dot */}
                  <div className="relative">
                    <div className="h-8 w-8 rounded-full bg-civic-50 border-2 border-civic-600 flex items-center justify-center ring-4 ring-white shadow-xs">
                      <RoleIcon className="h-4 w-4 text-civic-800" />
                    </div>
                  </div>

                  {/* Content card */}
                  <div className="min-w-0 flex-1 bg-warm-50 rounded-xl p-3 sm:p-4 border border-warm-200">
                    <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1.5">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-xs font-bold text-slate-900">
                          {entry.authorName}
                        </span>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${roleBadge.bg}`}>
                          {roleBadge.label}
                        </span>
                      </div>
                      <StatusBadge status={entry.status} size="sm" />
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed mt-1">
                      {entry.comment}
                    </p>

                    {/* Evidence Photo if attached */}
                    {entry.evidencePhoto && (
                      <div className="mt-3">
                        <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mb-1 flex items-center gap-1">
                          <Camera className="w-3 h-3 text-civic-700" /> Official Resolution Evidence
                        </span>
                        <div className="h-40 max-w-sm rounded-lg overflow-hidden border border-warm-300">
                          <img
                            src={entry.evidencePhoto}
                            alt="Resolution Evidence"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}

                    <div className="mt-2 text-[10px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{formattedDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

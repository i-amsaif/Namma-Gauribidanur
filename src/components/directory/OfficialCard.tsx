'use client';

import React from 'react';
import Link from 'next/link';
import { Official } from '@/types';
import { Phone, Mail, MapPin, ShieldCheck, HelpCircle, CheckCircle, ExternalLink, Building } from 'lucide-react';

interface OfficialCardProps {
  official: Official;
}

export function OfficialCard({ official }: OfficialCardProps) {
  // Initials for avatar
  const initials = official.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('');

  return (
    <div className="bg-white rounded-xl border border-warm-200 hover:border-warm-300 shadow-xs hover:shadow-md transition-all p-4 sm:p-5 flex flex-col justify-between">
      <div>
        {/* Header with Avatar & Status */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-civic-100 border border-civic-200 text-civic-800 font-bold flex items-center justify-center text-sm shadow-2xs flex-shrink-0">
              {initials}
            </div>
            <div>
              <Link href={`/directory/${official.id}`}>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base hover:text-civic-800 transition-colors">
                  {official.name}
                </h3>
              </Link>
              <div className="text-xs font-semibold text-civic-800">
                {official.designation}
              </div>
            </div>
          </div>

          {/* Verification Badge */}
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold flex-shrink-0 ${
              official.verificationStatus === 'OFFICIALLY_VERIFIED'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-amber-50 text-amber-800 border border-amber-200'
            }`}
          >
            {official.verificationStatus === 'OFFICIALLY_VERIFIED' ? (
              <>
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                <span>Verified</span>
              </>
            ) : (
              <>
                <HelpCircle className="w-3 h-3 text-amber-600" />
                <span>Community Listed</span>
              </>
            )}
          </span>
        </div>

        {/* Department Name */}
        <div className="flex items-center gap-1.5 text-xs text-slate-600 mb-2">
          <Building className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          <span className="font-medium truncate">{official.departmentName}</span>
        </div>

        {/* Responsibility */}
        <p className="text-xs text-slate-600 leading-relaxed mb-3 line-clamp-2">
          {official.responsibility}
        </p>

        {/* Office Location */}
        <div className="flex items-start gap-1.5 text-xs text-slate-500 mb-4">
          <MapPin className="w-3.5 h-3.5 text-civic-700 mt-0.5 flex-shrink-0" />
          <span className="line-clamp-1">{official.officeLocation}</span>
        </div>
      </div>

      {/* Action Buttons & Source */}
      <div className="pt-3 border-t border-warm-100 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          {official.publicPhone ? (
            <a
              href={`tel:${official.publicPhone.split('/')[0].trim()}`}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-civic-700 hover:bg-civic-800 text-white text-xs font-semibold shadow-2xs transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call: {official.publicPhone}</span>
            </a>
          ) : (
            <span className="text-xs text-slate-400 italic">No public direct line listed</span>
          )}

          {official.officialEmail && (
            <a
              href={`mailto:${official.officialEmail}`}
              title="Send email to official office"
              className="p-2 rounded-lg border border-warm-300 hover:bg-warm-100 text-slate-700 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-civic-700" />
            </a>
          )}
        </div>

        <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
          <span className="truncate">Source: {official.sourceTraceability}</span>
          <span className="flex-shrink-0">Verified: {official.lastVerifiedDate}</span>
        </div>
      </div>
    </div>
  );
}

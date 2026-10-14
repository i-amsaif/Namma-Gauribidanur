'use client';

import React from 'react';
import Link from 'next/link';
import { Official } from '@/types';
import { Phone, Mail, MapPin, ShieldCheck, HelpCircle, ArrowRight, Building } from 'lucide-react';

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

  const primaryPhone = official.publicPhone ? official.publicPhone.split('/')[0].trim() : null;

  return (
    <div className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 shadow-2xs hover:shadow-xs transition-all p-4 flex flex-col justify-between group">
      <div>
        {/* Header with Avatar & Designation */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 text-civic-800 font-bold flex items-center justify-center text-sm flex-shrink-0">
              {initials}
            </div>
            <div className="min-w-0">
              <Link href={`/directory/${official.id}`}>
                <h3 className="font-bold text-slate-900 group-hover:text-civic-800 text-sm leading-snug transition-colors truncate">
                  {official.name}
                </h3>
              </Link>
              <div className="text-xs font-semibold text-civic-700 truncate">
                {official.designation}
              </div>
              {official.designationKn && (
                <div className="text-[11px] text-slate-500 font-medium truncate">
                  {official.designationKn}
                </div>
              )}
            </div>
          </div>

          {/* Verification Badge */}
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${
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
                <span>Listed</span>
              </>
            )}
          </span>
        </div>

        {/* Responsibility Mandate */}
        <p className="text-xs text-slate-600 leading-relaxed mb-3 line-clamp-2">
          {official.responsibility}
        </p>

        {/* Office Location & Jurisdiction */}
        <div className="space-y-1 text-xs text-slate-500 mb-3">
          <div className="flex items-start gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-civic-700 mt-0.5 flex-shrink-0" />
            <span className="line-clamp-1">{official.officeLocation}</span>
          </div>
          <div className="text-[11px] text-slate-400 pl-5 truncate">
            Jurisdiction: {official.jurisdictionScope}
          </div>
        </div>
      </div>

      {/* Action Buttons & Source */}
      <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          {primaryPhone ? (
            <a
              href={`tel:${primaryPhone}`}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-civic-700 hover:bg-civic-800 text-white text-xs font-semibold shadow-2xs transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call: {primaryPhone}</span>
            </a>
          ) : (
            <span className="flex-1 text-xs text-slate-400 italic py-1 text-center">
              Office desk available in person
            </span>
          )}

          {official.officialEmail && (
            <a
              href={`mailto:${official.officialEmail}`}
              title={`Send email to ${official.officialEmail}`}
              className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
            >
              <Mail className="w-4 h-4 text-civic-700" />
            </a>
          )}

          <Link
            href={`/directory/${official.id}`}
            title="View full official details"
            className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5">
          <span className="truncate">Source: {official.sourceTraceability}</span>
          <span className="flex-shrink-0">Verified: {official.lastVerifiedDate}</span>
        </div>
      </div>
    </div>
  );
}

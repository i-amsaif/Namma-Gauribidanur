'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import Link from 'next/link';
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Building,
  Calendar,
  CheckCircle2,
  Clock,
  Layers,
  HelpCircle,
} from 'lucide-react';

export default function OfficialDetailClient({ id: propId }: { id?: string }) {
  const params = useParams();
  const id = propId || (params?.id as string);
  const { officials, departments } = useApp();

  const official = officials.find((o) => o.id === id);

  if (!official) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Official Not Found</h2>
        <Link
          href="/directory"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-civic-800 text-white font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Directory</span>
        </Link>
      </div>
    );
  }

  const department = departments.find((d) => d.id === official.departmentId);

  const initials = official.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('');

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
      <div>
        <Link
          href="/directory"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Directory</span>
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-warm-200 p-6 sm:p-8 shadow-xs space-y-6">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-warm-100 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-civic-100 border border-civic-200 text-civic-800 font-extrabold flex items-center justify-center text-xl shadow-xs">
              {initials}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                  {official.name}
                </h1>
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    official.verificationStatus === 'OFFICIALLY_VERIFIED'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-amber-50 text-amber-800 border border-amber-200'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{official.verificationStatus.replace(/_/g, ' ')}</span>
                </span>
              </div>
              <p className="text-sm font-semibold text-civic-800 mt-0.5">
                {official.designation}
              </p>
              <p className="text-xs text-slate-500">{official.departmentName}</p>
            </div>
          </div>
        </div>

        {/* Core Responsibility */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Mandate & Key Responsibilities
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-warm-50 p-4 rounded-xl border border-warm-200">
            {official.responsibility}
          </p>
        </div>

        {/* Contact & Jurisdiction Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl border border-warm-200 space-y-2">
            <div className="flex items-center gap-1.5 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
              <Phone className="w-3.5 h-3.5 text-civic-700" />
              <span>Public Office Helpline</span>
            </div>
            <div className="text-sm font-mono font-bold text-slate-900">
              {official.publicPhone || 'Not Listed'}
            </div>
            {official.publicPhone && (
              <a
                href={`tel:${official.publicPhone.split('/')[0].trim()}`}
                className="inline-block text-xs font-bold text-civic-700 hover:text-civic-900 underline pt-1"
              >
                Click to place call &rarr;
              </a>
            )}
          </div>

          <div className="p-4 rounded-xl border border-warm-200 space-y-2">
            <div className="flex items-center gap-1.5 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
              <Mail className="w-3.5 h-3.5 text-civic-700" />
              <span>Official Department Email</span>
            </div>
            <div className="text-xs font-mono font-bold text-slate-900 break-all">
              {official.officialEmail || 'Not Listed'}
            </div>
            {official.officialEmail && (
              <a
                href={`mailto:${official.officialEmail}`}
                className="inline-block text-xs font-bold text-civic-700 hover:text-civic-900 underline pt-1"
              >
                Compose email &rarr;
              </a>
            )}
          </div>

          <div className="p-4 rounded-xl border border-warm-200 space-y-2">
            <div className="flex items-center gap-1.5 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
              <MapPin className="w-3.5 h-3.5 text-civic-700" />
              <span>Office Address</span>
            </div>
            <div className="text-xs text-slate-800 leading-relaxed font-medium">
              {official.officeLocation}
            </div>
          </div>

          <div className="p-4 rounded-xl border border-warm-200 space-y-2">
            <div className="flex items-center gap-1.5 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
              <Layers className="w-3.5 h-3.5 text-civic-700" />
              <span>Administrative Jurisdiction</span>
            </div>
            <div className="text-xs text-slate-800 leading-relaxed font-medium">
              {official.jurisdictionScope}
            </div>
          </div>
        </div>

        {/* Traceability Metadata */}
        <div className="pt-4 border-t border-warm-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-400">
          <span>Source: {official.sourceTraceability}</span>
          <span>Last Verified: {official.lastVerifiedDate}</span>
        </div>
      </div>
    </div>
  );
}

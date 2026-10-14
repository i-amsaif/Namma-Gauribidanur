'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { ShieldCheck, Info, MapPin, Scale, Lock, HeartHandshake, FileText, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const { t } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
            About Namma Gauribidanur
          </h1>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
            Transparency & Governance
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
          &quot;{t.tagline}&quot; — An independent civic technology prototype bridging citizen grievances, community intelligence, and public administration for Gauribidanur.
        </p>
      </div>

      {/* Critical Non-Affiliation Notice */}
      <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-2">
        <div className="flex items-center gap-2 font-bold text-sm text-amber-900">
          <ShieldCheck className="w-5 h-5 text-amber-700 flex-shrink-0" />
          <span>Independent Civic Platform Disclaimer</span>
        </div>
        <p className="leading-relaxed">
          <strong>Namma Gauribidanur is NOT an official government website or mobile application.</strong> It is an independent civic technology initiative developed as an open prototype to demonstrate modern, mobile-first public service design for Gauribidanur town and taluk in Chikkaballapur district, Karnataka.
        </p>
        <p className="leading-relaxed">
          Official State emblems, government seals, and logos of the Government of Karnataka, City Municipal Council (CMC), or District Administration are intentionally omitted to avoid misleading citizens. Grievances submitted through this prototype are stored in a local demonstration database for evaluation and do not transmit legally binding filings to government departments unless formal integration authorization is established.
        </p>
      </div>

      {/* Product Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-warm-200 shadow-2xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-civic-100 text-civic-800 flex items-center justify-center font-bold">
            1
          </div>
          <h2 className="font-bold text-slate-900 text-sm">Citizen Grievance Redressal</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Multi-step problem reporting with photos, interactive map pinning, and spatial detection between Town CMC wards and rural Gram Panchayats.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-warm-200 shadow-2xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
            2
          </div>
          <h2 className="font-bold text-slate-900 text-sm">Administrative Transparency</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Verified public office directories, helpline numbers, and the Smart Department Routing Helper to direct issues to the right governing body.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-warm-200 shadow-2xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
            3
          </div>
          <h2 className="font-bold text-slate-900 text-sm">Hyperlocal Town Pulse</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Researched local reporting, Vidurashwatha cultural events, science initiatives, and local artisan enterprise discovery.
          </p>
        </div>
      </div>

      {/* Geography & Boundary Clarification */}
      <div className="bg-white p-6 rounded-2xl border border-warm-200 shadow-xs space-y-3">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-civic-700" />
          <span>Geographic Boundary Distinction</span>
        </h2>
        <div className="space-y-2 text-xs text-slate-600 leading-relaxed">
          <p>
            It is critical to distinguish three distinct administrative definitions often confused in common parlance:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-700 font-medium">
            <li>
              <strong>Gauribidanur Town (CMC):</strong> The urban municipality covering the 23 recognized municipal wards, administered by the Municipal Commissioner under the Urban Development Department.
            </li>
            <li>
              <strong>Gauribidanur Taluk:</strong> The larger administrative revenue division administered by the Tahsildar and Taluk Panchayat Executive Officer, covering rural hoblis and Gram Panchayats.
            </li>
            <li>
              <strong>Gauribidanur Assembly Constituency (AC-139):</strong> The electoral constituency defined by the Delimitation Commission for Karnataka Legislative Assembly representation, which has separate statutory boundaries.
            </li>
          </ul>
          <p className="pt-2 text-slate-500">
            Official cadastral GIS polygons from KSRSAC / K-GIS and Survey of India remain subject to official clearance. All boundaries displayed on the interactive map are illustrative approximations.
          </p>
        </div>
      </div>

      {/* Production & Legal Roadmap */}
      <div className="bg-white p-6 rounded-2xl border border-warm-200 shadow-xs space-y-3">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Scale className="w-4 h-4 text-civic-700" />
          <span>Legal & Operational Readiness Checklist</span>
        </h2>
        <p className="text-xs text-slate-600 leading-relaxed">
          Prior to taking this platform into live public production in India, the following legal and operational prerequisites must be executed:
        </p>

        <div className="space-y-2.5 text-xs text-slate-700 pt-2">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-civic-700 flex-shrink-0 mt-0.5" />
            <div>
              <strong>Digital Personal Data Protection Act (DPDP 2023) Compliance:</strong> Implementation of explicit consent notices, purpose limitation, right to grievance redressal, and strict data minimization for phone numbers and citizen metadata.
            </div>
          </div>

          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-civic-700 flex-shrink-0 mt-0.5" />
            <div>
              <strong>Formal ULB Partnership / MoU:</strong> Signing an official Memorandum of Understanding with the Gauribidanur City Municipal Council and District Administration to route citizen complaints via authorized API webhooks into municipal grievance management systems.
            </div>
          </div>

          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-civic-700 flex-shrink-0 mt-0.5" />
            <div>
              <strong>Content Moderation & Intermediary Guidelines:</strong> Compliance with Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules for noticeboard posts and citizen comments.
            </div>
          </div>

          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-civic-700 flex-shrink-0 mt-0.5" />
            <div>
              <strong>Contact Data Protection:</strong> Display of only verified public office numbers and government email contacts, explicitly barring personal mobile numbers without written consent.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { ComplaintCard } from '@/components/complaint/ComplaintCard';
import { NewsCard } from '@/components/news/NewsCard';
import { EventCard } from '@/components/events/EventCard';
import {
  PlusCircle,
  MapPin,
  Users,
  Newspaper,
  ArrowRight,
  Phone,
  CheckCircle2,
  Calendar,
  AlertCircle,
  Building2,
  Sparkles,
} from 'lucide-react';

export default function HomePage() {
  const { t, stats, complaints, news, events } = useApp();

  // A few recent complaints (3 items)
  const recentComplaints = complaints.slice(0, 3);
  // A few recent news stories (3 items)
  const recentNews = news.slice(0, 3);
  // Upcoming events (2 items)
  const upcomingEvents = events.slice(0, 2);

  return (
    <div className="space-y-8 sm:space-y-10 pb-12">
      {/* 1. Compact Header and Locality Identification */}
      <section className="bg-white border-b border-slate-200/80 pt-6 pb-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-civic-600" />
            <span>Gauribidanur Taluk • Chikkaballapur District</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
              {t.home.welcome}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
              {t.home.subtitle}
            </p>
          </div>

          {/* 2. Prominent Report an Issue Action */}
          <div className="pt-2">
            <div className="bg-gradient-to-r from-civic-50 to-emerald-50 border border-civic-200 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-civic-900 font-bold text-base sm:text-lg">
                  <PlusCircle className="w-5 h-5 text-civic-700 flex-shrink-0" />
                  <span>Report a Civic Problem</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
                  Potholes, water supply issues, uncollected garbage, or streetlights not working? Report directly on the public map.
                </p>
              </div>

              <Link
                href="/report"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-civic-700 hover:bg-civic-800 text-white font-semibold text-sm shadow-sm hover:shadow transition-all self-start sm:self-auto flex-shrink-0"
              >
                <PlusCircle className="w-4 h-4 stroke-[2.2px]" />
                <span>{t.home.quickReport}</span>
              </Link>
            </div>
          </div>

          {/* 3. Shortcuts to Map, Officials, and News */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <Link
              href="/map"
              className="flex items-start gap-3 p-4 rounded-xl bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 shadow-2xs transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center flex-shrink-0 group-hover:bg-teal-100 transition-colors">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-bold text-slate-900 flex items-center gap-1 group-hover:text-civic-800 transition-colors">
                  <span>{t.home.exploreMap}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                  View mapped civic complaints across town & taluk
                </p>
              </div>
            </Link>

            <Link
              href="/directory"
              className="flex items-start gap-3 p-4 rounded-xl bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 shadow-2xs transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                <Users className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-bold text-slate-900 flex items-center gap-1 group-hover:text-civic-800 transition-colors">
                  <span>{t.home.findOfficial}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                  Contact CMC, Tahsildar, Police & 38 GPs
                </p>
              </div>
            </Link>

            <Link
              href="/news"
              className="flex items-start gap-3 p-4 rounded-xl bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 shadow-2xs transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-100 transition-colors">
                <Newspaper className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-bold text-slate-900 flex items-center gap-1 group-hover:text-civic-800 transition-colors">
                  <span>{t.home.localNews}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                  Verified journalism from local publications
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Sequence Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8 sm:space-y-10">
        {/* 4. Compact Civic Activity Summary */}
        <section aria-label="Civic Activity Summary">
          <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  {t.home.statsTitle}
                </h2>
                <p className="text-xs text-slate-500">
                  Civic complaints tracked across 23 CMC wards and 38 Gram Panchayats
                </p>
              </div>
              <span className="text-[11px] font-medium text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full self-start sm:self-auto">
                Demonstration Prototype
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-3 text-center sm:text-left">
              <div className="p-2 sm:p-3 rounded-lg bg-slate-50">
                <span className="text-xs text-slate-500 font-medium block">Total Tracked</span>
                <span className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  {stats.totalComplaints}
                </span>
              </div>

              <div className="p-2 sm:p-3 rounded-lg bg-amber-50/60">
                <span className="text-xs text-amber-800 font-medium block">Active Review</span>
                <span className="text-xl sm:text-2xl font-extrabold text-amber-700">
                  {stats.activeComplaints}
                </span>
              </div>

              <div className="p-2 sm:p-3 rounded-lg bg-emerald-50/60">
                <span className="text-xs text-emerald-800 font-medium block">Resolved</span>
                <span className="text-xl sm:text-2xl font-extrabold text-emerald-700">
                  {stats.resolvedComplaints}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 5. A Few Recent Complaints */}
        <section aria-label="Recent Civic Reports" className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                {t.home.recentIssuesTitle}
              </h2>
              <p className="text-xs text-slate-500">
                Recent grievances submitted by residents
              </p>
            </div>
            <Link
              href="/issues"
              className="inline-flex items-center gap-1 text-xs font-semibold text-civic-700 hover:text-civic-900 transition-colors flex-shrink-0"
            >
              <span>{t.home.viewAllIssues}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {recentComplaints.map((complaint) => (
              <ComplaintCard key={complaint.id} complaint={complaint} />
            ))}
          </div>
        </section>

        {/* 6. A Few Recent Local News Stories */}
        <section aria-label="Recent Local News" className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                {t.home.newsSectionTitle}
              </h2>
              <p className="text-xs text-slate-500">
                Researched local reporting from regional publications
              </p>
            </div>
            <Link
              href="/news"
              className="inline-flex items-center gap-1 text-xs font-semibold text-civic-700 hover:text-civic-900 transition-colors flex-shrink-0"
            >
              <span>{t.home.viewAllNews}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {recentNews.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        </section>

        {/* 7. Upcoming Events */}
        <section aria-label="Upcoming Events" className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                {t.home.eventsTitle}
              </h2>
              <p className="text-xs text-slate-500">
                Upcoming local fairs, science exhibitions & community programs
              </p>
            </div>
            <Link
              href="/events"
              className="inline-flex items-center gap-1 text-xs font-semibold text-civic-700 hover:text-civic-900 transition-colors flex-shrink-0"
            >
              <span>{t.home.viewAllEvents}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {upcomingEvents.map((evt) => (
              <EventCard key={evt.id} event={evt} />
            ))}
          </div>
        </section>

        {/* 8. Important Public Helplines */}
        <section aria-label="Important Public Helplines" className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                {t.home.importantContactsTitle}
              </h2>
              <p className="text-xs text-slate-500">
                Direct public emergency numbers & office desks
              </p>
            </div>
            <Link
              href="/directory"
              className="text-xs font-semibold text-civic-700 hover:text-civic-900 inline-flex items-center gap-1"
            >
              <span>Full Directory</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
            <a
              href="tel:112"
              className="p-3 rounded-lg bg-rose-50/60 hover:bg-rose-50 border border-rose-200/80 transition-colors block"
            >
              <div className="font-bold text-slate-900 mb-0.5">Police & Emergency</div>
              <div className="text-slate-500 text-[11px] mb-1">All Emergencies</div>
              <div className="font-mono font-bold text-rose-700 flex items-center gap-1">
                <Phone className="w-3 h-3" />
                <span>112 (Toll Free)</span>
              </div>
            </a>

            <a
              href="tel:08155285226"
              className="p-3 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors block"
            >
              <div className="font-bold text-slate-900 mb-0.5">CMC Nagarasabhe</div>
              <div className="text-slate-500 text-[11px] mb-1">Town Grievances</div>
              <div className="font-mono font-bold text-civic-800 flex items-center gap-1">
                <Phone className="w-3 h-3" />
                <span>08155-285226</span>
              </div>
            </a>

            <a
              href="tel:08155285222"
              className="p-3 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors block"
            >
              <div className="font-bold text-slate-900 mb-0.5">Tahsildar Office</div>
              <div className="text-slate-500 text-[11px] mb-1">Taluk Revenue</div>
              <div className="font-mono font-bold text-civic-800 flex items-center gap-1">
                <Phone className="w-3 h-3" />
                <span>08155-285222</span>
              </div>
            </a>

            <a
              href="tel:1912"
              className="p-3 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors block"
            >
              <div className="font-bold text-slate-900 mb-0.5">BESCOM Electricity</div>
              <div className="text-slate-500 text-[11px] mb-1">Power Failures</div>
              <div className="font-mono font-bold text-civic-800 flex items-center gap-1">
                <Phone className="w-3 h-3" />
                <span>1912 (24x7)</span>
              </div>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

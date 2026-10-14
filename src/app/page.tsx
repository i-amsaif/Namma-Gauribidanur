'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { MapContainer } from '@/components/map/MapContainer';
import { ComplaintCard } from '@/components/complaint/ComplaintCard';
import { NewsCard } from '@/components/news/NewsCard';
import { EventCard } from '@/components/events/EventCard';
import { DepartmentFinder } from '@/components/directory/DepartmentFinder';
import {
  PlusCircle,
  MapPin,
  Users,
  Newspaper,
  ArrowRight,
  ShieldAlert,
  Phone,
  CheckCircle2,
  Calendar,
  AlertTriangle,
  Building2,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

export default function HomePage() {
  const { t, stats, complaints, news, events } = useApp();

  // Get recent 4 complaints
  const recentComplaints = complaints.slice(0, 4);
  // Get recent 3 news
  const recentNews = news.slice(0, 3);
  // Get upcoming 2 events
  const upcomingEvents = events.slice(0, 2);

  return (
    <div className="space-y-8 sm:space-y-12 pb-12">
      {/* Hero Welcome Banner */}
      <section className="bg-gradient-to-b from-civic-900 via-civic-950 to-slate-900 text-white pt-8 pb-12 px-4 sm:px-6 relative overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-civic-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-2xl space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-amber-300 text-xs font-semibold border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Gauribidanur Taluk Civic Platform</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              {t.home.welcome}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {t.home.subtitle}
            </p>
          </div>

          {/* Primary Quick Actions Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 sm:mt-8">
            {/* Action 1: Report Issue */}
            <Link
              href="/report"
              className="flex flex-col justify-between p-4 rounded-xl bg-gradient-to-br from-amber-600 to-amber-500 text-white shadow-lg shadow-amber-600/25 hover:from-amber-500 hover:to-amber-400 active:scale-[0.98] transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center mb-3">
                <PlusCircle className="w-6 h-6 stroke-[2.2px]" />
              </div>
              <div>
                <h2 className="font-bold text-sm sm:text-base leading-tight mb-1">
                  {t.home.quickReport}
                </h2>
                <p className="text-[11px] text-amber-100 line-clamp-1 leading-snug">
                  {t.home.quickReportDesc}
                </p>
              </div>
            </Link>

            {/* Action 2: Live Map */}
            <Link
              href="/map"
              className="flex flex-col justify-between p-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white active:scale-[0.98] transition-all group backdrop-blur-xs"
            >
              <div className="w-10 h-10 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center mb-3">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-bold text-sm sm:text-base leading-tight mb-1">
                  {t.home.exploreMap}
                </h2>
                <p className="text-[11px] text-slate-300 line-clamp-1 leading-snug">
                  {t.home.exploreMapDesc}
                </p>
              </div>
            </Link>

            {/* Action 3: Find Official */}
            <Link
              href="/directory"
              className="flex flex-col justify-between p-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white active:scale-[0.98] transition-all group backdrop-blur-xs"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-300 flex items-center justify-center mb-3">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-bold text-sm sm:text-base leading-tight mb-1">
                  {t.home.findOfficial}
                </h2>
                <p className="text-[11px] text-slate-300 line-clamp-1 leading-snug">
                  {t.home.findOfficialDesc}
                </p>
              </div>
            </Link>

            {/* Action 4: Local News */}
            <Link
              href="/news"
              className="flex flex-col justify-between p-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white active:scale-[0.98] transition-all group backdrop-blur-xs"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center mb-3">
                <Newspaper className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-bold text-sm sm:text-base leading-tight mb-1">
                  {t.home.localNews}
                </h2>
                <p className="text-[11px] text-slate-300 line-clamp-1 leading-snug">
                  {t.home.localNewsDesc}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10 sm:space-y-12">
        {/* Section D: Community Statistics Bar */}
        <section aria-label="Civic Statistics">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                {t.home.statsTitle}
              </h2>
              <p className="text-xs text-slate-500">
                {t.home.statsSubtitle}
              </p>
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
              Demo Metrics
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-white p-4 rounded-xl border border-warm-200 shadow-2xs">
              <span className="text-xs text-slate-500 font-medium block mb-1">
                {t.home.totalIssues}
              </span>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {stats.totalComplaints}
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">Tracked across Taluk</span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-warm-200 shadow-2xs">
              <span className="text-xs text-amber-700 font-medium block mb-1">
                {t.home.activeIssues}
              </span>
              <div className="text-2xl sm:text-3xl font-black text-amber-600 tracking-tight">
                {stats.activeComplaints}
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">In review & progress</span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-warm-200 shadow-2xs">
              <span className="text-xs text-emerald-700 font-medium block mb-1">
                {t.home.resolvedIssues}
              </span>
              <div className="text-2xl sm:text-3xl font-black text-emerald-600 tracking-tight">
                {stats.resolvedComplaints}
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">Simulated resolutions</span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-warm-200 shadow-2xs">
              <span className="text-xs text-civic-700 font-medium block mb-1">
                {t.home.upcomingEvents}
              </span>
              <div className="text-2xl sm:text-3xl font-black text-civic-800 tracking-tight">
                {stats.totalEvents}
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">Fairs & science days</span>
            </div>
          </div>
        </section>

        {/* Section E: Issue Map Preview */}
        <section aria-label="Interactive Map Preview" className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                {t.home.mapPreviewTitle}
              </h2>
              <p className="text-xs text-slate-500">
                Explore active civic complaints across Gauribidanur Town (CMC) and rural hoblis
              </p>
            </div>
            <Link
              href="/map"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-civic-800 hover:text-civic-950 transition-colors self-start sm:self-auto"
            >
              <span>{t.home.openFullMap}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="relative rounded-xl overflow-hidden border border-warm-200 shadow-sm">
            <MapContainer complaints={complaints} height="360px" interactive={true} />
            <div className="absolute bottom-3 left-3 right-3 sm:right-auto z-20">
              <Link
                href="/map"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-slate-900/90 hover:bg-slate-900 text-white text-xs font-bold shadow-lg backdrop-blur-md transition-all"
              >
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Open Full Map with Filters & Markers</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Section F: Recent Complaints */}
        <section aria-label="Recent Civic Reports" className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                {t.home.recentIssuesTitle}
              </h2>
              <p className="text-xs text-slate-500">
                Grievances submitted by citizens with real-time simulated workflow tracking
              </p>
            </div>
            <Link
              href="/issues"
              className="inline-flex items-center gap-1 text-xs font-bold text-civic-800 hover:text-civic-950 transition-colors flex-shrink-0"
            >
              <span>{t.home.viewAllIssues}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentComplaints.map((complaint) => (
              <ComplaintCard key={complaint.id} complaint={complaint} />
            ))}
          </div>
        </section>

        {/* Smart Department Finder Component */}
        <section aria-label="Department Routing Helper">
          <DepartmentFinder />
        </section>

        {/* Section G: Local News */}
        <section aria-label="Recent Local News" className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                {t.home.newsSectionTitle}
              </h2>
              <p className="text-xs text-slate-500">
                Authentic, researched news articles covering Gauribidanur and regional developments
              </p>
            </div>
            <Link
              href="/news"
              className="inline-flex items-center gap-1 text-xs font-bold text-civic-800 hover:text-civic-950 transition-colors flex-shrink-0"
            >
              <span>{t.home.viewAllNews}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentNews.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        </section>

        {/* Section H: Community Events */}
        <section aria-label="Community Events" className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                {t.home.eventsTitle}
              </h2>
              <p className="text-xs text-slate-500">
                Upcoming cultural heritage walks, science fairs, and community drives
              </p>
            </div>
            <Link
              href="/events"
              className="inline-flex items-center gap-1 text-xs font-bold text-civic-800 hover:text-civic-950 transition-colors flex-shrink-0"
            >
              <span>{t.home.viewAllEvents}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {upcomingEvents.map((evt) => (
              <EventCard key={evt.id} event={evt} />
            ))}
          </div>
        </section>

        {/* Section I: Important Public Helplines */}
        <section aria-label="Essential Public Helplines" className="bg-white p-5 sm:p-6 rounded-2xl border border-warm-200 shadow-xs">
          <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-warm-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                {t.home.importantContactsTitle}
              </h2>
              <p className="text-xs text-slate-500">
                Verified emergency numbers and public administrative helplines for Gauribidanur
              </p>
            </div>
            <Link
              href="/directory"
              className="text-xs font-bold text-civic-800 hover:text-civic-950 inline-flex items-center gap-1"
            >
              <span>Full Directory</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <a
              href="tel:08155285226"
              className="p-3 rounded-xl bg-warm-50 hover:bg-warm-100 border border-warm-200 transition-colors block"
            >
              <div className="font-bold text-slate-900 mb-0.5">CMC Nagarasabhe</div>
              <div className="text-[11px] text-slate-500 mb-1">Town Civic Complaints</div>
              <div className="font-mono font-bold text-civic-800 flex items-center gap-1">
                <Phone className="w-3 h-3 text-civic-700" />
                <span>08155-285226</span>
              </div>
            </a>

            <a
              href="tel:08155285222"
              className="p-3 rounded-xl bg-warm-50 hover:bg-warm-100 border border-warm-200 transition-colors block"
            >
              <div className="font-bold text-slate-900 mb-0.5">Tahsildar Taluk Office</div>
              <div className="text-[11px] text-slate-500 mb-1">Revenue & Taluk Affairs</div>
              <div className="font-mono font-bold text-civic-800 flex items-center gap-1">
                <Phone className="w-3 h-3 text-civic-700" />
                <span>08155-285222</span>
              </div>
            </a>

            <a
              href="tel:1912"
              className="p-3 rounded-xl bg-warm-50 hover:bg-warm-100 border border-warm-200 transition-colors block"
            >
              <div className="font-bold text-slate-900 mb-0.5">BESCOM Electricity</div>
              <div className="text-[11px] text-slate-500 mb-1">Power Failure Helpline</div>
              <div className="font-mono font-bold text-civic-800 flex items-center gap-1">
                <Phone className="w-3 h-3 text-civic-700" />
                <span>1912 / 24x7</span>
              </div>
            </a>

            <a
              href="tel:112"
              className="p-3 rounded-xl bg-warm-50 hover:bg-warm-100 border border-warm-200 transition-colors block"
            >
              <div className="font-bold text-slate-900 mb-0.5">Police & Emergency</div>
              <div className="text-[11px] text-slate-500 mb-1">All Emergencies</div>
              <div className="font-mono font-bold text-rose-700 flex items-center gap-1">
                <Phone className="w-3 h-3 text-rose-600" />
                <span>112 (Toll Free)</span>
              </div>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

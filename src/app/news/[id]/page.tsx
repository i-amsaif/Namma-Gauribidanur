'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import Link from 'next/link';
import { ArrowLeft, Calendar, ExternalLink, ShieldCheck, Share2, Info } from 'lucide-react';

export default function NewsDetailPage() {
  const { id } = useParams() as { id: string };
  const { news } = useApp();

  const article = news.find((n) => n.id === id);

  if (!article) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Article Not Found</h2>
        <Link
          href="/news"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-civic-800 text-white font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to News Feed</span>
        </Link>
      </div>
    );
  }

  const formattedPublished = new Date(article.publishedAt).toLocaleDateString(undefined, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
      <div>
        <Link
          href="/news"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to News</span>
        </Link>
      </div>

      <article className="bg-white rounded-2xl border border-warm-200 overflow-hidden shadow-xs space-y-6">
        {/* News Hero Image */}
        <div className="relative h-64 sm:h-80 w-full bg-slate-900">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded backdrop-blur-xs max-w-sm truncate">
            {article.imageCredit}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-warm-100 pb-3">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-bold text-slate-900">{article.publisher}</span>
              <span>•</span>
              <time dateTime={article.publishedAt}>{formattedPublished}</time>
            </div>

            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-civic-50 text-civic-800 border border-civic-200">
              {article.category.replace('_', ' ')}
            </span>
          </div>

          <h1 className="text-xl sm:text-3xl font-black text-slate-900 leading-tight">
            {article.title}
          </h1>

          <div className="text-xs sm:text-sm font-semibold text-civic-800 leading-snug">
            {article.titleKn}
          </div>

          <div className="space-y-3 pt-2 text-sm sm:text-base text-slate-700 leading-relaxed">
            <p className="font-medium text-slate-800">
              {article.summary}
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {article.summaryKn}
            </p>
          </div>

          {/* Sourcing & Citation Box */}
          <div className="p-4 rounded-xl bg-warm-50 border border-warm-200 space-y-2 mt-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">
                Original Reporting Attribution
              </span>
              <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Source</span>
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              This summary is prepared independently by Namma Gauribidanur for citizen awareness. Full reporting, interviews, and intellectual property belong to <strong>{article.publisher}</strong>.
            </p>
            <div className="pt-2">
              <a
                href={article.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-civic-800 hover:bg-civic-900 text-white font-bold text-xs transition-colors shadow-2xs"
              >
                <span>Read Full Article on {article.publisher}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

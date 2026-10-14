'use client';

import React from 'react';
import Link from 'next/link';
import { NewsArticle } from '@/types';
import { Calendar, ExternalLink, Newspaper, ArrowRight, ShieldCheck } from 'lucide-react';

interface NewsCardProps {
  article: NewsArticle;
}

export function NewsCard({ article }: NewsCardProps) {
  const formattedDate = new Date(article.publishedAt).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const categoryColor: Record<string, string> = {
    DEVELOPMENT: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    SCIENCE_RESEARCH: 'bg-indigo-50 text-indigo-800 border-indigo-200',
    HERITAGE: 'bg-amber-50 text-amber-800 border-amber-200',
    SAFETY: 'bg-rose-50 text-rose-800 border-rose-200',
    CIVIC: 'bg-blue-50 text-blue-800 border-blue-200',
    LOCAL: 'bg-slate-50 text-slate-800 border-slate-200',
  };

  return (
    <article className="bg-white rounded-xl border border-warm-200 hover:border-warm-300 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group">
      <div>
        {/* News Thumbnail */}
        <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 flex-wrap">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shadow-2xs backdrop-blur-xs bg-white/90 ${categoryColor[article.category] || 'text-slate-800'}`}>
              {article.category.replace('_', ' ')}
            </span>
          </div>
          <div className="absolute bottom-1 right-1.5 bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded backdrop-blur-xs max-w-[200px] truncate">
            {article.publisher}
          </div>
        </div>

        {/* Article Body */}
        <div className="p-4">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-2">
            <Calendar className="w-3.5 h-3.5" />
            <time dateTime={article.publishedAt}>{formattedDate}</time>
            <span>•</span>
            <span className="font-semibold text-slate-700">{article.publisher}</span>
          </div>

          <Link href={`/news/${article.id}`}>
            <h3 className="font-bold text-slate-900 group-hover:text-civic-800 text-sm sm:text-base leading-snug line-clamp-2 mb-2 transition-colors">
              {article.title}
            </h3>
          </Link>

          <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-3">
            {article.summary}
          </p>
        </div>
      </div>

      {/* Footer link row */}
      <div className="px-4 pb-4 pt-2 border-t border-warm-100 flex items-center justify-between gap-2 text-xs">
        <Link
          href={`/news/${article.id}`}
          className="text-civic-700 font-bold hover:text-civic-900 inline-flex items-center gap-1 group-hover:gap-1.5 transition-all"
        >
          <span>Read Full Summary</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        <a
          href={article.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          title={`Visit original article on ${article.publisher}`}
          className="text-slate-400 hover:text-slate-700 inline-flex items-center gap-1 text-[11px]"
        >
          <span>Source</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </article>
  );
}

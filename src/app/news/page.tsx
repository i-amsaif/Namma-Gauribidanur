'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { NewsCard } from '@/components/news/NewsCard';
import { Search, Filter, ShieldCheck, Newspaper } from 'lucide-react';

export default function NewsPage() {
  const { news } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const filteredNews = news.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.publisher.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Local News & Sourced Reporting
          </h1>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-civic-100 text-civic-800 border border-civic-200">
            Researched & Sourced
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Authentic reports covering civic infrastructure, research at the Radio Observatory, industrial progress, and heritage in Gauribidanur.
        </p>
      </div>

      {/* Search & Filter */}
      <div className="bg-white p-4 rounded-xl border border-warm-200 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search news by headline, keywords, or publisher..."
              className="w-full pl-10 pr-4 py-2 bg-warm-50 border border-warm-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-civic-600"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full sm:w-auto bg-warm-50 border border-warm-300 rounded-xl px-3 py-2 text-xs text-slate-800 font-medium focus:outline-hidden focus:ring-2 focus:ring-civic-600"
            >
              <option value="ALL">All Categories</option>
              <option value="DEVELOPMENT">Industrial & Development</option>
              <option value="SCIENCE_RESEARCH">Science & Astronomy</option>
              <option value="HERITAGE">Heritage & Culture</option>
              <option value="SAFETY">Community Safety</option>
              <option value="CIVIC">Civic Amenities</option>
              <option value="LOCAL">Rural & Traditional Crafts</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          <span>
            Showing <strong className="text-slate-800 font-bold">{filteredNews.length}</strong> sourced articles
          </span>
          <span className="text-[11px] text-civic-700 font-medium">
            Stored in codebase • No runtime news API dependency
          </span>
        </div>
      </div>

      {/* News Cards Grid */}
      {filteredNews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-warm-200 p-8 text-center space-y-2">
          <p className="text-sm font-semibold text-slate-700">
            No articles match your search criteria.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('ALL');
            }}
            className="text-xs font-bold text-civic-700 hover:text-civic-900 underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}

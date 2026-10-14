'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import Link from 'next/link';
import { Search, Store, MapPin, Phone, Star, ShieldCheck, ArrowRight, MessageSquare } from 'lucide-react';

export default function BusinessesPage() {
  const { businesses } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const filtered = businesses.filter((b) => {
    const matchesSearch =
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.area.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'ALL' || b.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Local Businesses & Artisanal Directory
          </h1>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
            Town Enterprise
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Support local shops, agricultural supplies, handloom silk emporiums, and traditional eateries in Gauribidanur.
        </p>
      </div>

      {/* Commercial separation notice */}
      <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200 text-xs text-amber-900">
        <strong>Commercial Directory Notice:</strong> Local business listings are independent commercial entries and are strictly separated from core civic reporting.
      </div>

      {/* Search & Category Filter */}
      <div className="bg-white p-4 rounded-xl border border-warm-200 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search business name, address, or category..."
              className="w-full pl-10 pr-4 py-2 bg-warm-50 border border-warm-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-auto bg-warm-50 border border-warm-300 rounded-xl px-3 py-2 text-xs text-slate-800 font-medium focus:outline-hidden focus:ring-2 focus:ring-amber-500"
          >
            <option value="ALL">All Categories</option>
            <option value="RESTAURANT_FOOD">Restaurants & Food</option>
            <option value="AGRICULTURE_PRODUCE">Agro & Farm Equipment</option>
            <option value="TEXTILES_HANDICRAFTS">Silk & Handlooms</option>
            <option value="REPAIR_SERVICES">Electronics & Servicing</option>
          </select>
        </div>
      </div>

      {/* Businesses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((biz) => (
          <div
            key={biz.id}
            className="bg-white rounded-2xl border border-warm-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
                <img
                  src={biz.imageUrl}
                  alt={biz.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/95 text-slate-800 shadow-sm">
                    {biz.category.replace('_', ' ')}
                  </span>
                  {biz.isSponsored && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 shadow-sm">
                      Featured
                    </span>
                  )}
                </div>
              </div>

              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{biz.rating}</span>
                    <span className="text-slate-400 font-normal">({biz.reviewCount})</span>
                  </div>
                  {biz.isVerified && (
                    <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-0.5">
                      <ShieldCheck className="w-3 h-3" /> Verified Shop
                    </span>
                  )}
                </div>

                <Link href={`/businesses/${biz.id}`}>
                  <h3 className="font-bold text-slate-900 group-hover:text-amber-800 text-base leading-snug transition-colors">
                    {biz.name}
                  </h3>
                </Link>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {biz.description}
                </p>

                <div className="text-xs text-slate-500 flex items-start gap-1 pt-1">
                  <MapPin className="w-3.5 h-3.5 text-civic-700 mt-0.5 flex-shrink-0" />
                  <span className="line-clamp-1">{biz.fullAddress}</span>
                </div>
              </div>
            </div>

            <div className="p-4 pt-2 border-t border-warm-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium text-[11px]">{biz.openingHours}</span>
              <Link
                href={`/businesses/${biz.id}`}
                className="inline-flex items-center gap-1 font-bold text-amber-800 hover:text-amber-950"
              >
                <span>View Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

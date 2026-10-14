'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import Link from 'next/link';
import {
  ArrowLeft,
  MapPin,
  Phone,
  Clock,
  Star,
  ShieldCheck,
  MessageSquare,
  CheckCircle2,
  X,
  ExternalLink,
} from 'lucide-react';

export default function BusinessDetailClient({ id: propId }: { id?: string }) {
  const params = useParams();
  const id = propId || (params?.id as string);
  const { businesses } = useApp();
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [inquirySent, setInquirySent] = useState(false);

  const business = businesses.find((b) => b.id === id);

  if (!business) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Business Not Found</h2>
        <Link
          href="/businesses"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-civic-800 text-white font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Businesses</span>
        </Link>
      </div>
    );
  }

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      setIsInquiryOpen(false);
      setInquiryName('');
      setInquiryPhone('');
      setInquiryMessage('');
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
      <div>
        <Link
          href="/businesses"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Businesses</span>
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-warm-200 overflow-hidden shadow-xs space-y-6">
        <div className="relative h-64 sm:h-80 w-full bg-slate-900">
          <img
            src={business.imageUrl}
            alt={business.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/95 text-slate-800 shadow-md">
              {business.category.replace('_', ' ')}
            </span>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-warm-100 pb-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                {business.name}
              </h1>
              <p className="text-sm font-semibold text-amber-800 mt-0.5">
                {business.nameKn}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-3 py-1 rounded-xl text-amber-800 font-bold text-xs">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span>{business.rating}</span>
                <span className="text-slate-500 font-normal">({business.reviewCount} reviews)</span>
              </div>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {business.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
            <div className="p-4 rounded-xl bg-warm-50 border border-warm-200 space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Contact & Orders
              </span>
              <div className="font-mono font-bold text-slate-900">
                {business.contactPhone || 'Available in store'}
              </div>
              {business.contactPhone && (
                <a
                  href={`tel:${business.contactPhone}`}
                  className="inline-block text-xs font-bold text-civic-700 hover:text-civic-900 underline"
                >
                  Call Store Directly &rarr;
                </a>
              )}
            </div>

            <div className="p-4 rounded-xl bg-warm-50 border border-warm-200 space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Operating Timings
              </span>
              <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{business.openingHours}</span>
              </div>
            </div>

            <div className="sm:col-span-2 p-4 rounded-xl bg-warm-50 border border-warm-200 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Store Address
              </span>
              <div className="text-xs text-slate-800 font-medium flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-civic-700 mt-0.5 flex-shrink-0" />
                <span>{business.fullAddress}</span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-warm-100 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs text-slate-400">
              Listing verified: {business.isVerified ? 'Yes' : 'Pending review'}
            </span>

            <button
              onClick={() => setIsInquiryOpen(true)}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Send Callback Request</span>
            </button>
          </div>
        </div>
      </div>

      {/* Inquiry Modal */}
      {isInquiryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6 border border-warm-200 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-warm-200 mb-4">
              <h3 className="font-bold text-slate-900 text-base">Inquire with {business.name}</h3>
              <button
                onClick={() => setIsInquiryOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {inquirySent ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-slate-900 text-base">Inquiry Sent!</h4>
                <p className="text-xs text-slate-500">
                  Your inquiry has been simulated and recorded in the prototype.
                </p>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    placeholder="Enter full name"
                    className="w-full bg-warm-50 border border-warm-300 rounded-lg p-2 text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">Contact Phone</label>
                  <input
                    type="tel"
                    required
                    value={inquiryPhone}
                    onChange={(e) => setInquiryPhone(e.target.value)}
                    placeholder="10-digit mobile number"
                    className="w-full bg-warm-50 border border-warm-300 rounded-lg p-2 text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">Product or Service Inquiry</label>
                  <textarea
                    rows={3}
                    required
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                    placeholder="Describe what items or quote you need..."
                    className="w-full bg-warm-50 border border-warm-300 rounded-lg p-2 text-xs text-slate-900"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsInquiryOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md"
                  >
                    Submit Inquiry
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

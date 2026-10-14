'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Sparkles, Users, Video, Send, CheckCircle2, X, MessageSquare, ShieldCheck } from 'lucide-react';

export default function InfluencersPage() {
  const { creators, recordCollabRequest } = useApp();
  const [selectedCreator, setSelectedCreator] = useState<any>(null);

  // Collab Form State
  const [businessName, setBusinessName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [campaignDetails, setCampaignDetails] = useState('');
  const [proposedBudget, setProposedBudget] = useState('₹5,000 - ₹10,000');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCollabSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCreator) return;

    recordCollabRequest({
      creatorId: selectedCreator.id,
      businessName,
      contactPerson,
      contactEmail,
      contactPhone,
      campaignDetails,
      proposedBudget,
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setSelectedCreator(null);
      setBusinessName('');
      setContactPerson('');
      setContactPhone('');
      setContactEmail('');
      setCampaignDetails('');
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Local Creators & Video Journalists
          </h1>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
            Creator Directory
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Connect with hyperlocal reporters, food vloggers, and rural agriculture content creators in Gauribidanur and Chikkaballapur.
        </p>
      </div>

      <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200 text-xs text-amber-900">
        <strong>Commercial Collaboration Notice:</strong> Creator discovery facilitates partnerships between local merchants and independent creators. This is separate from non-partisan civic reporting.
      </div>

      {/* Creators Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {creators.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-2xl border border-warm-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src={c.avatarUrl}
                  alt={c.name}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-civic-600/30"
                />
                <div>
                  <h3 className="font-bold text-slate-900 text-base leading-tight">
                    {c.name}
                  </h3>
                  <span className="text-xs text-slate-500 font-mono">{c.handle}</span>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-civic-50 text-civic-800 border border-civic-200">
                      {c.category.replace(/_/g, ' ')}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {c.bio}
              </p>

              <div className="p-3 rounded-xl bg-warm-50 border border-warm-200 space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span className="text-[11px] text-slate-500">Audience:</span>
                  <strong className="text-slate-900 font-bold">{c.audienceEstimate}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[11px] text-slate-500">Languages:</span>
                  <span className="font-medium text-slate-800">{c.languages.join(', ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[11px] text-slate-500">Coverage Area:</span>
                  <span className="font-medium text-slate-800">{c.serviceArea}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Preferred Collabs
                </span>
                <div className="flex flex-wrap gap-1">
                  {c.preferredCollabs.map((pc) => (
                    <span
                      key={pc}
                      className="text-[10px] bg-warm-100 text-slate-700 px-2 py-0.5 rounded"
                    >
                      {pc}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-warm-100">
              <button
                onClick={() => setSelectedCreator(c)}
                className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                <span>Request Collaboration</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Collaboration Request Modal */}
      {selectedCreator && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl p-6 border border-warm-200 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-warm-200 mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Request Collab with {selectedCreator.name}</h3>
                <span className="text-xs text-slate-500">Brand awareness & promotion inquiry</span>
              </div>
              <button
                onClick={() => setSelectedCreator(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {isSuccess ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-slate-900 text-base">Collaboration Request Recorded!</h4>
                <p className="text-xs text-slate-500">
                  Your inquiry has been simulated in the local prototype database.
                </p>
              </div>
            ) : (
              <form onSubmit={handleCollabSubmit} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">Business Name</label>
                    <input
                      type="text"
                      required
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="e.g. Town Sweet Mart"
                      className="w-full bg-warm-50 border border-warm-300 rounded-lg p-2 text-xs text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">Contact Person</label>
                    <input
                      type="text"
                      required
                      value={contactPerson}
                      onChange={(e) => setContactPerson(e.target.value)}
                      placeholder="Your name"
                      className="w-full bg-warm-50 border border-warm-300 rounded-lg p-2 text-xs text-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">Mobile Number</label>
                    <input
                      type="tel"
                      required
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="10-digit number"
                      className="w-full bg-warm-50 border border-warm-300 rounded-lg p-2 text-xs text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">Proposed Budget</label>
                    <select
                      value={proposedBudget}
                      onChange={(e) => setProposedBudget(e.target.value)}
                      className="w-full bg-warm-50 border border-warm-300 rounded-lg p-2 text-xs text-slate-900"
                    >
                      <option value="₹2,000 - ₹5,000">₹2,000 - ₹5,000</option>
                      <option value="₹5,000 - ₹10,000">₹5,000 - ₹10,000</option>
                      <option value="₹10,000 - ₹25,000">₹10,000 - ₹25,000</option>
                      <option value="Product Exchange Only">Product Exchange Only</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">Campaign Goal / Product</label>
                  <textarea
                    rows={3}
                    required
                    value={campaignDetails}
                    onChange={(e) => setCampaignDetails(e.target.value)}
                    placeholder="Describe what product or store you want promoted, expected timeline, etc."
                    className="w-full bg-warm-50 border border-warm-300 rounded-lg p-2 text-xs text-slate-900"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedCreator(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md"
                  >
                    Send Collaboration Request
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

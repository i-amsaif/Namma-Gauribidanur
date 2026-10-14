'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { MessageSquare, PlusCircle, ThumbsUp, ShieldCheck, AlertCircle, X, CheckCircle2 } from 'lucide-react';

export default function CommunityNoticeboardPage() {
  const { notices, createNotice } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [authorLabel, setAuthorLabel] = useState('');
  const [authorArea, setAuthorArea] = useState('Gauribidanur Town');
  const [category, setCategory] = useState<'ANNOUNCEMENT' | 'VOLUNTEER' | 'QUESTION' | 'CIVIC_ALERT' | 'LOST_FOUND'>('ANNOUNCEMENT');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    createNotice({
      title,
      content,
      authorLabel: authorLabel.trim() || 'Local Resident',
      authorArea,
      category,
    });

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsModalOpen(false);
      setTitle('');
      setContent('');
      setAuthorLabel('');
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Community Noticeboard
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-civic-100 text-civic-800 border border-civic-200">
              Moderated Town Hub
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Neighborhood civic notices, volunteer drives, and public-interest community updates.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Post a Notice</span>
        </button>
      </div>

      {/* Guidelines Banner */}
      <div className="p-3.5 rounded-xl bg-warm-100 border border-warm-200 text-xs text-slate-700 flex items-start gap-2.5">
        <ShieldCheck className="w-4 h-4 text-civic-800 flex-shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="font-bold text-slate-900">Community Safety & Moderation Rules:</span>
          <p className="text-[11px] leading-relaxed text-slate-600">
            This noticeboard is designed strictly for local community welfare, volunteer needs, and civic alerts. Commercial spam, political mudslinging, and unverified personal allegations are strictly prohibited.
          </p>
        </div>
      </div>

      {/* Notices List */}
      <div className="space-y-4">
        {notices.map((post) => {
          const formattedDate = new Date(post.publishedAt).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          });

          const categoryStyle: Record<string, string> = {
            ANNOUNCEMENT: 'bg-blue-50 text-blue-800 border-blue-200',
            VOLUNTEER: 'bg-emerald-50 text-emerald-800 border-emerald-200',
            CIVIC_ALERT: 'bg-amber-50 text-amber-800 border-amber-200',
            LOST_FOUND: 'bg-purple-50 text-purple-800 border-purple-200',
            QUESTION: 'bg-slate-50 text-slate-800 border-slate-200',
          };

          return (
            <div
              key={post.id}
              className="bg-white rounded-xl border border-warm-200 p-5 shadow-xs space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-xs sm:text-sm">
                      {post.authorLabel}
                    </span>
                    <span className="text-slate-400 text-xs">•</span>
                    <span className="text-xs text-slate-500">{post.authorArea}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-base leading-snug">
                    {post.title}
                  </h3>
                </div>

                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex-shrink-0 ${
                    categoryStyle[post.category] || 'bg-slate-100 text-slate-800'
                  }`}
                >
                  {post.category.replace('_', ' ')}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {post.content}
              </p>

              <div className="pt-3 border-t border-warm-100 flex items-center justify-between text-xs text-slate-500">
                <span>Published {formattedDate}</span>
                <div className="flex items-center gap-1 font-semibold text-slate-700">
                  <ThumbsUp className="w-3.5 h-3.5 text-civic-700" />
                  <span>{post.likesCount} Helpful</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Post Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div
            className="bg-white rounded-2xl w-full max-w-lg shadow-2xl p-6 border border-warm-200 animate-in zoom-in-95 duration-150"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between pb-3 border-b border-warm-200 mb-4">
              <h3 className="font-bold text-slate-900 text-base">Submit Community Notice</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {isSubmitted ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-slate-900 text-base">Notice Published!</h4>
                <p className="text-xs text-slate-500">
                  Your post has been recorded in the prototype noticeboard.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">
                    Notice Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-warm-50 border border-warm-300 rounded-lg p-2 text-xs text-slate-900"
                  >
                    <option value="ANNOUNCEMENT">Public Announcement</option>
                    <option value="VOLUNTEER">Volunteer Need</option>
                    <option value="CIVIC_ALERT">Civic Alert / Power Cut</option>
                    <option value="LOST_FOUND">Lost & Found</option>
                    <option value="QUESTION">Community Question</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">
                    Notice Title
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Tree plantation drive this Saturday at Taluk Stadium"
                    className="w-full bg-warm-50 border border-warm-300 rounded-lg p-2.5 text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">
                    Detailed Information
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Share exact dates, location, and who to contact..."
                    className="w-full bg-warm-50 border border-warm-300 rounded-lg p-2.5 text-xs text-slate-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">
                      Your Name / Display Label
                    </label>
                    <input
                      type="text"
                      value={authorLabel}
                      onChange={(e) => setAuthorLabel(e.target.value)}
                      placeholder="e.g. Ward 3 Youth Club"
                      className="w-full bg-warm-50 border border-warm-300 rounded-lg p-2 text-xs text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">
                      Town / Village Area
                    </label>
                    <input
                      type="text"
                      value={authorArea}
                      onChange={(e) => setAuthorArea(e.target.value)}
                      placeholder="e.g. MG Road, Gauribidanur"
                      className="w-full bg-warm-50 border border-warm-300 rounded-lg p-2 text-xs text-slate-900"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md"
                  >
                    Post to Noticeboard
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

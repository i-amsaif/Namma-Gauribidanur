'use client';

import React from 'react';
import Link from 'next/link';
import { Complaint } from '@/types';
import { StatusBadge } from './StatusBadge';
import { useApp } from '@/context/AppContext';
import { MapPin, ThumbsUp, Calendar, ArrowRight, Image as ImageIcon } from 'lucide-react';

interface ComplaintCardProps {
  complaint: Complaint;
}

export function ComplaintCard({ complaint }: ComplaintCardProps) {
  const { t, upvoteComplaint } = useApp();

  const formattedDate = new Date(complaint.reportedAt).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const handleUpvote = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    upvoteComplaint(complaint.id);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 shadow-2xs hover:shadow-xs transition-all p-4 flex flex-col justify-between group">
      <div>
        {/* Top meta row */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              {complaint.id}
            </span>
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                complaint.location.zone === 'TOWN_MUNICIPALITY'
                  ? 'bg-amber-50 text-amber-800 border border-amber-200'
                  : 'bg-teal-50 text-teal-800 border border-teal-200'
              }`}
            >
              {complaint.location.zone === 'TOWN_MUNICIPALITY' ? 'Town CMC' : 'Taluk Rural'}
            </span>
          </div>
          <StatusBadge status={complaint.status} size="sm" />
        </div>

        {/* Title */}
        <Link href={`/issues/${complaint.id}`}>
          <h3 className="font-bold text-slate-900 group-hover:text-civic-800 text-sm sm:text-base leading-snug line-clamp-2 mb-1.5 transition-colors">
            {complaint.title}
          </h3>
        </Link>

        {/* Short Description */}
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
          {complaint.description}
        </p>

        {/* Image thumbnail if present */}
        {complaint.photoUrl && (
          <div className="relative h-28 w-full rounded-lg overflow-hidden mb-3 bg-slate-100 border border-slate-200">
            <img
              src={complaint.photoUrl}
              alt={complaint.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <span className="absolute bottom-1 right-1 bg-black/60 text-white text-[11px] px-1.5 py-0.5 rounded backdrop-blur-xs flex items-center gap-1">
              <ImageIcon className="w-3 h-3" /> Photo Attached
            </span>
          </div>
        )}
      </div>

      {/* Footer info row */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs text-slate-500">
        <div className="flex items-center gap-1 truncate text-slate-600">
          <MapPin className="w-3.5 h-3.5 text-civic-700 flex-shrink-0" />
          <span className="truncate text-xs font-medium">{complaint.location.wardOrVillage}</span>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={handleUpvote}
            title="Upvote to raise civic priority"
            className="flex items-center gap-1 px-2 py-1 rounded-md bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium transition-colors"
          >
            <ThumbsUp className="w-3 h-3 text-civic-700" />
            <span className="text-xs font-semibold">{complaint.upvotes}</span>
          </button>

          <Link
            href={`/issues/${complaint.id}`}
            className="p-1 rounded text-slate-400 hover:text-civic-800 group-hover:translate-x-0.5 transition-all"
            aria-label={`View details for ${complaint.id}`}
          >
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

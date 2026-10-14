'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CommunityEvent } from '@/types';
import { Calendar, Clock, MapPin, Users, Check, Sparkles } from 'lucide-react';

interface EventCardProps {
  event: CommunityEvent;
}

export function EventCard({ event }: EventCardProps) {
  const [hasRsvpd, setHasRsvpd] = useState(false);
  const [rsvps, setRsvps] = useState(event.rsvpsCount);

  const formattedDate = new Date(event.date).toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const handleRsvp = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!hasRsvpd) {
      setHasRsvpd(true);
      setRsvps(rsvps + 1);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-warm-200 hover:border-warm-300 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group">
      <div>
        {/* Banner */}
        <div className="relative h-40 w-full bg-slate-100 overflow-hidden">
          <img
            src={event.bannerUrl}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <div className="absolute top-2.5 left-2.5">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border shadow-2xs backdrop-blur-xs bg-white/95 text-slate-800">
              {event.category.replace('_', ' ')}
            </span>
          </div>
          <div className="absolute bottom-2 left-2.5 bg-black/70 text-white text-[10px] font-semibold px-2 py-0.5 rounded backdrop-blur-xs flex items-center gap-1">
            <Calendar className="w-3 h-3 text-amber-400" />
            <span>{formattedDate}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <Link href={`/events/${event.id}`}>
            <h3 className="font-bold text-slate-900 group-hover:text-civic-800 text-sm sm:text-base leading-snug line-clamp-2 mb-2 transition-colors">
              {event.title}
            </h3>
          </Link>

          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
            {event.description}
          </p>

          <div className="space-y-1.5 text-xs text-slate-500 mb-3">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-start gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-civic-700 mt-0.5 flex-shrink-0" />
              <span className="line-clamp-1">{event.venue}, {event.area}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer / RSVP */}
      <div className="px-4 pb-4 pt-2 border-t border-warm-100 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1 text-xs text-slate-500">
          <Users className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-700">{rsvps}</span>
          <span className="text-[11px]">Attending</span>
        </div>

        <button
          onClick={handleRsvp}
          className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-2xs transition-colors ${
            hasRsvpd
              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
              : 'bg-civic-700 hover:bg-civic-800 text-white'
          }`}
        >
          {hasRsvpd ? (
            <>
              <Check className="w-3 h-3" />
              <span>RSVP Confirmed</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>RSVP Free</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

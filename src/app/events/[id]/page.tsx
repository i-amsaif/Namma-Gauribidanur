'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, MapPin, Users, Phone, Check, Sparkles, Share2 } from 'lucide-react';

export default function EventDetailPage() {
  const { id } = useParams() as { id: string };
  const { events } = useApp();
  const [hasRsvpd, setHasRsvpd] = useState(false);

  const event = events.find((e) => e.id === id);

  if (!event) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Event Not Found</h2>
        <Link
          href="/events"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-civic-800 text-white font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Events</span>
        </Link>
      </div>
    );
  }

  const formattedDate = new Date(event.date).toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
      <div>
        <Link
          href="/events"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Events</span>
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-warm-200 overflow-hidden shadow-xs space-y-6">
        <div className="relative h-60 sm:h-72 w-full bg-slate-900">
          <img
            src={event.bannerUrl}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3 bg-white/95 text-slate-900 font-bold text-xs px-2.5 py-1 rounded-full shadow-md">
            {event.category.replace('_', ' ')}
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-5">
          <h1 className="text-xl sm:text-3xl font-black text-slate-900 leading-tight">
            {event.title}
          </h1>
          <div className="text-xs sm:text-sm font-semibold text-civic-800 leading-snug">
            {event.titleKn}
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {event.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-4 border-t border-warm-100">
            <div className="p-3.5 rounded-xl bg-warm-50 border border-warm-200 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Date & Schedule
              </span>
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-600" />
                <span>{formattedDate}</span>
              </div>
              <div className="text-slate-600 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{event.time}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-warm-50 border border-warm-200 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Venue & Area
              </span>
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-civic-700" />
                <span>{event.venue}</span>
              </div>
              <div className="text-slate-600">{event.area}</div>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-warm-100">
            <div className="text-xs text-slate-600">
              Organizer: <strong className="text-slate-900">{event.organizer}</strong>
              {event.contactNumber && <span> • Helpline: {event.contactNumber}</span>}
            </div>

            <button
              onClick={() => setHasRsvpd(!hasRsvpd)}
              className={`inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all ${
                hasRsvpd
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-civic-800 hover:bg-civic-900 text-white'
              }`}
            >
              {hasRsvpd ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>RSVP Confirmed ({event.rsvpsCount + 1})</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Confirm Free Attendance</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

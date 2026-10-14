'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { EventCard } from '@/components/events/EventCard';
import { Search, Filter, Calendar, Sparkles } from 'lucide-react';

export default function EventsPage() {
  const { events } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const filteredEvents = events.filter((e) => {
    const matchesSearch =
      e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.area.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'ALL' || e.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Community & Cultural Events
          </h1>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-civic-100 text-civic-800 border border-civic-200">
            Town & Taluk
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Vidurashwatha temple fairs, Dr. H.N. science exhibitions, blood donation camps, and youth river cleanups.
        </p>
      </div>

      <div className="bg-white p-4 rounded-xl border border-warm-200 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search events by name, venue, or organizer..."
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
              <option value="ALL">All Event Types</option>
              <option value="EDUCATION">Education & Science</option>
              <option value="HERITAGE">Heritage & Fairs</option>
              <option value="CIVIC_DRIVE">Civic Cleanliness Drives</option>
              <option value="HEALTH_CAMP">Health Camps</option>
            </select>
          </div>
        </div>
      </div>

      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((evt) => (
            <EventCard key={evt.id} event={evt} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-warm-200 p-8 text-center space-y-2">
          <p className="text-sm font-semibold text-slate-700">No events found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}

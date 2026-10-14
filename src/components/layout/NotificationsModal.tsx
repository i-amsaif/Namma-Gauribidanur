'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { X, Bell, CheckCircle2, AlertTriangle, Info, Calendar } from 'lucide-react';
import Link from 'next/link';

export function NotificationsModal() {
  const { isNotificationsOpen, setIsNotificationsOpen } = useApp();

  if (!isNotificationsOpen) return null;

  const demoNotifications = [
    {
      id: 'notif-1',
      type: 'STATUS_UPDATE',
      title: 'Complaint Update: GBN-DEMO-000101',
      message: 'CMC Engineering Wing marked "Severe road crater on Railway Station Road" as Work in Progress.',
      time: '2 hours ago',
      link: '/issues/GBN-DEMO-000101',
      icon: CheckCircle2,
      color: 'text-emerald-600 bg-emerald-50',
    },
    {
      id: 'notif-2',
      type: 'CIVIC_ALERT',
      title: 'BESCOM Maintenance Notice',
      message: 'Scheduled feeder line maintenance this Thursday from 10 AM to 3 PM in Railway Station and Subhash Nagar wards.',
      time: 'Yesterday',
      link: '/community',
      icon: AlertTriangle,
      color: 'text-amber-600 bg-amber-50',
    },
    {
      id: 'notif-3',
      type: 'EVENT',
      title: 'Upcoming Heritage Event',
      message: 'Vidurashwatha Freedom Heritage Walk is coming up on Nov 14. 89 citizens have RSVP\'d.',
      time: '3 days ago',
      link: '/events/evt-vidurashwatha-walk-02',
      icon: Calendar,
      color: 'text-blue-600 bg-blue-50',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden border border-warm-200 animate-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
        aria-label="Civic Notifications"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-warm-200 bg-warm-50">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-civic-100 text-civic-800">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Community Notifications</h3>
              <p className="text-[11px] text-slate-500">Live civic updates & alerts</p>
            </div>
          </div>
          <button
            onClick={() => setIsNotificationsOpen(false)}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="divide-y divide-warm-100 max-h-[60vh] overflow-y-auto">
          {demoNotifications.map((n) => {
            const Icon = n.icon;
            return (
              <Link
                key={n.id}
                href={n.link}
                onClick={() => setIsNotificationsOpen(false)}
                className="flex items-start gap-3 p-4 hover:bg-warm-50 transition-colors block"
              >
                <div className={`p-2 rounded-xl flex-shrink-0 ${n.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-bold text-slate-900">{n.title}</div>
                  <p className="text-xs text-slate-600 leading-relaxed">{n.message}</p>
                  <span className="text-[10px] text-slate-400 font-medium">{n.time}</span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="p-3 bg-warm-50 border-t border-warm-200 text-center">
          <span className="text-[11px] text-slate-500">
            Simulated demonstration notifications for Gauribidanur prototype.
          </span>
        </div>
      </div>
    </div>
  );
}

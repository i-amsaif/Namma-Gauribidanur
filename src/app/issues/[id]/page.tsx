'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { StatusBadge } from '@/components/complaint/StatusBadge';
import { ComplaintTimeline } from '@/components/complaint/ComplaintTimeline';
import { MapContainer } from '@/components/map/MapContainer';
import Link from 'next/link';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  ThumbsUp,
  Building,
  RotateCcw,
  CheckCircle2,
  Share2,
  ShieldCheck,
  Camera,
  AlertCircle,
} from 'lucide-react';

export default function IssueDetailPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const { complaints, upvoteComplaint, updateComplaintStatus, departments } = useApp();

  const [disputeComment, setDisputeComment] = useState('');
  const [isDisputing, setIsDisputing] = useState(false);
  const [showDisputeForm, setShowDisputeForm] = useState(false);

  const complaint = complaints.find((c) => c.id === id);

  if (!complaint) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Complaint Not Found</h2>
        <p className="text-xs text-slate-500">
          The complaint ID &quot;{id}&quot; does not exist in the prototype dataset.
        </p>
        <Link
          href="/issues"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-civic-800 text-white font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Complaints</span>
        </Link>
      </div>
    );
  }

  const assignedDept = departments.find((d) => d.id === complaint.assignedDepartmentId);

  const formattedReportedDate = new Date(complaint.reportedAt).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleDisputeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!disputeComment.trim()) return;

    setIsDisputing(true);
    setTimeout(() => {
      updateComplaintStatus(
        complaint.id,
        'REOPENED',
        'Citizen Verification',
        'CITIZEN',
        `Dispute logged by resident: "${disputeComment}"`
      );
      setIsDisputing(false);
      setShowDisputeForm(false);
      setDisputeComment('');
    }, 500);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${complaint.id}: ${complaint.title}`,
        text: `Civic issue reported in ${complaint.location.wardOrVillage}, Gauribidanur`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Complaint link copied to clipboard!');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
      {/* Back button */}
      <div>
        <Link
          href="/issues"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Issues</span>
        </Link>
      </div>

      {/* Main Issue Header Card */}
      <div className="bg-white rounded-2xl border border-warm-200 p-5 sm:p-7 shadow-xs space-y-4">
        {/* Meta row */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-warm-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs sm:text-sm font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md">
              {complaint.id}
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
              Prototype Demo Record
            </span>
          </div>

          <div className="flex items-center gap-2">
            <StatusBadge status={complaint.status} size="md" />
            <button
              onClick={handleShare}
              className="p-1.5 rounded-lg border border-warm-300 hover:bg-warm-100 text-slate-600"
              title="Share issue link"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Title & Description */}
        <div>
          <h1 className="text-lg sm:text-2xl font-black text-slate-900 leading-tight mb-2">
            {complaint.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {complaint.description}
          </p>
        </div>

        {/* Photo if present */}
        {complaint.photoUrl && (
          <div className="relative rounded-xl overflow-hidden border border-warm-200 max-h-80 bg-slate-900">
            <img
              src={complaint.photoUrl}
              alt={complaint.title}
              className="w-full h-full object-cover max-h-80"
            />
            <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded backdrop-blur-xs flex items-center gap-1">
              <Camera className="w-3 h-3" /> Citizen Photo Attached
            </div>
          </div>
        )}

        {/* Location & Metadata info */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-warm-50 border border-warm-200 text-xs text-slate-600">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Area & Ward
            </span>
            <div className="flex items-center gap-1 font-semibold text-slate-900 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-civic-700 flex-shrink-0" />
              <span>{complaint.location.wardOrVillage}</span>
            </div>
            <span className="text-[11px] text-slate-500">{complaint.location.address}</span>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Administrative Zone
            </span>
            <span className={`inline-block mt-0.5 text-xs font-semibold px-2 py-0.5 rounded ${
              complaint.location.zone === 'TOWN_MUNICIPALITY' ? 'bg-amber-100 text-amber-900' : 'bg-teal-100 text-teal-900'
            }`}>
              {complaint.location.zone === 'TOWN_MUNICIPALITY' ? 'Gauribidanur Town (CMC)' : 'Gauribidanur Taluk Rural'}
            </span>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Reported Date & Time
            </span>
            <div className="flex items-center gap-1 text-slate-800 font-medium mt-0.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{formattedReportedDate}</span>
            </div>
          </div>
        </div>

        {/* Upvote & Action Bar */}
        <div className="flex items-center justify-between pt-2 border-t border-warm-100">
          <button
            onClick={() => upvoteComplaint(complaint.id)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-warm-100 hover:bg-warm-200 text-slate-800 font-bold text-xs transition-colors"
          >
            <ThumbsUp className="w-3.5 h-3.5 text-civic-700" />
            <span>Upvote Civic Priority ({complaint.upvotes})</span>
          </button>

          {complaint.status === 'RESOLVED' && (
            <button
              onClick={() => setShowDisputeForm(!showDisputeForm)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-rose-300 bg-rose-50 hover:bg-rose-100 text-rose-800 font-bold text-xs transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Dispute / Reopen Issue</span>
            </button>
          )}
        </div>

        {/* Dispute Form (Collapsible) */}
        {showDisputeForm && (
          <form onSubmit={handleDisputeSubmit} className="p-4 bg-rose-50/50 rounded-xl border border-rose-200 space-y-3 animate-in fade-in duration-150">
            <div className="flex items-center gap-1.5 text-rose-900 font-bold text-xs">
              <AlertCircle className="w-4 h-4 text-rose-600" />
              <span>Dispute Resolution or Reopen Complaint</span>
            </div>
            <p className="text-[11px] text-rose-800 leading-relaxed">
              If the resolution work was incomplete or the issue has returned, explain why below to request simulated reinspection.
            </p>
            <textarea
              rows={2}
              value={disputeComment}
              onChange={(e) => setDisputeComment(e.target.value)}
              placeholder="e.g., Pothole filler washed away after first rain; road still uneven..."
              className="w-full bg-white border border-rose-300 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-rose-500"
              required
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowDisputeForm(false)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isDisputing}
                className="px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition-colors"
              >
                {isDisputing ? 'Updating...' : 'Submit Reopen Request'}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Progress Timeline Section */}
      <div className="bg-white rounded-2xl border border-warm-200 p-5 sm:p-7 shadow-xs space-y-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900">
            Simulated Workflow Timeline & Official Notes
          </h2>
          <p className="text-xs text-slate-500">
            Transparent record of inspections, work orders, and field resolution evidence.
          </p>
        </div>

        <ComplaintTimeline timeline={complaint.timeline} />
      </div>

      {/* Location Map Section */}
      <div className="bg-white rounded-2xl border border-warm-200 p-5 sm:p-7 shadow-xs space-y-3">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Geographic Location Pin
          </h2>
          <p className="text-xs text-slate-500">
            Coordinates: {complaint.location.coordinates.lat.toFixed(4)}°N, {complaint.location.coordinates.lng.toFixed(4)}°E
          </p>
        </div>

        <div className="rounded-xl overflow-hidden border border-warm-200">
          <MapContainer
            complaints={[complaint]}
            height="260px"
            interactive={false}
          />
        </div>
      </div>
    </div>
  );
}

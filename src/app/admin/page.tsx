'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { IssueStatus, ComplaintTimelineEntry } from '@/types';
import { StatusBadge } from '@/components/complaint/StatusBadge';
import {
  ShieldAlert,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Wrench,
  RotateCcw,
  AlertTriangle,
  Building2,
  Users,
  MessageSquare,
  ArrowRight,
  Eye,
  Edit,
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const { complaints, stats, updateComplaintStatus, departments, officials, notices } = useApp();

  const [activeTab, setActiveTab] = useState<'COMPLAINTS' | 'OFFICIALS' | 'MODERATION' | 'AUDIT'>('COMPLAINTS');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  // Selected complaint for status modification modal
  const [selectedComplaintId, setSelectedComplaintId] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState<IssueStatus>('IN_PROGRESS');
  const [officerName, setOfficerName] = useState('CMC Assistant Engineer');
  const [officerRole, setOfficerRole] = useState<ComplaintTimelineEntry['authorRole']>('CMC_OFFICER');
  const [officerComment, setOfficerComment] = useState('');
  const [evidencePhoto, setEvidencePhoto] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  // Filter complaints for table
  const filtered = complaints.filter((c) => {
    const matchSearch =
      c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.location.wardOrVillage.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = selectedStatus === 'ALL' || c.status === selectedStatus;
    return matchSearch && matchStatus;
  });

  const handleStatusChangeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedComplaintId) return;

    setIsUpdating(true);
    setTimeout(() => {
      updateComplaintStatus(
        selectedComplaintId,
        newStatus,
        officerName,
        officerRole,
        officerComment || `Status simulated to ${newStatus.replace(/_/g, ' ')} via Administrator Demo Panel.`,
        evidencePhoto || undefined
      );

      setIsUpdating(false);
      setUpdateSuccess(true);
      setTimeout(() => {
        setUpdateSuccess(false);
        setSelectedComplaintId(null);
        setOfficerComment('');
        setEvidencePhoto('');
      }, 1200);
    }, 400);
  };

  const openStatusModal = (id: string) => {
    setSelectedComplaintId(id);
    const target = complaints.find((c) => c.id === id);
    if (target) {
      setNewStatus(target.status);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
      {/* Admin Prototype Notice Banner */}
      <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-sm sm:text-base tracking-tight">
              Prototype Administrator & Triage Dashboard
            </h1>
            <p className="text-xs text-slate-400">
              Simulated demonstration console for ward engineers, health inspectors, and taluk officers.
            </p>
          </div>
        </div>

        <span className="text-[10px] font-mono px-2 py-1 rounded bg-slate-800 text-amber-300 border border-slate-700 font-bold">
          DEMO ADMIN MODE
        </span>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-xl border border-warm-200 shadow-2xs">
          <span className="text-xs text-slate-500 font-medium block">Total Complaints</span>
          <div className="text-2xl font-black text-slate-900 mt-1">{stats.totalComplaints}</div>
          <span className="text-[10px] text-slate-400">Across 23 wards & taluk</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-warm-200 shadow-2xs">
          <span className="text-xs text-amber-700 font-medium block">Active in Triage</span>
          <div className="text-2xl font-black text-amber-600 mt-1">{stats.activeComplaints}</div>
          <span className="text-[10px] text-slate-400">Requiring action</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-warm-200 shadow-2xs">
          <span className="text-xs text-emerald-700 font-medium block">Closed / Resolved</span>
          <div className="text-2xl font-black text-emerald-600 mt-1">{stats.resolvedComplaints}</div>
          <span className="text-[10px] text-slate-400">With evidence logged</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-warm-200 shadow-2xs">
          <span className="text-xs text-civic-700 font-medium block">Directory Records</span>
          <div className="text-2xl font-black text-civic-800 mt-1">{officials.length}</div>
          <span className="text-[10px] text-slate-400">Public contacts cataloged</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-warm-200">
        <button
          onClick={() => setActiveTab('COMPLAINTS')}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all ${
            activeTab === 'COMPLAINTS'
              ? 'border-amber-600 text-amber-950 font-black'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Complaint Triage ({complaints.length})
        </button>

        <button
          onClick={() => setActiveTab('OFFICIALS')}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all ${
            activeTab === 'OFFICIALS'
              ? 'border-amber-600 text-amber-950 font-black'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Officials Verification ({officials.length})
        </button>

        <button
          onClick={() => setActiveTab('MODERATION')}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all ${
            activeTab === 'MODERATION'
              ? 'border-amber-600 text-amber-950 font-black'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Noticeboard Moderation ({notices.length})
        </button>
      </div>

      {/* TAB 1: COMPLAINTS TRIAGE */}
      {activeTab === 'COMPLAINTS' && (
        <div className="bg-white rounded-2xl border border-warm-200 overflow-hidden shadow-xs space-y-4 p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search complaint ID or ward..."
                className="w-full pl-9 pr-3 py-1.5 bg-warm-50 border border-warm-300 rounded-lg text-xs text-slate-900"
              />
            </div>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full sm:w-auto bg-warm-50 border border-warm-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 font-medium"
            >
              <option value="ALL">All Statuses</option>
              <option value="SUBMITTED">Submitted</option>
              <option value="UNDER_REVIEW">Under Review</option>
              <option value="FORWARDED">Forwarded</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="RESOLVED">Resolved</option>
              <option value="REOPENED">Reopened</option>
            </select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-warm-100 text-slate-600 uppercase text-[10px] font-bold tracking-wider">
                <tr>
                  <th className="p-3">Complaint ID</th>
                  <th className="p-3">Title & Ward</th>
                  <th className="p-3">Current Status</th>
                  <th className="p-3">Reported</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-warm-100">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-warm-50/80 transition-colors">
                    <td className="p-3 font-mono font-bold text-slate-900">{c.id}</td>
                    <td className="p-3">
                      <div className="font-bold text-slate-900">{c.title}</div>
                      <div className="text-[11px] text-slate-500">{c.location.wardOrVillage}</div>
                    </td>
                    <td className="p-3">
                      <StatusBadge status={c.status} size="sm" />
                    </td>
                    <td className="p-3 text-[11px] text-slate-500 whitespace-nowrap">
                      {new Date(c.reportedAt).toLocaleDateString()}
                    </td>
                    <td className="p-3 text-right whitespace-nowrap space-x-2">
                      <Link
                        href={`/issues/${c.id}`}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-warm-100 hover:bg-warm-200 text-slate-700 font-semibold text-[11px]"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Public View</span>
                      </Link>
                      <button
                        onClick={() => openStatusModal(c.id)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-amber-600 hover:bg-amber-700 text-white font-semibold text-[11px] shadow-2xs"
                      >
                        <Edit className="w-3 h-3" />
                        <span>Change Status</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: OFFICIALS */}
      {activeTab === 'OFFICIALS' && (
        <div className="bg-white rounded-2xl border border-warm-200 p-5 shadow-xs space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-slate-900 text-sm">Officials & Contact Audit</h3>
            <span className="text-xs text-slate-500">
              Total {officials.length} records extracted from verified sources
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-warm-100 text-slate-600 uppercase text-[10px] font-bold tracking-wider">
                <tr>
                  <th className="p-3">Official Name</th>
                  <th className="p-3">Designation</th>
                  <th className="p-3">Office Helpline</th>
                  <th className="p-3">Verification</th>
                  <th className="p-3">Source Traceability</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-warm-100">
                {officials.map((o) => (
                  <tr key={o.id} className="hover:bg-warm-50">
                    <td className="p-3 font-bold text-slate-900">{o.name}</td>
                    <td className="p-3 text-slate-700">{o.designation}</td>
                    <td className="p-3 font-mono">{o.publicPhone || 'None'}</td>
                    <td className="p-3">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {o.verificationStatus}
                      </span>
                    </td>
                    <td className="p-3 text-[11px] text-slate-500 truncate max-w-xs">
                      {o.sourceTraceability}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: MODERATION */}
      {activeTab === 'MODERATION' && (
        <div className="bg-white rounded-2xl border border-warm-200 p-5 shadow-xs space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-slate-900 text-sm">Noticeboard Moderation Queue</h3>
            <span className="text-xs text-slate-500">{notices.length} active posts</span>
          </div>

          <div className="space-y-3">
            {notices.map((n) => (
              <div key={n.id} className="p-4 rounded-xl border border-warm-200 bg-warm-50/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{n.title}</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    {n.moderationStatus}
                  </span>
                </div>
                <p className="text-xs text-slate-600">{n.content}</p>
                <div className="text-[11px] text-slate-400">By {n.authorLabel} ({n.authorArea})</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Change Status Modal */}
      {selectedComplaintId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl p-6 border border-warm-200 animate-in zoom-in-95 duration-150">
            <h3 className="font-bold text-slate-900 text-base mb-1">
              Simulate Status Progression: {selectedComplaintId}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Modify the complaint status, record inspection findings, and upload simulated resolution proof.
            </p>

            {updateSuccess ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-slate-900 text-base">Status Updated Successfully!</h4>
                <p className="text-xs text-slate-500">
                  The complaint detail and public issue map have been updated immediately.
                </p>
              </div>
            ) : (
              <form onSubmit={handleStatusChangeSubmit} className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">Target Status</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as IssueStatus)}
                    className="w-full bg-warm-50 border border-warm-300 rounded-lg p-2 text-xs text-slate-900"
                  >
                    <option value="SUBMITTED">Newly Reported</option>
                    <option value="UNDER_REVIEW">Under Review / Ward Inspection</option>
                    <option value="FORWARDED">Forwarded to Specialized Wing</option>
                    <option value="IN_PROGRESS">Work in Progress / Contractor Assigned</option>
                    <option value="RESOLVED">Resolved (Work Completed)</option>
                    <option value="REOPENED">Disputed / Reopened</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">Officer Name</label>
                    <input
                      type="text"
                      value={officerName}
                      onChange={(e) => setOfficerName(e.target.value)}
                      className="w-full bg-warm-50 border border-warm-300 rounded-lg p-2 text-xs text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">Department Role</label>
                    <select
                      value={officerRole}
                      onChange={(e) => setOfficerRole(e.target.value as any)}
                      className="w-full bg-warm-50 border border-warm-300 rounded-lg p-2 text-xs text-slate-900"
                    >
                      <option value="CMC_OFFICER">CMC Municipality</option>
                      <option value="TALUK_ADMIN">Taluk Administration</option>
                      <option value="CITIZEN">Citizen Verification</option>
                      <option value="SYSTEM">System Auto Notice</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">Official Remark / Update Note</label>
                  <textarea
                    rows={3}
                    value={officerComment}
                    onChange={(e) => setOfficerComment(e.target.value)}
                    placeholder="e.g. Ward junior engineer inspected site. Material dispatched for macadam repair..."
                    className="w-full bg-warm-50 border border-warm-300 rounded-lg p-2 text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">
                    Resolution Evidence Image URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={evidencePhoto}
                    onChange={(e) => setEvidencePhoto(e.target.value)}
                    placeholder="https://... (Leave empty to use standard demo evidence)"
                    className="w-full bg-warm-50 border border-warm-300 rounded-lg p-2 text-xs text-slate-900"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedComplaintId(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md"
                  >
                    {isUpdating ? 'Saving...' : 'Apply Status Change'}
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

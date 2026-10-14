'use client';

import React from 'react';
import { IssueStatus } from '@/types';
import { useApp } from '@/context/AppContext';
import { CheckCircle2, Clock, AlertCircle, ArrowUpRight, Wrench, RotateCcw } from 'lucide-react';

interface StatusBadgeProps {
  status: IssueStatus;
  size?: 'sm' | 'md' | 'lg';
}

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const { t } = useApp();

  const config: Record<
    IssueStatus,
    { label: string; bg: string; text: string; border: string; icon: React.ComponentType<{ className?: string }> }
  > = {
    SUBMITTED: {
      label: t.statuses.SUBMITTED,
      bg: 'bg-slate-100',
      text: 'text-slate-700',
      border: 'border-slate-300',
      icon: Clock,
    },
    UNDER_REVIEW: {
      label: t.statuses.UNDER_REVIEW,
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      border: 'border-blue-200',
      icon: AlertCircle,
    },
    FORWARDED: {
      label: t.statuses.FORWARDED,
      bg: 'bg-indigo-50',
      text: 'text-indigo-700',
      border: 'border-indigo-200',
      icon: ArrowUpRight,
    },
    IN_PROGRESS: {
      label: t.statuses.IN_PROGRESS,
      bg: 'bg-amber-50',
      text: 'text-amber-800',
      border: 'border-amber-200',
      icon: Wrench,
    },
    RESOLVED: {
      label: t.statuses.RESOLVED,
      bg: 'bg-emerald-50',
      text: 'text-emerald-800',
      border: 'border-emerald-200',
      icon: CheckCircle2,
    },
    REOPENED: {
      label: t.statuses.REOPENED,
      bg: 'bg-rose-50',
      text: 'text-rose-800',
      border: 'border-rose-200',
      icon: RotateCcw,
    },
  };

  const current = config[status] || config.SUBMITTED;
  const Icon = current.icon;

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-2.5 py-1 text-xs gap-1.5',
    lg: 'px-3 py-1.5 text-sm gap-2 font-semibold',
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border ${current.bg} ${current.text} ${current.border} ${sizeClasses[size]}`}
    >
      <Icon className={size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5'} />
      <span>{current.label}</span>
    </span>
  );
}

'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Complaint, LocationCoordinates } from '@/types';
import { Loader2 } from 'lucide-react';

interface MapContainerProps {
  complaints?: Complaint[];
  selectedCategory?: string;
  selectedStatus?: string;
  pickerMode?: boolean;
  onLocationSelect?: (coords: LocationCoordinates, zone: 'TOWN_MUNICIPALITY' | 'TALUK_RURAL', areaName: string) => void;
  pickedLocation?: LocationCoordinates | null;
  height?: string;
  interactive?: boolean;
}

const LeafletMap = dynamic(() => import('@/components/map/LeafletMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full flex flex-col items-center justify-center bg-warm-100 rounded-xl border border-warm-200 text-slate-500 gap-2" style={{ height: '450px' }}>
      <Loader2 className="w-6 h-6 animate-spin text-civic-700" />
      <span className="text-xs font-semibold">Loading Gauribidanur Interactive Map...</span>
      <span className="text-[11px] text-slate-400">Loading municipal & taluk GIS layers</span>
    </div>
  ),
});

export function MapContainer(props: MapContainerProps) {
  return <LeafletMap {...props} />;
}

'use client';

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Complaint, LocationCoordinates } from '@/types';
import {
  GAURIBIDANUR_TOWN_CENTER,
  GAURIBIDANUR_TALUK_BOUNDS,
  TOWN_CMC_POLYGON,
  TALUK_POLYGON,
  validateLocation,
} from '@/data/boundaries';

// Helper for status badge styling
const STATUS_COLORS: Record<string, string> = {
  SUBMITTED: '#64748B', // Slate
  UNDER_REVIEW: '#3B82F6', // Blue
  FORWARDED: '#6366F1', // Indigo
  IN_PROGRESS: '#F59E0B', // Amber
  RESOLVED: '#10B981', // Emerald
  REOPENED: '#EF4444', // Red
};

interface LeafletMapProps {
  complaints?: Complaint[];
  selectedCategory?: string;
  selectedStatus?: string;
  pickerMode?: boolean;
  onLocationSelect?: (coords: LocationCoordinates, zone: 'TOWN_MUNICIPALITY' | 'TALUK_RURAL', areaName: string) => void;
  pickedLocation?: LocationCoordinates | null;
  height?: string;
  interactive?: boolean;
}

export default function LeafletMap({
  complaints = [],
  selectedCategory = 'ALL',
  selectedStatus = 'ALL',
  pickerMode = false,
  onLocationSelect,
  pickedLocation,
  height = '500px',
  interactive = true,
}: LeafletMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const pickerMarkerRef = useRef<L.Marker | null>(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Fix default leaflet icons
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });

    const map = L.map(mapContainerRef.current, {
      center: [GAURIBIDANUR_TOWN_CENTER.lat, GAURIBIDANUR_TOWN_CENTER.lng],
      zoom: 13,
      minZoom: 10,
      maxZoom: 18,
      maxBounds: [
        [GAURIBIDANUR_TALUK_BOUNDS.south - 0.08, GAURIBIDANUR_TALUK_BOUNDS.west - 0.08],
        [GAURIBIDANUR_TALUK_BOUNDS.north + 0.08, GAURIBIDANUR_TALUK_BOUNDS.east + 0.08],
      ],
      maxBoundsViscosity: 0.85,
      zoomControl: interactive,
      dragging: interactive,
      touchZoom: interactive,
      scrollWheelZoom: interactive ? 'center' : false,
    });

    mapInstanceRef.current = map;

    // Tile Layer: OpenStreetMap with clean cartographic attribution
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    // Add Taluk Boundary Polygon
    const talukPolygon = L.polygon(TALUK_POLYGON, {
      color: '#0F766E',
      weight: 2,
      dashArray: '6, 6',
      fillColor: '#0F766E',
      fillOpacity: 0.04,
    }).addTo(map);
    talukPolygon.bindTooltip('Gauribidanur Taluk Extent (Illustrative)', { sticky: true });

    // Add Town CMC Boundary Polygon
    const townPolygon = L.polygon(TOWN_CMC_POLYGON, {
      color: '#D97706',
      weight: 2.5,
      fillColor: '#F59E0B',
      fillOpacity: 0.12,
    }).addTo(map);
    townPolygon.bindTooltip('Gauribidanur Town (CMC Wards Core)', { sticky: true });

    // Layer group for complaint markers
    const markersLayer = L.layerGroup().addTo(map);
    markersLayerRef.current = markersLayer;

    // Click handler for location picker
    if (pickerMode && onLocationSelect) {
      map.on('click', (e: L.LeafletMouseEvent) => {
        const { lat, lng } = e.latlng;
        const validation = validateLocation({ lat, lng });

        if (!validation.isValid) {
          alert('Location is outside Gauribidanur Taluk boundary. Please choose a location within Gauribidanur town or surrounding taluk villages.');
          return;
        }

        onLocationSelect({ lat, lng }, validation.zone, validation.suggestedArea);
      });
    }

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [pickerMode, onLocationSelect, interactive]);

  // Update picked location marker
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (pickedLocation) {
      if (pickerMarkerRef.current) {
        pickerMarkerRef.current.setLatLng([pickedLocation.lat, pickedLocation.lng]);
      } else {
        const customPin = L.divIcon({
          className: 'custom-picker-pin',
          html: `<div style="background-color: #D97706; width: 28px; height: 28px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 14px;">📍</div>`,
          iconSize: [28, 28],
          iconAnchor: [14, 28],
        });

        pickerMarkerRef.current = L.marker([pickedLocation.lat, pickedLocation.lng], {
          icon: customPin,
        }).addTo(map);
      }
    } else if (pickerMarkerRef.current) {
      pickerMarkerRef.current.remove();
      pickerMarkerRef.current = null;
    }
  }, [pickedLocation]);

  // Update complaint markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersLayer = markersLayerRef.current;
    if (!map || !markersLayer) return;

    markersLayer.clearLayers();

    // Filter complaints
    const filtered = complaints.filter((c) => {
      const matchCat = selectedCategory === 'ALL' || c.category === selectedCategory;
      const matchStatus =
        selectedStatus === 'ALL'
          ? true
          : selectedStatus === 'ACTIVE'
          ? c.status !== 'RESOLVED'
          : c.status === selectedStatus;
      return matchCat && matchStatus;
    });

    filtered.forEach((c) => {
      const statusColor = STATUS_COLORS[c.status] || '#64748B';

      const customIcon = L.divIcon({
        className: 'custom-complaint-icon',
        html: `
          <div style="background-color: ${statusColor}; width: 24px; height: 24px; border-radius: 50%; border: 2.5px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.25); display: flex; align-items: center; justify-content: center; color: white; font-size: 10px; font-weight: 700;">
            ${c.status === 'RESOLVED' ? '✓' : '!'}
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      const marker = L.marker([c.location.coordinates.lat, c.location.coordinates.lng], {
        icon: customIcon,
      });

      const popupHtml = `
        <div style="padding: 12px; width: 240px; font-family: system-ui, sans-serif;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <span style="font-size: 10px; font-weight: 700; color: #64748B;">${c.id}</span>
            <span style="font-size: 10px; font-weight: 600; padding: 2px 6px; border-radius: 4px; background-color: ${statusColor}15; color: ${statusColor};">
              ${c.status.replace('_', ' ')}
            </span>
          </div>
          <h4 style="font-size: 12px; font-weight: 700; color: #0F172A; margin: 0 0 4px 0; line-height: 1.3;">
            ${c.title}
          </h4>
          <p style="font-size: 11px; color: #64748B; margin: 0 0 8px 0; line-height: 1.3;">
            ${c.location.wardOrVillage}
          </p>
          <a href="/issues/${c.id}" style="display: block; text-align: center; background-color: #0F766E; color: white; padding: 5px 8px; border-radius: 6px; font-size: 11px; font-weight: 600; text-decoration: none;">
            View Details & Timeline &rarr;
          </a>
        </div>
      `;

      marker.bindPopup(popupHtml);
      markersLayer.addLayer(marker);
    });
  }, [complaints, selectedCategory, selectedStatus]);

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-warm-200 shadow-sm" style={{ height }}>
      <div ref={mapContainerRef} className="w-full h-full" />
    </div>
  );
}

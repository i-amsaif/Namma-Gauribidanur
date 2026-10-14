'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { IssueCategory, AdministrativeZone } from '@/types';
import { Compass, Building2, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export function DepartmentFinder() {
  const { t, departments } = useApp();
  const [selectedCat, setSelectedCat] = useState<IssueCategory | ''>('STREETLIGHTS');
  const [selectedZone, setSelectedZone] = useState<AdministrativeZone>('TOWN_MUNICIPALITY');

  // Logic to determine responsible department based on category and zone
  const getRecommendation = () => {
    if (!selectedCat) return null;

    if (selectedCat === 'STREETLIGHTS') {
      if (selectedZone === 'TOWN_MUNICIPALITY') {
        return {
          deptId: 'dept-cmc-01',
          name: 'Gauribidanur City Municipal Council (CMC)',
          role: 'Responsible for streetlights, poles, and timers across the 23 town municipal wards.',
          contact: '08155-285226',
        };
      } else {
        return {
          deptId: 'dept-taluk-panch-03',
          name: 'Taluk Panchayat & Gram Panchayats',
          role: 'Responsible for rural village streetlights and Gram Panchayat maintenance tenders.',
          contact: '08155-285331',
        };
      }
    }

    if (selectedCat === 'WATER_SUPPLY') {
      if (selectedZone === 'TOWN_MUNICIPALITY') {
        return {
          deptId: 'dept-cmc-01',
          name: 'CMC Water Supply Wing',
          role: 'Manages municipal overhead tanks, town distribution pipes, and valve schedules in town.',
          contact: '08155-285226',
        };
      } else {
        return {
          deptId: 'dept-rdws-08',
          name: 'Rural Drinking Water & Sanitation Dept (RDW&SD)',
          role: 'Oversees Jal Jeevan Mission multi-village schemes, village RO plants, and borewell repairs.',
          contact: '08155-285310',
        };
      }
    }

    if (selectedCat === 'ROADS_POTHOLES') {
      if (selectedZone === 'TOWN_MUNICIPALITY') {
        return {
          deptId: 'dept-cmc-01',
          name: 'CMC Engineering Wing',
          role: 'Manages municipal roads, colony cross roads, and footpaths inside town council limits.',
          contact: '08155-285227',
        };
      } else {
        return {
          deptId: 'dept-pwd-07',
          name: 'Public Works Department (PWD Sub-Division)',
          role: 'Maintains State Highway 9 (Bangalore-Hindupur Road), major district links, and river bridges.',
          contact: '08155-285288',
        };
      }
    }

    if (selectedCat === 'PUBLIC_HEALTH_HOSPITAL') {
      return {
        deptId: 'dept-health-06',
        name: 'Taluk Health Department & General Hospital',
        role: 'Primary Health Centres (PHCs), 100-bed General Hospital, and Mother & Child Hospital.',
        contact: '08155-285250',
      };
    }

    if (selectedCat === 'GARBAGE_SANITATION') {
      if (selectedZone === 'TOWN_MUNICIPALITY') {
        return {
          deptId: 'dept-cmc-01',
          name: 'Gauribidanur City Municipal Council (Health Wing)',
          role: 'Town door-to-door waste collection, commercial garbage bins, and public sweeping.',
          contact: '08155-285226',
        };
      } else {
        return {
          deptId: 'dept-taluk-panch-03',
          name: 'Taluk Panchayat (Swachh Bharat Gramin)',
          role: 'Rural Gram Panchayat solid waste sheds and village cleanliness programs.',
          contact: '08155-285331',
        };
      }
    }

    if (selectedCat === 'TRAFFIC_TRANSPORT') {
      return {
        deptId: 'dept-police-05',
        name: 'Karnataka State Police (Gauribidanur Circle)',
        role: 'Town Traffic enforcement, accident investigation, and highway regulation.',
        contact: '112 / 08155-285233',
      };
    }

    // Default fallback
    return {
      deptId: 'dept-taluk-rev-02',
      name: 'Taluk Office / Revenue Administration',
      role: 'General taluk administrative oversight and citizen grievance routing.',
      contact: '08155-285222',
    };
  };

  const recommendation = getRecommendation();

  return (
    <div className="bg-gradient-to-br from-civic-900 to-civic-950 text-white rounded-2xl p-5 sm:p-6 shadow-md border border-civic-800">
      <div className="flex items-center gap-2 mb-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
        <Compass className="w-4 h-4" />
        <span>{t.directory.departmentFinder}</span>
      </div>
      <h3 className="text-base sm:text-lg font-bold text-white mb-2">
        {t.directory.departmentFinderHelp}
      </h3>
      <p className="text-xs text-slate-300 leading-relaxed mb-4 max-w-xl">
        In Gauribidanur, responsibility differs depending on whether your issue is located in the <strong>Town Municipal Council area (CMC)</strong> or <strong>Taluk Rural Villages (Gram Panchayats)</strong>.
      </p>

      {/* Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <div>
          <label className="text-[11px] font-semibold text-slate-300 block mb-1">
            1. Select Issue Category
          </label>
          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value as IssueCategory)}
            className="w-full bg-civic-800 border border-civic-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
          >
            <option value="STREETLIGHTS">Streetlights & Lighting</option>
            <option value="WATER_SUPPLY">Drinking Water Supply</option>
            <option value="ROADS_POTHOLES">Roads, Potholes & Bridges</option>
            <option value="GARBAGE_SANITATION">Garbage & Sanitation</option>
            <option value="PUBLIC_HEALTH_HOSPITAL">Hospitals & Public Health</option>
            <option value="TRAFFIC_TRANSPORT">Traffic & Road Safety</option>
            <option value="DRAINAGE_SEWAGE">Drainage & Sewage</option>
          </select>
        </div>

        <div>
          <label className="text-[11px] font-semibold text-slate-300 block mb-1">
            2. Select Geographic Area
          </label>
          <select
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value as AdministrativeZone)}
            className="w-full bg-civic-800 border border-civic-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
          >
            <option value="TOWN_MUNICIPALITY">Gauribidanur Town (23 CMC Wards)</option>
            <option value="TALUK_RURAL">Gauribidanur Taluk Villages (Panchayats)</option>
          </select>
        </div>
      </div>

      {/* Output Card */}
      {recommendation && (
        <div className="bg-white/10 rounded-xl p-4 border border-white/10 backdrop-blur-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-amber-300 text-xs font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Recommended Governing Body</span>
            </div>
            <div className="text-sm font-bold text-white">{recommendation.name}</div>
            <p className="text-xs text-slate-300">{recommendation.role}</p>
            <div className="text-[11px] text-amber-200 font-mono">
              Official Helpline: {recommendation.contact}
            </div>
          </div>

          <Link
            href="/directory"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-sm transition-colors flex-shrink-0"
          >
            <span>View Office Directory</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
}

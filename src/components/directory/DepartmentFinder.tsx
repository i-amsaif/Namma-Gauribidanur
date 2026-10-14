'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { IssueCategory, AdministrativeZone } from '@/types';
import { Compass, Building2, ArrowRight, CheckCircle2, Phone } from 'lucide-react';
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
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-2xs space-y-4">
      <div className="flex items-center gap-2 text-civic-700 font-bold text-xs uppercase tracking-wider">
        <Compass className="w-4 h-4" />
        <span>{t.directory.departmentFinder}</span>
      </div>
      <div>
        <h3 className="text-base sm:text-lg font-bold text-slate-900">
          {t.directory.departmentFinderHelp}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1">
          In Gauribidanur, administrative responsibility differs between the <strong>Town Municipal Council (CMC 23 Wards)</strong> and <strong>Taluk Rural Villages (38 Gram Panchayats)</strong>.
        </p>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1">
            1. Select Issue Category
          </label>
          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value as IssueCategory)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-civic-600"
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
          <label className="text-xs font-semibold text-slate-700 block mb-1">
            2. Select Geographic Area
          </label>
          <select
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value as AdministrativeZone)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-civic-600"
          >
            <option value="TOWN_MUNICIPALITY">Gauribidanur Town (23 CMC Wards)</option>
            <option value="TALUK_RURAL">Gauribidanur Taluk Villages (Panchayats)</option>
          </select>
        </div>
      </div>

      {/* Output Card */}
      {recommendation && (
        <div className="bg-emerald-50/60 rounded-xl p-4 border border-emerald-200/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-emerald-800 text-xs font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
              <span>Recommended Authority</span>
            </div>
            <div className="text-sm font-bold text-slate-900">{recommendation.name}</div>
            <p className="text-xs text-slate-600 leading-relaxed">{recommendation.role}</p>
            <div className="text-xs text-slate-700 font-mono font-medium flex items-center gap-1 pt-0.5">
              <Phone className="w-3.5 h-3.5 text-civic-700" />
              <span>Helpline: {recommendation.contact}</span>
            </div>
          </div>

          <Link
            href="/directory"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-civic-700 hover:bg-civic-800 text-white font-semibold text-xs shadow-2xs transition-colors flex-shrink-0"
          >
            <span>View Contacts</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
}

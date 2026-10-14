'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { MapContainer } from '@/components/map/MapContainer';
import { IssueCategory, LocationCoordinates, AdministrativeZone } from '@/types';
import {
  GAURIBIDANUR_TOWN_CENTER,
  CMC_WARDS,
  TALUK_AREAS,
  validateLocation,
} from '@/data/boundaries';
import {
  Trash2,
  Construction,
  Droplets,
  Lightbulb,
  Building,
  HeartPulse,
  Car,
  Trees,
  HelpCircle,
  MapPin,
  Camera,
  Upload,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  AlertTriangle,
  ShieldCheck,
  X,
  Navigation,
} from 'lucide-react';
import Link from 'next/link';

export default function ReportIssuePage() {
  const { t, createComplaint } = useApp();
  const router = useRouter();

  // Current Step (1 to 5)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State
  const [category, setCategory] = useState<IssueCategory>('ROADS_POTHOLES');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // Location State
  const [coordinates, setCoordinates] = useState<LocationCoordinates>(GAURIBIDANUR_TOWN_CENTER);
  const [zone, setZone] = useState<AdministrativeZone>('TOWN_MUNICIPALITY');
  const [wardOrVillage, setWardOrVillage] = useState<string>(CMC_WARDS[0]);
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [geoError, setGeoError] = useState<string | null>(null);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  // Category Configuration
  const categoryOptions: { id: IssueCategory; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'ROADS_POTHOLES', label: t.categories.ROADS_POTHOLES, icon: Construction },
    { id: 'GARBAGE_SANITATION', label: t.categories.GARBAGE_SANITATION, icon: Trash2 },
    { id: 'DRAINAGE_SEWAGE', label: t.categories.DRAINAGE_SEWAGE, icon: Droplets },
    { id: 'STREETLIGHTS', label: t.categories.STREETLIGHTS, icon: Lightbulb },
    { id: 'WATER_SUPPLY', label: t.categories.WATER_SUPPLY, icon: Droplets },
    { id: 'PUBLIC_INFRASTRUCTURE', label: t.categories.PUBLIC_INFRASTRUCTURE, icon: Building },
    { id: 'PUBLIC_HEALTH_HOSPITAL', label: t.categories.PUBLIC_HEALTH_HOSPITAL, icon: HeartPulse },
    { id: 'TRAFFIC_TRANSPORT', label: t.categories.TRAFFIC_TRANSPORT, icon: Car },
    { id: 'PARKS_PLAYGROUNDS', label: t.categories.PARKS_PLAYGROUNDS, icon: Trees },
    { id: 'OTHER_CIVIC', label: t.categories.OTHER_CIVIC, icon: HelpCircle },
  ];

  // Handle Photo File Upload
  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5MB limit. Please choose a smaller image.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Map Pin Click
  const handleLocationSelect = (coords: LocationCoordinates, selectedZone: AdministrativeZone, suggestedArea: string) => {
    setCoordinates(coords);
    setZone(selectedZone);
    setGeoError(null);
    if (!address) {
      setAddress(`Near pinned location (${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)})`);
    }
  };

  // Use Current Device Location (Simulated / Real GPS)
  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          const val = validateLocation(coords);
          if (val.isValid) {
            setCoordinates(coords);
            setZone(val.zone);
            setGeoError(null);
            setAddress(`Current device location (${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)})`);
          } else {
            // If user's device is outside Gauribidanur, center on town center with helpful note
            setCoordinates(GAURIBIDANUR_TOWN_CENTER);
            setZone('TOWN_MUNICIPALITY');
            setAddress('Gauribidanur Town Centre (GPS was outside taluk boundaries)');
            setGeoError('Your current GPS coordinates fall outside Gauribidanur Taluk. Pinned to Gauribidanur Town Centre for demonstration.');
          }
        },
        () => {
          // Fallback if denied
          setCoordinates(GAURIBIDANUR_TOWN_CENTER);
          setZone('TOWN_MUNICIPALITY');
          setAddress('Gauribidanur Town Centre (GPS access denied or unavailable)');
        }
      );
    } else {
      setCoordinates(GAURIBIDANUR_TOWN_CENTER);
      setAddress('Gauribidanur Town Centre');
    }
  };

  // Validation before proceeding
  const canProceedFromStep2 = title.trim().length >= 5 && description.trim().length >= 10;
  const canProceedFromStep4 = address.trim().length >= 3;

  // Handle Final Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const newComplaint = createComplaint({
        title,
        description,
        category,
        location: {
          address,
          landmark: landmark || undefined,
          zone,
          wardOrVillage,
          coordinates,
        },
        photoUrl: photoPreview || undefined,
        status: 'SUBMITTED',
      });

      setSubmittedId(newComplaint.id);
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          {t.report.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          {t.report.subtitle}
        </p>
      </div>

      {/* Success View */}
      {submittedId ? (
        <div className="bg-white rounded-2xl border border-warm-200 p-6 sm:p-8 text-center space-y-5 shadow-sm animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto ring-8 ring-emerald-50">
            <CheckCircle2 className="w-9 h-9 stroke-[2.5px]" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900">
              {t.report.successTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              {t.report.successMessage}
            </p>
          </div>

          <div className="bg-warm-50 border border-warm-200 rounded-xl p-4 max-w-xs mx-auto">
            <span className="text-xs text-slate-500 font-medium block">
              {t.report.ticketIdLabel}
            </span>
            <span className="text-xl font-mono font-black text-civic-800 tracking-wider">
              {submittedId}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href={`/issues/${submittedId}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-civic-800 hover:bg-civic-900 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
            >
              <span>{t.report.viewTicketButton}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => {
                setSubmittedId(null);
                setCurrentStep(1);
                setTitle('');
                setDescription('');
                setPhotoPreview(null);
                setAddress('');
                setLandmark('');
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-warm-300 hover:bg-warm-100 text-slate-700 font-bold text-xs sm:text-sm transition-all"
            >
              {t.report.reportAnother}
            </button>
          </div>
        </div>
      ) : (
        /* Multi-step Form */
        <div className="bg-white rounded-2xl border border-warm-200 shadow-xs overflow-hidden">
          {/* Step Progress Header */}
          <div className="bg-warm-50 border-b border-warm-200 p-4">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-2">
              <span>Step {currentStep} of 5</span>
              <span className="text-civic-800 font-bold">
                {currentStep === 1 && t.report.stepCategory}
                {currentStep === 2 && t.report.stepDetails}
                {currentStep === 3 && t.report.stepPhoto}
                {currentStep === 4 && t.report.stepLocation}
                {currentStep === 5 && t.report.stepReview}
              </span>
            </div>
            <div className="w-full bg-warm-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-amber-500 h-full transition-all duration-300"
                style={{ width: `${(currentStep / 5) * 100}%` }}
              />
            </div>
          </div>

          <div className="p-5 sm:p-6">
            {/* STEP 1: CATEGORY */}
            {currentStep === 1 && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    {t.report.selectCategoryTitle}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {t.report.categoryHelp}
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 pt-2">
                  {categoryOptions.map((opt) => {
                    const Icon = opt.icon;
                    const isSelected = category === opt.id;
                    return (
                      <button
                        type="button"
                        key={opt.id}
                        onClick={() => setCategory(opt.id)}
                        className={`flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'border-amber-600 bg-amber-50/80 text-amber-950 ring-2 ring-amber-500/30'
                            : 'border-warm-200 hover:border-warm-300 hover:bg-warm-50 text-slate-800'
                        }`}
                      >
                        <div
                          className={`p-2 rounded-lg flex-shrink-0 ${
                            isSelected ? 'bg-amber-600 text-white' : 'bg-warm-100 text-slate-600'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold leading-snug mt-1">{opt.label}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
                  >
                    <span>Next: Issue Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: DETAILS */}
            {currentStep === 2 && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    Describe the Civic Grievance
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Provide clear, concise details so engineers can locate and evaluate the problem.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">
                      {t.report.issueTitleLabel} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder={t.report.issueTitlePlaceholder}
                      maxLength={100}
                      className="w-full bg-warm-50 border border-warm-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                    />
                    <div className="text-[10px] text-slate-400 mt-1 flex justify-between">
                      <span>Minimum 5 characters</span>
                      <span>{title.length}/100</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">
                      {t.report.descriptionLabel} <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      rows={4}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder={t.report.descriptionPlaceholder}
                      maxLength={500}
                      className="w-full bg-warm-50 border border-warm-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                    />
                    <div className="text-[10px] text-slate-400 mt-1 flex justify-between">
                      <span>Minimum 10 characters</span>
                      <span>{description.length}/500</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="inline-flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    disabled={!canProceedFromStep2}
                    onClick={() => setCurrentStep(3)}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xs sm:text-sm shadow-md transition-all"
                  >
                    <span>Next: Add Photograph</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: PHOTOGRAPH */}
            {currentStep === 3 && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    {t.report.photoLabel}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {t.report.photoHelp}
                  </p>
                </div>

                {photoPreview ? (
                  <div className="relative rounded-xl overflow-hidden border border-warm-300 max-w-sm mx-auto bg-slate-900">
                    <img
                      src={photoPreview}
                      alt="Selected Issue"
                      className="w-full h-56 object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => setPhotoPreview(null)}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 text-white hover:bg-black transition-colors"
                      title={t.report.removePhoto}
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="p-2 bg-slate-800 text-white text-[11px] text-center font-medium">
                      Photo selected from device
                    </div>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-warm-300 hover:border-amber-500 rounded-2xl p-6 text-center space-y-3 bg-warm-50/50 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
                      <Camera className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">
                        Capture or upload a picture of the issue
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        PNG, JPG, or WEBP up to 5MB
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                      <label className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs transition-colors">
                        <Upload className="w-3.5 h-3.5" />
                        <span>{t.report.uploadPhoto}</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoSelect}
                          className="hidden"
                        />
                      </label>

                      <label className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-warm-300 bg-white hover:bg-warm-100 text-slate-800 text-xs font-bold transition-colors">
                        <Camera className="w-3.5 h-3.5" />
                        <span>{t.report.takePhoto}</span>
                        <input
                          type="file"
                          accept="image/*"
                          capture="environment"
                          onChange={handlePhotoSelect}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                )}

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="inline-flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentStep(4)}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
                  >
                    <span>Next: Select Location</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: LOCATION */}
            {currentStep === 4 && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    {t.report.locationLabel}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {t.report.locationHelp}
                  </p>
                </div>

                {/* Location control buttons */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={handleUseCurrentLocation}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-warm-100 hover:bg-warm-200 text-slate-800 text-xs font-semibold transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5 text-civic-700" />
                    <span>{t.report.useMyLocation}</span>
                  </button>
                  <span className="text-[11px] text-slate-500">
                    {t.report.pinOnMap}
                  </span>
                </div>

                {/* Interactive Map Picker */}
                <div className="relative">
                  <MapContainer
                    pickerMode={true}
                    pickedLocation={coordinates}
                    onLocationSelect={handleLocationSelect}
                    height="320px"
                  />
                </div>

                {geoError && (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                    <span>{geoError}</span>
                  </div>
                )}

                {/* Address and Ward Fields */}
                <div className="space-y-3 pt-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-800 block mb-1">
                        {t.report.zoneLabel}
                      </label>
                      <select
                        value={zone}
                        onChange={(e) => {
                          const z = e.target.value as AdministrativeZone;
                          setZone(z);
                          setWardOrVillage(z === 'TOWN_MUNICIPALITY' ? CMC_WARDS[0] : TALUK_AREAS[0]);
                        }}
                        className="w-full bg-warm-50 border border-warm-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                      >
                        <option value="TOWN_MUNICIPALITY">{t.report.zoneTown}</option>
                        <option value="TALUK_RURAL">{t.report.zoneTaluk}</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-800 block mb-1">
                        {t.report.wardLabel}
                      </label>
                      <select
                        value={wardOrVillage}
                        onChange={(e) => setWardOrVillage(e.target.value)}
                        className="w-full bg-warm-50 border border-warm-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                      >
                        {zone === 'TOWN_MUNICIPALITY'
                          ? CMC_WARDS.map((w) => <option key={w} value={w}>{w}</option>)
                          : TALUK_AREAS.map((a) => <option key={a} value={a}>{a}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">
                      {t.report.addressLabel} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder={t.report.addressPlaceholder}
                      className="w-full bg-warm-50 border border-warm-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">
                      {t.report.landmarkLabel}
                    </label>
                    <input
                      type="text"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      placeholder={t.report.landmarkPlaceholder}
                      className="w-full bg-warm-50 border border-warm-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="inline-flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    disabled={!canProceedFromStep4}
                    onClick={() => setCurrentStep(5)}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xs sm:text-sm shadow-md transition-all"
                  >
                    <span>Next: Review & Submit</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: REVIEW & SUBMIT */}
            {currentStep === 5 && (
              <form onSubmit={handleSubmit} className="space-y-4 animate-in fade-in duration-150">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    {t.report.reviewTitle}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Please verify your complaint details before recording.
                  </p>
                </div>

                <div className="bg-warm-50 rounded-xl p-4 border border-warm-200 space-y-3 text-xs">
                  <div className="flex justify-between items-start border-b border-warm-200 pb-2">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Category
                      </span>
                      <span className="font-bold text-slate-900">
                        {categoryOptions.find((c) => c.id === category)?.label}
                      </span>
                    </div>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      zone === 'TOWN_MUNICIPALITY' ? 'bg-amber-100 text-amber-800' : 'bg-teal-100 text-teal-800'
                    }`}>
                      {zone === 'TOWN_MUNICIPALITY' ? 'Town CMC Area' : 'Taluk Rural Area'}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Title
                    </span>
                    <span className="font-bold text-slate-900">{title}</span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Description
                    </span>
                    <p className="text-slate-700 leading-relaxed mt-0.5">{description}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-warm-200">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Ward / Village
                      </span>
                      <span className="font-medium text-slate-800">{wardOrVillage}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Street Address
                      </span>
                      <span className="font-medium text-slate-800">{address}</span>
                    </div>
                  </div>

                  {photoPreview && (
                    <div className="pt-2 border-t border-warm-200">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Attached Photo
                      </span>
                      <div className="h-24 w-36 rounded-lg overflow-hidden border border-warm-300">
                        <img src={photoPreview} alt="Attached" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Privacy and Prototype Banner */}
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="font-bold">Privacy Protected Demonstration:</span>
                    <p className="text-[11px] leading-relaxed text-amber-800">
                      {t.report.reviewWarning}
                    </p>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(4)}
                    className="inline-flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
                  >
                    {isSubmitting ? (
                      <span>{t.report.submitting}</span>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{t.report.submitButton}</span>
                      </>
                    )}
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

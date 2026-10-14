'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Complaint,
  Department,
  Official,
  NewsArticle,
  CommunityEvent,
  NoticeboardPost,
  LocalBusiness,
  LocalCreator,
  IssueStatus,
  ComplaintTimelineEntry,
  CollaborationRequest,
} from '@/types';
import { MockCivicRepository } from '@/services/repository';
import { translations, Language, Translations } from '@/lib/i18n';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
  complaints: Complaint[];
  departments: Department[];
  officials: Official[];
  news: NewsArticle[];
  events: CommunityEvent[];
  notices: NoticeboardPost[];
  businesses: LocalBusiness[];
  creators: LocalCreator[];
  stats: {
    totalComplaints: number;
    activeComplaints: number;
    resolvedComplaints: number;
    totalEvents: number;
    totalNews: number;
  };
  createComplaint: (complaintData: Omit<Complaint, 'id' | 'reportedAt' | 'updatedAt' | 'upvotes' | 'timeline' | 'isDemoRecord'>) => Complaint;
  updateComplaintStatus: (
    id: string,
    newStatus: IssueStatus,
    authorName: string,
    authorRole: ComplaintTimelineEntry['authorRole'],
    comment: string,
    evidencePhoto?: string
  ) => Complaint | null;
  upvoteComplaint: (id: string) => void;
  createNotice: (post: Omit<NoticeboardPost, 'id' | 'publishedAt' | 'moderationStatus' | 'likesCount' | 'isDemoRecord'>) => NoticeboardPost;
  recordCollabRequest: (req: Omit<CollaborationRequest, 'id' | 'createdAt' | 'status'>) => CollaborationRequest;
  resetAllDemoData: () => void;
  isNotificationsOpen: boolean;
  setIsNotificationsOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [notices, setNotices] = useState<NoticeboardPost[]>([]);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Initialize data on mount from localStorage or seed
  useEffect(() => {
    setMounted(true);
    const savedLang = localStorage.getItem('ng_demo_lang_v1') as Language;
    if (savedLang === 'en' || savedLang === 'kn') {
      setLanguageState(savedLang);
    }
    setComplaints(MockCivicRepository.getComplaints());
    setNotices(MockCivicRepository.getNoticeboard());
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('ng_demo_lang_v1', lang);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'kn' : 'en');
  };

  const createComplaint = (complaintData: Omit<Complaint, 'id' | 'reportedAt' | 'updatedAt' | 'upvotes' | 'timeline' | 'isDemoRecord'>) => {
    const created = MockCivicRepository.createComplaint(complaintData);
    setComplaints(MockCivicRepository.getComplaints());
    return created;
  };

  const updateComplaintStatus = (
    id: string,
    newStatus: IssueStatus,
    authorName: string,
    authorRole: ComplaintTimelineEntry['authorRole'],
    comment: string,
    evidencePhoto?: string
  ) => {
    const updated = MockCivicRepository.updateComplaintStatus(id, newStatus, authorName, authorRole, comment, evidencePhoto);
    if (updated) {
      setComplaints(MockCivicRepository.getComplaints());
    }
    return updated;
  };

  const upvoteComplaint = (id: string) => {
    MockCivicRepository.upvoteComplaint(id);
    setComplaints(MockCivicRepository.getComplaints());
  };

  const createNotice = (post: Omit<NoticeboardPost, 'id' | 'publishedAt' | 'moderationStatus' | 'likesCount' | 'isDemoRecord'>) => {
    const created = MockCivicRepository.createNotice(post);
    setNotices(MockCivicRepository.getNoticeboard());
    return created;
  };

  const recordCollabRequest = (req: Omit<CollaborationRequest, 'id' | 'createdAt' | 'status'>) => {
    return MockCivicRepository.recordCollabRequest(req);
  };

  const resetAllDemoData = () => {
    MockCivicRepository.resetDemoData();
    setComplaints(MockCivicRepository.getComplaints());
    setNotices(MockCivicRepository.getNoticeboard());
  };

  const currentComplaints = mounted ? complaints : MockCivicRepository.getComplaints();
  const currentNotices = mounted ? notices : MockCivicRepository.getNoticeboard();

  const activeCount = currentComplaints.filter(c => c.status !== 'RESOLVED').length;
  const resolvedCount = currentComplaints.filter(c => c.status === 'RESOLVED').length;

  const stats = {
    totalComplaints: currentComplaints.length,
    activeComplaints: activeCount,
    resolvedComplaints: resolvedCount,
    totalEvents: MockCivicRepository.getEvents().length,
    totalNews: MockCivicRepository.getNews().length,
  };

  const t = translations[language];

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        complaints: currentComplaints,
        departments: MockCivicRepository.getDepartments(),
        officials: MockCivicRepository.getOfficials(),
        news: MockCivicRepository.getNews(),
        events: MockCivicRepository.getEvents(),
        notices: currentNotices,
        businesses: MockCivicRepository.getBusinesses(),
        creators: MockCivicRepository.getCreators(),
        stats,
        createComplaint,
        updateComplaintStatus,
        upvoteComplaint,
        createNotice,
        recordCollabRequest,
        resetAllDemoData,
        isNotificationsOpen,
        setIsNotificationsOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

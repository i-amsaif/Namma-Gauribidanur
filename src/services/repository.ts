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
import { SEED_COMPLAINTS } from '@/data/complaints';
import { SEED_DEPARTMENTS } from '@/data/departments';
import { SEED_OFFICIALS } from '@/data/officials';
import { SEED_NEWS } from '@/data/news';
import { SEED_EVENTS } from '@/data/events';
import { SEED_NOTICEBOARD } from '@/data/noticeboard';
import { SEED_BUSINESSES } from '@/data/businesses';
import { SEED_CREATORS } from '@/data/creators';

const STORAGE_KEYS = {
  COMPLAINTS: 'ng_demo_complaints_v1',
  EVENTS_RSVP: 'ng_demo_rsvps_v1',
  NOTICES: 'ng_demo_notices_v1',
  COLLABS: 'ng_demo_collabs_v1',
  LANG: 'ng_demo_lang_v1',
};

// Safe localStorage helper
function safeGetItem<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.warn(`Error reading ${key} from localStorage:`, e);
    return fallback;
  }
}

function safeSetItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`Error saving ${key} to localStorage:`, e);
  }
}

export class MockCivicRepository {
  // Complaints
  static getComplaints(): Complaint[] {
    return safeGetItem<Complaint[]>(STORAGE_KEYS.COMPLAINTS, SEED_COMPLAINTS);
  }

  static getComplaintById(id: string): Complaint | undefined {
    const complaints = this.getComplaints();
    return complaints.find(c => c.id === id);
  }

  static createComplaint(complaintData: Omit<Complaint, 'id' | 'reportedAt' | 'updatedAt' | 'upvotes' | 'timeline' | 'isDemoRecord'>): Complaint {
    const current = this.getComplaints();
    const count = current.length + 101;
    const padded = String(count).padStart(6, '0');
    const newId = `GBN-DEMO-${padded}`;
    const now = new Date().toISOString();

    const initialTimeline: ComplaintTimelineEntry = {
      id: `tl-${newId}-1`,
      status: 'SUBMITTED',
      timestamp: now,
      authorRole: 'CITIZEN',
      authorName: 'Local Resident (Citizen Report)',
      comment: 'Complaint recorded in Namma Gauribidanur prototype demo database.',
    };

    const newComplaint: Complaint = {
      ...complaintData,
      id: newId,
      reportedAt: now,
      updatedAt: now,
      upvotes: 1,
      timeline: [initialTimeline],
      isDemoRecord: true,
    };

    const updated = [newComplaint, ...current];
    safeSetItem(STORAGE_KEYS.COMPLAINTS, updated);
    return newComplaint;
  }

  static updateComplaintStatus(
    id: string,
    newStatus: IssueStatus,
    authorName: string,
    authorRole: ComplaintTimelineEntry['authorRole'],
    comment: string,
    evidencePhoto?: string
  ): Complaint | null {
    const current = this.getComplaints();
    const idx = current.findIndex(c => c.id === id);
    if (idx === -1) return null;

    const target = current[idx];
    const now = new Date().toISOString();

    const newEntry: ComplaintTimelineEntry = {
      id: `tl-${id}-${target.timeline.length + 1}`,
      status: newStatus,
      timestamp: now,
      authorName,
      authorRole,
      comment,
      evidencePhoto,
    };

    const updatedComplaint: Complaint = {
      ...target,
      status: newStatus,
      updatedAt: now,
      timeline: [...target.timeline, newEntry],
    };

    current[idx] = updatedComplaint;
    safeSetItem(STORAGE_KEYS.COMPLAINTS, current);
    return updatedComplaint;
  }

  static upvoteComplaint(id: string): Complaint | null {
    const current = this.getComplaints();
    const idx = current.findIndex(c => c.id === id);
    if (idx === -1) return null;

    current[idx].upvotes += 1;
    safeSetItem(STORAGE_KEYS.COMPLAINTS, current);
    return current[idx];
  }

  // Departments & Officials (Read-only reference data in prototype with mock admin updates)
  static getDepartments(): Department[] {
    return SEED_DEPARTMENTS;
  }

  static getDepartmentById(id: string): Department | undefined {
    return SEED_DEPARTMENTS.find(d => d.id === id);
  }

  static getOfficials(): Official[] {
    return SEED_OFFICIALS;
  }

  static getOfficialById(id: string): Official | undefined {
    return SEED_OFFICIALS.find(o => o.id === id);
  }

  // News
  static getNews(): NewsArticle[] {
    return SEED_NEWS;
  }

  static getNewsById(id: string): NewsArticle | undefined {
    return SEED_NEWS.find(n => n.id === id);
  }

  // Events
  static getEvents(): CommunityEvent[] {
    return SEED_EVENTS;
  }

  static getEventById(id: string): CommunityEvent | undefined {
    return SEED_EVENTS.find(e => e.id === id);
  }

  // Noticeboard
  static getNoticeboard(): NoticeboardPost[] {
    return safeGetItem<NoticeboardPost[]>(STORAGE_KEYS.NOTICES, SEED_NOTICEBOARD);
  }

  static createNotice(post: Omit<NoticeboardPost, 'id' | 'publishedAt' | 'moderationStatus' | 'likesCount' | 'isDemoRecord'>): NoticeboardPost {
    const current = this.getNoticeboard();
    const newPost: NoticeboardPost = {
      ...post,
      id: `nb-${Date.now()}`,
      publishedAt: new Date().toISOString(),
      moderationStatus: 'APPROVED',
      likesCount: 1,
      isDemoRecord: true,
    };
    const updated = [newPost, ...current];
    safeSetItem(STORAGE_KEYS.NOTICES, updated);
    return newPost;
  }

  // Businesses
  static getBusinesses(): LocalBusiness[] {
    return SEED_BUSINESSES;
  }

  static getBusinessById(id: string): LocalBusiness | undefined {
    return SEED_BUSINESSES.find(b => b.id === id);
  }

  // Creators
  static getCreators(): LocalCreator[] {
    return SEED_CREATORS;
  }

  static recordCollabRequest(req: Omit<CollaborationRequest, 'id' | 'createdAt' | 'status'>): CollaborationRequest {
    const existing = safeGetItem<CollaborationRequest[]>(STORAGE_KEYS.COLLABS, []);
    const newReq: CollaborationRequest = {
      ...req,
      id: `collab-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'PENDING_DEMO_REVIEW',
    };
    safeSetItem(STORAGE_KEYS.COLLABS, [newReq, ...existing]);
    return newReq;
  }

  // Reset demo data
  static resetDemoData(): void {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.removeItem(STORAGE_KEYS.COMPLAINTS);
      window.localStorage.removeItem(STORAGE_KEYS.NOTICES);
      window.localStorage.removeItem(STORAGE_KEYS.COLLABS);
    } catch (e) {
      console.warn('Error resetting localStorage:', e);
    }
  }

  // Stats
  static getStats() {
    const complaints = this.getComplaints();
    const active = complaints.filter(c => c.status !== 'RESOLVED').length;
    const resolved = complaints.filter(c => c.status === 'RESOLVED').length;
    const events = this.getEvents().length;
    const news = this.getNews().length;

    return {
      totalComplaints: complaints.length,
      activeComplaints: active,
      resolvedComplaints: resolved,
      totalEvents: events,
      totalNews: news,
    };
  }
}

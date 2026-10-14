export type IssueStatus =
  | 'SUBMITTED'
  | 'UNDER_REVIEW'
  | 'FORWARDED'
  | 'IN_PROGRESS'
  | 'RESOLVED'
  | 'REOPENED';

export type IssueCategory =
  | 'GARBAGE_SANITATION'
  | 'ROADS_POTHOLES'
  | 'DRAINAGE_SEWAGE'
  | 'STREETLIGHTS'
  | 'WATER_SUPPLY'
  | 'PUBLIC_INFRASTRUCTURE'
  | 'PUBLIC_HEALTH_HOSPITAL'
  | 'TRAFFIC_TRANSPORT'
  | 'PARKS_PLAYGROUNDS'
  | 'OTHER_CIVIC';

export interface LocationCoordinates {
  lat: number;
  lng: number;
}

export type AdministrativeZone = 'TOWN_MUNICIPALITY' | 'TALUK_RURAL';

export interface ComplaintLocation {
  address: string;
  landmark?: string;
  zone: AdministrativeZone;
  wardOrVillage: string;
  coordinates: LocationCoordinates;
}

export interface ComplaintTimelineEntry {
  id: string;
  status: IssueStatus;
  timestamp: string;
  authorRole: 'CITIZEN' | 'CMC_OFFICER' | 'TALUK_ADMIN' | 'SYSTEM';
  authorName: string;
  comment: string;
  evidencePhoto?: string;
}

export interface Complaint {
  id: string; // e.g. GBN-DEMO-000101
  title: string;
  description: string;
  category: IssueCategory;
  location: ComplaintLocation;
  photoUrl?: string;
  status: IssueStatus;
  reportedAt: string;
  updatedAt: string;
  upvotes: number;
  timeline: ComplaintTimelineEntry[];
  assignedDepartmentId?: string;
  isDemoRecord: true;
}

export interface Department {
  id: string;
  name: string;
  nameKn: string;
  shortCode: string;
  jurisdiction: 'TOWN_CMC' | 'TALUK_PANCHAYAT' | 'DISTRICT_CHIKKABALLAPUR' | 'STATE_UTILITY';
  description: string;
  descriptionKn: string;
  headOfficeAddress: string;
  officialHelpline?: string;
  officialEmail?: string;
  workingHours: string;
  responsibleCategories: IssueCategory[];
  verifiedStatus: 'OFFICIALLY_VERIFIED' | 'COMMUNITY_RECORDED';
  lastVerifiedDate: string;
}

export interface Official {
  id: string;
  name: string;
  nameKn: string;
  departmentId: string;
  departmentName: string;
  designation: string;
  designationKn: string;
  responsibility: string;
  responsibilityKn: string;
  officeLocation: string;
  jurisdictionScope: string;
  publicPhone?: string;
  isPublicPhoneVerified: boolean;
  officialEmail?: string;
  verificationStatus: 'OFFICIALLY_VERIFIED' | 'COMMUNITY_RECORDED' | 'UNVERIFIED_PENDING_CONFIRMATION';
  lastVerifiedDate: string;
  sourceTraceability: string;
  isDemoRecord: boolean;
  notes?: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  titleKn: string;
  summary: string;
  summaryKn: string;
  publisher: string;
  sourceUrl: string;
  publishedAt: string;
  retrievedAt: string;
  category: 'CIVIC' | 'DEVELOPMENT' | 'SCIENCE_RESEARCH' | 'HERITAGE' | 'SAFETY' | 'LOCAL';
  language: 'en' | 'kn' | 'bilingual';
  imageUrl: string;
  imageCredit: string;
  imageLicense: string;
  geographicScope: 'GAURIBIDANUR_TOWN' | 'GAURIBIDANUR_TALUK' | 'CHIKKABALLAPUR_DISTRICT';
  sourceVerificationStatus: 'GENUINE_SOURCED_REPORT' | 'PRESS_RELEASE';
}

export interface CommunityEvent {
  id: string;
  title: string;
  titleKn: string;
  description: string;
  descriptionKn: string;
  category: 'CULTURAL' | 'CIVIC_DRIVE' | 'SPORTS' | 'HEALTH_CAMP' | 'EDUCATION' | 'HERITAGE';
  date: string;
  time: string;
  venue: string;
  area: string;
  organizer: string;
  contactNumber?: string;
  bannerUrl: string;
  status: 'UPCOMING' | 'COMPLETED' | 'CANCELLED';
  rsvpsCount: number;
  isDemoRecord: boolean;
}

export interface NoticeboardPost {
  id: string;
  authorLabel: string;
  authorArea: string;
  category: 'ANNOUNCEMENT' | 'VOLUNTEER' | 'QUESTION' | 'CIVIC_ALERT' | 'LOST_FOUND';
  title: string;
  content: string;
  publishedAt: string;
  moderationStatus: 'APPROVED' | 'PENDING_REVIEW' | 'FLAGGED';
  likesCount: number;
  isDemoRecord: boolean;
}

export interface LocalBusiness {
  id: string;
  name: string;
  nameKn: string;
  category: 'RESTAURANT_FOOD' | 'RETAIL_SHOP' | 'REPAIR_SERVICES' | 'EDUCATION_TRAINING' | 'HEALTH_WELLNESS' | 'AGRICULTURE_PRODUCE' | 'TEXTILES_HANDICRAFTS';
  area: string;
  fullAddress: string;
  description: string;
  descriptionKn: string;
  contactPhone?: string;
  whatsappContact?: string;
  openingHours: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  isVerified: boolean;
  isSponsored: boolean;
  isDemoRecord: boolean;
}

export interface LocalCreator {
  id: string;
  name: string;
  handle: string;
  category: 'LOCAL_NEWS_REPORTER' | 'FOOD_HERITAGE' | 'CIVIC_AWARENESS' | 'CULTURE_ARTS' | 'AGRICULTURE_RURAL';
  languages: ('Kannada' | 'Telugu' | 'English')[];
  serviceArea: string;
  bio: string;
  bioKn: string;
  audienceEstimate: string;
  preferredCollabs: string[];
  publicContactEmail?: string;
  verificationStatus: 'COMMUNITY_LISTED' | 'VERIFIED_CREATOR';
  avatarUrl: string;
  isDemoRecord: boolean;
}

export interface CollaborationRequest {
  id: string;
  creatorId: string;
  businessName: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  campaignDetails: string;
  proposedBudget?: string;
  createdAt: string;
  status: 'PENDING_DEMO_REVIEW' | 'FORWARDED';
}

export interface TalukBoundaryMetadata {
  name: string;
  district: string;
  state: string;
  type: 'TALUK' | 'MUNICIPALITY_CMC';
  center: LocationCoordinates;
  approximateBoundingBox: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
  disclaimer: string;
  source: string;
}

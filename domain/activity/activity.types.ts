import type { DomainImage } from '../shared/image.types';

export interface ActivityType {
  id: string;
  slug: string;
  name: string;
}

export type ActivityStatus =
  | 'scheduled'
  | 'full'
  | 'cancelled';

export type ActivityDisplayStatus = ActivityStatus | 'finished';

export type ActivityLevel =
  | 'beginner'
  | 'intermediate'
  | 'advanced'
  | 'any';

export interface ActivitySchedule {
  startDate: Date;
  endDate?: Date;
  durationMinutes?: number;
}

export interface ActivityLocation {
  name: string;
  address?: string;
  city?: string;
  province?: string;
  isOnline: boolean;
}

export interface ActivityOrganizer {
  name: string;
  organizerUrl?: string;
}

export interface ActivityParticipants {
  minParticipants?: number;
  maxParticipants?: number;
}

export interface ActivityRegistration {
  registrationUrl?: string;
}

export interface ActivityPrice {
  isFree: boolean;
  amount?: number;
}

export interface ActivityRequirements {
  minAge?: number;
  maxAge?: number;
  level?: ActivityLevel;
  requiredMaterials?: string[];
  notes?: string;
}

export interface ActivityContent {
  mainImage?: DomainImage;
  images?: DomainImage[];
}

export interface ActivityMetadata {
  cancelledAt?: Date;
  cancellationReason?: string;
}

export interface DomainActivity {
  id: string;
  slug: string;
  title: string;
  description: string;
  isSpiritActivity: boolean;
  type: ActivityType;
  status: ActivityStatus;
  schedule: ActivitySchedule;
  location: ActivityLocation;
  organizer: ActivityOrganizer;
  participants: ActivityParticipants;
  registration: ActivityRegistration;
  price: ActivityPrice;
  requirements?: ActivityRequirements;
  content?: ActivityContent;
  metadata?: ActivityMetadata;
}

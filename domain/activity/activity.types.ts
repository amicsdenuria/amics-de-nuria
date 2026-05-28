// Activity types
export type ActivityType =
  | 'esport'
  | 'gastronomia'
  | 'cultura'
  | 'musica'
  | 'natura'
  | 'jocs'
  | 'festa'
  | 'taller'
  | 'altre';

export type ActivityStatus =
  | 'agendada'
  | 'completa'
  | 'cancel·lada'
  | 'finalitzada';

export type ActivityLevel = 'iniciacio' | 'intermedi' | 'avancat' | 'qualsevol';

export interface ActivitySchedule {
  dataInici: Date;
  dataFi?: Date;
  duradaMinuts?: number;
}

export interface ActivityLocation {
  nom: string;
  adreca?: string;
  ciutat?: string;
  provincia?: string;
  esOnline: boolean;
}

export interface ActivityOrganizer {
  nom: string;
  urlOrganitzador?: string;
}

export interface ActivityParticipants {
  minimParticipants?: number;
  maximParticipants?: number;
}

export interface ActivityRegistration {
  requereixInscripcio: boolean;
  dataLimitInscripcio?: Date;
  urlInscripcio?: string;
}

export interface ActivityPricing {
  esGratuita: boolean;
  import?: number;
}

export interface ActivityRequirements {
  edatMinima?: number;
  edatMaxima?: number;
  nivell?: ActivityLevel;
  materialNecessari?: string[];
  observacions?: string;
}

export interface ActivityContent {
  imatgePrincipalUrl?: string;
  galeriaUrls?: string[];
}

export interface ActivityMetadata {
  cancelladaEl?: Date;
  motiuCancellacio?: string;
}

export interface DomainActivity {
  slug: string;
  id: string;
  titol: string;
  descripcio?: string;
  tipus: ActivityType;
  estat: ActivityStatus;
  horari: ActivitySchedule;
  ubicacio: ActivityLocation;
  organitzador: ActivityOrganizer;
  participants: ActivityParticipants;
  inscripcio: ActivityRegistration;
  preu: ActivityPricing;
  requisits?: ActivityRequirements;
  contingut?: ActivityContent;
  metadades?: ActivityMetadata;
}

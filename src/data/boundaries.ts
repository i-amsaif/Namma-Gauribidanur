import { LocationCoordinates, AdministrativeZone } from '@/types';

export const GAURIBIDANUR_TOWN_CENTER: LocationCoordinates = {
  lat: 13.6111,
  lng: 77.5170,
};

export const GAURIBIDANUR_TALUK_BOUNDS = {
  north: 13.820,
  south: 13.440,
  west: 77.360,
  east: 77.680,
};

export const GAURIBIDANUR_TOWN_BOUNDS = {
  north: 13.645,
  south: 13.585,
  west: 77.490,
  east: 77.545,
};

// Illustrative boundary polygon for Gauribidanur Town (CMC Wards Core)
export const TOWN_CMC_POLYGON: [number, number][] = [
  [13.6350, 77.5120],
  [13.6320, 77.5350],
  [13.6180, 77.5430],
  [13.5980, 77.5380],
  [13.5880, 77.5250],
  [13.5910, 77.5020],
  [13.6050, 77.4950],
  [13.6230, 77.4980],
  [13.6350, 77.5120],
];

// Illustrative boundary polygon for Gauribidanur Taluk (enclosing Kasaba, Vidurashwatha, Hosur, D-Palya, Thondebhavi, Nagaragere)
export const TALUK_POLYGON: [number, number][] = [
  [13.8050, 77.5100], // North towards Hindupur border / Nagaragere
  [13.7900, 77.5950], // North-East
  [13.7100, 77.6600], // East
  [13.5900, 77.6750], // South-East (towards Manchenahalli border)
  [13.4650, 77.6100], // South-East (towards Thondebhavi / Makalidurga foothills)
  [13.4500, 77.4900], // South (towards Doddaballapur taluk border)
  [13.4800, 77.3900], // South-West
  [13.5900, 77.3700], // West (Radio Observatory area)
  [13.7200, 77.4100], // North-West (towards Pavagada / Madhugiri border)
  [13.8050, 77.5100], // Closing loop
];

// Helper to check if point is in a polygon using ray casting algorithm
export function isPointInPolygon(point: LocationCoordinates, polygon: [number, number][]): boolean {
  const { lat, lng } = point;
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i][0], yi = polygon[i][1];
    const xj = polygon[j][0], yj = polygon[j][1];

    const intersect = ((yi > lng) !== (yj > lng))
        && (lat < (xj - xi) * (lng - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

export function validateLocation(coords: LocationCoordinates): {
  isValid: boolean;
  zone: AdministrativeZone;
  suggestedArea: string;
  message?: string;
} {
  // Check taluk bounding box first
  const inTalukBox =
    coords.lat >= GAURIBIDANUR_TALUK_BOUNDS.south &&
    coords.lat <= GAURIBIDANUR_TALUK_BOUNDS.north &&
    coords.lng >= GAURIBIDANUR_TALUK_BOUNDS.west &&
    coords.lng <= GAURIBIDANUR_TALUK_BOUNDS.east;

  if (!inTalukBox) {
    return {
      isValid: false,
      zone: 'TALUK_RURAL',
      suggestedArea: 'Outside Taluk',
      message: 'The selected coordinates fall outside Gauribidanur Taluk administrative area. Please select a point within Gauribidanur town or surrounding taluk villages.'
    };
  }

  const isTown = isPointInPolygon(coords, TOWN_CMC_POLYGON) || (
    coords.lat >= GAURIBIDANUR_TOWN_BOUNDS.south &&
    coords.lat <= GAURIBIDANUR_TOWN_BOUNDS.north &&
    coords.lng >= GAURIBIDANUR_TOWN_BOUNDS.west &&
    coords.lng <= GAURIBIDANUR_TOWN_BOUNDS.east
  );

  if (isTown) {
    return {
      isValid: true,
      zone: 'TOWN_MUNICIPALITY',
      suggestedArea: 'Gauribidanur Town (CMC Ward)',
    };
  }

  return {
    isValid: true,
    zone: 'TALUK_RURAL',
    suggestedArea: 'Gauribidanur Taluk (Rural / Gram Panchayat)',
  };
}

export const CMC_WARDS = [
  'Ward 1 - Railway Station Road',
  'Ward 2 - Vinayakanagar',
  'Ward 3 - Subhash Nagar',
  'Ward 4 - Fort Area (Kote)',
  'Ward 5 - MG Road / Market',
  'Ward 6 - Gandhi Nagar',
  'Ward 7 - Nehru Road / CMC Circle',
  'Ward 8 - Shanthi Nagar',
  'Ward 9 - Ashraya Colony',
  'Ward 10 - Old Bus Stand Road',
  'Ward 11 - Someshwara Temple Area',
  'Ward 12 - Vivekananda Extension',
  'Ward 13 - National College Circle',
  'Ward 14 - Brahmin Street',
  'Ward 15 - Gangammana Gudi Beedi',
  'Ward 16 - KEB Colony',
  'Ward 17 - APMC Market Yard',
  'Ward 18 - Ambedkar Nagar',
  'Ward 19 - Tipu Sultan Road',
  'Ward 20 - North Pennar Riverfront',
  'Ward 21 - Industrial Suburb',
  'Ward 22 - Vidurashwatha Road Cross',
  'Ward 23 - Bypass Junction',
];

export const TALUK_AREAS = [
  'Vidurashwatha (Veera Saudha & Temple)',
  'Hosur (Dr. H.N. Birthplace & Science Centre)',
  'Doddapayalagurki (D-Palya)',
  'Thondebhavi (KIADB Industrial Area)',
  'Nagaragere Hobli',
  'Kudumalakunte Industrial Area',
  'Alakapura',
  'Gedare',
  'Manchenahalli Taluk Border',
  'Kurudi',
  'Gauribidanur Radio Observatory Environs',
  'Idagur',
  'Kalludi',
  'Dinnemeedapalli',
];

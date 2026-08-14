export type DisruptionStatus =
  | 'NORMAL'
  | 'DISRUPTED'
  | 'CANCELLED'
  | 'DELAYED'
  | 'REBOOK_NEEDED'
  | 'ON_HOLD'
  | 'CONFIRMED'
  | 'COMPLETED';

export interface Flight {
  id: number;
  flightNumber: string;
  originCode: string;
  destinationCode: string;
  scheduledDeparture: string;
  scheduledArrival: string;
  status: DisruptionStatus;
  cabinClass: string;
}

export interface Passenger {
  id: number;
  firstName: string;
  lastName: string;
  type: string;
  frequentFlyerNumber: string | null;
}

export interface TripCase {
  id: number;
  pnr: string;
  originAirport: string;
  destinationAirport: string;
  viaAirport: string | null;
  status: DisruptionStatus;
  disruptionReason: string | null;
  progressPercent: number;
  passengerCount: number;
  createdAt: string;
  updatedAt: string;
  flights: Flight[];
  passengers: Passenger[];
}

export interface RebookingOption {
  id: number;
  title: string;
  optionType: string;
  flightNumber: string;
  originCode: string;
  destinationCode: string;
  viaCode: string | null;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  directFlight: boolean;
  cabinClass: string;
  priceDifference: number | null;
  seatsAvailable: number;
  tag: string | null;
  connectionQuality: string | null;
  aiRecommended: boolean;
}

export interface AuthResponse {
  token: string;
  username: string;
  role: string;
}

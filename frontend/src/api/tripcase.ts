import apiClient from './axios';
import type { TripCase, RebookingOption, AuthResponse } from '../types';

export const login = (username: string, password: string) =>
  apiClient.post<AuthResponse>('/api/auth/login', { username, password }).then((r) => r.data);

export const getTripCases = () =>
  apiClient.get<TripCase[]>('/api/trip-cases').then((r) => r.data);

export const getTripCase = (pnr: string) =>
  apiClient.get<TripCase>(`/api/trip-cases/${pnr}`).then((r) => r.data);

export const getRebookingOptions = (pnr: string) =>
  apiClient.get<RebookingOption[]>(`/api/trip-cases/${pnr}/rebooking-options`).then((r) => r.data);

export type Borough = 'Manhattan' | 'Brooklyn' | 'Queens' | 'Staten Island' | 'Bronx';

export interface ZipData {
  zip: string;
  name: string;
  aqi: number;
  pol: string;
  borough: Borough;
}

export interface HourlyData {
  label: string;
  temp: number;
  rain: number;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  intro?: boolean;
}

export interface Suggestion {
  label: string;
  onClick: () => void;
}

export type Screen = 'dashboard' | 'map' | 'compare' | 'chat';

export interface AQIInfo {
  bg: string;
  soft: string;
  text: string;
  cat: string;
  note: string;
}

export interface WeatherData {
  location: string;
  temperature: number;
  feelsLike: number;
  condition: string;
  conditionDescription: string;
  high: number;
  low: number;
  humidity: number;
}

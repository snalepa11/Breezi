import type { Intent } from "./types";

/**
 * Keywords associated with each chatbot intent.
 * Add new keywords here without changing the matching logic.
 */
const INTENT_KEYWORDS: Record<Intent, string[]> = {
  greeting: [
    "hi",
    "hello",
    "hey",
    "good morning",
    "good afternoon",
    "good evening",
  ],

  weather: [
    "weather",
    "temperature",
    "hot",
    "cold",
    "warm",
    "cool",
    "outside",
    "forecast now",
  ],

  forecast: [
    "forecast",
    "tomorrow",
    "weekend",
    "later",
    "next week",
    "tonight",
  ],

  rain: [
    "rain",
    "umbrella",
    "storm",
    "drizzle",
    "shower",
    "wet",
    "precipitation",
  ],

  exercise: [
    "run",
    "running",
    "walk",
    "walking",
    "bike",
    "cycling",
    "jog",
    "exercise",
    "workout",
    "gym",
    "hike",
    "hiking",
  ],

  activity: [
    "activity",
    "activities",
    "things to do",
    "picnic",
    "park",
    "outdoor",
    "indoor",
    "family",
  ],

  clothing: [
    "wear",
    "jacket",
    "coat",
    "hoodie",
    "clothes",
    "clothing",
    "shirt",
    "shorts",
    "pants",
    "dress",
    "sweater",
  ],

  air_quality: [
    "aqi",
    "air",
    "pollution",
    "pollutant",
    "pm2.5",
    "air quality",
    "smoke",
    "breathing",
  ],

  borough: [
    "manhattan",
    "brooklyn",
    "bronx",
    "queens",
    "staten island",
    "borough",
    "zip code",
    "zipcode",
  ],

  general: [],
};

/**
 * Determines the user's intent from their message.
 */
export function detectIntent(message: string): Intent {
  const normalized = message.toLowerCase().trim();

  for (const [intent, keywords] of Object.entries(INTENT_KEYWORDS)) {
    if (keywords.some((keyword) => normalized.includes(keyword))) {
      return intent as Intent;
    }
  }

  return "general";
}
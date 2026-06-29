import type { WeatherData } from "@/types";
import type { ChatResponse, Intent } from "./types";

import { detectIntent } from "./intents";
import { getWeatherAdvice } from "./weatherAdvice";
import { getAirQualityAdvice } from "./airQualityAdvice";
import { getClothingAdvice } from "./clothingAdvice";
import { generateActivitySuggestions } from "./activityGenerator";

interface GenerateResponseOptions {
  message: string;
  weather: WeatherData;
  aqi: number;
}

type IntentHandler = (
  weather: WeatherData,
  aqi: number
) => string;

const handlers: Record<Intent, IntentHandler> = {
  greeting: () =>
    "Hello! I'm Breezi, your weather and air quality assistant. Ask me about today's weather, air quality, clothing recommendations, or outdoor activities.",

  weather: (weather) => {
    const advice = getWeatherAdvice(weather);

    return `${advice.summary} ${advice.recommendation}${
      advice.caution ? ` ${advice.caution}` : ""
    }`;
  },

  forecast: (weather) => {
    const advice = getWeatherAdvice(weather);

    return `Current conditions: ${weather.condition}. ${advice.recommendation}`;
  },

  rain: (weather) => {
    const advice = getWeatherAdvice(weather);

    return advice.caution ||
      "No significant rain-related precautions at the moment.";
  },

  exercise: (weather, aqi) => {
    const weatherAdvice = getWeatherAdvice(weather);
    const airAdvice = getAirQualityAdvice(aqi);

    return `${weatherAdvice.recommendation} ${airAdvice.recommendation}`;
  },

  activity: (weather, aqi) => {
    const suggestions = generateActivitySuggestions(weather, aqi);

    const list =
      suggestions.outdoor.length > 0
        ? suggestions.outdoor.join(", ")
        : suggestions.indoor.join(", ");

    return `${suggestions.recommendation} Suggested activities: ${list}.`;
  },

  clothing: (weather) => {
    const advice = getClothingAdvice(weather);

    return `${advice.summary} Recommended: ${advice.recommendation.join(
      ", "
    )}${
      advice.accessory?.length
        ? `. Accessories: ${advice.accessory.join(", ")}`
        : ""
    }.`;
  },

  air_quality: (_, aqi) => {
    const advice = getAirQualityAdvice(aqi);

    return `${advice.summary} ${advice.recommendation}${
      advice.caution ? ` ${advice.caution}` : ""
    }`;
  },

  borough: () =>
    "Borough-specific air quality recommendations will be available once location-aware data is connected.",

  general: () =>
    "I'm here to help with weather, air quality, clothing recommendations, forecasts, and outdoor activity suggestions.",
};

/**
 * Main chatbot response generator.
 */
export function generateChatResponse({
  message,
  weather,
  aqi,
}: GenerateResponseOptions): ChatResponse {
  const intent = detectIntent(message);

  const handler = 
    handlers[intent] ??
    handlers.general;

  return {
    intent,
    reply: handler(weather, aqi),
  };
}
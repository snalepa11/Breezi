import type { WeatherData } from "@/types";

export interface WeatherAdvice {
  summary: string;
  recommendation: string;
  caution?: string;
}

/**
 * Generates weather-specific advice based on
 * current weather conditions.
 */
export function getWeatherAdvice(
  weather: WeatherData
): WeatherAdvice {
  const {
    temperature,
    humidity,
    condition,
  } = weather;

  let summary = "";
  let recommendation = "";
  let caution = "";

  // Temperature advice
  if (temperature >= 85) {
    summary = "It's very warm outside.";
    recommendation =
      "Stay hydrated and try to avoid strenuous outdoor activities during peak afternoon hours.";
  } else if (temperature >= 70) {
    summary = "The temperature is comfortable.";
    recommendation =
      "It's an excellent day for outdoor activities like walking, running, or visiting a park.";
  } else if (temperature >= 55) {
    summary = "The weather is cool.";
    recommendation =
      "A light jacket may be helpful if you'll be outside for an extended period.";
  } else {
    summary = "It's quite cold outside.";
    recommendation =
      "Wear warm clothing and limit prolonged exposure to the cold.";
  }

  // Weather condition advice
  switch (condition.toLowerCase()) {
    case "rain":
    case "drizzle":
    case "thunderstorm":
      caution =
        "Carry an umbrella and be cautious on wet roads and sidewalks.";
      break;

    case "snow":
      caution =
        "Wear insulated footwear and be careful of slippery surfaces.";
      break;

    case "mist":
    case "fog":
      caution =
        "Visibility may be reduced. Drive carefully and allow extra travel time.";
      break;

    case "clear":
    case "sunny":
      caution =
        "Clear skies make it a great day outdoors. Consider sunscreen if you'll be outside for long periods.";
      break;

    default:
      caution = "";
  }

  // Humidity adjustment
  if (humidity >= 80) {
    recommendation +=
      " High humidity may make it feel warmer than the actual temperature.";
  }

  return {
    summary,
    recommendation,
    caution,
  };
}
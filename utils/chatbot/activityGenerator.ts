import type { WeatherData } from "@/types";

export interface ActivitySuggestion {
  outdoor: string[];
  indoor: string[];
  recommendation: string;
}

/**
 * Generates activity suggestions based on
 * weather and air quality.
 */
export function generateActivitySuggestions(
  weather: WeatherData,
  aqi: number
): ActivitySuggestion {

  const outdoor: string[] = [];
  const indoor: string[] = [];

  let recommendation = "";

  const { temperature, condition } = weather;

  const isGoodWeather =
    temperature >= 65 &&
    temperature <= 85 &&
    ["clear", "sunny", "clouds"].includes(
      condition.toLowerCase()
    );

  const isGoodAQI = aqi <= 100;

  if (isGoodWeather && isGoodAQI) {

    outdoor.push(
      "Walking",
      "Running",
      "Cycling",
      "Picnic",
      "Photography",
      "Outdoor Yoga",
      "Dog Walking"
    );

    recommendation =
      "Conditions are excellent for outdoor activities.";

  } else {

    indoor.push(
      "Museum",
      "Library",
      "Indoor Gym",
      "Coffee Shop",
      "Movie",
      "Shopping",
      "Reading"
    );

    recommendation =
      "Indoor activities are recommended today due to current weather or air quality conditions.";
  }

  return {
    outdoor,
    indoor,
    recommendation,
  };
}
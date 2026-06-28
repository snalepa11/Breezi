import type { WeatherData } from "@/types";

export interface ClothingAdvice {
  summary: string;
  recommendation: string[];
  accessory?: string[];
}

/**
 * Generates clothing recommendations
 * based on weather conditions.
 */
export function getClothingAdvice(
  weather: WeatherData
): ClothingAdvice {
  const {
    temperature,
    humidity,
    condition,
  } = weather;

  const recommendation: string[] = [];
  const accessory: string[] = [];

  // Temperature recommendations
  if (temperature >= 85) {
    recommendation.push(
      "Lightweight t-shirt",
      "Shorts",
      "Breathable shoes"
    );

    accessory.push(
      "Sunglasses",
      "Sunscreen",
      "Water bottle"
    );

  } else if (temperature >= 70) {
    recommendation.push(
      "T-shirt",
      "Light pants or shorts",
      "Comfortable sneakers"
    );

    accessory.push(
      "Sunglasses"
    );

  } else if (temperature >= 55) {
    recommendation.push(
      "Light jacket",
      "Jeans",
      "Sneakers"
    );

  } else if (temperature >= 40) {
    recommendation.push(
      "Warm jacket",
      "Long pants",
      "Closed-toe shoes"
    );

    accessory.push(
      "Scarf"
    );

  } else {
    recommendation.push(
      "Heavy winter coat",
      "Thermal layers",
      "Gloves",
      "Warm boots"
    );

    accessory.push(
      "Beanie",
      "Scarf"
    );
  }

  // Weather condition adjustments
  switch (condition.toLowerCase()) {

    case "rain":
    case "drizzle":
    case "thunderstorm":
      accessory.push(
        "Umbrella",
        "Water-resistant jacket"
      );
      break;

    case "snow":
      accessory.push(
        "Snow boots",
        "Insulated gloves"
      );
      break;

    case "clear":
    case "sunny":
      accessory.push(
        "Sunscreen"
      );
      break;
  }

  // Humidity adjustment
  if (humidity >= 80) {
    accessory.push(
      "Stay hydrated"
    );
  }

  return {
    summary:
      "Recommended clothing based on today's weather.",
    recommendation,
    accessory,
  };
}
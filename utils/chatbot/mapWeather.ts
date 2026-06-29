import type { WeatherData } from "@/types";

export function mapWeatherData(apiData: any): WeatherData {
  return {
    location: apiData.name,
    temperature: Math.round(apiData.main.temp),
    feelsLike: Math.round(apiData.main.feels_like),
    condition: apiData.weather[0].main,
    conditionDescription: apiData.weather[0].description,
    high: Math.round(apiData.main.temp_max),
    low: Math.round(apiData.main.temp_min),
    humidity: apiData.main.humidity,
  };
}
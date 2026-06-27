"use client";

import React, { useState, useEffect } from "react";
import { HourlyData } from "@/types";
import Header from "../Layout/Header";
import HourlyStrip from "../Weather/HourlyStrip";
import RainChart from "../Weather/RainChart";
import { getAQIRecommendations } from "@/utils/weather";
import styles from "./Dashboard.module.css";

interface DashboardProps {
  hourly: HourlyData[];
  onNavigateToCompare: () => void;
}

interface WeatherData {
  temperature: number;
  feelsLike: number;
  condition: string;
  conditionDescription: string;
  high: number;
  low: number;
  humidity: number;
  location: string;
}

interface AQIData {
  aqi: number;
  category: string;
}

export default function Dashboard({
  hourly,
  onNavigateToCompare,
}: DashboardProps) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [aqiData, setAQIData] = useState<AQIData | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch weather and AQI data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch weather data
        const weatherResponse = await fetch("/api/weather");
        if (weatherResponse.ok) {
          const weatherResult = await weatherResponse.json();
          if (weatherResult.success) {
            setWeatherData(weatherResult.data);
          }
        }

        // Fetch AQI data
        const aqiResponse = await fetch("/api/aqi");
        if (aqiResponse.ok) {
          const aqiResult = await aqiResponse.json();
          if (aqiResult.success) {
            setAQIData(aqiResult.data);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Use fetched data or fallback to defaults
  const currentTemp = weatherData?.temperature;
  const feelsLike = weatherData?.feelsLike;
  const high = weatherData?.high;
  const low = weatherData?.low;
  const humidity = weatherData?.humidity;
  const condition = weatherData?.condition;
  const location = weatherData?.location;
  const currentAQI = aqiData?.aqi ?? 64;
  const aqiRecommendations = getAQIRecommendations(currentAQI);

  // Get AQI category and color based on index
  const getAQIInfo = (aqi: number) => {
    if (aqi >= 0 && aqi <= 50) {
      return {
        category: "Good",
        color: "#43b06b", // Green
        borderColor: "#43b06b",
      };
    } else if (aqi >= 51 && aqi <= 150) {
      return {
        category: "Moderate",
        color: "#e8881f", // Orange
        borderColor: "#e8be1f",
      };
    } else if (aqi >= 151 && aqi <= 300) {
      return {
        category: "Bad",
        color: "#e0632b", // Red
        borderColor: "#e0632b",
      };
    } else {
      return {
        category: "Very Bad",
        color: "#8b2e3d", // Dark red
        borderColor: "#8b2e3d",
      };
    }
  };

  const aqiInfo = getAQIInfo(currentAQI);

  return (
    <div className={styles.container}>
      <Header title="Weather & Air Quality" />

      <div className={styles.currentWeather}>
        <div className={styles.location}>{location}</div>
        <div className={styles.temperature}>{currentTemp}°</div>
        <div className={styles.icon}>
          <svg width="44" height="44" viewBox="0 0 72 72" fill="none">
            <circle cx="29" cy="25" r="12" fill="#ffce5c" />
            <path
              d="M24 53a11 11 0 0 1 .8-21.9A13 13 0 0 1 51 33a9.5 9.5 0 0 1 .4 20H24z"
              fill="#d7e6f0"
            />
          </svg>
        </div>
        <div className={styles.condition}>{condition}</div>
        <div className={styles.details}>
          H:{high}° L:{low}° · Feels {feelsLike}°
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <div className={styles.statLabel}>Rain</div>
          <div className={styles.statValue} style={{ color: "#2f93dd" }}>
            20%
          </div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statLabel}>Humidity</div>
          <div className={styles.statValue} style={{ color: "#27a8b5" }}>
            {humidity}%
          </div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statLabel}>Air</div>
          <div className={styles.statValue} style={{ color: aqiInfo.color }}>
            {currentAQI}
          </div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statLabel}>UV</div>
          <div className={styles.statValue} style={{ color: "#f5862b" }}>
            7
          </div>
        </div>
      </div>

      <div className={styles.alerts}>
        <div className={styles.alert} style={{ borderColor: "#f6862e" }}>
          <div>
            <div className={styles.alertTitle}>Severe Thunderstorm Watch</div>
            <div className={styles.alertText}>
              Damaging winds and heavy rain possible 6–9 PM tonight.
            </div>
          </div>
        </div>
        <div
          className={styles.alert}
          style={{ borderColor: aqiInfo.borderColor }}
        >
          <div>
            <div className={styles.alertTitle}>Air Quality Alert</div>
            <div className={styles.alertText}>
              <span
                className={styles.aqiHighlight}
                style={{ color: aqiInfo.color }}
              >
                AQI {currentAQI} ({aqiInfo.category})
              </span>{" "}
              — here's what you can do:
            </div>
            <ul className={styles.recommendationList}>
              {aqiRecommendations.map((rec, i) => (
                <li key={i} className={styles.recommendationItem}>
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTitle}>Rain chance today</span>
          <span className={styles.sectionPeak}>Peak 70% · 7 PM</span>
        </div>
        <RainChart hourly={hourly} />
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Next hours</div>
        <HourlyStrip hourly={hourly} />
      </div>

      <div className={styles.compareLink} onClick={onNavigateToCompare}>
        <div>
          <div className={styles.compareLinkTitle}>Compare to the past</div>
          <div className={styles.compareLinkText}>
            Today vs. the 30-year normal
          </div>
        </div>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#2f9e63"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m9 6 6 6-6 6" />
        </svg>
      </div>
    </div>
  );
}

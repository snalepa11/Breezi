'use client';

import React, { useState, useEffect } from "react";
import Header from "../Layout/Header";
import styles from "./Compare.module.css";

interface WeatherData {
  temperature: number;
  high: number;
  low: number;
  humidity: number;
}

interface AQIData {
  aqi: number;
}

export default function Compare() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [aqiData, setAQIData] = useState<AQIData | null>(null);

  // Get current date information
  const currentDate = new Date();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const currentMonth = monthNames[currentDate.getMonth()];
  const currentDay = currentDate.getDate();
  const formattedDate = `${currentMonth} ${currentDay}`;

  // Fetch weather and AQI data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch weather data
        const weatherResponse = await fetch('/api/weather');
        if (weatherResponse.ok) {
          const weatherResult = await weatherResponse.json();
          if (weatherResult.success) {
            setWeatherData(weatherResult.data);
          }
        }

        // Fetch AQI data
        const aqiResponse = await fetch('/api/aqi');
        if (aqiResponse.ok) {
          const aqiResult = await aqiResponse.json();
          if (aqiResult.success) {
            setAQIData(aqiResult.data);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Use fetched data or fallback to defaults
  const todayHigh = weatherData?.high ?? 84;
  const todayHumidity = weatherData?.humidity ?? 61;
  const todayAQI = aqiData?.aqi ?? 64;

  // Normal values (30-year average)
  const normalHigh = 81;
  const normalHumidity = 65;
  const normalAQI = 49;

  // Calculate differences
  const tempDiff = todayHigh - normalHigh;
  const humidityDiff = todayHumidity - normalHumidity;
  const aqiDiff = todayAQI - normalAQI;

  // Rain chance - static for now (would need additional API endpoint)
  const todayRain = 20;
  const normalRain = 30;
  const rainDiff = todayRain - normalRain;

  return (
    <div className={styles.container}>
      <Header
        variant="gradient"
        label="Today vs. normal"
        title={`${formattedDate} in New York`}
        subtitle="Compared with the 30-year average (1991–2020)"
      />

      <div className={styles.summary}>
        <div className={styles.summaryBadge}>
          {tempDiff > 0 ? '+' : ''}{tempDiff}°
        </div>
        <div className={styles.summaryText}>
          Today is running about <strong>{Math.abs(tempDiff)}° {tempDiff > 0 ? 'warmer' : 'cooler'}</strong> than a typical June
          26, {humidityDiff < 0 ? 'a touch drier' : 'more humid'} — {aqiDiff > 0 ? 'but with' : 'and with'} <strong>{aqiDiff > 0 ? 'worse' : 'better'} air quality</strong> than
          normal.
        </div>
      </div>

      <div className={styles.comparisonCard}>
        <div className={styles.cardHeader}>
          <div className={styles.cardTitle}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#f5862b"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M14 14V5a2 2 0 0 0-4 0v9a4 4 0 1 0 4 0z" />
            </svg>
            High temperature
          </div>
          <div className={styles.cardBadge}>
            {tempDiff > 0 ? '+' : ''}{tempDiff}° {tempDiff > 0 ? 'warmer' : 'cooler'}
          </div>
        </div>
        <div className={styles.cardValues}>
          <div>
            <div className={styles.valueLabel}>TODAY</div>
            <div className={styles.valueNumber}>{todayHigh}°</div>
          </div>
          <div>
            <div className={styles.valueLabel}>NORMAL</div>
            <div className={styles.valueNumberNormal}>{normalHigh}°</div>
          </div>
        </div>
        <div className={styles.cardBars}>
          <div
            className={styles.bar}
            style={{ width: `${Math.min((todayHigh / 100) * 100, 100)}%`, background: "#f6862e" }}
          />
          <div
            className={styles.bar}
            style={{ width: `${Math.min((normalHigh / 100) * 100, 100)}%`, background: "#c5d4df" }}
          />
        </div>
      </div>

      <div className={styles.comparisonCard}>
        <div className={styles.cardHeader}>
          <div className={styles.cardTitle}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#e8881f"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M3 13a9 9 0 0 1 18 0M3 13h18" />
            </svg>
            Air quality (AQI)
          </div>
          <div
            className={styles.cardBadge}
            style={{ color: "#e0632b", background: "#fde7dc" }}
          >
            {aqiDiff > 0 ? '+' : ''}{aqiDiff} {aqiDiff > 0 ? 'worse' : 'better'}
          </div>
        </div>
        <div className={styles.cardValues}>
          <div>
            <div className={styles.valueLabel}>TODAY</div>
            <div className={styles.valueNumber}>{todayAQI}</div>
          </div>
          <div>
            <div className={styles.valueLabel}>NORMAL</div>
            <div className={styles.valueNumberNormal}>{normalAQI}</div>
          </div>
        </div>

        <div className={styles.cardBars}>
          <div
            className={styles.bar}
            style={{ width: `${Math.min((todayAQI / 200) * 100, 100)}%`, background: "#e8881f" }}
          />
          <div
            className={styles.bar}
            style={{ width: `${Math.min((normalAQI / 200) * 100, 100)}%`, background: "#c5d4df" }}
          />
        </div>
      </div>

      <div className={styles.comparisonCard}>
        <div className={styles.cardHeader}>
          <div className={styles.cardTitle}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#27a8b5"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M12 2v1m0 18v1M4.2 4.2l.7.7m14.2 14.2.7.7M2 12h1m18 0h1M4.2 19.8l.7-.7m14.2-14.2.7-.7" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            Humidity
          </div>
          <div
            className={styles.cardBadge}
            style={{ color: "#27a8b5", background: "#e3f6f7" }}
          >
            {humidityDiff > 0 ? '+' : ''}{humidityDiff}% {humidityDiff < 0 ? 'drier' : 'more humid'}
          </div>
        </div>
        <div className={styles.cardValues}>
          <div>
            <div className={styles.valueLabel}>TODAY</div>
            <div className={styles.valueNumber}>{todayHumidity}%</div>
          </div>
          <div>
            <div className={styles.valueLabel}>NORMAL</div>
            <div className={styles.valueNumberNormal}>{normalHumidity}%</div>
          </div>
        </div>
        <div className={styles.cardBars}>
          <div
            className={styles.bar}
            style={{ width: `${todayHumidity}%`, background: "#27a8b5" }}
          />
          <div
            className={styles.bar}
            style={{ width: `${normalHumidity}%`, background: "#c5d4df" }}
          />
        </div>
      </div>

      <div className={styles.comparisonCard}>
        <div className={styles.cardHeader}>
          <div className={styles.cardTitle}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#2f93dd"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
            </svg>
            Rain chance
          </div>
          <div
            className={styles.cardBadge}
            style={{ color: "#2f93dd", background: "#e3f1f9" }}
          >
            {rainDiff > 0 ? '+' : ''}{rainDiff}% {rainDiff < 0 ? 'less' : 'more'}
          </div>
        </div>
        <div className={styles.cardValues}>
          <div>
            <div className={styles.valueLabel}>TODAY</div>
            <div className={styles.valueNumber}>{todayRain}%</div>
          </div>
          <div>
            <div className={styles.valueLabel}>NORMAL</div>
            <div className={styles.valueNumberNormal}>{normalRain}%</div>
          </div>
        </div>
        <div className={styles.cardBars}>
          <div
            className={styles.bar}
            style={{ width: `${todayRain}%`, background: "#2f93dd" }}
          />
          <div
            className={styles.bar}
            style={{ width: `${normalRain}%`, background: "#c5d4df" }}
          />
        </div>
      </div>

      <div className={styles.recordsCard}>
        <div className={styles.recordsTitle}>Records for {formattedDate}</div>
        <div className={styles.records}>
          <div className={styles.record}>
            <div className={styles.recordLabel}>Record high</div>
            <div className={styles.recordValue} style={{ color: "#e0632b" }}>
              101°
            </div>
            <div className={styles.recordYear}>1952</div>
          </div>
          <div className={styles.record}>
            <div className={styles.recordLabel}>Record low</div>
            <div className={styles.recordValue} style={{ color: "#2f93dd" }}>
              52°
            </div>
            <div className={styles.recordYear}>1979</div>
          </div>
          <div className={styles.record}>
            <div className={styles.recordLabel}>Wettest</div>
            <div className={styles.recordValue} style={{ color: "#27a8b5" }}>
              2.1 in
            </div>
            <div className={styles.recordYear}>2006</div>
          </div>
        </div>
      </div>
    </div>
  );
}

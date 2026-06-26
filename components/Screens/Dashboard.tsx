import React from "react";
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

export default function Dashboard({
  hourly,
  onNavigateToCompare,
}: DashboardProps) {
  const currentAQI = 64; // This would come from props or API in production
  const aqiRecommendations = getAQIRecommendations(currentAQI);

  return (
    <div className={styles.container}>
      <Header title="Weather & Air Quality" />

      <div className={styles.currentWeather}>
        <div className={styles.location}>New York, NY</div>
        <div className={styles.temperature}>82°</div>
        <div className={styles.icon}>
          <svg width="44" height="44" viewBox="0 0 72 72" fill="none">
            <circle cx="29" cy="25" r="12" fill="#ffce5c" />
            <path
              d="M24 53a11 11 0 0 1 .8-21.9A13 13 0 0 1 51 33a9.5 9.5 0 0 1 .4 20H24z"
              fill="#d7e6f0"
            />
          </svg>
        </div>
        <div className={styles.condition}>Partly Cloudy</div>
        <div className={styles.details}>H:84° L:69° · Feels 88°</div>
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
            61%
          </div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statLabel}>Air</div>
          <div className={styles.statValue} style={{ color: "#e8881f" }}>
            64
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
        <div className={styles.alert} style={{ borderColor: "#e8be1f" }}>
          <div>
            <div className={styles.alertTitle}>Air Quality Alert</div>
            <div className={styles.alertText}>
              <span className={styles.aqiHighlight}>AQI {currentAQI} (Moderate)</span> — here's what you can do:
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

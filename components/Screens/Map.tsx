import React, { useState, useEffect } from "react";
import { Borough } from "@/types";
import { zipsByBorough } from "@/data/zipData";
import { getAQIInfo } from "@/utils/weather";
import Header from "../Layout/Header";
import styles from "./Map.module.css";

interface MapProps {
  initialBorough?: Borough;
}

interface LiveAQIData {
  aqi: number;
  category: string;
  pollutant: string;
  reportingArea: string;
  dateObserved: string;
  hourObserved: number;
}

export default function Map({ initialBorough = "Manhattan" }: MapProps) {
  const [selectedBorough, setSelectedBorough] =
    useState<Borough>(initialBorough);
  const [selectedZip, setSelectedZip] = useState<string>("10036");
  const [mapInput, setMapInput] = useState<string>("");
  const [mapError, setMapError] = useState<string>("");
  const [liveAQIData, setLiveAQIData] = useState<LiveAQIData | null>(null);
  const [isLoadingAQI, setIsLoadingAQI] = useState<boolean>(false);

  const currentZips = zipsByBorough[selectedBorough];
  const boroughs: Borough[] = [
    "Manhattan",
    "Brooklyn",
    "Queens",
    "Staten Island",
    "Bronx",
  ];

  // Fetch live AQI data on component mount for default ZIP
  useEffect(() => {
    fetchLiveAQI(selectedZip);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchLiveAQI = async (zipCode: string) => {
    setIsLoadingAQI(true);
    setMapError("");

    try {
      const response = await fetch(`/api/aqi/airnow?zip=${zipCode}`);
      const result = await response.json();

      if (result.success) {
        setLiveAQIData(result.data);
        setMapError("");
      } else {
        // API failed, check if we have local data as fallback
        const localZip = currentZips.find((z) => z.zip === zipCode);
        if (localZip) {
          setLiveAQIData(null);
          setMapError("");
        } else {
          setLiveAQIData(null);
          setMapError(
            result.error || "No AQI data available for this ZIP code.",
          );
        }
      }
    } catch (error) {
      console.error("Error fetching AQI:", error);

      // Network error, check if we have local data as fallback
      const localZip = currentZips.find((z) => z.zip === zipCode);
      if (localZip) {
        setLiveAQIData(null);
        setMapError("");
      } else {
        setLiveAQIData(null);
        setMapError(
          "Unable to fetch AQI data. Please check your connection and try again.",
        );
      }
    } finally {
      setIsLoadingAQI(false);
    }
  };

  const searchZip = () => {
    const q = mapInput.trim();
    if (!q) return;

    // Validate ZIP code format
    if (!/^\d{5}$/.test(q)) {
      setMapError("Please enter a valid 5-digit ZIP code.");
      setLiveAQIData(null);
      return;
    }

    // Always try to fetch live data from AirNow API first
    setSelectedZip(q);
    fetchLiveAQI(q);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      searchZip();
    }
  };

  const getAQIRecommendations = (aqi: number): string[] => {
    if (aqi <= 50) {
      return ["A great day to be active outside."];
    } else if (aqi <= 100) {
      return [
        "A good day to be active outside.",
        "Sensitive individuals may experience increased symptoms — follow routine precautions.",
      ];
    } else if (aqi <= 150) {
      return [
        "Low risk for healthy people.",
        "If eyes are watering, throat is sore, or you're out of breath — take a break indoors.",
        "Sensitive individuals should avoid strenuous outdoor activity over one hour.",
      ];
    } else if (aqi <= 200) {
      return [
        "All New Yorkers should limit strenuous outdoor activity over one hour.",
        "Sensitive individuals should avoid unnecessary outdoor activities.",
        "Consider rescheduling outdoor events lasting more than one hour.",
      ];
    } else if (aqi <= 300) {
      return [
        "Reschedule or move all unnecessary activities indoors.",
        "All New Yorkers should avoid strenuous outdoor activity over one hour.",
      ];
    } else {
      return [
        "All New Yorkers should avoid unnecessary outdoor activities.",
        "High-quality masks (N95 or KN95) recommended if going outside.",
        "Monitor NYC alerts and airnow.gov for updates.",
      ];
    }
  };

  const renderMapDetail = () => {
    if (isLoadingAQI) {
      return (
        <div className={styles.detailCard}>
          <div className={styles.loadingText}>Loading live AQI data...</div>
        </div>
      );
    }

    if (mapError) {
      return (
        <div className={styles.errorCard}>
          <div className={styles.errorIcon}>!</div>
          <div className={styles.errorText}>{mapError}</div>
        </div>
      );
    }

    // Use live AQI data if available, otherwise use local data
    if (liveAQIData) {
      const inf = getAQIInfo(liveAQIData.aqi);
      const aqiRecommendations = getAQIRecommendations(liveAQIData.aqi);

      return (
        <div
          className={styles.detailCard}
          style={{ borderTop: `4px solid ${inf.bg}` }}
        >
          <div className={styles.detailHeader}>
            <div>
              <div className={styles.detailZip}>ZIP {selectedZip}</div>
              <div className={styles.detailName}>
                {liveAQIData.reportingArea}
              </div>
            </div>
            <div className={styles.detailAqi}>
              <div className={styles.detailAqiValue} style={{ color: inf.bg }}>
                {liveAQIData.aqi}
              </div>
              <div className={styles.detailAqiLabel}>AQI</div>
            </div>
          </div>
          <div
            className={styles.detailCategory}
            style={{ color: inf.text, background: inf.soft }}
          >
            {liveAQIData.category}
          </div>
          <div className={styles.detailPollutant}>
            Dominant pollutant · {liveAQIData.pollutant}
          </div>
          <div className={styles.detailNote}>{inf.note}</div>
          <div className={styles.liveDataBadge}>
            🔴 Live data from AirNow · Updated {liveAQIData.dateObserved} at{" "}
            {liveAQIData.hourObserved}:00
          </div>
          <ul className={styles.recommendationList}>
            {aqiRecommendations.map((rec, i) => (
              <li key={i} className={styles.recommendationItem}>
                <div className={styles.bulletBox} />
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    // Fallback: use local data as backup
    const z = currentZips.find((x) => x.zip === selectedZip) || currentZips[0];
    const inf = getAQIInfo(z.aqi);
    const aqiRecommendations = getAQIRecommendations(z.aqi);

    return (
      <div
        className={styles.detailCard}
        style={{ borderTop: `4px solid ${inf.bg}` }}
      >
        <div className={styles.detailHeader}>
          <div>
            <div className={styles.detailZip}>ZIP {z.zip}</div>
            <div className={styles.detailName}>{z.name}</div>
          </div>
          <div className={styles.detailAqi}>
            <div className={styles.detailAqiValue} style={{ color: inf.bg }}>
              {z.aqi}
            </div>
            <div className={styles.detailAqiLabel}>AQI</div>
          </div>
        </div>
        <div
          className={styles.detailCategory}
          style={{ color: inf.text, background: inf.soft }}
        >
          {inf.cat}
        </div>
        <div className={styles.detailPollutant}>
          Dominant pollutant · {z.pol}
        </div>
        <div className={styles.detailNote}>{inf.note}</div>
        <div className={styles.fallbackDataBadge}>
          ⚠️ Using estimated data · Live data unavailable
        </div>
        <ul className={styles.recommendationList}>
          {aqiRecommendations.map((rec, i) => (
            <li key={i} className={styles.recommendationItem}>
              <div className={styles.bulletBox} />
              <span>{rec}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <Header
        variant="gradient"
        label="Air quality map"
        title="New York City"
        subtitle="Live AQI by ZIP code · updated 2:14 PM"
      />

      <div className={styles.boroughTabs}>
        {boroughs.map((borough) => (
          <button
            key={borough}
            onClick={() => {
              setSelectedBorough(borough);
              setMapError("");
              setSelectedZip(zipsByBorough[borough][0].zip);
            }}
            className={`${styles.boroughTab} ${selectedBorough === borough ? styles.boroughTabActive : ""}`}
          >
            {borough}
          </button>
        ))}
      </div>

      <div className={styles.searchContainer}>
        <div className={styles.searchBox}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#8aa0b0"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4-4" />
          </svg>
          <input
            value={mapInput}
            onChange={(e) => setMapInput(e.target.value)}
            onKeyDown={handleKeyDown}
            inputMode="numeric"
            placeholder={`Enter a ${selectedBorough} ZIP (e.g. ${currentZips[0].zip})`}
            className={styles.searchInput}
          />
          <button onClick={searchZip} className={styles.searchButton}>
            Search
          </button>
        </div>
      </div>

      <div className={styles.detailContainer}>{renderMapDetail()}</div>

      <div className={styles.legendContainer}>
        <div className={styles.legendItem}>
          <span
            className={styles.legendColor}
            style={{ background: "#43b06b" }}
          />
          <div>
            <div className={styles.legendTitle}>Good</div>
            <div className={styles.legendRange}>0–50</div>
          </div>
        </div>
        <div className={styles.legendItem}>
          <span
            className={styles.legendColor}
            style={{ background: "#efc233" }}
          />
          <div>
            <div className={styles.legendTitle}>Moderate</div>
            <div className={styles.legendRange}>51–100</div>
          </div>
        </div>
        <div className={styles.legendItem}>
          <span
            className={styles.legendColor}
            style={{ background: "#e86b2f" }}
          />
          <div>
            <div className={styles.legendTitle}>Sensitive</div>
            <div className={styles.legendRange}>101–150</div>
          </div>
        </div>
        <div className={styles.legendItem}>
          <span
            className={styles.legendColor}
            style={{ background: "#e0563b" }}
          />
          <div>
            <div className={styles.legendTitle}>Unhealthy</div>
            <div className={styles.legendRange}>151–200+</div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Borough } from '@/types';
import { zipsByBorough } from '@/data/zipData';
import { getAQIInfo } from '@/utils/weather';
import Header from '../Layout/Header';
import styles from './Map.module.css';

interface MapProps {
  initialBorough?: Borough;
}

export default function Map({ initialBorough = 'Manhattan' }: MapProps) {
  const [selectedBorough, setSelectedBorough] = useState<Borough>(initialBorough);
  const [selectedZip, setSelectedZip] = useState<string>('10036');
  const [mapInput, setMapInput] = useState<string>('');
  const [mapError, setMapError] = useState<string>('');

  const currentZips = zipsByBorough[selectedBorough];
  const boroughs: Borough[] = ['Manhattan', 'Brooklyn', 'Queens', 'Staten Island', 'Bronx'];

  const searchZip = () => {
    const q = mapInput.trim();
    if (!q) return;

    const hit = currentZips.find((z) => z.zip === q);
    if (hit) {
      setSelectedZip(hit.zip);
      setMapError('');
    } else {
      setMapError(
        /^\d{5}$/.test(q)
          ? `ZIP ${q} isn't in our ${selectedBorough} dataset. Try one from the grid below.`
          : 'Please enter a valid 5-digit ZIP code.'
      );
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      searchZip();
    }
  };

  const getAQIRecommendations = (aqi: number): string[] => {
    if (aqi <= 50) {
      return [
        'Air quality is satisfactory',
        'Ideal for outdoor activities',
        'No health precautions needed',
      ];
    } else if (aqi <= 100) {
      return [
        'Acceptable air quality',
        'Unusually sensitive people should limit prolonged outdoor exertion',
        'Everyone else can enjoy outdoor activities',
      ];
    } else if (aqi <= 150) {
      return [
        'Unhealthy for sensitive groups',
        'People with respiratory conditions should limit outdoor exertion',
        'General public should reduce prolonged outdoor activities',
      ];
    } else if (aqi <= 200) {
      return [
        'Unhealthy air quality',
        'Everyone should limit prolonged outdoor exertion',
        'Sensitive groups should avoid outdoor activities',
        'Consider wearing a mask outdoors',
      ];
    } else if (aqi <= 300) {
      return [
        'Very unhealthy air quality',
        'Everyone should avoid prolonged outdoor exertion',
        'Stay indoors with windows closed',
        'Use air purifiers if available',
      ];
    } else {
      return [
        'Hazardous air quality',
        'Avoid all outdoor activities',
        'Remain indoors with air filtration',
        'Seek medical attention if experiencing symptoms',
      ];
    }
  };

  const renderMapDetail = () => {
    if (mapError) {
      return (
        <div className={styles.errorCard}>
          <div className={styles.errorIcon}>!</div>
          <div className={styles.errorText}>{mapError}</div>
        </div>
      );
    }

    const z = currentZips.find((x) => x.zip === selectedZip) || currentZips[0];
    const inf = getAQIInfo(z.aqi);
    const aqiRecommendations = getAQIRecommendations(z.aqi);

    return (
      <div className={styles.detailCard} style={{ borderTop: `4px solid ${inf.bg}` }}>
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
        <div className={styles.detailCategory} style={{ color: inf.text, background: inf.soft }}>
          {inf.cat}
        </div>
        <div className={styles.detailPollutant}>Dominant pollutant · {z.pol}</div>
        <div className={styles.detailNote}>{inf.note}</div>
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
      <Header variant="gradient" label="Air quality map" title="New York City" subtitle="Live AQI by ZIP code · updated 2:14 PM" />

      <div className={styles.boroughTabs}>
        {boroughs.map((borough) => (
          <button
            key={borough}
            onClick={() => {
              setSelectedBorough(borough);
              setMapError('');
              setSelectedZip(zipsByBorough[borough][0].zip);
            }}
            className={`${styles.boroughTab} ${selectedBorough === borough ? styles.boroughTabActive : ''}`}
          >
            {borough}
          </button>
        ))}
      </div>

      <div className={styles.searchContainer}>
        <div className={styles.searchBox}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8aa0b0" strokeWidth="2" strokeLinecap="round">
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
          <span className={styles.legendColor} style={{ background: '#43b06b' }} />
          <div>
            <div className={styles.legendTitle}>Good</div>
            <div className={styles.legendRange}>0–50</div>
          </div>
        </div>
        <div className={styles.legendItem}>
          <span className={styles.legendColor} style={{ background: '#efc233' }} />
          <div>
            <div className={styles.legendTitle}>Moderate</div>
            <div className={styles.legendRange}>51–100</div>
          </div>
        </div>
        <div className={styles.legendItem}>
          <span className={styles.legendColor} style={{ background: '#e0563b' }} />
          <div>
            <div className={styles.legendTitle}>Unhealthy</div>
            <div className={styles.legendRange}>100+</div>
          </div>
        </div>
      </div>
    </div>
  );
}

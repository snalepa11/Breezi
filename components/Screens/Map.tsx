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
        'A great day to be active outside.',
      ];
    } else if (aqi <= 100) {
      return [
        'A good day to be active outside.',
        'Sensitive individuals may experience increased symptoms — follow routine precautions.',
      ];
    } else if (aqi <= 150) {
      return [
        'Low risk for healthy people.',
        'If eyes are watering, throat is sore, or you\'re out of breath — take a break indoors.',
        'Sensitive individuals should avoid strenuous outdoor activity over one hour.',
      ];
    } else if (aqi <= 200) {
      return [
        'All New Yorkers should limit strenuous outdoor activity over one hour.',
        'Sensitive individuals should avoid unnecessary outdoor activities.',
        'Consider rescheduling outdoor events lasting more than one hour.',
      ];
    } else if (aqi <= 300) {
      return [
        'Reschedule or move all unnecessary activities indoors.',
        'All New Yorkers should avoid strenuous outdoor activity over one hour.',
      ];
    } else {
      return [
        'All New Yorkers should avoid unnecessary outdoor activities.',
        'High-quality masks (N95 or KN95) recommended if going outside.',
        'Monitor NYC alerts and airnow.gov for updates.',
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
          <span className={styles.legendColor} style={{ background: '#e86b2f' }} />
          <div>
            <div className={styles.legendTitle}>Sensitive</div>
            <div className={styles.legendRange}>101–150</div>
          </div>
        </div>
        <div className={styles.legendItem}>
          <span className={styles.legendColor} style={{ background: '#e0563b' }} />
          <div>
            <div className={styles.legendTitle}>Unhealthy</div>
            <div className={styles.legendRange}>151–200</div>
          </div>
        </div>
        <div className={styles.legendItem}>
          <span className={styles.legendColor} style={{ background: '#8b3fa8' }} />
          <div>
            <div className={styles.legendTitle}>Very Unhealthy</div>
            <div className={styles.legendRange}>201–300</div>
          </div>
        </div>
        <div className={styles.legendItem}>
          <span className={styles.legendColor} style={{ background: '#7e0023' }} />
          <div>
            <div className={styles.legendTitle}>Hazardous</div>
            <div className={styles.legendRange}>301+</div>
          </div>
        </div>
      </div>
    </div>
  );
}
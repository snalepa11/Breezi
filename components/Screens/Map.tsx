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
      </div>
    );
  };

  const renderHeatmap = () => {
    return (
      <div className={styles.heatmap}>
        {currentZips.map((z) => {
          const inf = getAQIInfo(z.aqi);
          const isSel = z.zip === selectedZip;
          const txt = z.aqi <= 100 && z.aqi > 50 ? '#5e4a08' : '#fff';

          return (
            <button
              key={z.zip}
              onClick={() => {
                setSelectedZip(z.zip);
                setMapError('');
              }}
              className={styles.heatmapButton}
              style={{
                border: isSel ? '2.5px solid #1c2b39' : '2px solid rgba(255,255,255,.55)',
                background: inf.bg,
                boxShadow: isSel ? '0 5px 14px rgba(20,40,60,.28)' : '0 1px 3px rgba(20,60,90,.1)',
                transform: isSel ? 'scale(1.04)' : 'none',
              }}
            >
              <div className={styles.heatmapZip} style={{ color: txt }}>
                {z.zip}
              </div>
              <div className={styles.heatmapAqi} style={{ color: txt }}>
                {z.aqi}
              </div>
            </button>
          );
        })}
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

      <div className={styles.heatmapContainer}>
        <div className={styles.heatmapTitle}>Tap a ZIP to see details</div>
        {renderHeatmap()}
      </div>
    </div>
  );
}

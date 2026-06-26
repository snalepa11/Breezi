import React from 'react';
import Header from '../Layout/Header';
import styles from './Compare.module.css';

export default function Compare() {
  return (
    <div className={styles.container}>
      <Header variant="gradient" label="Today vs. normal" title="June 26 in New York" subtitle="Compared with the 30-year average (1991–2020)" />

      <div className={styles.summary}>
        <div className={styles.summaryBadge}>+3°</div>
        <div className={styles.summaryText}>
          Today is running about <strong>3° warmer</strong> than a typical June 26, a touch drier — but with{' '}
          <strong>worse air quality</strong> than normal.
        </div>
      </div>

      <div className={styles.comparisonCard}>
        <div className={styles.cardHeader}>
          <div className={styles.cardTitle}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f5862b" strokeWidth="2" strokeLinecap="round">
              <path d="M14 14V5a2 2 0 0 0-4 0v9a4 4 0 1 0 4 0z" />
            </svg>
            High temperature
          </div>
          <div className={styles.cardBadge}>+3° warmer</div>
        </div>
        <div className={styles.cardValues}>
          <div>
            <div className={styles.valueLabel}>TODAY</div>
            <div className={styles.valueNumber}>84°</div>
          </div>
          <div>
            <div className={styles.valueLabel}>NORMAL</div>
            <div className={styles.valueNumberNormal}>81°</div>
          </div>
        </div>
        <div className={styles.cardBars}>
          <div className={styles.bar} style={{ width: '90%', background: '#f6862e' }} />
          <div className={styles.bar} style={{ width: '82%', background: '#c5d4df' }} />
        </div>
      </div>

      <div className={styles.comparisonCard}>
        <div className={styles.cardHeader}>
          <div className={styles.cardTitle}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e8881f" strokeWidth="2" strokeLinecap="round">
              <path d="M3 13a9 9 0 0 1 18 0M3 13h18" />
            </svg>
            Air quality (AQI)
          </div>
          <div className={styles.cardBadge} style={{ color: '#e0632b', background: '#fde7dc' }}>
            +15 worse
          </div>
        </div>
        <div className={styles.cardValues}>
          <div>
            <div className={styles.valueLabel}>TODAY</div>
            <div className={styles.valueNumber}>64</div>
          </div>
          <div>
            <div className={styles.valueLabel}>NORMAL</div>
            <div className={styles.valueNumberNormal}>49</div>
          </div>
        </div>
        <div className={styles.cardBars}>
          <div className={styles.bar} style={{ width: '64%', background: '#e8881f' }} />
          <div className={styles.bar} style={{ width: '49%', background: '#c5d4df' }} />
        </div>
      </div>

      <div className={styles.comparisonCard}>
        <div className={styles.cardHeader}>
          <div className={styles.cardTitle}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#27a8b5" strokeWidth="2" strokeLinecap="round">
              <path d="M12 2v1m0 18v1M4.2 4.2l.7.7m14.2 14.2.7.7M2 12h1m18 0h1M4.2 19.8l.7-.7m14.2-14.2.7-.7" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            Humidity
          </div>
          <div className={styles.cardBadge} style={{ color: '#27a8b5', background: '#e3f6f7' }}>
            -4% drier
          </div>
        </div>
        <div className={styles.cardValues}>
          <div>
            <div className={styles.valueLabel}>TODAY</div>
            <div className={styles.valueNumber}>61%</div>
          </div>
          <div>
            <div className={styles.valueLabel}>NORMAL</div>
            <div className={styles.valueNumberNormal}>65%</div>
          </div>
        </div>
        <div className={styles.cardBars}>
          <div className={styles.bar} style={{ width: '61%', background: '#27a8b5' }} />
          <div className={styles.bar} style={{ width: '65%', background: '#c5d4df' }} />
        </div>
      </div>

      <div className={styles.comparisonCard}>
        <div className={styles.cardHeader}>
          <div className={styles.cardTitle}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2f93dd" strokeWidth="2" strokeLinecap="round">
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
            </svg>
            Rain chance
          </div>
          <div className={styles.cardBadge} style={{ color: '#2f93dd', background: '#e3f1f9' }}>
            -10% less
          </div>
        </div>
        <div className={styles.cardValues}>
          <div>
            <div className={styles.valueLabel}>TODAY</div>
            <div className={styles.valueNumber}>20%</div>
          </div>
          <div>
            <div className={styles.valueLabel}>NORMAL</div>
            <div className={styles.valueNumberNormal}>30%</div>
          </div>
        </div>
        <div className={styles.cardBars}>
          <div className={styles.bar} style={{ width: '20%', background: '#2f93dd' }} />
          <div className={styles.bar} style={{ width: '30%', background: '#c5d4df' }} />
        </div>
      </div>

      <div className={styles.recordsCard}>
        <div className={styles.recordsTitle}>Records for June 26</div>
        <div className={styles.records}>
          <div className={styles.record}>
            <div className={styles.recordLabel}>Record high</div>
            <div className={styles.recordValue} style={{ color: '#e0632b' }}>
              101°
            </div>
            <div className={styles.recordYear}>1952</div>
          </div>
          <div className={styles.record}>
            <div className={styles.recordLabel}>Record low</div>
            <div className={styles.recordValue} style={{ color: '#2f93dd' }}>
              52°
            </div>
            <div className={styles.recordYear}>1979</div>
          </div>
          <div className={styles.record}>
            <div className={styles.recordLabel}>Wettest</div>
            <div className={styles.recordValue} style={{ color: '#27a8b5' }}>
              2.1 in
            </div>
            <div className={styles.recordYear}>2006</div>
          </div>
        </div>
      </div>
    </div>
  );
}

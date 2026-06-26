import React from 'react';
import { HourlyData } from '@/types';
import WeatherIcon from './WeatherIcon';
import styles from './HourlyStrip.module.css';

interface HourlyStripProps {
  hourly: HourlyData[];
}

export default function HourlyStrip({ hourly }: HourlyStripProps) {
  return (
    <div className={styles.container}>
      <div className={styles.strip}>
        {hourly.slice(0, 13).map((data, i) => (
          <div key={i} className={styles.item}>
            <div className={styles.label}>{data.label}</div>
            <WeatherIcon rain={data.rain} size={24} />
            <div className={styles.temp}>{data.temp}°</div>
            <div className={styles.rain} style={{ color: data.rain >= 30 ? '#2f93dd' : '#a9bccb' }}>
              {data.rain}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

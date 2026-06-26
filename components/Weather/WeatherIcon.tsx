import React from 'react';

interface WeatherIconProps {
  rain: number;
  size: number;
}

export default function WeatherIcon({ rain, size }: WeatherIconProps) {
  const style = { width: size, height: size, display: 'block' };

  if (rain >= 55) {
    return (
      <svg viewBox="0 0 24 24" style={style} fill="none">
        <path d="M6.5 16.5a3.5 3.5 0 0 1 .3-6.98 4.5 4.5 0 0 1 8.7.98 3.2 3.2 0 0 1 .2 6H6.5z" fill="#9fb4c5" />
        <path d="M11.5 14.5l-1.8 3.2h2.4L10.4 21" stroke="#f0a92e" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (rain >= 30) {
    return (
      <svg viewBox="0 0 24 24" style={style} fill="none">
        <path d="M6.5 14.5a3.5 3.5 0 0 1 .3-6.98 4.5 4.5 0 0 1 8.7.98 3.2 3.2 0 0 1 .2 6H6.5z" fill="#bcd0dd" />
        <line x1={9} y1={18} x2={8} y2={21} stroke="#5bb0ec" strokeWidth={1.8} strokeLinecap="round" />
        <line x1={13} y1={18} x2={12} y2={21} stroke="#5bb0ec" strokeWidth={1.8} strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" style={style} fill="none">
      <circle cx={12} cy={12} r={4.6} fill="#f5b53d" />
      {['M12 3.2v2', 'M12 18.8v2', 'M3.2 12h2', 'M18.8 12h2', 'M5.9 5.9l1.4 1.4', 'M16.7 16.7l1.4 1.4', 'M18.1 5.9L16.7 7.3', 'M7.3 16.7l-1.4 1.4'].map((d, i) => (
        <path key={i} d={d} stroke="#f5b53d" strokeWidth={1.6} strokeLinecap="round" />
      ))}
    </svg>
  );
}

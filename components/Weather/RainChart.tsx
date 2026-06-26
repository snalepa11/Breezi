import React from 'react';
import { HourlyData } from '@/types';

interface RainChartProps {
  hourly: HourlyData[];
}

export default function RainChart({ hourly }: RainChartProps) {
  const w = 338;
  const h = 150;
  const n = hourly.length;
  const padB = 20;
  const padT = 14;
  const padX = 2;
  const iw = w - 2 * padX;
  const ih = h - padB - padT;

  const xs = (i: number) => padX + (i / (n - 1)) * iw;
  const ys = (r: number) => padT + (1 - r / 100) * ih;

  const line = hourly.map((p, i) => (i ? 'L' : 'M') + xs(i).toFixed(1) + ' ' + ys(p.rain).toFixed(1)).join(' ');
  const area = line + ' L ' + xs(n - 1).toFixed(1) + ' ' + (padT + ih) + ' L ' + xs(0).toFixed(1) + ' ' + (padT + ih) + ' Z';

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} style={{ display: 'block', overflow: 'visible' }}>
      {[0, 50, 100].map((g, i) => (
        <line key={`g${i}`} x1={padX} x2={w - padX} y1={ys(g)} y2={ys(g)} stroke="#eef3f7" strokeWidth={1} />
      ))}
      <defs>
        <linearGradient id="wxRainGrad" x1={0} y1={0} x2={0} y2={1}>
          <stop offset="0%" stopColor="#5bb0ec" stopOpacity={0.42} />
          <stop offset="100%" stopColor="#5bb0ec" stopOpacity={0.02} />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#wxRainGrad)" />
      <path d={line} fill="none" stroke="#2f93dd" strokeWidth={2.4} strokeLinejoin="round" strokeLinecap="round" />
      {hourly.map((p, i) =>
        i % 4 === 0 || i === n - 1 ? (
          <text key={`l${i}`} x={xs(i)} y={h - 4} fill="#9aafc0" fontSize={8.5} textAnchor="middle" fontWeight={600}>
            {p.label}
          </text>
        ) : null
      )}
    </svg>
  );
}

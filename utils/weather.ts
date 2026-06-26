import { HourlyData, AQIInfo } from '@/types';

export function generateHourlyData(): HourlyData[] {
  const temps = [82, 84, 83, 81, 79, 77, 75, 73, 72, 71, 70, 69, 69, 68, 68, 69, 71, 74, 77, 79, 81, 82, 83, 84];
  const rains = [20, 25, 35, 50, 65, 70, 55, 40, 25, 15, 10, 5, 5, 5, 5, 5, 10, 15, 20, 20, 15, 20, 25, 30];
  const startH = 14;

  return temps.map((t, i) => {
    const h = (startH + i) % 24;
    const ap = h < 12 ? 'AM' : 'PM';
    let hh = h % 12;
    if (hh === 0) hh = 12;
    return { label: i === 0 ? 'Now' : hh + ap, temp: t, rain: rains[i] };
  });
}

export function getAQIInfo(aqi: number): AQIInfo {
  if (aqi <= 50) {
    return {
      bg: '#43b06b',
      soft: '#e3f6ea',
      text: '#1c6b3f',
      cat: 'Good',
      note: 'Air quality is satisfactory — a great time to be outside.',
    };
  }
  if (aqi <= 100) {
    return {
      bg: '#efc233',
      soft: '#fcf3d2',
      text: '#8a6a06',
      cat: 'Moderate',
      note: 'Acceptable, but unusually sensitive people should consider easing up on prolonged outdoor exertion.',
    };
  }
  return {
    bg: '#e0563b',
    soft: '#fbe2db',
    text: '#a32d16',
    cat: 'Unhealthy',
    note: 'Sensitive groups should limit time outdoors and consider a mask near heavy traffic.',
  };
}

export function getAQIRecommendations(aqi: number): string[] {
  if (aqi <= 50) {
    // Good Air Quality
    return [
      '🌞 Soak up some vitamin D',
      '🏃 Great conditions for a run or bike ride',
      '🚶 Take your lunch outside',
      '🏋️ Move your workout outside',
      '🛝 Visit a playground',
    ];
  }
  if (aqi <= 100) {
    // Moderate Air Quality
    return [
      '🚶 Enjoy a casual walk instead of an intense workout',
      '🌬️ Most people can enjoy outdoor activities as usual',
      '❤️ If you have asthma or other respiratory conditions, pay attention to how you feel',
      '🛝 Kids can enjoy the playground, but take breaks if they\'re very active',
      '🎨 Try an indoor creative activity',
    ];
  }
  // Unhealthy Air Quality
  return [
    '🏠 Limit time outdoors when possible',
    '🌳 Postpone hikes, long walks, or outdoor sports',
    '🌬️ Run an air purifier if you have one',
    '❤️ People with asthma, heart disease, older adults, children, and pregnant individuals should take extra precautions',
    '🎲 Build a blanket fort or play board games',
  ];
}

export function getWeatherContext(hourly: HourlyData[]): string {
  const peak = hourly.reduce((a, b) => (b.rain > a.rain ? b : a), hourly[0]);
  return [
    'You are the in-app weather assistant for a mobile weather app. Location: New York, NY. Use Fahrenheit. Be warm, concise (usually 1-3 short sentences), and practical. Only answer weather, air-quality, and outdoor-activity questions; if asked something off-topic, gently steer back to the weather.',
    "Current conditions right now (2:14 PM): 82F, feels like 88F, Partly Cloudy. Today's high 84F, low 69F.",
    `Chance of rain now: 20%. A line of storms is likely this evening - rain chance peaks around ${peak.rain}% near ${peak.label}, with a Severe Thunderstorm Watch in effect 6-9 PM (gusty winds, heavy downpours possible).`,
    'Humidity 61%. Wind 8 mph SW. UV index 7 (High). Air Quality Index 64 - Moderate (PM2.5); an Air Quality Alert is active for unusually sensitive groups.',
    'Compared with the 30-year average for June 26: about 3F warmer than normal, slightly less humid, and air quality somewhat worse than typical.',
    `Hourly rain chance for the next hours: ${hourly
      .slice(0, 14)
      .map((h) => h.label + ' ' + h.rain + '%')
      .join(', ')}.`,
  ].join('\n');
}

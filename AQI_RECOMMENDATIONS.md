# Air Quality Recommendations

## Overview
The Dashboard now displays dynamic, actionable recommendations based on the current Air Quality Index (AQI) level.

## Implementation

### Location
- Component: `components/Screens/Dashboard.tsx`
- Utility Function: `utils/weather.ts` → `getAQIRecommendations(aqi: number)`
- Styles: `components/Screens/Dashboard.module.css`

### How It Works
The `getAQIRecommendations` function takes the current AQI value and returns an array of emoji-prefixed recommendations based on three tiers:

## AQI Tiers & Recommendations

### Good Air Quality (AQI 0-50)
Perfect conditions for outdoor activities!

- 🌞 Soak up some vitamin D
- 🏃 Great conditions for a run or bike ride
- 🚶 Take your lunch outside
- 🏋️ Move your workout outside
- 🛝 Visit a playground

### Moderate Air Quality (AQI 51-100)
Generally acceptable, with some caution for sensitive groups.

- 🚶 Enjoy a casual walk instead of an intense workout
- 🌬️ Most people can enjoy outdoor activities as usual
- ❤️ If you have asthma or other respiratory conditions, pay attention to how you feel
- 🛝 Kids can enjoy the playground, but take breaks if they're very active
- 🎨 Try an indoor creative activity

### Unhealthy Air Quality (AQI 101+)
Time to limit outdoor exposure.

- 🏠 Limit time outdoors when possible
- 🌳 Postpone hikes, long walks, or outdoor sports
- 🌬️ Run an air purifier if you have one
- ❤️ People with asthma, heart disease, older adults, children, and pregnant individuals should take extra precautions
- 🎲 Build a blanket fort or play board games

## User Experience

The recommendations appear as bullet points within the "Air Quality Alert" section on the Dashboard screen. Each recommendation is:
- Prefixed with a relevant emoji for visual appeal
- Written in friendly, actionable language
- Dynamically updated based on current AQI

## Future Enhancements

To make this fully dynamic in production:

1. **Connect to Real AQI Data**
   ```typescript
   // Instead of hardcoded value
   const currentAQI = 64;
   
   // Use API data
   const currentAQI = await fetchCurrentAQI();
   ```

2. **Add AQI Props**
   ```typescript
   interface DashboardProps {
     hourly: HourlyData[];
     onNavigateToCompare: () => void;
     currentAQI: number; // Add this
   }
   ```

3. **Real-time Updates**
   - Fetch AQI data every 30-60 minutes
   - Display last updated timestamp
   - Show trending indicator (improving/worsening)

## Testing Different AQI Levels

To test different recommendation sets, change the `currentAQI` value in Dashboard.tsx:

```typescript
// Line 18 in Dashboard.tsx
const currentAQI = 64;  // Change this value

// Try:
const currentAQI = 35;  // See "Good" recommendations
const currentAQI = 75;  // See "Moderate" recommendations  
const currentAQI = 120; // See "Unhealthy" recommendations
```

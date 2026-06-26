# Breezi Weather App

A Next.js weather application for New York City with air quality monitoring across all five boroughs.

## Features

- **Dashboard**: Current weather conditions, hourly forecast, and rain predictions
- **Map**: Interactive air quality map with borough selection (Manhattan, Brooklyn, Queens, Bronx, Staten Island)
- **Compare**: Historical weather comparisons with 30-year averages
- **Chat**: AI weather assistant for personalized weather advice

## Project Structure

```
Breezi/
├── app/                      # Next.js app directory
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Main app page
│   ├── globals.css          # Global styles
│   └── page.module.css      # Page-specific styles
├── components/
│   ├── Layout/              # Layout components
│   │   ├── StatusBar.tsx
│   │   └── TabBar.tsx
│   ├── Screens/             # Screen components
│   │   ├── Dashboard.tsx
│   │   ├── Map.tsx          # With borough dropdown tabs
│   │   ├── Compare.tsx
│   │   └── Chat.tsx
│   └── Weather/             # Weather-specific components
│       ├── HourlyStrip.tsx
│       ├── RainChart.tsx
│       └── WeatherIcon.tsx
├── data/
│   └── zipData.ts           # ZIP code data organized by borough
├── types/
│   └── index.ts             # TypeScript type definitions
├── utils/
│   └── weather.ts           # Weather utility functions
├── package.json
├── tsconfig.json
└── next.config.js
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Key Features Implemented

### Borough Selection on Map Page
The Map screen now includes horizontal tabs at the top for selecting different NYC boroughs:
- Manhattan (default)
- Brooklyn
- Queens
- Staten Island
- Bronx

Each borough displays its own ZIP codes with live AQI (Air Quality Index) data.

### Technologies Used
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe code
- **CSS Modules**: Scoped component styling
- **React Hooks**: State management

## Development

### Build for Production
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## Data Structure

ZIP code data is organized by borough in `data/zipData.ts`. Each entry includes:
- `zip`: ZIP code
- `name`: Neighborhood name
- `aqi`: Air Quality Index
- `pol`: Dominant pollutant
- `borough`: Borough name

## Future Enhancements

- Connect to real weather API
- Implement actual AI chat functionality
- Add user location detection
- Real-time AQI updates
- Weather alerts and notifications
- Historical data trends
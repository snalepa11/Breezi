import { ZipData } from '@/types';

// Uptown Manhattan
const uptownManhattan: ZipData[] = [
  { zip: '10034', name: 'Inwood', aqi: 41, pol: 'PM2.5', borough: 'Manhattan' },
  { zip: '10040', name: 'Washington Heights', aqi: 44, pol: 'PM2.5', borough: 'Manhattan' },
  { zip: '10033', name: 'Washington Heights', aqi: 48, pol: 'PM2.5', borough: 'Manhattan' },
  { zip: '10032', name: 'Hamilton Heights', aqi: 53, pol: 'O3', borough: 'Manhattan' },
  { zip: '10031', name: 'Hamilton Heights', aqi: 56, pol: 'O3', borough: 'Manhattan' },
  { zip: '10027', name: 'Morningside Heights', aqi: 59, pol: 'O3', borough: 'Manhattan' },
  { zip: '10026', name: 'Harlem', aqi: 64, pol: 'PM2.5', borough: 'Manhattan' },
  { zip: '10029', name: 'East Harlem', aqi: 73, pol: 'PM2.5', borough: 'Manhattan' },
  { zip: '10025', name: 'Upper West Side', aqi: 49, pol: 'PM2.5', borough: 'Manhattan' },
  { zip: '10024', name: 'Upper West Side', aqi: 46, pol: 'PM2.5', borough: 'Manhattan' },
  { zip: '10128', name: 'Upper East Side', aqi: 61, pol: 'O3', borough: 'Manhattan' },
  { zip: '10028', name: 'Upper East Side', aqi: 64, pol: 'O3', borough: 'Manhattan' },
];

// Midtown Manhattan
const midtownManhattan: ZipData[] = [
  { zip: '10023', name: 'Lincoln Square', aqi: 57, pol: 'PM2.5', borough: 'Manhattan' },
  { zip: '10019', name: "Hell's Kitchen", aqi: 84, pol: 'PM2.5', borough: 'Manhattan' },
  { zip: '10036', name: 'Times Square', aqi: 104, pol: 'PM2.5', borough: 'Manhattan' },
  { zip: '10018', name: 'Garment District', aqi: 97, pol: 'PM2.5', borough: 'Manhattan' },
  { zip: '10017', name: 'Murray Hill', aqi: 88, pol: 'O3', borough: 'Manhattan' },
  { zip: '10016', name: 'Kips Bay', aqi: 81, pol: 'O3', borough: 'Manhattan' },
];

// Downtown Manhattan
const downtownManhattan: ZipData[] = [
  { zip: '10001', name: 'Chelsea', aqi: 92, pol: 'PM2.5', borough: 'Manhattan' },
  { zip: '10011', name: 'West Chelsea', aqi: 74, pol: 'PM2.5', borough: 'Manhattan' },
  { zip: '10010', name: 'Flatiron', aqi: 86, pol: 'O3', borough: 'Manhattan' },
  { zip: '10003', name: 'East Village', aqi: 69, pol: 'O3', borough: 'Manhattan' },
  { zip: '10009', name: 'Alphabet City', aqi: 67, pol: 'O3', borough: 'Manhattan' },
  { zip: '10014', name: 'West Village', aqi: 59, pol: 'PM2.5', borough: 'Manhattan' },
  { zip: '10012', name: 'NoHo', aqi: 71, pol: 'O3', borough: 'Manhattan' },
  { zip: '10013', name: 'SoHo / Canal', aqi: 108, pol: 'PM2.5', borough: 'Manhattan' },
  { zip: '10002', name: 'Lower East Side', aqi: 96, pol: 'PM2.5', borough: 'Manhattan' },
  { zip: '10007', name: 'Tribeca', aqi: 76, pol: 'PM2.5', borough: 'Manhattan' },
  { zip: '10038', name: 'Seaport', aqi: 83, pol: 'O3', borough: 'Manhattan' },
  { zip: '10005', name: 'Financial District', aqi: 90, pol: 'PM2.5', borough: 'Manhattan' },
  { zip: '10004', name: 'Battery Park', aqi: 64, pol: 'PM2.5', borough: 'Manhattan' },
  { zip: '10280', name: 'Battery Park City', aqi: 54, pol: 'PM2.5', borough: 'Manhattan' },
];

// Brooklyn (sample data)
const brooklyn: ZipData[] = [
  { zip: '11201', name: 'Brooklyn Heights', aqi: 52, pol: 'PM2.5', borough: 'Brooklyn' },
  { zip: '11215', name: 'Park Slope', aqi: 48, pol: 'O3', borough: 'Brooklyn' },
  { zip: '11211', name: 'Williamsburg', aqi: 63, pol: 'PM2.5', borough: 'Brooklyn' },
];

// Queens (sample data)
const queens: ZipData[] = [
  { zip: '11101', name: 'Long Island City', aqi: 58, pol: 'PM2.5', borough: 'Queens' },
  { zip: '11354', name: 'Flushing', aqi: 55, pol: 'O3', borough: 'Queens' },
  { zip: '11375', name: 'Forest Hills', aqi: 51, pol: 'PM2.5', borough: 'Queens' },
];

// Bronx (sample data)
const bronx: ZipData[] = [
  { zip: '10451', name: 'Concourse', aqi: 62, pol: 'PM2.5', borough: 'Bronx' },
  { zip: '10458', name: 'Fordham', aqi: 57, pol: 'O3', borough: 'Bronx' },
  { zip: '10461', name: 'Pelham Bay', aqi: 49, pol: 'PM2.5', borough: 'Bronx' },
];

// Staten Island (sample data)
const statenIsland: ZipData[] = [
  { zip: '10301', name: 'St. George', aqi: 45, pol: 'PM2.5', borough: 'Staten Island' },
  { zip: '10314', name: 'Westerleigh', aqi: 42, pol: 'O3', borough: 'Staten Island' },
  { zip: '10306', name: 'New Dorp', aqi: 47, pol: 'PM2.5', borough: 'Staten Island' },
];

export const allZips: ZipData[] = [
  ...uptownManhattan,
  ...midtownManhattan,
  ...downtownManhattan,
  ...brooklyn,
  ...queens,
  ...bronx,
  ...statenIsland,
];

export const zipsByBorough = {
  Manhattan: [...uptownManhattan, ...midtownManhattan, ...downtownManhattan],
  Brooklyn: brooklyn,
  Queens: queens,
  Bronx: bronx,
  'Staten Island': statenIsland,
};

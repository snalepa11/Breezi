import { ZipData } from '@/types';

// Uptown Manhattan
const uptownManhattan: ZipData[] = [
  { zip: '10034', name: 'Inwood', aqi: 51, pol: 'PM2.5', borough: 'Manhattan' },
  { zip: '10040', name: 'Washington Heights', aqi: 52, pol: 'PM2.5', borough: 'Manhattan' },
  { zip: '10033', name: 'Washington Heights', aqi: 53, pol: 'PM2.5', borough: 'Manhattan' },
  { zip: '10032', name: 'Hamilton Heights', aqi: 54, pol: 'O3', borough: 'Manhattan' },
  { zip: '10031', name: 'Hamilton Heights', aqi: 55, pol: 'O3', borough: 'Manhattan' },
  { zip: '10027', name: 'Morningside Heights', aqi: 54, pol: 'O3', borough: 'Manhattan' },
  { zip: '10026', name: 'Harlem', aqi: 55, pol: 'PM2.5', borough: 'Manhattan' },
  { zip: '10029', name: 'East Harlem', aqi: 57, pol: 'PM2.5', borough: 'Manhattan' },
  { zip: '10025', name: 'Upper West Side', aqi: 53, pol: 'PM2.5', borough: 'Manhattan' },
  { zip: '10024', name: 'Upper West Side', aqi: 52, pol: 'PM2.5', borough: 'Manhattan' },
  { zip: '10128', name: 'Upper East Side', aqi: 54, pol: 'O3', borough: 'Manhattan' },
  { zip: '10028', name: 'Upper East Side', aqi: 55, pol: 'O3', borough: 'Manhattan' },
];

// Midtown Manhattan
const midtownManhattan: ZipData[] = [
  { zip: '10023', name: 'Lincoln Square', aqi: 55, pol: 'PM2.5', borough: 'Manhattan' },
  { zip: '10019', name: "Hell's Kitchen", aqi: 56, pol: 'PM2.5', borough: 'Manhattan' },
  { zip: '10036', name: 'Times Square', aqi: 54, pol: 'PM2.5', borough: 'Manhattan' },
  { zip: '10018', name: 'Garment District', aqi: 57, pol: 'PM2.5', borough: 'Manhattan' },
  { zip: '10017', name: 'Murray Hill', aqi: 55, pol: 'O3', borough: 'Manhattan' },
  { zip: '10016', name: 'Kips Bay', aqi: 54, pol: 'O3', borough: 'Manhattan' },
];

// Downtown Manhattan
const downtownManhattan: ZipData[] = [
  { zip: '10001', name: 'Chelsea', aqi: 54, pol: 'PM2.5', borough: 'Manhattan' },
  { zip: '10011', name: 'West Chelsea', aqi: 53, pol: 'PM2.5', borough: 'Manhattan' },
  { zip: '10010', name: 'Flatiron', aqi: 55, pol: 'O3', borough: 'Manhattan' },
  { zip: '10003', name: 'East Village', aqi: 54, pol: 'O3', borough: 'Manhattan' },
  { zip: '10009', name: 'Alphabet City', aqi: 56, pol: 'O3', borough: 'Manhattan' },
  { zip: '10014', name: 'West Village', aqi: 53, pol: 'PM2.5', borough: 'Manhattan' },
  { zip: '10012', name: 'NoHo', aqi: 55, pol: 'O3', borough: 'Manhattan' },
  { zip: '10013', name: 'SoHo / Canal', aqi: 58, pol: 'PM2.5', borough: 'Manhattan' },
  { zip: '10002', name: 'Lower East Side', aqi: 57, pol: 'PM2.5', borough: 'Manhattan' },
  { zip: '10007', name: 'Tribeca', aqi: 53, pol: 'PM2.5', borough: 'Manhattan' },
  { zip: '10038', name: 'Seaport', aqi: 54, pol: 'O3', borough: 'Manhattan' },
  { zip: '10005', name: 'Financial District', aqi: 55, pol: 'PM2.5', borough: 'Manhattan' },
  { zip: '10004', name: 'Battery Park', aqi: 53, pol: 'PM2.5', borough: 'Manhattan' },
  { zip: '10280', name: 'Battery Park City', aqi: 52, pol: 'PM2.5', borough: 'Manhattan' },
];

// Brooklyn
const brooklyn: ZipData[] = [
  { zip: '11201', name: 'Brooklyn Heights', aqi: 55, pol: 'PM2.5', borough: 'Brooklyn' },
  { zip: '11215', name: 'Park Slope', aqi: 53, pol: 'O3', borough: 'Brooklyn' },
  { zip: '11211', name: 'Williamsburg', aqi: 57, pol: 'PM2.5', borough: 'Brooklyn' },
];

// Queens
const queens: ZipData[] = [
  { zip: '11101', name: 'Long Island City', aqi: 56, pol: 'PM2.5', borough: 'Queens' },
  { zip: '11354', name: 'Flushing', aqi: 55, pol: 'O3', borough: 'Queens' },
  { zip: '11375', name: 'Forest Hills', aqi: 53, pol: 'PM2.5', borough: 'Queens' },
];

// Bronx
const bronx: ZipData[] = [
  { zip: '10451', name: 'Concourse', aqi: 57, pol: 'PM2.5', borough: 'Bronx' },
  { zip: '10458', name: 'Fordham', aqi: 56, pol: 'O3', borough: 'Bronx' },
  { zip: '10461', name: 'Pelham Bay', aqi: 54, pol: 'PM2.5', borough: 'Bronx' },
];

// Staten Island
const statenIsland: ZipData[] = [
  { zip: '10301', name: 'St. George', aqi: 53, pol: 'PM2.5', borough: 'Staten Island' },
  { zip: '10314', name: 'Westerleigh', aqi: 52, pol: 'O3', borough: 'Staten Island' },
  { zip: '10306', name: 'New Dorp', aqi: 54, pol: 'PM2.5', borough: 'Staten Island' },
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
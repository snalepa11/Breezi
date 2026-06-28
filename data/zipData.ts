import { ZipData } from '@/types';

// Manhattan - Complete ZIP codes
const manhattan: ZipData[] = [
  // Upper Manhattan
  { zip: '10034', name: 'Inwood', aqi: 51, pol: 'PM2.5', borough: 'Manhattan' },
  { zip: '10040', name: 'Washington Heights', aqi: 52, pol: 'PM2.5', borough: 'Manhattan' },
  { zip: '10033', name: 'Washington Heights', aqi: 53, pol: 'PM2.5', borough: 'Manhattan' },
  { zip: '10032', name: 'Hamilton Heights', aqi: 54, pol: 'O3', borough: 'Manhattan' },
  { zip: '10031', name: 'Hamilton Heights', aqi: 55, pol: 'O3', borough: 'Manhattan' },
  { zip: '10030', name: 'Central Harlem', aqi: 56, pol: 'PM2.5', borough: 'Manhattan' },
  { zip: '10027', name: 'Morningside Heights', aqi: 54, pol: 'O3', borough: 'Manhattan' },
  { zip: '10026', name: 'Central Harlem', aqi: 55, pol: 'PM2.5', borough: 'Manhattan' },
  { zip: '10037', name: 'East Harlem', aqi: 58, pol: 'PM2.5', borough: 'Manhattan' },
  { zip: '10035', name: 'East Harlem', aqi: 57, pol: 'PM2.5', borough: 'Manhattan' },
  { zip: '10029', name: 'East Harlem', aqi: 57, pol: 'PM2.5', borough: 'Manhattan' },

  // Upper West & East Side
  { zip: '10025', name: 'Upper West Side', aqi: 53, pol: 'PM2.5', borough: 'Manhattan' },
  { zip: '10024', name: 'Upper West Side', aqi: 52, pol: 'PM2.5', borough: 'Manhattan' },
  { zip: '10023', name: 'Lincoln Square', aqi: 55, pol: 'PM2.5', borough: 'Manhattan' },
  { zip: '10069', name: 'Lincoln Square', aqi: 54, pol: 'PM2.5', borough: 'Manhattan' },
  { zip: '10128', name: 'Upper East Side', aqi: 54, pol: 'O3', borough: 'Manhattan' },
  { zip: '10028', name: 'Upper East Side', aqi: 55, pol: 'O3', borough: 'Manhattan' },
  { zip: '10021', name: 'Upper East Side', aqi: 53, pol: 'O3', borough: 'Manhattan' },
  { zip: '10075', name: 'Upper East Side', aqi: 52, pol: 'O3', borough: 'Manhattan' },
  { zip: '10065', name: 'Upper East Side', aqi: 54, pol: 'O3', borough: 'Manhattan' },

  // Midtown
  { zip: '10019', name: "Hell's Kitchen", aqi: 56, pol: 'PM2.5', borough: 'Manhattan' },
  { zip: '10036', name: 'Times Square', aqi: 54, pol: 'PM2.5', borough: 'Manhattan' },
  { zip: '10018', name: 'Garment District', aqi: 57, pol: 'PM2.5', borough: 'Manhattan' },
  { zip: '10020', name: 'Rockefeller Center', aqi: 55, pol: 'PM2.5', borough: 'Manhattan' },
  { zip: '10022', name: 'Midtown East', aqi: 54, pol: 'O3', borough: 'Manhattan' },
  { zip: '10017', name: 'Murray Hill', aqi: 55, pol: 'O3', borough: 'Manhattan' },
  { zip: '10016', name: 'Kips Bay', aqi: 54, pol: 'O3', borough: 'Manhattan' },

  // Chelsea & Gramercy
  { zip: '10001', name: 'Chelsea', aqi: 54, pol: 'PM2.5', borough: 'Manhattan' },
  { zip: '10011', name: 'West Chelsea', aqi: 53, pol: 'PM2.5', borough: 'Manhattan' },
  { zip: '10010', name: 'Flatiron', aqi: 55, pol: 'O3', borough: 'Manhattan' },

  // Greenwich Village & East Village
  { zip: '10014', name: 'West Village', aqi: 53, pol: 'PM2.5', borough: 'Manhattan' },
  { zip: '10012', name: 'NoHo', aqi: 55, pol: 'O3', borough: 'Manhattan' },
  { zip: '10003', name: 'East Village', aqi: 54, pol: 'O3', borough: 'Manhattan' },
  { zip: '10009', name: 'Alphabet City', aqi: 56, pol: 'O3', borough: 'Manhattan' },

  // Lower Manhattan
  { zip: '10013', name: 'SoHo / Tribeca', aqi: 58, pol: 'PM2.5', borough: 'Manhattan' },
  { zip: '10002', name: 'Lower East Side', aqi: 57, pol: 'PM2.5', borough: 'Manhattan' },
  { zip: '10007', name: 'Tribeca', aqi: 53, pol: 'PM2.5', borough: 'Manhattan' },
  { zip: '10006', name: 'Financial District', aqi: 54, pol: 'PM2.5', borough: 'Manhattan' },
  { zip: '10005', name: 'Financial District', aqi: 55, pol: 'PM2.5', borough: 'Manhattan' },
  { zip: '10004', name: 'Battery Park', aqi: 53, pol: 'PM2.5', borough: 'Manhattan' },
  { zip: '10038', name: 'Seaport', aqi: 54, pol: 'O3', borough: 'Manhattan' },
  { zip: '10280', name: 'Battery Park City', aqi: 52, pol: 'PM2.5', borough: 'Manhattan' },
];

// Brooklyn - Complete ZIP codes
const brooklyn: ZipData[] = [
  // Northwest Brooklyn
  { zip: '11201', name: 'Brooklyn Heights', aqi: 55, pol: 'PM2.5', borough: 'Brooklyn' },
  { zip: '11205', name: 'Fort Greene', aqi: 56, pol: 'PM2.5', borough: 'Brooklyn' },
  { zip: '11206', name: 'Williamsburg', aqi: 58, pol: 'PM2.5', borough: 'Brooklyn' },
  { zip: '11211', name: 'Williamsburg', aqi: 57, pol: 'PM2.5', borough: 'Brooklyn' },
  { zip: '11222', name: 'Greenpoint', aqi: 56, pol: 'PM2.5', borough: 'Brooklyn' },
  { zip: '11249', name: 'Williamsburg', aqi: 57, pol: 'PM2.5', borough: 'Brooklyn' },

  // North Brooklyn
  { zip: '11237', name: 'Bushwick', aqi: 59, pol: 'PM2.5', borough: 'Brooklyn' },
  { zip: '11221', name: 'Bushwick', aqi: 58, pol: 'PM2.5', borough: 'Brooklyn' },
  { zip: '11207', name: 'East New York', aqi: 60, pol: 'PM2.5', borough: 'Brooklyn' },
  { zip: '11208', name: 'East New York', aqi: 59, pol: 'PM2.5', borough: 'Brooklyn' },

  // Central Brooklyn
  { zip: '11213', name: 'Crown Heights', aqi: 57, pol: 'PM2.5', borough: 'Brooklyn' },
  { zip: '11216', name: 'Crown Heights', aqi: 56, pol: 'PM2.5', borough: 'Brooklyn' },
  { zip: '11225', name: 'Crown Heights', aqi: 57, pol: 'O3', borough: 'Brooklyn' },
  { zip: '11226', name: 'Flatbush', aqi: 56, pol: 'PM2.5', borough: 'Brooklyn' },
  { zip: '11230', name: 'Midwood', aqi: 55, pol: 'O3', borough: 'Brooklyn' },
  { zip: '11210', name: 'Flatlands', aqi: 56, pol: 'PM2.5', borough: 'Brooklyn' },
  { zip: '11203', name: 'East Flatbush', aqi: 57, pol: 'PM2.5', borough: 'Brooklyn' },
  { zip: '11212', name: 'Brownsville', aqi: 59, pol: 'PM2.5', borough: 'Brooklyn' },

  // South Brooklyn
  { zip: '11215', name: 'Park Slope', aqi: 53, pol: 'O3', borough: 'Brooklyn' },
  { zip: '11217', name: 'Park Slope', aqi: 54, pol: 'O3', borough: 'Brooklyn' },
  { zip: '11231', name: 'Carroll Gardens', aqi: 55, pol: 'PM2.5', borough: 'Brooklyn' },
  { zip: '11232', name: 'Sunset Park', aqi: 58, pol: 'PM2.5', borough: 'Brooklyn' },
  { zip: '11220', name: 'Sunset Park', aqi: 57, pol: 'PM2.5', borough: 'Brooklyn' },
  { zip: '11218', name: 'Kensington', aqi: 55, pol: 'PM2.5', borough: 'Brooklyn' },
  { zip: '11219', name: 'Borough Park', aqi: 56, pol: 'PM2.5', borough: 'Brooklyn' },
  { zip: '11204', name: 'Bensonhurst', aqi: 55, pol: 'PM2.5', borough: 'Brooklyn' },
  { zip: '11214', name: 'Bensonhurst', aqi: 54, pol: 'PM2.5', borough: 'Brooklyn' },
  { zip: '11223', name: 'Gravesend', aqi: 55, pol: 'O3', borough: 'Brooklyn' },
  { zip: '11224', name: 'Coney Island', aqi: 53, pol: 'O3', borough: 'Brooklyn' },
  { zip: '11235', name: 'Brighton Beach', aqi: 54, pol: 'O3', borough: 'Brooklyn' },
  { zip: '11229', name: 'Sheepshead Bay', aqi: 54, pol: 'O3', borough: 'Brooklyn' },

  // Southeast Brooklyn
  { zip: '11234', name: 'Marine Park', aqi: 53, pol: 'O3', borough: 'Brooklyn' },
  { zip: '11236', name: 'Canarsie', aqi: 56, pol: 'PM2.5', borough: 'Brooklyn' },
];

// Queens - Complete ZIP codes
const queens: ZipData[] = [
  // Northwest Queens
  { zip: '11101', name: 'Long Island City', aqi: 56, pol: 'PM2.5', borough: 'Queens' },
  { zip: '11102', name: 'Astoria', aqi: 55, pol: 'PM2.5', borough: 'Queens' },
  { zip: '11103', name: 'Astoria', aqi: 56, pol: 'PM2.5', borough: 'Queens' },
  { zip: '11105', name: 'Astoria', aqi: 55, pol: 'PM2.5', borough: 'Queens' },
  { zip: '11106', name: 'Astoria', aqi: 57, pol: 'PM2.5', borough: 'Queens' },
  { zip: '11104', name: 'Sunnyside', aqi: 56, pol: 'PM2.5', borough: 'Queens' },
  { zip: '11377', name: 'Woodside', aqi: 57, pol: 'PM2.5', borough: 'Queens' },
  { zip: '11368', name: 'Corona', aqi: 58, pol: 'PM2.5', borough: 'Queens' },
  { zip: '11369', name: 'East Elmhurst', aqi: 57, pol: 'PM2.5', borough: 'Queens' },
  { zip: '11370', name: 'East Elmhurst', aqi: 56, pol: 'PM2.5', borough: 'Queens' },

  // Central Queens
  { zip: '11372', name: 'Jackson Heights', aqi: 57, pol: 'PM2.5', borough: 'Queens' },
  { zip: '11373', name: 'Elmhurst', aqi: 58, pol: 'PM2.5', borough: 'Queens' },
  { zip: '11374', name: 'Rego Park', aqi: 55, pol: 'O3', borough: 'Queens' },
  { zip: '11375', name: 'Forest Hills', aqi: 53, pol: 'PM2.5', borough: 'Queens' },
  { zip: '11379', name: 'Middle Village', aqi: 56, pol: 'PM2.5', borough: 'Queens' },
  { zip: '11385', name: 'Ridgewood', aqi: 57, pol: 'PM2.5', borough: 'Queens' },

  // Northeast Queens
  { zip: '11354', name: 'Flushing', aqi: 55, pol: 'O3', borough: 'Queens' },
  { zip: '11355', name: 'Flushing', aqi: 54, pol: 'O3', borough: 'Queens' },
  { zip: '11358', name: 'Auburndale', aqi: 53, pol: 'O3', borough: 'Queens' },
  { zip: '11360', name: 'Bayside', aqi: 52, pol: 'O3', borough: 'Queens' },
  { zip: '11361', name: 'Bayside', aqi: 51, pol: 'O3', borough: 'Queens' },
  { zip: '11362', name: 'Little Neck', aqi: 52, pol: 'O3', borough: 'Queens' },
  { zip: '11363', name: 'Little Neck', aqi: 51, pol: 'O3', borough: 'Queens' },
  { zip: '11364', name: 'Oakland Gardens', aqi: 52, pol: 'O3', borough: 'Queens' },

  // Southeast Queens
  { zip: '11412', name: 'St. Albans', aqi: 56, pol: 'PM2.5', borough: 'Queens' },
  { zip: '11413', name: 'Springfield Gardens', aqi: 55, pol: 'PM2.5', borough: 'Queens' },
  { zip: '11414', name: 'Howard Beach', aqi: 54, pol: 'O3', borough: 'Queens' },
  { zip: '11416', name: 'Ozone Park', aqi: 56, pol: 'PM2.5', borough: 'Queens' },
  { zip: '11417', name: 'Ozone Park', aqi: 57, pol: 'PM2.5', borough: 'Queens' },
  { zip: '11418', name: 'Richmond Hill', aqi: 56, pol: 'PM2.5', borough: 'Queens' },
  { zip: '11419', name: 'South Richmond Hill', aqi: 57, pol: 'PM2.5', borough: 'Queens' },
  { zip: '11420', name: 'South Ozone Park', aqi: 56, pol: 'PM2.5', borough: 'Queens' },
  { zip: '11421', name: 'Woodhaven', aqi: 57, pol: 'PM2.5', borough: 'Queens' },
  { zip: '11422', name: 'Rosedale', aqi: 55, pol: 'PM2.5', borough: 'Queens' },
  { zip: '11423', name: 'Hollis', aqi: 56, pol: 'PM2.5', borough: 'Queens' },
  { zip: '11426', name: 'Bellerose', aqi: 53, pol: 'O3', borough: 'Queens' },
  { zip: '11427', name: 'Queens Village', aqi: 54, pol: 'PM2.5', borough: 'Queens' },
  { zip: '11428', name: 'Queens Village', aqi: 55, pol: 'PM2.5', borough: 'Queens' },
  { zip: '11429', name: 'Queens Village', aqi: 54, pol: 'PM2.5', borough: 'Queens' },

  // Jamaica
  { zip: '11432', name: 'Jamaica', aqi: 57, pol: 'PM2.5', borough: 'Queens' },
  { zip: '11433', name: 'Jamaica', aqi: 58, pol: 'PM2.5', borough: 'Queens' },
  { zip: '11434', name: 'Jamaica', aqi: 57, pol: 'PM2.5', borough: 'Queens' },
  { zip: '11435', name: 'Jamaica', aqi: 58, pol: 'PM2.5', borough: 'Queens' },
  { zip: '11436', name: 'Jamaica', aqi: 57, pol: 'PM2.5', borough: 'Queens' },
];

// Bronx - Complete ZIP codes
const bronx: ZipData[] = [
  // South Bronx
  { zip: '10451', name: 'Concourse', aqi: 57, pol: 'PM2.5', borough: 'Bronx' },
  { zip: '10452', name: 'Highbridge', aqi: 58, pol: 'PM2.5', borough: 'Bronx' },
  { zip: '10453', name: 'Morris Heights', aqi: 57, pol: 'PM2.5', borough: 'Bronx' },
  { zip: '10454', name: 'Mott Haven', aqi: 59, pol: 'PM2.5', borough: 'Bronx' },
  { zip: '10455', name: 'Melrose', aqi: 58, pol: 'PM2.5', borough: 'Bronx' },
  { zip: '10456', name: 'Morrisania', aqi: 59, pol: 'PM2.5', borough: 'Bronx' },
  { zip: '10457', name: 'Tremont', aqi: 58, pol: 'PM2.5', borough: 'Bronx' },

  // Central Bronx
  { zip: '10458', name: 'Fordham', aqi: 56, pol: 'O3', borough: 'Bronx' },
  { zip: '10467', name: 'Norwood', aqi: 55, pol: 'O3', borough: 'Bronx' },
  { zip: '10468', name: 'Fordham', aqi: 56, pol: 'PM2.5', borough: 'Bronx' },
  { zip: '10469', name: 'Eastchester', aqi: 54, pol: 'O3', borough: 'Bronx' },
  { zip: '10470', name: 'Baychester', aqi: 53, pol: 'O3', borough: 'Bronx' },
  { zip: '10471', name: 'Riverdale', aqi: 52, pol: 'O3', borough: 'Bronx' },
  { zip: '10463', name: 'Riverdale', aqi: 53, pol: 'O3', borough: 'Bronx' },

  // East Bronx
  { zip: '10459', name: 'Longwood', aqi: 59, pol: 'PM2.5', borough: 'Bronx' },
  { zip: '10460', name: 'West Farms', aqi: 57, pol: 'PM2.5', borough: 'Bronx' },
  { zip: '10461', name: 'Pelham Bay', aqi: 54, pol: 'PM2.5', borough: 'Bronx' },
  { zip: '10462', name: 'Parkchester', aqi: 56, pol: 'PM2.5', borough: 'Bronx' },
  { zip: '10464', name: 'City Island', aqi: 51, pol: 'O3', borough: 'Bronx' },
  { zip: '10465', name: 'Throggs Neck', aqi: 53, pol: 'O3', borough: 'Bronx' },
  { zip: '10466', name: 'Wakefield', aqi: 54, pol: 'PM2.5', borough: 'Bronx' },
  { zip: '10472', name: 'Soundview', aqi: 57, pol: 'PM2.5', borough: 'Bronx' },
  { zip: '10473', name: 'Clason Point', aqi: 56, pol: 'PM2.5', borough: 'Bronx' },
  { zip: '10474', name: 'Hunts Point', aqi: 59, pol: 'PM2.5', borough: 'Bronx' },
  { zip: '10475', name: 'Co-op City', aqi: 54, pol: 'O3', borough: 'Bronx' },
];

// Staten Island - Complete ZIP codes
const statenIsland: ZipData[] = [
  // North Shore
  { zip: '10301', name: 'St. George', aqi: 53, pol: 'PM2.5', borough: 'Staten Island' },
  { zip: '10302', name: 'Port Richmond', aqi: 54, pol: 'PM2.5', borough: 'Staten Island' },
  { zip: '10303', name: 'Mariners Harbor', aqi: 55, pol: 'PM2.5', borough: 'Staten Island' },
  { zip: '10304', name: 'Stapleton', aqi: 53, pol: 'PM2.5', borough: 'Staten Island' },
  { zip: '10305', name: 'Rosebank', aqi: 52, pol: 'O3', borough: 'Staten Island' },

  // Mid-Island
  { zip: '10310', name: 'West Brighton', aqi: 54, pol: 'PM2.5', borough: 'Staten Island' },
  { zip: '10314', name: 'Westerleigh', aqi: 52, pol: 'O3', borough: 'Staten Island' },
  { zip: '10306', name: 'New Dorp', aqi: 54, pol: 'PM2.5', borough: 'Staten Island' },
  { zip: '10312', name: 'Eltingville', aqi: 53, pol: 'O3', borough: 'Staten Island' },

  // South Shore
  { zip: '10307', name: 'Tottenville', aqi: 51, pol: 'O3', borough: 'Staten Island' },
  { zip: '10308', name: 'Great Kills', aqi: 52, pol: 'O3', borough: 'Staten Island' },
  { zip: '10309', name: 'Pleasant Plains', aqi: 51, pol: 'O3', borough: 'Staten Island' },
];

export const allZips: ZipData[] = [
  ...manhattan,
  ...brooklyn,
  ...queens,
  ...bronx,
  ...statenIsland,
];

export const zipsByBorough = {
  Manhattan: manhattan,
  Brooklyn: brooklyn,
  Queens: queens,
  Bronx: bronx,
  'Staten Island': statenIsland,
};
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const apiKey = process.env.WEATHER_API_KEY;

    // Check if API key is configured
    if (!apiKey || apiKey === 'your_openweathermap_api_key_here') {
      return NextResponse.json(
        { error: 'Weather API key not configured' },
        { status: 500 }
      );
    }

    // Get coordinates from query params (default to NYC)
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get('lat') || '40.7128';
    const lon = searchParams.get('lon') || '-74.0060';

    // Fetch air quality data
    const aqiUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    const aqiResponse = await fetch(aqiUrl);

    // Check if the API request was successful
    if (aqiResponse.status === 200) {
      const aqiData = await aqiResponse.json();

      // OpenWeatherMap uses a 1-5 scale, convert to US AQI scale (0-500)
      const aqiIndex = aqiData.list[0].main.aqi;
      const components = aqiData.list[0].components;

      // Rough conversion from OpenWeatherMap scale to US AQI
      const aqiConversion: { [key: number]: number } = {
        1: 25,   // Good
        2: 64,   // Moderate
        3: 120,  // Unhealthy for Sensitive Groups
        4: 180,  // Unhealthy
        5: 250,  // Very Unhealthy
      };

      const usAQI = aqiConversion[aqiIndex] || 50;

      console.log('✅ AQI API Response: 200 - Success');
      console.log('📍 Coordinates:', lat, lon);
      console.log('🌫️ AQI Index:', usAQI);
      console.log('💨 Components:', components);

      return NextResponse.json({
        success: true,
        status: 200,
        data: {
          aqi: usAQI,
          category: getAQICategory(usAQI),
          components: {
            pm2_5: components.pm2_5,
            pm10: components.pm10,
            o3: components.o3,
            no2: components.no2,
            so2: components.so2,
            co: components.co,
          },
          timestamp: aqiData.list[0].dt,
        }
      });
    } else {
      const errorData = await aqiResponse.json();
      console.error('❌ AQI API Error:', aqiResponse.status, errorData);

      return NextResponse.json(
        {
          error: 'Failed to fetch AQI data',
          status: aqiResponse.status,
          details: errorData
        },
        { status: aqiResponse.status }
      );
    }

  } catch (error) {
    console.error('❌ Server Error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

function getAQICategory(aqi: number): string {
  if (aqi <= 50) return 'Good';
  if (aqi <= 100) return 'Moderate';
  if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
  if (aqi <= 200) return 'Unhealthy';
  if (aqi <= 300) return 'Very Unhealthy';
  return 'Hazardous';
}

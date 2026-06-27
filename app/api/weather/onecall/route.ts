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

    // Fetch comprehensive weather data using One Call API 2.5
    const oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial&exclude=minutely`;

    const oneCallResponse = await fetch(oneCallUrl);

    // Check if the API request was successful
    if (oneCallResponse.status === 200) {
      const data = await oneCallResponse.json();

      console.log('✅ One Call API Response: 200 - Success');
      console.log('📍 Coordinates:', lat, lon);
      console.log('🌡️ Current Temperature:', data.current.temp, '°F');
      console.log('💧 Humidity:', data.current.humidity, '%');

      return NextResponse.json({
        success: true,
        status: 200,
        data: {
          current: {
            temp: Math.round(data.current.temp),
            feelsLike: Math.round(data.current.feels_like),
            humidity: data.current.humidity,
            uvi: data.current.uvi,
            clouds: data.current.clouds,
            windSpeed: data.current.wind_speed,
            weather: data.current.weather[0],
          },
          hourly: data.hourly.slice(0, 24).map((hour: any) => ({
            dt: hour.dt,
            temp: Math.round(hour.temp),
            pop: Math.round(hour.pop * 100), // Probability of precipitation
            weather: hour.weather[0],
          })),
          daily: data.daily.slice(0, 7).map((day: any) => ({
            dt: day.dt,
            temp: {
              min: Math.round(day.temp.min),
              max: Math.round(day.temp.max),
            },
            pop: Math.round(day.pop * 100),
            weather: day.weather[0],
          })),
          alerts: data.alerts || [],
        }
      });
    } else {
      const errorData = await oneCallResponse.json();
      console.error('❌ One Call API Error:', oneCallResponse.status, errorData);

      return NextResponse.json(
        {
          error: 'Failed to fetch weather data',
          status: oneCallResponse.status,
          details: errorData
        },
        { status: oneCallResponse.status }
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

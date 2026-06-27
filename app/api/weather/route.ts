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

    // Fetch current weather data
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

    const weatherResponse = await fetch(weatherUrl);

    // Check if the API request was successful
    if (weatherResponse.status === 200) {
      const weatherData = await weatherResponse.json();

      console.log('✅ Weather API Response: 200 - Success');
      console.log('📍 Location:', weatherData.name);
      console.log('🌡️ Temperature:', weatherData.main.temp, '°F');

      return NextResponse.json({
        success: true,
        status: 200,
        data: {
          location: weatherData.name,
          temperature: Math.round(weatherData.main.temp),
          feelsLike: Math.round(weatherData.main.feels_like),
          condition: weatherData.weather[0].main,
          conditionDescription: weatherData.weather[0].description,
          high: Math.round(weatherData.main.temp_max),
          low: Math.round(weatherData.main.temp_min),
          humidity: weatherData.main.humidity,
          pressure: weatherData.main.pressure,
          windSpeed: weatherData.wind.speed,
          clouds: weatherData.clouds.all,
          icon: weatherData.weather[0].icon,
        }
      });
    } else {
      const errorData = await weatherResponse.json();
      console.error('❌ Weather API Error:', weatherResponse.status, errorData);

      return NextResponse.json(
        {
          error: 'Failed to fetch weather data',
          status: weatherResponse.status,
          details: errorData
        },
        { status: weatherResponse.status }
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

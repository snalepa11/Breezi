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

    // Fetch forecast data for rain probability
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

    const [weatherResponse, forecastResponse] = await Promise.all([
      fetch(weatherUrl),
      fetch(forecastUrl)
    ]);

    // Check if the API request was successful
    if (weatherResponse.status === 200) {
      const weatherData = await weatherResponse.json();
      const forecastData = forecastResponse.status === 200 ? await forecastResponse.json() : null;

      // Calculate today's rain probability and hourly forecast from forecast data
      let rainChance = 0;
      const hourlyForecast = [];

      if (forecastData && forecastData.list) {
        const today = new Date();

        // Get forecast data for now and next 5 periods (OpenWeatherMap returns 3-hour intervals)
        // Limit to 6 data points total
        for (let i = 0; i < Math.min(6, forecastData.list.length); i++) {
          const item = forecastData.list[i];
          const itemDate = new Date(item.dt * 1000);
          const hour = itemDate.getHours();
          const isNow = i === 0;

          // Format time label
          const ap = hour < 12 ? 'AM' : 'PM';
          let hh = hour % 12;
          if (hh === 0) hh = 12;
          const label = isNow ? 'Now' : hh + ap;

          hourlyForecast.push({
            label,
            temp: Math.round(item.main.temp),
            rain: Math.round((item.pop || 0) * 100),
            time: item.dt,
          });
        }

        // Get today's forecasts for max rain chance
        const todayForecasts = forecastData.list.filter((item: any) => {
          const itemDate = new Date(item.dt * 1000);
          return itemDate.getDate() === today.getDate();
        });

        if (todayForecasts.length > 0) {
          // Get maximum rain probability for today
          rainChance = Math.max(...todayForecasts.map((item: any) =>
            (item.pop || 0) * 100
          ));
        }
      }

      console.log('✅ Weather API Response: 200 - Success');
      console.log('📍 Location:', weatherData.name);
      console.log('🌡️ Temperature:', weatherData.main.temp, '°F');
      console.log('🌧️ Rain Chance:', Math.round(rainChance), '%');
      console.log('📊 Hourly Forecasts:', hourlyForecast.length);

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
          rainChance: Math.round(rainChance),
          hourlyForecast,
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

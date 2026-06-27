'use client';

import { useState } from 'react';

export default function APITestPage() {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [aqiData, setAqiData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testWeatherAPI = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/weather');
      const data = await response.json();
      setWeatherData(data);

      if (response.status === 200) {
        console.log('✅ Weather API returned 200 - Success!');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  const testAQIAPI = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/aqi');
      const data = await response.json();
      setAqiData(data);

      if (response.status === 200) {
        console.log('✅ AQI API returned 200 - Success!');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '20px' }}>API Test Page</h1>

      <div style={{ marginBottom: '30px' }}>
        <button
          onClick={testWeatherAPI}
          disabled={loading}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            background: '#2f93dd',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            marginRight: '12px',
          }}
        >
          Test Weather API
        </button>

        <button
          onClick={testAQIAPI}
          disabled={loading}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            background: '#e8881f',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          Test AQI API
        </button>
      </div>

      {weatherData && (
        <div style={{ marginBottom: '30px', padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
          <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>
            Weather API Response
            {weatherData.status === 200 && (
              <span style={{ marginLeft: '10px', color: '#43b06b', fontWeight: 'bold' }}>
                ✅ Status: 200
              </span>
            )}
          </h2>
          <pre style={{ overflow: 'auto' }}>
            {JSON.stringify(weatherData, null, 2)}
          </pre>
        </div>
      )}

      {aqiData && (
        <div style={{ marginBottom: '30px', padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
          <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>
            AQI API Response
            {aqiData.status === 200 && (
              <span style={{ marginLeft: '10px', color: '#43b06b', fontWeight: 'bold' }}>
                ✅ Status: 200
              </span>
            )}
          </h2>
          <pre style={{ overflow: 'auto' }}>
            {JSON.stringify(aqiData, null, 2)}
          </pre>
        </div>
      )}

      <div style={{ marginTop: '30px', padding: '20px', background: '#e3f1f9', borderRadius: '8px' }}>
        <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>API Endpoints:</h3>
        <ul style={{ lineHeight: '1.8' }}>
          <li><code>/api/weather</code> - Current weather data ✅</li>
          <li><code>/api/aqi</code> - Air quality index data ✅</li>
          <li><code>/api/weather/onecall</code> - Comprehensive weather (requires paid plan) ❌</li>
        </ul>
        <p style={{ marginTop: '15px', fontSize: '14px', color: '#666' }}>
          Open the browser console to see the 200 status messages when testing the APIs.
        </p>
      </div>
    </div>
  );
}

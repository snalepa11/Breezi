import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const apiKey = process.env.AIRNOW_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'AirNow API key not configured' },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const zip = searchParams.get('zip') || '10036';

    const url = `https://www.airnowapi.org/aq/observation/zipCode/current/?format=application/json&zipCode=${zip}&distance=25&API_KEY=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: 'No AQI data found for this ZIP code' },
        { status: 404 }
      );
    }

    // AirNow returns one entry per pollutant — get the highest AQI
    const highest = data.reduce((max: any, curr: any) =>
      curr.AQI > max.AQI ? curr : max, data[0]);

    return NextResponse.json({
      success: true,
      data: {
        aqi: highest.AQI,
        category: highest.Category.Name,
        pollutant: highest.ParameterName,
        reportingArea: highest.ReportingArea,
        stateCode: highest.StateCode,
        dateObserved: highest.DateObserved,
        hourObserved: highest.HourObserved,
      }
    });

  } catch (error) {
    console.error('AirNow error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
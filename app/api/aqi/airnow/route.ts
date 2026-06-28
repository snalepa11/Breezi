import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const apiKey = process.env.AIRNOW_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "AirNow API key not configured" },
        { status: 500 },
      );
    }

    const { searchParams } = new URL(request.url);
    const zip = searchParams.get("zip") || "10036";

    // Use observation endpoint for ZIP-code specific data
    const url = `https://www.airnowapi.org/aq/observation/zipCode/current/?format=application/json&zipCode=${zip}&distance=25&API_KEY=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: "No AQI data found for this ZIP code" },
        { status: 404 },
      );
    }

    // Get the observation with the highest AQI
    const observation = data.reduce((max: any, current: any) =>
      current.AQI > max.AQI ? current : max,
    );

    return NextResponse.json({
      success: true,
      data: {
        aqi: observation.AQI,
        category: observation.Category.Name,
        pollutant: observation.ParameterName,
        reportingArea: observation.ReportingArea,
        stateCode: observation.StateCode,
        dateObserved: observation.DateObserved,
        hourObserved: observation.HourObserved,
      },
    });
  } catch (error) {
    console.error("AirNow error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

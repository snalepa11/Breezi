import { NextResponse } from 'next/server';


export async function POST(req: Request) {
  try {
    const { query } = await req.json();
    const lat = "40.7128"; 
    const lon = "-74.0060"; 

    // 1. Safe Concurrent Fetching
    const [weatherRes, airNowRes, foursquareRes] = await Promise.all([
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}&units=metric`),
      fetch(`https://www.airnowapi.org/aq/observation/zipCode/current/?format=application/json&zipCode=10001&distance=5&API_KEY=${process.env.AIRNOW_API_KEY}`),
      fetch(`https://api.foursquare.com/v3/places/search?ll=${lat},${lon}&categories=16032`, {
        headers: { Authorization: process.env.FOURSQUARE_API_KEY || '' }
      })
    ]);

    // 2. Safe Parsing with Fallbacks if an external API is down or invalid
    const weatherData = weatherRes.ok ? await weatherRes.json() : { error: "Weather data currently unavailable" };
    const airQualityData = airNowRes.ok ? await airNowRes.json() : { error: "Air quality data currently unavailable" };
    const locationContextData = foursquareRes.ok ? await foursquareRes.json() : { error: "Location context data currently unavailable" };

    // 3. Assemble the prompt cleanly
    const systemPrompt = `
      You are BreeziChat, a helpful and highly personalized AI weather assistant.
      User Query: "${query}"
      Location: New York (Lat: ${lat}, Lon: ${lon})

      Real-time Data Context:
      - Weather: ${JSON.stringify(weatherData)}
      - Air Quality: ${JSON.stringify(airQualityData)}
      - Nearby Parks/POIs: ${JSON.stringify(locationContextData)}

      Instructions:
      - Provide a natural, conversational response addressing the user's specific query.
      - Gracefully handle any "currently unavailable" notices without crashing or blaming the user.
      - Do not output raw JSON or mention API provider names.
    `;

    // 4. Correct Gemini URL Target
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
    
    const geminiRes = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: systemPrompt }] }] })
    });

    const geminiData = await geminiRes.json();

    // 5. Explicit Rate-Limit & Error Check
    if (!geminiRes.ok) {
      console.error("GEMINI API ERROR:", JSON.stringify(geminiData, null, 2));
      
      
      if (geminiRes.status === 429) {
  const condition =
    weatherData?.weather?.[0]?.description ?? "current conditions";

  const temp =
    weatherData?.main?.temp != null
      ? `${Math.round(weatherData.main.temp)}°C`
      : "an unknown temperature";

  const aqi =
    Array.isArray(airQualityData) && airQualityData.length > 0
      ? airQualityData[0].AQI
      : null;

  let airMessage = "";

  if (aqi !== null) {
    if (aqi <= 50) {
      airMessage = "Air quality is good today.";
    } else if (aqi <= 100) {
      airMessage = "Air quality is moderate.";
    } else {
      airMessage = "Air quality is unhealthy for sensitive groups, so consider limiting prolonged outdoor activity.";
    }
  }

  const fallbackReply = `Right now the weather is ${condition} with a temperature of ${temp}. ${airMessage} Based on today's conditions, dress comfortably, stay hydrated, and check local conditions before spending extended time outdoors.`;

  return NextResponse.json({
    reply: fallbackReply
  });
}

return NextResponse.json({
  reply: "I'm temporarily unable to generate an AI response, but weather data is still available."
});
      
      return NextResponse.json({ reply: "Gemini API rejected the request. Check your server logs." }, { status: 500 });
    }

    // 6. Safe Extraction
    const finalAdvice = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!finalAdvice) {
      throw new Error("Invalid response format received from Gemini.");
    }

    return NextResponse.json({ reply: finalAdvice });

  } catch (error) {
    console.error("PIPELINE CRITICAL FAILURE:", error);
    return NextResponse.json({ reply: "An internal backend error occurred while compiling your request." }, { status: 500 });
  }
}
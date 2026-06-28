export interface AirQualityAdvice {
  summary: string;
  recommendation: string;
  caution?: string;
}

/**
 * Generates health recommendations
 * based on the US AQI scale.
 */
export function getAirQualityAdvice(
  aqi: number
): AirQualityAdvice {
  if (aqi <= 50) {
    return {
      summary: "Air quality is good.",
      recommendation:
        "Outdoor activities are safe for most people. It's a great day for walking, running, cycling, or spending time outside.",
      caution:
        "People with severe respiratory conditions should continue following their normal health precautions.",
    };
  }

  if (aqi <= 100) {
    return {
      summary: "Air quality is moderate.",
      recommendation:
        "Most people can enjoy outdoor activities safely. Sensitive individuals should monitor how they feel during prolonged outdoor exercise.",
      caution:
        "People with asthma or respiratory conditions may experience mild irritation.",
    };
  }

  if (aqi <= 150) {
    return {
      summary:
        "Air quality is unhealthy for sensitive groups.",
      recommendation:
        "Children, older adults, and people with asthma or heart conditions should reduce prolonged outdoor activity.",
      caution:
        "Consider moving strenuous exercise indoors if you are in a sensitive group.",
    };
  }

  if (aqi <= 200) {
    return {
      summary: "Air quality is unhealthy.",
      recommendation:
        "Reduce outdoor activities. Indoor exercise is recommended today.",
      caution:
        "Everyone may begin experiencing health effects after extended exposure.",
    };
  }

  if (aqi <= 300) {
    return {
      summary: "Air quality is very unhealthy.",
      recommendation:
        "Avoid outdoor exercise whenever possible and stay indoors with windows closed.",
      caution:
        "Health warnings apply to everyone, especially vulnerable individuals.",
    };
  }

  return {
    summary: "Air quality is hazardous.",
    recommendation:
      "Remain indoors whenever possible and avoid unnecessary outdoor exposure.",
    caution:
      "Follow guidance from local public health officials.",
  };
}
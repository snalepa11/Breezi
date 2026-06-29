export type Intent =
  | "greeting"
  | "weather"
  | "forecast"
  | "rain"
  | "exercise"
  | "activity"
  | "clothing"
  | "air_quality"
  | "borough"
  | "general";

export interface ChatResponse {
  intent: Intent;
  reply: string;
}
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Breezi - Weather App',
  description: 'New York City weather and air quality',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

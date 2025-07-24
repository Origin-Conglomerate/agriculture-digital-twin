import React from 'react';
import { Wind, Droplets, Cloud, Thermometer } from 'lucide-react';
import { WeatherCard } from './WeatherCard';

interface AirConditionsProps {
  realFeel: string;
  wind: string;
  clouds: string;
  humidity: string;
}

export const AirConditions = ({
  realFeel,
  wind,
  clouds,
  humidity
}: AirConditionsProps) => {
  const conditions = [
    { icon: Thermometer, label: 'Real Feel', value: `${realFeel}°C` },
    { icon: Wind, label: 'Wind', value: `${wind} m/s` },
    { icon: Cloud, label: 'Cloud Cover', value: `${clouds}%` },
    { icon: Droplets, label: 'Humidity', value: `${humidity}%` }
  ];

  return (
    <WeatherCard
      title="Air Conditions"
      description="Current atmospheric conditions"
      badge="Live"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {conditions.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex flex-col items-center p-4 bg-white/30 dark:bg-gray-800/30 rounded-lg">
            <Icon className="w-8 h-8 text-green-600 dark:text-blue-400 mb-2" />
            <span className="text-green-700 dark:text-blue-200 text-sm">{label}</span>
            <span className="text-green-900 dark:text-white font-bold">{value}</span>
          </div>
        ))}
      </div>
    </WeatherCard>
  );
};
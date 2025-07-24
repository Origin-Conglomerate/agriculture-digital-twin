import { Cloud, Sun, Thermometer, Wind } from 'lucide-react';
import { WeatherCard } from './WeatherCard';
interface CurrentWeatherProps {
  city: string;
  date: string;
  temperature: string;
  description: string;
}

export const CurrentWeather = ({
  city,
  date,
  temperature,
  description
}: CurrentWeatherProps) => {
  return (
    <WeatherCard
      title="Current Weather"
      description={`${city} - ${date}`}
      badge="Live"
    >
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4">
          {description.includes('cloud') ? (
            <Cloud className="w-16 h-16 text-green-600 dark:text-blue-400" />
          ) : (
            <Sun className="w-16 h-16 text-green-600 dark:text-blue-400" />
          )}
          <div className="text-center md:text-left">
            <h3 className="text-4xl font-bold text-green-900 dark:text-white">
              {temperature}°C
            </h3>
            <p className="text-green-700 dark:text-blue-200 capitalize">
              {description}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Thermometer className="text-green-600 dark:text-blue-400" />
            <span className="text-green-700 dark:text-blue-200">Feels like {parseInt(temperature) + 2}°C</span>
          </div>
          <div className="flex items-center gap-2">
            <Wind className="text-green-600 dark:text-blue-400" />
            <span className="text-green-700 dark:text-blue-200">3.09 m/s</span>
          </div>
        </div>
      </div>
    </WeatherCard>
  );
};
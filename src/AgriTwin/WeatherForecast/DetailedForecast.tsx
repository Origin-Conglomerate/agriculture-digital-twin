import React from 'react';
import { WeatherCard } from './WeatherCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Cloud, 
  Sun, 
  Wind, 
  Droplets,
  Clock,
  Moon,
  Thermometer,
  Flower,
  Link as LinkIcon
} from 'lucide-react';
import { motion } from 'framer-motion';

interface DetailedForecastProps {
  data: any;
}

export const DetailedForecast = ({ data }: DetailedForecastProps) => {
  const [activeTab, setActiveTab] = React.useState('day');
  const forecast = data.DailyForecasts[0];

  const getWeatherIcon = (time: 'Day' | 'Night') => {
    const cloudCover = forecast[time].CloudCover;
    return cloudCover > 50 ? Cloud : Sun;
  };

  const DataSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="p-4 bg-white/30 dark:bg-gray-800/30 rounded-lg">
      <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300 mb-2">
        {title}
      </h3>
      <div className="space-y-2">
        {children}
      </div>
    </div>
  );

  const DataItem = ({ label, value }: { label: string; value: string | number }) => (
    <div className="flex items-center justify-between">
      <span className="text-green-700 dark:text-blue-200">{label}</span>
      <Badge variant="outline">{value}</Badge>
    </div>
  );

  return (
    <WeatherCard
      title="Detailed Forecast"
      description={data.Headline.Text}
      badge="24h"
    >
      <Tabs
        defaultValue="day"
        className="w-full"
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-2 bg-green-50 dark:bg-gray-800">
          <TabsTrigger
            value="day"
            className={`flex items-center gap-2 transition-all duration-300 ${
              activeTab === 'day' ? 'bg-green-200 dark:bg-blue-900' : ''
            }`}
          >
            <Sun className="w-4 h-4" /> Day
          </TabsTrigger>
          <TabsTrigger
            value="night"
            className={`flex items-center gap-2 transition-all duration-300 ${
              activeTab === 'night' ? 'bg-green-200 dark:bg-blue-900' : ''
            }`}
          >
            <Moon className="w-4 h-4" /> Night
          </TabsTrigger>
        </TabsList>

        {['day', 'night'].map((period) => (
          <TabsContent key={period} value={period}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Wind Conditions */}
                <DataSection title="Wind Conditions">
                  <DataItem 
                    label="Wind Speed" 
                    value={`${forecast[period === 'day' ? 'Day' : 'Night'].Wind.Speed.Value} ${forecast[period === 'day' ? 'Day' : 'Night'].Wind.Speed.Unit}`} 
                  />
                  <DataItem 
                    label="Wind Direction" 
                    value={forecast[period === 'day' ? 'Day' : 'Night'].Wind.Direction.Localized} 
                  />
                  <DataItem 
                    label="Wind Gust" 
                    value={`${forecast[period === 'day' ? 'Day' : 'Night'].WindGust.Speed.Value} ${forecast[period === 'day' ? 'Day' : 'Night'].WindGust.Speed.Unit}`} 
                  />
                </DataSection>

                {/* Precipitation */}
                <DataSection title="Precipitation">
                  <DataItem 
                    label="Total Liquid" 
                    value={`${forecast[period === 'day' ? 'Day' : 'Night'].TotalLiquid.Value} ${forecast[period === 'day' ? 'Day' : 'Night'].TotalLiquid.Unit}`} 
                  />
                  <DataItem 
                    label="Rain" 
                    value={`${forecast[period === 'day' ? 'Day' : 'Night'].Rain.Value} ${forecast[period === 'day' ? 'Day' : 'Night'].Rain.Unit}`} 
                  />
                  <DataItem 
                    label="Snow" 
                    value={`${forecast[period === 'day' ? 'Day' : 'Night'].Snow.Value} ${forecast[period === 'day' ? 'Day' : 'Night'].Snow.Unit}`} 
                  />
                  <DataItem 
                    label="Ice" 
                    value={`${forecast[period === 'day' ? 'Day' : 'Night'].Ice.Value} ${forecast[period === 'day' ? 'Day' : 'Night'].Ice.Unit}`} 
                  />
                </DataSection>

                {/* Precipitation Probabilities */}
                <DataSection title="Precipitation Probabilities">
                  <DataItem 
                    label="Precipitation" 
                    value={`${forecast[period === 'day' ? 'Day' : 'Night'].PrecipitationProbability}%`} 
                  />
                  <DataItem 
                    label="Thunderstorm" 
                    value={`${forecast[period === 'day' ? 'Day' : 'Night'].ThunderstormProbability}%`} 
                  />
                  <DataItem 
                    label="Rain" 
                    value={`${forecast[period === 'day' ? 'Day' : 'Night'].RainProbability}%`} 
                  />
                  <DataItem 
                    label="Snow" 
                    value={`${forecast[period === 'day' ? 'Day' : 'Night'].SnowProbability}%`} 
                  />
                  <DataItem 
                    label="Ice" 
                    value={`${forecast[period === 'day' ? 'Day' : 'Night'].IceProbability}%`} 
                  />
                </DataSection>

                {/* Humidity */}
                <DataSection title="Humidity">
                  <DataItem 
                    label="Relative Humidity" 
                    value={`${forecast[period === 'day' ? 'Day' : 'Night'].RelativeHumidity.Minimum} - ${forecast[period === 'day' ? 'Day' : 'Night'].RelativeHumidity.Maximum}%`} 
                  />
                  <DataItem 
                    label="Wet Bulb Temp" 
                    value={`${forecast[period === 'day' ? 'Day' : 'Night'].WetBulbTemperature.Minimum.Value} - ${forecast[period === 'day' ? 'Day' : 'Night'].WetBulbTemperature.Maximum.Value} ${forecast[period === 'day' ? 'Day' : 'Night'].WetBulbTemperature.Minimum.Unit}`} 
                  />
                  <DataItem 
                    label="Hours of Precipitation" 
                    value={forecast[period === 'day' ? 'Day' : 'Night'].HoursOfPrecipitation} 
                  />
                  <DataItem 
                    label="Hours of Rain" 
                    value={forecast[period === 'day' ? 'Day' : 'Night'].HoursOfRain} 
                  />
                </DataSection>

                {/* Cloud Cover */}
                <DataSection title="Cloud Cover">
                  <DataItem 
                    label="Cloud Cover" 
                    value={`${forecast[period === 'day' ? 'Day' : 'Night'].CloudCover}%`} 
                  />
                  <DataItem 
                    label="Weather" 
                    value={forecast[period === 'day' ? 'Day' : 'Night'].IconPhrase} 
                  />
                </DataSection>

                {/* Evapotranspiration */}
                <DataSection title="Additional Data">
                  <DataItem 
                    label="Evapotranspiration" 
                    value={`${forecast[period === 'day' ? 'Day' : 'Night'].Evapotranspiration.Value} ${forecast[period === 'day' ? 'Day' : 'Night'].Evapotranspiration.Unit}`} 
                  />
                  {period === 'day' && (
                    <DataItem 
                      label="Hours of Sun" 
                      value={forecast.HoursOfSun} 
                    />
                  )}
                </DataSection>
              </div>

              {/* Sun/Moon Data - Shown on both tabs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DataSection title="Celestial Data">
                  <DataItem 
                    label="Sun Rise" 
                    value={forecast.Sun.Rise} 
                  />
                  <DataItem 
                    label="Sun Set" 
                    value={forecast.Sun.Set} 
                  />
                  <DataItem 
                    label="Moon Rise" 
                    value={forecast.Moon.Rise} 
                  />
                  <DataItem 
                    label="Moon Set" 
                    value={forecast.Moon.Set} 
                  />
                  <DataItem 
                    label="Moon Phase" 
                    value={forecast.Moon.Phase} 
                  />
                  <DataItem 
                    label="Moon Age" 
                    value={forecast.Moon.Age} 
                  />
                </DataSection>

                {/* Air Quality and Pollen */}
                <DataSection title="Air & Pollen">
                  {forecast.AirAndPollen.map((item, index) => (
                    <DataItem 
                      key={index}
                      label={item.Name} 
                      value={`${item.Value} (${item.Category})`} 
                    />
                  ))}
                </DataSection>
              </div>
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>
    </WeatherCard>
  );
};
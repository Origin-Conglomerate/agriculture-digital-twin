import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cloud, Sun, Droplets, Wind } from 'lucide-react';

interface WeatherData {
  temperature: number;
  humidity: number;
  rainfall: number;
  windSpeed: number;
  impact: 'Positive' | 'Neutral' | 'Negative';
  recommendations: string[];
}

interface WeatherImpactProps {
  weatherData: WeatherData;
}

export function WeatherImpact({ weatherData }: WeatherImpactProps) {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'Positive': return 'bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Neutral': return 'bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Negative': return 'bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return '';
    }
  };

  return (
    <Card className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30">
      <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50">
        <div className="md:flex justify-between items-center">
          <CardTitle className="text-xl font-bold text-green-900 dark:text-white flex items-center gap-2">
            <Cloud className="w-5 h-5" />
            Weather Impact Analysis
          </CardTitle>
          <Badge className={getImpactColor(weatherData.impact)}>
            {weatherData.impact} Impact
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
            <div className="md:flex items-center gap-2 mb-2">
              <Sun className="w-4 h-4 text-yellow-500" />
              <span className="text-green-700 dark:text-blue-200">Temperature</span>
            </div>
            <span className="text-xl font-bold text-green-800 dark:text-blue-300">
              {weatherData.temperature}°C
            </span>
          </div>
          <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Droplets className="w-4 h-4 text-blue-500" />
              <span className="text-green-700 dark:text-blue-200">Humidity</span>
            </div>
            <span className="text-xl font-bold text-green-800 dark:text-blue-300">
              {weatherData.humidity}%
            </span>
          </div>
          <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Cloud className="w-4 h-4 text-gray-500" />
              <span className="text-green-700 dark:text-blue-200">Rainfall</span>
            </div>
            <span className="text-xl font-bold text-green-800 dark:text-blue-300">
              {weatherData.rainfall}mm
            </span>
          </div>
          <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Wind className="w-4 h-4 text-cyan-500" />
              <span className="text-green-700 dark:text-blue-200">Wind Speed</span>
            </div>
            <span className="text-xl font-bold text-green-800 dark:text-blue-300">
              {weatherData.windSpeed}km/h
            </span>
          </div>
        </div>
        <div className="space-y-4">
          <h4 className="font-semibold text-green-800 dark:text-blue-300">Recommendations</h4>
          <ul className="list-disc list-inside text-green-700 dark:text-blue-200">
            {weatherData.recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
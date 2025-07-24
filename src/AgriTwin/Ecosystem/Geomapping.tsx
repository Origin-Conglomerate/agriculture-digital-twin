import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Map, Navigation, Radar, Target } from 'lucide-react';

export const GeoMapping = () => {
  const mapStats = {
    nearbyFarms: 12,
    totalArea: "450 acres",
    similarCrops: "8 farms",
    averageDistance: "5.2 km"
  };

  return (
    <Card className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-xl">
      <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-4">
        <div className="md:flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Map className="text-green-600 dark:text-blue-400" />
            <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300">
              Geo Mapping
            </h3>
          </div>
          <Badge variant="outline" className="bg-white/30 dark:bg-black/30">
            Live GPS Tracking
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="bg-green-50 dark:bg-gray-800 p-3 rounded-lg">
            <div className="flex items-center gap-2">
              <Radar className="w-4 h-4 text-green-600 dark:text-blue-400" />
              <p className="text-sm text-green-700 dark:text-blue-200">Nearby Farms</p>
            </div>
            <p className="text-lg font-bold text-green-900 dark:text-white">
              {mapStats.nearbyFarms}
            </p>
          </div>
          <div className="bg-green-50 dark:bg-gray-800 p-3 rounded-lg">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-green-600 dark:text-blue-400" />
              <p className="text-sm text-green-700 dark:text-blue-200">Total Area</p>
            </div>
            <p className="text-lg font-bold text-green-900 dark:text-white">
              {mapStats.totalArea}
            </p>
          </div>
          <div className="bg-green-50 dark:bg-gray-800 p-3 rounded-lg">
            <div className="flex items-center gap-2">
              <Navigation className="w-4 h-4 text-green-600 dark:text-blue-400" />
              <p className="text-sm text-green-700 dark:text-blue-200">Similar Crops</p>
            </div>
            <p className="text-lg font-bold text-green-900 dark:text-white">
              {mapStats.similarCrops}
            </p>
          </div>
          <div className="bg-green-50 dark:bg-gray-800 p-3 rounded-lg">
            <div className="flex items-center gap-2">
              <Map className="w-4 h-4 text-green-600 dark:text-blue-400" />
              <p className="text-sm text-green-700 dark:text-blue-200">Avg Distance</p>
            </div>
            <p className="text-lg font-bold text-green-900 dark:text-white">
              {mapStats.averageDistance}
            </p>
          </div>
        </div>
        
        {/* Interactive Map Placeholder */}
        <div className="w-full h-48 bg-green-50 dark:bg-gray-800 rounded-lg flex items-center justify-center">
          <div className="text-green-700 dark:text-blue-200 text-center">
            <Map className="w-8 h-8 mx-auto mb-2" />
            <p>Interactive Map View</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
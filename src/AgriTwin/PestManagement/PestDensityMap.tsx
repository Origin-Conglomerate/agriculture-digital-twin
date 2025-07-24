// components/PestDensityMap.tsx
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Map, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

type ZoneData = {
  id: string;
  name: string;
  density: number;
  risk: 'low' | 'medium' | 'high';
  coordinates: { x: number; y: number };
};

const mockZones = [
  {
    id: "zone1",
    name: "Zone A",
    density: 75,
    risk: "High",
    coordinates: { x: 20, y: 20 }  // Top left
  },
  {
    id: "zone2",
    name: "Zone B",
    density: 45,
    risk: "Medium",
    coordinates: { x: 80, y: 20 }  // Top right
  },
  {
    id: "zone3",
    name: "Zone C",
    density: 15,
    risk: "Low",
    coordinates: { x: 20, y: 80 }  // Bottom left
  },
  {
    id: "zone4",
    name: "Zone D",
    density: 60,
    risk: "Medium",
    coordinates: { x: 80, y: 80 }  // Bottom right
  },
  {
    id: "zone5",
    name: "Zone E",
    density: 35,
    risk: "Low",
    coordinates: { x: 50, y: 50 }  // Center
  }
];

export const PestDensityMap = () => {
  const [selectedZone, setSelectedZone] = useState<string>('all');
  const [timeFrame, setTimeFrame] = useState<string>('24h');

  const getDensityColor = (density: number) => {
    if (density > 60) return 'rgb(239 68 68 / 0.7)'; // red
    if (density > 30) return 'rgb(234 179 8 / 0.7)'; // yellow
    return 'rgb(34 197 94 / 0.7)'; // green
  };

  const getRiskBadgeVariant = (risk: 'low' | 'medium' | 'high') => {
    switch (risk) {
      case 'high': return 'destructive';
      case 'medium': return 'outline';
      default: return 'secondary';
    }
  };

  return (
    <div className="min-h-screen w-full p-4">
      <div className="max-w-7xl mx-auto">
        <Card className="w-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-2xl hover:shadow-green-100/50 transition-all duration-300 ease-in-out">
          <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-4 rounded-t-xl">
            <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center">
              <CardTitle className="text-xl sm:text-2xl font-bold text-green-900 dark:text-white flex items-center gap-2">
                <Map className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-blue-400" />
                Pest Density Mapping
              </CardTitle>
              <Badge variant="outline" className="self-start sm:self-auto bg-white/30 dark:bg-black/30">
                Live View
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Select value={selectedZone} onValueChange={setSelectedZone}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Select Zone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Zones</SelectItem>
                  {mockZones.map(zone => (
                    <SelectItem key={zone.id} value={zone.id}>{zone.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={timeFrame} onValueChange={setTimeFrame}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Time Frame" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">Last 24 Hours</SelectItem>
                  <SelectItem value="7d">Last 7 Days</SelectItem>
                  <SelectItem value="30d">Last 30 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] bg-green-50/30 dark:bg-gray-800/30 rounded-lg overflow-hidden border border-green-100/50 dark:border-blue-900/30">
              {/* Grid lines for better visualization */}
              <div className="absolute inset-0 grid grid-cols-4 grid-rows-4">
                {[...Array(16)].map((_, i) => (
                  <div key={i} className="border border-green-100/20 dark:border-blue-900/20" />
                ))}
              </div>
              
              {/* Zones */}
              <div className="absolute inset-0">
                {mockZones.map((zone) => (
                  <motion.div
                    key={zone.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="absolute"
                    style={{
                      left: `${zone.coordinates.x}%`,
                      top: `${zone.coordinates.y}%`,
                      width: 'clamp(60px, 15vw, 100px)',
                      height: 'clamp(60px, 15vw, 100px)',
                      borderRadius: '50%',
                      backgroundColor: getDensityColor(zone.density),
                      transform: 'translate(-50%, -50%)',
                      cursor: 'pointer',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                      <span className="font-bold text-xs sm:text-sm md:text-base">{zone.name}</span>
                      <span className="text-xs sm:text-sm">{zone.density}%</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {mockZones.map((zone) => (
                <div
                  key={zone.id}
                  className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-sm sm:text-base text-green-800 dark:text-blue-300">
                      {zone.name}
                    </span>
                    <Badge variant={getRiskBadgeVariant(zone.risk)} className="text-xs sm:text-sm">
                      {zone.risk}
                    </Badge>
                  </div>
                  <div className="text-sm sm:text-base text-green-700 dark:text-blue-200">
                    Density: {zone.density}%
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
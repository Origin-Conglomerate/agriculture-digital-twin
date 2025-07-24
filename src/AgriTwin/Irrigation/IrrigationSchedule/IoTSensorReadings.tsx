import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ChevronRight,
  Droplet,
  Thermometer,
  CloudCog,
  Waves,
  AlertTriangle,
  PieChart
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";

// IoT Sensor Data Hook
const useSensorData = () => {
  const [readings, setReadings] = useState({
    moisture: { value: 60, trend: 'stable' },
    temperature: { value: 25, trend: 'increasing' },
    rainfall: { value: 2.5, trend: 'moderate' },
    humidity: { value: 45, trend: 'stable' }
  });

  const generateReadings = () => {
    setReadings({
      moisture: {
        value: Math.floor(Math.random() * 20) + 50,
        trend: ['stable', 'increasing', 'decreasing'][Math.floor(Math.random() * 3)]
      },
      temperature: {
        value: Math.floor(Math.random() * 10) + 20,
        trend: ['stable', 'increasing', 'decreasing'][Math.floor(Math.random() * 3)]
      },
      rainfall: {
        value: +(Math.random() * 5).toFixed(1),
        trend: ['low', 'moderate', 'high'][Math.floor(Math.random() * 3)]
      },
      humidity: {
        value: Math.floor(Math.random() * 20) + 40,
        trend: ['stable', 'increasing', 'decreasing'][Math.floor(Math.random() * 3)]
      }
    });
  };

  useEffect(() => {
    generateReadings();
    const interval = setInterval(generateReadings, 7000);
    return () => clearInterval(interval);
  }, []);

  return readings;
};

export default function IoTSensorReadings() {
  const readings = useSensorData();
  const [activeTab, setActiveTab] = useState('moisture');

  return (
    <Card className="w-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-2xl hover:shadow-green-100/50 transition-all duration-300 ease-in-out">
      <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-6 rounded-t-2xl">
        <div className="lg:flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl font-bold text-green-900 dark:text-white flex items-center gap-3">
              <PieChart className="text-green-600 dark:text-blue-400" />
              IoT Sensor Readings
            </CardTitle>
            <CardDescription className="text-green-700 dark:text-blue-200">
              Real-time environmental monitoring system
            </CardDescription>
          </div>
          <Badge variant="outline" className="bg-white/30 dark:bg-black/30">
            Live Data
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        <Tabs 
          defaultValue="moisture" 
          className="w-full"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid h-full md:grid-cols-2  w-full grid-cols-4 bg-green-50 dark:bg-gray-800 gap-4">
            <TabsTrigger 
              value="moisture" 
              className={cn(
                "flex items-center gap-2 transition-all duration-300",
                activeTab === 'moisture' ? 'bg-green-200 dark:bg-blue-900' : ''
              )}
            >
              <Droplet className="w-4 h-4" /> Moisture
            </TabsTrigger>
            <TabsTrigger 
              value="temperature" 
              className={cn(
                "flex items-center gap-3 transition-all duration-300",
                activeTab === 'temperature' ? 'bg-green-200 dark:bg-blue-900' : ''
              )}
            >
              <Thermometer className="w-4 h-4" /> Temperature
            </TabsTrigger>
            <TabsTrigger 
              value="rainfall" 
              className={cn(
                "flex items-center gap-3 transition-all duration-300",
                activeTab === 'rainfall' ? 'bg-green-200 dark:bg-blue-900' : ''
              )}
            >
              <CloudCog className="w-4 h-4" /> Rainfall
            </TabsTrigger>
            <TabsTrigger 
              value="humidity" 
              className={cn(
                "flex items-center gap-1 transition-all duration-300",
                activeTab === 'humidity' ? 'bg-green-200 dark:bg-blue-900' : ''
              )}
            >
              <Waves className="w-4 h-4" /> Humidity
            </TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-4 p-4 bg-white/50 dark:bg-gray-900/50 rounded-lg"
            >
              {activeTab === 'moisture' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300">
                      Soil Moisture Level
                    </h3>
                    <Badge variant="secondary">{readings.moisture.trend}</Badge>
                  </div>
                  <p className="text-green-700 dark:text-blue-200">
                    Current Reading: {readings.moisture.value}%
                  </p>
                </div>
              )}

              {activeTab === 'temperature' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300">
                      Temperature Reading
                    </h3>
                    <Badge variant="destructive">{readings.temperature.trend}</Badge>
                  </div>
                  <p className="text-green-700 dark:text-blue-200">
                    Current Reading: {readings.temperature.value}°C
                  </p>
                </div>
              )}

              {activeTab === 'rainfall' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300">
                      Rainfall Measurement
                    </h3>
                    <Badge variant="outline">{readings.rainfall.trend}</Badge>
                  </div>
                  <p className="text-green-700 dark:text-blue-200">
                    Current Reading: {readings.rainfall.value}mm
                  </p>
                </div>
              )}

              {activeTab === 'humidity' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300">
                      Humidity Level
                    </h3>
                    <Badge variant="secondary">{readings.humidity.trend}</Badge>
                  </div>
                  <p className="text-green-700 dark:text-blue-200">
                    Current Reading: {readings.humidity.value}%
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </Tabs>

        <div className="mt-6 lg:flex justify-between items-center">
          <Button 
            variant="outline" 
            className="group hover:bg-green-100 dark:hover:bg-blue-900 transition-all "
          >
            Sensor Details
            <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <div className="flex items-center space-x-2 md:mt-1">
            <AlertTriangle className="text-green-600 dark:text-blue-400" />
            <span className="text-sm text-green-700 dark:text-blue-200">
              Last Updated: Just now
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
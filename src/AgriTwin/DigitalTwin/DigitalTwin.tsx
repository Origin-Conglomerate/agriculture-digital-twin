import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sprout,
  Droplets,
  History,
  LineChart,
  Settings2,
  Map
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";
import ControlsSimulator from './ControlsSimulator';
import IrrigationSystemSimulation from './IrrigationSystemSimulation';
import SimulationMetricsDisplay from './SimulationMetricsDisplay';
import ViewSimulation from './ViewSimulation';
import Simulator from './Simulator';

const useAgriSimulation = () => {
  const [simulationState, setSimulationState] = useState({
    isPlaying: false,
    speed: 1,
    currentTime: new Date(),
    season: 'summer',
    weather: 'sunny',
    metrics: {
      soilMoisture: 65,
      temperature: 24.5,
      lightIntensity: 75.2,
      cropHealth: 92,
      soilPH: 6.5,
      windSpeed: 12
    }
  });

  useEffect(() => {
    if (simulationState.isPlaying) {
      const interval = setInterval(() => {
        setSimulationState(prev => ({
          ...prev,
          currentTime: new Date(prev.currentTime.getTime() + 1000 * prev.speed),
          metrics: {
            ...prev.metrics,
            soilMoisture: Math.max(0, Math.min(100, prev.metrics.soilMoisture + (Math.random() - 0.5) * 2)),
            cropHealth: Math.max(0, Math.min(100, prev.metrics.cropHealth + (Math.random() - 0.5)))
          }
        }));
      }, 1000 / simulationState.speed);

      return () => clearInterval(interval);
    }
  }, [simulationState.isPlaying, simulationState.speed]);

  return {
    simulationState,
    setSimulationState
  };
};

export default function DigitalTwin() {
  const [activeTab, setActiveTab] = useState('realtime');
  const { simulationState, setSimulationState } = useAgriSimulation();
  const handlePlayPause = () => {
    setSimulationState(prev => ({
      ...prev,
      isPlaying: !prev.isPlaying
    }));
  };

  const handleReset = () => {
    setSimulationState(prev => ({
      ...prev,
      isPlaying: false,
      currentTime: new Date(),
      metrics: {
        soilMoisture: 65,
        temperature: 24.5,
        lightIntensity: 75.2,
        cropHealth: 92,
        soilPH: 6.5,
        windSpeed: 12
      }
    }));
  };

  const handleSpeedChange = (value: number[]) => {
    setSimulationState(prev => ({
      ...prev,
      speed: value[0]
    }));
  };

  const handleSeasonChange = (value: string) => {
    setSimulationState(prev => ({
      ...prev,
      season: value,
      metrics: {
        ...prev.metrics,
        temperature: value === 'summer' ? 28.5 : 
                    value === 'winter' ? 12.5 : 
                    value === 'spring' ? 20.5 : 22.5
      }
    }));
  };

  const handleWeatherChange = (value: string) => {
    setSimulationState(prev => ({
      ...prev,
      weather: value,
      metrics: {
        ...prev.metrics,
        lightIntensity: value === 'sunny' ? 85.2 :
                       value === 'cloudy' ? 45.5 :
                       value === 'rainy' ? 25.8 : 15.3
      }
    }));
  };

  return (
    <div className="flex justify-center items-center p-4">
      <Card className="w-full max-w-[89vw] bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-2xl hover:shadow-green-100/50 transition-all duration-300 ease-in-out">
        <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-6 rounded-t-2xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle className="text-2xl font-bold text-green-900 dark:text-white flex items-center gap-3">
                <Sprout className="text-green-600 dark:text-blue-400" />
                Agricultural Digital Twin
              </CardTitle>
              <CardDescription className="text-green-700 dark:text-blue-200">
                Real-time farm monitoring and crop growth simulation
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="bg-white/30 dark:bg-black/30">
                Plot Size: 50 hectares
              </Badge>
              <Badge variant="outline" className="bg-white/30 dark:bg-black/30">
                Crop: Banana
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          <ControlsSimulator
            isPlaying={simulationState.isPlaying}
            simulationSpeed={simulationState.speed}
            selectedSeason={simulationState.season}
            weatherCondition={simulationState.weather}
            onPlayPause={handlePlayPause}
            onReset={handleReset}
            onSpeedChange={handleSpeedChange}
            onSeasonChange={handleSeasonChange}
            onWeatherChange={handleWeatherChange}
          />

          <SimulationMetricsDisplay />

          <Tabs
            defaultValue="realtime"
            className="w-full"
            onValueChange={setActiveTab}
          >
            <TabsList className="grid w-full h-full grid-cols-2 md:grid-cols-5 bg-green-50 dark:bg-gray-800">
              <TabsTrigger
                value="realtime"
                className={cn(
                  "flex items-center gap-2 transition-all duration-300",
                  activeTab === 'realtime' ? 'bg-green-200 dark:bg-blue-900' : ''
                )}
              >
                <LineChart className="w-4 h-4" /> Real-time
              </TabsTrigger>
              <TabsTrigger
                value="irrigation"
                className={cn(
                  "flex items-center gap-2 transition-all duration-300",
                  activeTab === 'irrigation' ? 'bg-green-200 dark:bg-blue-900' : ''
                )}
              >
                <Droplets className="w-4 h-4" /> Irrigation
              </TabsTrigger>
              <TabsTrigger
                value="historical"
                className={cn(
                  "flex items-center gap-2 transition-all duration-300",
                  activeTab === 'historical' ? 'bg-green-200 dark:bg-blue-900' : ''
                )}
              >
                <History className="w-4 h-4" /> Historical
              </TabsTrigger>
              <TabsTrigger
                value="map"
                className={cn(
                  "flex items-center gap-2 transition-all duration-300",
                  activeTab === 'map' ? 'bg-green-200 dark:bg-blue-900' : ''
                )}
              >
                <Map className="w-4 h-4" /> Plot Map
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className={cn(
                  "flex items-center gap-2 transition-all duration-300",
                  activeTab === 'settings' ? 'bg-green-200 dark:bg-blue-900' : ''
                )}
              >
                <Settings2 className="w-4 h-4" /> Settings
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="mt-4"
              >
                {activeTab === 'realtime' && (
                  <Simulator />
                )}
                {activeTab === 'irrigation' && (
                  <IrrigationSystemSimulation />
                )}
                {activeTab === 'historical' && (
                  <ViewSimulation dataType="historical" />
                )}
                {activeTab === 'map' && (
                  <div className="bg-white/60 dark:bg-gray-900/60 p-4 rounded-lg">
                    <p className="text-center text-green-700 dark:text-blue-200">
                      Interactive plot map visualization would go here
                    </p>
                  </div>
                )}
                {activeTab === 'settings' && (
                  <div className="bg-white/60 dark:bg-gray-900/60 p-4 rounded-lg">
                    <p className="text-center text-green-700 dark:text-blue-200">
                      Simulation settings and configurations would go here
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
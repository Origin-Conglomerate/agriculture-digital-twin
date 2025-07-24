import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Map,
  Activity,
  CloudRain,
  Thermometer,
  Wind,
  Bug,
  Camera,
  Sprout,
  AlertTriangle,
  PlaneIcon,
  Plane
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";

// Drone Position Simulator Hook
const useDroneSimulation = (isActive) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setPosition(prev => ({
        x: prev.x + (Math.random() * 2 - 1),
        y: prev.y + (Math.random() * 2 - 1)
      }));
      setProgress(prev => Math.min(prev + 1, 100));
    }, 100);

    return () => clearInterval(interval);
  }, [isActive]);

  return { position, progress };
};

// DroneStatus Component
const DroneStatus = ({ status }) => (
  <div className="flex items-center gap-2 p-3 bg-white/30 dark:bg-gray-800/30 rounded-lg">
    <Activity className="text-green-600 dark:text-blue-400" />
    <span className="text-green-700 dark:text-blue-200">
      Status: {status}
    </span>
  </div>
);

// DroneSimulation Component
const DroneSimulation = ({ isActive }) => {
  const { position, progress } = useDroneSimulation(isActive);

  return (
    <div className="relative h-48 bg-green-50 dark:bg-gray-800 rounded-lg overflow-hidden">
      <motion.div
        className="absolute"
        animate={{
          x: `${position.x * 100}%`,
          y: `${position.y * 100}%`
        }}
        transition={{ type: "spring" }}
      >
        <PlaneIcon className="w-8 h-8 text-green-600 dark:text-blue-400" />
      </motion.div>
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <Progress value={progress} className="w-full" />
      </div>
    </div>
  );
};

// Weather Component
const WeatherInfo = () => (
  <div className="grid grid-cols-3 gap-4 p-4 bg-white/30 dark:bg-gray-800/30 rounded-lg">
    <div className="flex items-center gap-2">
      <Thermometer className="text-green-600 dark:text-blue-400" />
      <span className="text-green-700 dark:text-blue-200">24°C</span>
    </div>
    <div className="flex items-center gap-2">
      <Wind className="text-green-600 dark:text-blue-400" />
      <span className="text-green-700 dark:text-blue-200">12 km/h</span>
    </div>
    <div className="flex items-center gap-2">
      <CloudRain className="text-green-600 dark:text-blue-400" />
      <span className="text-green-700 dark:text-blue-200">0%</span>
    </div>
  </div>
);

// Main Drone Component
export default function Drone() {
  const [activeTab, setActiveTab] = useState('spray');
  const [isDroneActive, setIsDroneActive] = useState(false);
  const [selectedMission, setSelectedMission] = useState(null);

  const missions = {
    spray: { name: 'Pesticide Spraying', duration: '45 mins', coverage: '5 hectares' },
    scout: { name: 'Pest Scouting', duration: '30 mins', coverage: '8 hectares' },
    map: { name: '3D Mapping', duration: '60 mins', coverage: '10 hectares' },
    monitor: { name: 'Health Monitoring', duration: '40 mins', coverage: '6 hectares' }
  };

  return (
    <div className="flex justify-center items-center">
      <Card className="w-full max-w-4xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-2xl hover:shadow-green-100/50 transition-all duration-300 ease-in-out">
        <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-bold text-green-900 dark:text-white flex items-center gap-3">
                <Plane className="text-green-600 dark:text-blue-400" />
                Smart Drone Operations
              </CardTitle>
              <CardDescription className="text-green-700 dark:text-blue-200">
                Advanced agricultural drone management system
              </CardDescription>
            </div>
            <Badge variant="outline" className="bg-white/30 dark:bg-black/30">
              AI-Enhanced
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          <Tabs
            defaultValue="spray"
            className="w-full"
            onValueChange={setActiveTab}
          >
            <TabsList className="grid w-full grid-cols-4 bg-green-50 dark:bg-gray-800">
              <TabsTrigger
                value="spray"
                className={cn(
                  "flex items-center gap-2 transition-all duration-300",
                  activeTab === 'spray' ? 'bg-green-200 dark:bg-blue-900' : ''
                )}
              >
                <Bug className="w-4 h-4" /> Spray
              </TabsTrigger>
              <TabsTrigger
                value="scout"
                className={cn(
                  "flex items-center gap-2 transition-all duration-300",
                  activeTab === 'scout' ? 'bg-green-200 dark:bg-blue-900' : ''
                )}
              >
                <Camera className="w-4 h-4" /> Scout
              </TabsTrigger>
              <TabsTrigger
                value="map"
                className={cn(
                  "flex items-center gap-2 transition-all duration-300",
                  activeTab === 'map' ? 'bg-green-200 dark:bg-blue-900' : ''
                )}
              >
                <Map className="w-4 h-4" /> Map
              </TabsTrigger>
              <TabsTrigger
                value="monitor"
                className={cn(
                  "flex items-center gap-2 transition-all duration-300",
                  activeTab === 'monitor' ? 'bg-green-200 dark:bg-blue-900' : ''
                )}
              >
                <Sprout className="w-4 h-4" /> Monitor
              </TabsTrigger>
            </TabsList>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-4 space-y-4"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="p-4 bg-white/50 dark:bg-gray-900/50 rounded-lg">
                    <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300 mb-2">
                      Mission Details
                    </h3>
                    <div className="space-y-2">
                      <p className="text-green-700 dark:text-blue-200">
                        Type: {missions[activeTab].name}
                      </p>
                      <p className="text-green-700 dark:text-blue-200">
                        Duration: {missions[activeTab].duration}
                      </p>
                      <p className="text-green-700 dark:text-blue-200">
                        Coverage: {missions[activeTab].coverage}
                      </p>
                    </div>
                  </div>
                  <WeatherInfo />
                </div>

                <div className="space-y-4">
                  <DroneSimulation isActive={isDroneActive} />
                  <DroneStatus status={isDroneActive ? 'In Operation' : 'Ready'} />
                </div>
              </div>

              <div className="flex justify-between items-center mt-6">
                <Button
                  variant="outline"
                  className={cn(
                    "group transition-all",
                    isDroneActive
                      ? "bg-red-100 hover:bg-red-200 dark:bg-red-900/50 dark:hover:bg-red-900"
                      : "hover:bg-green-100 dark:hover:bg-blue-900"
                  )}
                  onClick={() => setIsDroneActive(!isDroneActive)}
                >
                  {isDroneActive ? (
                    <>
                      <AlertTriangle className="mr-2" />
                      Stop Mission
                    </>
                  ) : (
                    <>
                      <PlaneIcon className="mr-2" />
                      Start Mission
                    </>
                  )}
                </Button>

                <div className="flex items-center space-x-2">
                  <Activity className="text-green-600 dark:text-blue-400" />
                  <span className="text-sm text-green-700 dark:text-blue-200">
                    Battery: 85%
                  </span>
                </div>
              </div>
            </motion.div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
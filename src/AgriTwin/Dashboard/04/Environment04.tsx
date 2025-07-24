import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSelector } from "react-redux";
import { GET } from '../../../utils/ApiHandler';
import { 
  Sun, 
  Wind, 
  CloudSun, 
  Compass,
  ChevronRight,
  Activity,
  RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";

const Environment04 = () => {
  const { token } = useSelector((state) => state.login);
  const [isLoading, setIsLoading] = useState(true);
  const [environmentData, setEnvironmentData] = useState(null);
  const [activeTab, setActiveTab] = useState('lux');
  const [isHovered, setIsHovered] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GET(`${import.meta.env.VITE_API_URL}/api/v1/iot/analytics`, token);
        if (response && response.data && response.data.analytics) {
          setEnvironmentData(response.data.analytics);
        }
        setIsLoading(false);
      } catch (e) {
        console.error("Error fetching data:", e);
        setIsLoading(false);
      }
    };
    fetchData();

    if (autoRefresh) {
      const interval = setInterval(fetchData, 30000); // Refresh every 30 seconds
      return () => clearInterval(interval);
    }
  }, [token, autoRefresh]);

  const getEnvironmentData = () => {
    if (!environmentData) return [];
    const { lux, solarIntensity, windSpeed, windDirection } = environmentData.iotData;
    return [
      { 
        id: 'lux',
        name: 'Light Intensity',
        value: lux.latestReading,
        unit: 'lx',
        icon: CloudSun,
        analyticsKey: 'luxAnalytics',
        description: 'Real-time ambient light measurements'
      },
      {
        id: 'solar',
        name: 'Solar Intensity',
        value: solarIntensity.latestReading,
        unit: 'W/m²',
        icon: Sun,
        analyticsKey: 'solarIntensityAnalytics',
        description: 'Current solar radiation levels'
      },
      {
        id: 'windspeed',
        name: 'Wind Speed',
        value: windSpeed,
        unit: 'km/h',
        icon: Wind,
        analyticsKey: 'windSpeedAnalytics',
        description: 'Current wind velocity measurements'
      },
      {
        id: 'winddirection',
        name: 'Wind Direction',
        value: windDirection,
        unit: '°',
        icon: Compass,
        analyticsKey: 'windDirectionAnalytics',
        description: 'Current wind directional data'
      }
    ];
  };

  return (
    <Card className="w-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-2xl hover:shadow-green-100/50 transition-all duration-300 ease-in-out">
      <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-6 rounded-t-2xl">
        <div className="md:flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl font-bold text-green-900 dark:text-white flex items-center gap-3">
              <Activity className="text-green-600 dark:text-blue-400" />
              Environmental Metrics
            </CardTitle>
            <CardDescription className="text-green-700 dark:text-blue-200">
              Real-time environmental monitoring system
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge 
              variant="outline" 
              className="bg-white/30 dark:bg-black/30 cursor-pointer"
              onClick={() => setAutoRefresh(!autoRefresh)}
            >
              <RefreshCw className={cn(
                "w-4 h-4 mr-1",
                autoRefresh && "animate-spin"
              )} />
              {autoRefresh ? 'Auto-refresh On' : 'Auto-refresh Off'}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
          </div>
        ) : (
          <Tabs 
            value={activeTab}
            className="w-full"
            onValueChange={setActiveTab}
          >
            <TabsList className="grid w-full h-full grid-cols-2 bg-green-50 dark:bg-gray-800">
              {getEnvironmentData().map((data) => (
                <TabsTrigger 
                  key={data.id}
                  value={data.id}
                  className={cn(
                    "flex items-center gap-2 transition-all duration-300",
                    activeTab === data.id ? 'bg-green-200 dark:bg-blue-900' : ''
                  )}
                >
                  <data.icon className="w-4 h-4" />
                  <span>{data.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            <AnimatePresence mode="wait">
              {getEnvironmentData().map((data) => (
                <TabsContent 
                  key={data.id} 
                  value={data.id}
                  className="mt-4"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="p-6 bg-white/50 dark:bg-gray-900/50 rounded-lg space-y-6"
                  >
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                          <data.icon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-green-800 dark:text-blue-300">
                            {data.name}
                          </h3>
                          <p className="text-sm text-green-600 dark:text-blue-200">
                            {data.description}
                          </p>
                        </div>
                      </div>
                      <div className="text-center md:text-right">
                        <div className="text-3xl font-bold text-green-600 dark:text-blue-400">
                          {data.value}
                          <span className="text-lg ml-1">{data.unit}</span>
                        </div>
                        <Badge variant="outline" className="mt-2">
                          Latest Reading
                        </Badge>
                      </div>
                    </div>

                    <div className="bg-green-50/50 dark:bg-gray-800/50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-green-800 dark:text-blue-300 mb-2">
                        Analytics Insight
                      </h4>
                      <p className="text-green-600 dark:text-blue-200">
                        {environmentData?.analytics[data.analyticsKey]?.description || 
                         "No analytics available for this parameter"}
                      </p>
                    </div>
                  </motion.div>
                </TabsContent>
              ))}
            </AnimatePresence>
          </Tabs>
        )}

        <div className="mt-6 flex justify-between items-center gap-3">
          <Button 
            variant="outline" 
            className="group hover:bg-green-100 dark:hover:bg-blue-900 transition-all"
          >
            View Historical Data
            <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <div className="flex items-center space-x-2">
            <Activity className="text-green-600 dark:text-blue-400" />
            <span className="text-sm text-green-700 dark:text-blue-200">
              Last updated: {new Date().toLocaleTimeString()}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Environment04;
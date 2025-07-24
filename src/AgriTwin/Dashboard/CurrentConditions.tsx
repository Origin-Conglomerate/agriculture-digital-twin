import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Cloud,
  Sun,
  CloudRain,
  Thermometer,
  Wind,
  Droplets,
  BarChart3,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";
import { GET } from '../../utils/ApiHandler';

const CurrentConditions = () => {
  const { token } = useSelector((state) => state.login);
  const [isLoading, setIsLoading] = useState(true);
  const [currcond, setCurrentConditionsData] = useState(null);
  const [activeTab, setActiveTab] = useState('current');
  const [refreshInterval, setRefreshInterval] = useState(3000); // 30 seconds default

  useEffect(() => {
    const getCurrentConditionsData = async () => {
      try {
        const envData = await GET(`${import.meta.env.VITE_API_URL}/api/v1/currentconditions/currentConditionsData`, token);
        if (envData && envData.data) {
          setCurrentConditionsData(envData.data.currentConditionsData[0]);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      } catch (e) {
        console.error("Error fetching data:", e);
        setIsLoading(false);
      }
    };

    getCurrentConditionsData();
    const interval = setInterval(getCurrentConditionsData, refreshInterval * 1000);
    return () => clearInterval(interval);
  }, [token, refreshInterval]);

  const getWeatherIcon = () => {
    if (!currcond) return Cloud;
    if (currcond.IsDayTime) {
      return currcond.HasPrecipitation ? CloudRain : Sun;
    }
    return currcond.HasPrecipitation ? CloudRain : Cloud;
  };

  const WeatherIcon = getWeatherIcon();

  return (
    <Card className="w-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-2xl hover:shadow-green-100/50 transition-all duration-300 ease-in-out">
      <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-6 rounded-t-2xl">
        <div className=" md:flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl font-bold text-green-900 dark:text-white flex items-center gap-3">
              <WeatherIcon className="text-green-600 dark:text-blue-400" />
              Current Conditions
            </CardTitle>
            <CardDescription className="text-green-700 dark:text-blue-200">
              Real-time weather insights
            </CardDescription>
          </div>
          <Badge 
            variant="outline" 
            className="bg-white/30 dark:bg-black/30"
          >
            {currcond?.IsDayTime ? 'Day' : 'Night'}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        <Tabs 
          defaultValue="current" 
          className="w-full"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full grid-cols-3 bg-green-50 dark:bg-gray-800">
            <TabsTrigger 
              value="current" 
              className={cn(
                "flex items-center gap-2 transition-all duration-300",
                activeTab === 'current' ? 'bg-green-200 dark:bg-blue-900' : ''
              )}
            >
              <Thermometer className="w-4 h-4" /> Current
            </TabsTrigger>
            <TabsTrigger 
              value="precipitation" 
              className={cn(
                "flex items-center gap-2 transition-all duration-300",
                activeTab === 'precipitation' ? 'bg-green-200 dark:bg-blue-900' : ''
              )}
            >
              <Droplets className="w-4 h-4" /> Rainfall
            </TabsTrigger>
            <TabsTrigger 
              value="trends" 
              className={cn(
                "flex items-center gap-2 transition-all duration-300",
                activeTab === 'trends' ? 'bg-green-200 dark:bg-blue-900' : ''
              )}
            >
              <BarChart3 className="w-4 h-4" /> Trends
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
              {activeTab === 'current' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300">
                      Temperature
                    </h3>
                    <Badge variant="secondary">
                      {currcond?.Temperature.Metric.Value}°C
                    </Badge>
                  </div>
                  <p className="text-green-700 dark:text-blue-200">
                    {currcond?.WeatherText || 'Loading weather conditions...'}
                  </p>
                </div>
              )}

              {activeTab === 'precipitation' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300">
                      Precipitation Status
                    </h3>
                    <Badge 
                      variant={currcond?.HasPrecipitation ? "destructive" : "outline"}
                    >
                      {currcond?.HasPrecipitation ? 'Active' : 'None'}
                    </Badge>
                  </div>
                  <p className="text-green-700 dark:text-blue-200">
                    {currcond?.HasPrecipitation 
                      ? 'Precipitation detected in your area' 
                      : 'No precipitation detected'}
                  </p>
                </div>
              )}

              {activeTab === 'trends' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300">
                      Weather Trends
                    </h3>
                    <Badge variant="outline">24h Analysis</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                      <p className="text-sm text-green-600 dark:text-blue-300">Temperature</p>
                      <p className="text-lg font-semibold text-green-800 dark:text-blue-200">
                        {currcond?.Temperature.Metric.Value}°C
                      </p>
                    </div>
                    <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                      <p className="text-sm text-green-600 dark:text-blue-300">Conditions</p>
                      <p className="text-lg font-semibold text-green-800 dark:text-blue-200">
                        {currcond?.WeatherText || 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </Tabs>

        <div className="mt-6 flex justify-between items-center gap-3">
          <Button 
            variant="outline" 
            className="group hover:bg-green-100 dark:hover:bg-blue-900 transition-all"
            onClick={() => setRefreshInterval(prev => prev === 30 ? 10 : 30)}
          >
            Refresh Rate: {refreshInterval}s
            <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <div className="flex items-center space-x-2">
            <Wind className="text-green-600 dark:text-blue-400" />
            <span className="text-sm text-green-700 dark:text-blue-200">
              Last Updated: {new Date().toLocaleTimeString()}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentConditions;
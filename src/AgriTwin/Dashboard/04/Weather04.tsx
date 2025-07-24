import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ChevronRight, 
  Cloud,
  Droplets,
  Thermometer,
  Gauge,
  Wind,
  BarChart3
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";
import { GET } from '../../../utils/ApiHandler';

const useWeatherAnalytics = (weatherData) => {
  const [analytics, setAnalytics] = useState({
    temperature: null,
    humidity: null,
    rainfall: null,
    pressure: null
  });

  useEffect(() => {
    if (weatherData && weatherData.analytics) {
      setAnalytics({
        temperature: {
          status: weatherData.analytics.temperatureAnalytics?.status || 'Normal',
          description: weatherData.analytics.temperatureAnalytics?.description || 'Temperature is within expected range'
        },
        humidity: {
          status: weatherData.analytics.humidityAnalytics?.status || 'Normal',
          description: weatherData.analytics.humidityAnalytics?.description || 'Humidity levels are optimal'
        },
        rainfall: {
          status: weatherData.analytics.rainfallAnalytics?.status || 'Normal',
          description: weatherData.analytics.rainfallAnalytics?.description || 'Rainfall patterns are typical'
        },
        pressure: {
          status: weatherData.analytics.pressureAnalytics?.status || 'Normal',
          description: weatherData.analytics.pressureAnalytics?.description || 'Pressure systems are stable'
        }
      });
    }
  }, [weatherData]);

  return analytics;
};

const Weather04 = () => {
  const { token } = useSelector((state) => state.login);
  const [isLoading, setIsLoading] = useState(true);
  const [weatherData, setWeatherData] = useState(null);
  const [activeTab, setActiveTab] = useState('temperature');
  const [isHovered, setIsHovered] = useState(false);
  const analytics = useWeatherAnalytics(weatherData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GET(`${import.meta.env.VITE_API_URL}/api/v1/iot/analytics`, token);
        if (response && response.data && response.data.analytics) {
          setWeatherData(response.data.analytics);
        }
        setIsLoading(false);
      } catch (e) {
        console.error("Error fetching data:", e);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [token]);

  const getWeatherMetrics = () => {
    if (!weatherData || !weatherData.iotData) return [];
    const { temprature, humidity, rainFall, pressure } = weatherData.iotData;
    
    return {
      temperature: {
        value: temprature.latestReading,
        unit: '°C',
        icon: Thermometer,
        trend: temprature.trend || 'stable',
        analytics: analytics.temperature
      },
      humidity: {
        value: humidity.latestReading,
        unit: '%',
        icon: Droplets,
        trend: humidity.trend || 'stable',
        analytics: analytics.humidity
      },
      rainfall: {
        value: rainFall.lastHour,
        unit: 'mm',
        icon: Cloud,
        trend: rainFall.trend || 'stable',
        analytics: analytics.rainfall
      },
      pressure: {
        value: pressure.latestReading.toFixed(2),
        unit: 'hPa',
        icon: Gauge,
        trend: pressure.trend || 'stable',
        analytics: analytics.pressure
      }
    };
  };

  return (
    <Card className="w-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-2xl hover:shadow-green-100/50 transition-all duration-300 ease-in-out">
      <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-6 rounded-t-2xl">
        <div className="md:flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl font-bold text-green-900 dark:text-white flex items-center gap-3">
              <Wind className="text-green-600 dark:text-blue-400" />
              Weather Info
            </CardTitle>
            <CardDescription className="text-green-700 dark:text-blue-200">
              Real-time weather monitoring and analysis
            </CardDescription>
          </div>
          <Badge variant="outline" className="bg-white/30 dark:bg-black/30">
            Live Data
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {isLoading ? (
          <div className="flex items-center justify-center h-48">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Wind className="w-8 h-8 text-green-600 dark:text-blue-400" />
            </motion.div>
          </div>
        ) : (
          <Tabs 
            defaultValue="temperature" 
            className="w-full"
            onValueChange={setActiveTab}
          >
            <TabsList className="grid w-full h-full grid-cols-2 md:grid-cols-4 bg-green-50 dark:bg-gray-800">
              {Object.entries(getWeatherMetrics()).map(([key, data]) => (
                <TabsTrigger 
                  key={key}
                  value={key} 
                  className={cn(
                    "flex items-center gap-2 transition-all duration-300",
                    activeTab === key ? 'bg-green-200 dark:bg-blue-900' : ''
                  )}
                >
                  <data.icon className="w-4 h-4" /> 
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>

            <AnimatePresence mode="wait">
              {Object.entries(getWeatherMetrics()).map(([key, data]) => (
                <TabsContent key={key} value={key}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4  p-6 bg-white/50 dark:bg-gray-900/50 rounded-lg"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300">
                            Current Reading
                          </h3>
                          <Badge variant="secondary">
                            {data.trend}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="p-4 rounded-full bg-green-100 dark:bg-blue-900">
                            <data.icon className="w-8 h-8 text-green-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <p className="text-3xl font-bold text-green-700 dark:text-blue-200">
                              {data.value} {data.unit}
                            </p>
                            <p className="text-sm text-green-600 dark:text-blue-300">
                              Last updated: {new Date().toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300">
                            Analysis
                          </h3>
                          <Badge variant={data.analytics?.status === 'Normal' ? 'outline' : 'destructive'}>
                            {data.analytics?.status}
                          </Badge>
                        </div>
                        <p className="text-green-700 dark:text-blue-200">
                          {data.analytics?.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>
              ))}
            </AnimatePresence>
          </Tabs>
        )}

        <div className="mt-6 flex justify-between items-center">
          <Button 
            variant="outline" 
            className="group hover:bg-green-100 dark:hover:bg-blue-900 transition-all"
          >
            Historical Data 
            <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <div className="flex items-center space-x-2">
            <BarChart3 className="text-green-600 dark:text-blue-400" />
            <span className="text-sm text-green-700 dark:text-blue-200">
              Last 24 Hours
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Weather04;
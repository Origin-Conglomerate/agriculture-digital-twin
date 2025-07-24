import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ChevronRight, 
  CloudRain,
  Droplets,
  Thermometer,
  Umbrella,
  BarChart3,
  Wind,
  Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";
import { GET } from '../../utils/ApiHandler';
import { Link } from "react-router-dom";

// Extended forecast analysis hook
const useForecastAnalysis = (forecastData) => {
  const [analysis, setAnalysis] = useState({
    trend: null,
    impact: null,
    recommendations: null
  });

  useEffect(() => {
    if (forecastData) {
      // Analyze weather patterns and generate insights
      const precipitation = forecastData.HasPrecipitation;
      const temp = forecastData.Temperature.Value;
      const rainProb = forecastData.PrecipitationProbability;

      setAnalysis({
        trend: {
          type: 'pattern',
          message: `Weather pattern: ${forecastData.IconPhrase}`,
          severity: rainProb > 70 ? 'high' : rainProb > 30 ? 'medium' : 'low'
        },
        impact: {
          type: 'effect',
          message: precipitation ? 
            'Potential impact on outdoor activities' : 
            'Favorable conditions for outdoor activities',
          severity: precipitation ? 'high' : 'low'
        },
        recommendations: {
          type: 'action',
          message: temp > 80 ? 
            'Consider indoor activities during peak hours' : 
            'Ideal conditions for outdoor activities',
          severity: temp > 80 ? 'medium' : 'low'
        }
      });
    }
  }, [forecastData]);

  return analysis;
};

const Forecasts = () => {
  const { token } = useSelector((state) => state.login);
  const [isLoading, setIsLoading] = useState(true);
  const [forecastData, setForecastData] = useState(null);
  const [activeTab, setActiveTab] = useState('current');
  
  const analysis = useForecastAnalysis(forecastData);

  useEffect(() => {
    const getOneHourForecastData = async () => {
      try {
        const forecast = await GET(`${import.meta.env.VITE_API_URL}/api/v1/onehourforecast/oneHourForecastData`, token);
        if (forecast && forecast.data) {
          setForecastData(forecast.data.oneHourForecastData[0]);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      } catch (e) {
        console.error("Error fetching data:", e);
        setIsLoading(false);
      }
    };
    getOneHourForecastData();
  }, [token]);

  return (
    <Card className="w-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-blue-100/50 dark:border-blue-900/30 rounded-2xl shadow-2xl hover:shadow-blue-100/50 transition-all duration-300 ease-in-out">
      <CardHeader className="bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900/50 dark:to-green-900/50 p-6 rounded-t-2xl">
        <div className="md:flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl font-bold text-blue-900 dark:text-white flex items-center gap-3">
              <CloudRain className="text-blue-600 dark:text-blue-400" />
              Forecasts
            </CardTitle>
            <CardDescription className="text-blue-700 dark:text-blue-200">
              Real-time weather intelligence and forecasting
            </CardDescription>
          </div>
          <Badge variant="outline" className="bg-white/30 dark:bg-black/30">
            Live Updates
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        <Tabs 
          defaultValue="current" 
          className="w-full"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full grid-cols-3 bg-blue-50 dark:bg-gray-800">
            <TabsTrigger 
              value="current" 
              className={cn(
                "flex items-center gap-2 transition-all duration-300",
                activeTab === 'current' ? 'bg-blue-200 dark:bg-blue-900' : ''
              )}
            >
              <Thermometer className="w-4 h-4" /> Current
            </TabsTrigger>
            <TabsTrigger 
              value="precipitation" 
              className={cn(
                "flex items-center gap-2 transition-all duration-300",
                activeTab === 'precipitation' ? 'bg-blue-200 dark:bg-blue-900' : ''
              )}
            >
              <Droplets className="w-4 h-4" /> Rainfall
            </TabsTrigger>
            <TabsTrigger 
              value="analysis" 
              className={cn(
                "flex items-center gap-2 transition-all duration-300",
                activeTab === 'analysis' ? 'bg-blue-200 dark:bg-blue-900' : ''
              )}
            >
              <BarChart3 className="w-4 h-4" /> Analysis
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
              {isLoading ? (
                <div className="flex items-center justify-center p-8">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Wind className="w-8 h-8 text-blue-500" />
                  </motion.div>
                </div>
              ) : forecastData ? (
                <>
                  {activeTab === 'current' && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300">
                          Current Weather
                        </h3>
                        <Badge variant="secondary">{forecastData.IconPhrase}</Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Thermometer className="text-blue-500" />
                            <div>
                              <p className="text-sm text-blue-700 dark:text-blue-200">Temperature</p>
                              <p className="text-2xl font-bold text-blue-900 dark:text-white">
                                {forecastData.Temperature.Value}°F
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Wind className="text-blue-500" />
                            <div>
                              <p className="text-sm text-blue-700 dark:text-blue-200">Conditions</p>
                              <p className="text-2xl font-bold text-blue-900 dark:text-white">
                                {forecastData.IconPhrase}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'precipitation' && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300">
                          Precipitation Details
                        </h3>
                        <Badge variant="outline">
                          {forecastData.HasPrecipitation ? 'Active' : 'None'}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Droplets className="text-blue-500" />
                            <div>
                              <p className="text-sm text-blue-700 dark:text-blue-200">Probability</p>
                              <p className="text-2xl font-bold text-blue-900 dark:text-white">
                                {forecastData.PrecipitationProbability}%
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Umbrella className="text-blue-500" />
                            <div>
                              <p className="text-sm text-blue-700 dark:text-blue-200">Status</p>
                              <p className="text-2xl font-bold text-blue-900 dark:text-white">
                                {forecastData.HasPrecipitation ? 'Expected' : 'Clear'}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'analysis' && analysis.trend && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300">
                          Weather Analysis
                        </h3>
                        <Badge variant="secondary">{analysis.trend.type}</Badge>
                      </div>
                      <div className="space-y-4">
                        {Object.entries(analysis).map(([key, data]) => (
                          <div key={key} className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <h4 className="font-medium text-blue-700 dark:text-blue-200 capitalize">
                                {key}
                              </h4>
                              <Badge 
                                variant={
                                  data.severity === 'high' ? 'destructive' : 
                                  data.severity === 'medium' ? 'secondary' : 
                                  'outline'
                                }
                              >
                                {data.severity}
                              </Badge>
                            </div>
                            <p className="text-blue-900 dark:text-blue-100">
                              {data.message}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center p-4 text-blue-700 dark:text-blue-200">
                  No forecast data available
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </Tabs>

        <div className="mt-6 flex justify-between items-center gap-5">
          <Link to="/fivedaysforecast">
            <Button 
              variant="outline" 
              className="group hover:bg-blue-100 dark:hover:bg-blue-900 transition-all"
            >
              5-Day Forecast 
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <div className="flex items-center space-x-2">
            <Calendar className="text-blue-600 dark:text-blue-400" />
            <span className="text-sm text-blue-700 dark:text-blue-200">
              Updated {new Date().toLocaleTimeString()}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Forecasts;
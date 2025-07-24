import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import {
  Cloud,
  Droplets,
  Thermometer,
  ArrowDownToLine,
  ChevronRight,
  Download,
  RefreshCcw,
  AlertTriangle,
  Share2,
  ThermometerIcon,
  CloudRainIcon,
  GaugeIcon,
  WindIcon,
  SunIcon,
  SunriseIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";
import { GET } from '../../../utils/ApiHandler';

const EnvironmentHistory04 = () => {
  const [activeTab, setActiveTab] = useState("daily");
  const [weatherData, setWeatherData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    fetchWeatherData();
    if (autoRefresh) {
      const interval = setInterval(fetchWeatherData, 5000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const fetchWeatherData = async () => {
    try {
      setError(null);
      const response = await GET(`${import.meta.env.VITE_API_URL}/api/v1/iot/iotData`);
      setWeatherData(response.data.iotData);
    } catch (error) {
      setError("Failed to fetch soil data. Please try again later.");
      console.error("Error fetching weather data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const processDataForPeriod = (data, period) => {
    const currentDate = new Date();
    let startDate = new Date(currentDate);
    let filteredData = [];
    
    switch (period) {
      case 'daily':
        startDate.setHours(0, 0, 0, 0);
        filteredData = data.filter(item => new Date(item.createdAt) >= startDate);
        break;
      case 'weekly':
        startDate.setDate(currentDate.getDate() - 7);
        filteredData = data.filter(item => new Date(item.createdAt) >= startDate);
        break;
      case 'monthly':
        startDate.setMonth(currentDate.getMonth() - 1);
        filteredData = data.filter(item => new Date(item.createdAt) >= startDate);
        break;
      default:
        break;
    }
    return filteredData.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  };

  const currentData = processDataForPeriod(weatherData, activeTab);

  const latestReadings = currentData.length ? {
    lux: parseFloat(currentData[currentData.length - 1].lux.latestReading),
    solarIntensity: parseFloat(currentData[currentData.length - 1].solarIntensity.latestReading),
    windspeed: parseFloat(currentData[currentData.length - 1].windSpeed),
    temperature: parseFloat(currentData[currentData.length - 1].temperature),
  } : null;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-900 p-2 rounded-lg shadow-lg border border-green-100/50 dark:border-blue-900/30">
          <p className="text-xs text-green-800 dark:text-blue-200">
            {new Date(label).toLocaleString()}
          </p>
          {payload.map((entry, index) => (
            <p key={index} className="text-xs" style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value} ${entry.unit || ''}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const downloadData = () => {
    const csv = [
      ['Timestamp', 'Temperature (°C)', 'Humidity (%)', 'Rainfall (mm)', 'Pressure (hPa)'],
      ...currentData.map(record => [
        new Date(record.createdAt).toISOString(),
        record.temperature,
        record.humidity.latestReading,
        record.rainFall.last24Hour,
        record.pressure.latestReading
      ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `environment-data-${activeTab}-${new Date().toISOString()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <Card className="w-full mx-auto p-2 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-2xl hover:shadow-green-100/50 transition-all duration-300 ease-in-out">
      <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-3 rounded-t-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
          <div className="w-full md:w-auto">
            <CardTitle className="text-lg font-bold text-green-900 dark:text-white flex items-center gap-2">
              <Cloud className="w-5 h-5 text-green-600 dark:text-blue-400" />
              Environment Analytics - 04
            </CardTitle>
            <CardDescription className="text-sm text-green-700 dark:text-blue-200">
              Real-time Environment monitoring and analysis
            </CardDescription>
          </div>
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={cn(
                "text-xs bg-white/30 dark:bg-black/30 w-auto",
                autoRefresh && "text-green-600 dark:text-blue-400"
              )}
            >
              <RefreshCcw className="w-3 h-3 mr-1" />
              {autoRefresh ? "Auto-refresh On" : "Auto-refresh Off"}
            </Button>
            <Badge variant="outline" className="text-xs bg-white/30 dark:bg-black/30">
              IoT-Powered
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-2 space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertTriangle className="h-3 w-3" />
            <AlertDescription className="text-xs">{error}</AlertDescription>
          </Alert>
        )}

        <Tabs 
          defaultValue="daily" 
          value={activeTab}
          className="w-full"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full grid-cols-3 bg-green-50 dark:bg-gray-800">
            {['daily', 'weekly', 'monthly'].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className={cn(
                  "flex items-center gap-1 transition-all duration-300 text-xs",
                  activeTab === tab ? 'bg-green-200 dark:bg-blue-900' : ''
                )}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </TabsTrigger>
            ))}
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Charts */}
                <div className="space-y-4">
                  {/* Lux Chart */}
                  <Card className="p-3 bg-white/50 dark:bg-gray-900/50">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <h3 className="text-sm font-semibold text-green-800 dark:text-blue-300 flex items-center gap-1">
                          <SunriseIcon className="w-4 h-4" />
                          Lux
                        </h3>
                        <p className="text-xs text-green-600 dark:text-blue-200">
                          Current: {latestReadings?.lux} lx
                        </p>
                      </div>
                      <Badge variant="outline" className="text-xs">Lux</Badge>
                    </div>
                    <div className="h-40">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={currentData}>
                          <CartesianGrid strokeDasharray="3 3" className="opacity-50" />
                          <XAxis 
                            dataKey="createdAt"
                            tickFormatter={(timestamp) => new Date(timestamp).toLocaleTimeString()}
                            tick={{ fontSize: 10 }}
                          />
                          <YAxis tick={{ fontSize: 10 }} />
                          <Tooltip content={<CustomTooltip />} />
                          <Line
                            type="monotone"
                            dataKey="lux.latestReading"
                            stroke="#22c55e"
                            strokeWidth={2}
                            dot={false}
                            name="Lux"
                            unit="lx"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </Card>

                  {/* Solar Intensity Chart */}
                  <Card className="p-3 bg-white/50 dark:bg-gray-900/50">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <h3 className="text-sm font-semibold text-green-800 dark:text-blue-300 flex items-center gap-1">
                          <SunIcon className="w-4 h-4" />
                          Solar Intensity
                        </h3>
                        <p className="text-xs text-green-600 dark:text-blue-200">
                          Current: {latestReadings?.solarIntensity} W/m²
                        </p>
                      </div>
                      <Badge variant="outline" className="text-xs">Solar Intensity</Badge>
                    </div>
                    <div className="h-40">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={currentData}>
                          <CartesianGrid strokeDasharray="3 3" className="opacity-50" />
                          <XAxis 
                            dataKey="createdAt"
                            tickFormatter={(timestamp) => new Date(timestamp).toLocaleTimeString()}
                            tick={{ fontSize: 10 }}
                          />
                          <YAxis tick={{ fontSize: 10 }} />
                          <Tooltip content={<CustomTooltip />} />
                          <Line
                            type="monotone"
                            dataKey="solarIntensity.latestReading"
                            stroke="#ef4444"
                            strokeWidth={2}
                            dot={false}
                            name="Solar Intensity"
                            unit="W/m²"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </Card>
                </div>

                {/* Wind Speed Chart */}
                <Card className="p-3 bg-white/50 dark:bg-gray-900/50">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <h3 className="text-sm font-semibold text-green-800 dark:text-blue-300 flex items-center gap-1">
                        <WindIcon className="w-4 h-4" />
                        Wind Speed
                      </h3>
                      <p className="text-xs text-green-600 dark:text-blue-200">
                        Current: {latestReadings?.windspeed} km/h
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs">Wind Speed</Badge>
                  </div>
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={currentData}>
                        <CartesianGrid strokeDasharray="3 3" className="opacity-50" />
                        <XAxis 
                          dataKey="createdAt"
                          tickFormatter={(timestamp) => new Date(timestamp).toLocaleTimeString()}
                          tick={{ fontSize: 10 }}
                        />
                        <YAxis tick={{ fontSize: 10 }} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend wrapperStyle={{ fontSize: '10px' }} />
                        <Line
                          type="monotone"
                          dataKey="windSpeed"
                          stroke="#3b82f6"
                          strokeWidth={2}
                          dot={false}
                          name="Wind Speed"
                          unit="km/h"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </div>
            </motion.div>
          </AnimatePresence>
        </Tabs>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-col lg:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              className="group hover:bg-green-100 dark:hover:bg-blue-900 transition-all"
              onClick={downloadData}
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button 
              variant="outline"
              className="group hover:bg-green-100 dark:hover:bg-blue-900 transition-all"
              onClick={() => fetchWeatherData()}
            >
              <RefreshCcw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button 
              variant="outline"
              className="group hover:bg-green-100 dark:hover:bg-blue-900 transition-all"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-2">
            <Button 
              variant="default"
              className="bg-green-600 hover:bg-green-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-sm px-4 py-2"
            >
              Detailed Analysis
              <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Badge 
              variant="outline" 
              className="bg-white/30 dark:bg-black/30 text-sm px-3 py-1"
            >
              Last Updated: {currentData.length > 0 
                ? new Date(currentData[currentData.length - 1].createdAt).toLocaleTimeString() 
                : 'N/A'}
            </Badge>
          </div>
        </div>

        {/* Additional Features Section */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Optimal Ranges Card */}
          <Card className="p-4 bg-white/50 dark:bg-gray-900/50 rounded-lg shadow-md">
            <CardTitle className="text-sm font-semibold text-green-800 dark:text-blue-300 mb-3">
              Optimal Ranges
            </CardTitle>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-green-600 dark:text-blue-200">Lux</span>
                <Badge variant="outline" className="text-sm px-2 py-1">10 lx</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-green-600 dark:text-blue-200">Solar Intensity</span>
                <Badge variant="outline" className="text-sm px-2 py-1">600 W/m²</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-green-600 dark:text-blue-200">Wind Speed</span>
                <Badge variant="outline" className="text-sm px-2 py-1">4 km/h</Badge>
              </div>
            </div>
          </Card>

          {/* Status Alerts Card */}
          <Card className="p-4 bg-white/50 dark:bg-gray-900/50 rounded-lg shadow-md">
            <CardTitle className="text-sm font-semibold text-green-800 dark:text-blue-300 mb-3">
              Status Alerts
            </CardTitle>
            <div className="space-y-3">
              {latestReadings && (
                <>
                  {latestReadings.lux > 10 && (
                    <Alert className="bg-red-100/50 dark:bg-red-900/50 border-red-200 flex items-center p-2 rounded-md">
                      <AlertTriangle className="h-4 w-4 text-red-600 mr-2" />
                      <AlertDescription className="text-sm text-red-700 dark:text-red-200">
                        High Lux detected
                      </AlertDescription>
                    </Alert>
                  )}
                  {latestReadings.solarIntensity < 600 && (
                    <Alert className="bg-yellow-100/50 dark:bg-yellow-900/50 border-yellow-200 flex items-center p-2 rounded-md">
                      <AlertTriangle className="h-4 w-4 text-yellow-600 mr-2" />
                      <AlertDescription className="text-sm text-yellow-700 dark:text-yellow-200">
                        Low Solar Intensity
                      </AlertDescription>
                    </Alert>
                  )}
                  {latestReadings.windspeed > 5 && (
                    <Alert className="bg-blue-100/50 dark:bg-blue-900/50 border-blue-200 flex items-center p-2 rounded-md">
                      <AlertTriangle className="h-4 w-4 text-blue-600 mr-2" />
                      <AlertDescription className="text-sm text-blue-700 dark:text-blue-200">
                        High Wind Speed
                      </AlertDescription>
                    </Alert>
                  )}
                </>
              )}
            </div>
          </Card>

          {/* Quick Stats Card */}
          <Card className="p-4 bg-white/50 dark:bg-gray-900/50 rounded-lg shadow-md">
            <CardTitle className="text-sm font-semibold text-green-800 dark:text-blue-300 mb-3">
              Quick Stats
            </CardTitle>
            <div className="space-y-3">
              {currentData.length > 0 && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-green-600 dark:text-blue-200">Avg Temp Today</span>
                    <Badge variant="outline" className="text-sm px-2 py-1">
                      {(currentData.reduce((acc, curr) => acc + parseFloat(curr.temperature), 0) / currentData.length).toFixed(1)}°C
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-green-600 dark:text-blue-200">Peak Solar Intensity</span>
                    <Badge variant="outline" className="text-sm px-2 py-1">
                      {Math.max(...currentData.map(d => parseFloat(d.solarIntensity.latestReading)))} W/m²
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-green-600 dark:text-blue-200">Data Points</span>
                    <Badge variant="outline" className="text-sm px-2 py-1">
                      {currentData.length}
                    </Badge>
                  </div>
                </>
              )}
            </div>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnvironmentHistory04;
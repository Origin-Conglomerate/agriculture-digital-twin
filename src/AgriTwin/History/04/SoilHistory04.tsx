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
  Share2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";
import { GET } from '../../../utils/ApiHandler';

const SoilHistory04 = () => {
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

  // Preserve existing data processing functions
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
    leafWetness: currentData[currentData.length - 1].leafWetness,
    soilTemp: currentData[currentData.length - 1].soilTemprature,
    soilMoistureL1: currentData[currentData.length - 1].soilMoistureL1,
    soilMoistureL2: currentData[currentData.length - 1].soilMoistureL2
  } : null;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg border border-green-100/50 dark:border-blue-900/30">
          <p className="text-sm text-green-800 dark:text-blue-200">
            {new Date(label).toLocaleString()}
          </p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
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
      ['Timestamp', 'Leaf Wetness (%)', 'Soil Temperature (°C)', 'Soil Moisture L1 (cbar)', 'Soil Moisture L2 (cbar)'],
      ...currentData.map(record => [
        new Date(record.createdAt).toISOString(),
        record.leafWetness,
        record.soilTemprature,
        record.soilMoistureL1,
        record.soilMoistureL2
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `soil-data-${activeTab}-${new Date().toISOString()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <Card className="w-full h-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-2xl hover:shadow-green-100/50 transition-all duration-300 ease-in-out">
      <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-4 lg:p-6 rounded-t-2xl">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <CardTitle className="text-xl lg:text-2xl font-bold text-green-900 dark:text-white flex items-center gap-3">
              <Cloud className="text-green-600 dark:text-blue-400" />
              Soil Analytics Dashboard - 04
            </CardTitle>
            <CardDescription className="text-green-700 dark:text-blue-200">
              Real-time soil condition monitoring and analysis
            </CardDescription>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={cn(
                "bg-white/30 dark:bg-black/30",
                autoRefresh && "text-green-600 dark:text-blue-400"
              )}
            >
              <RefreshCcw className="w-4 h-4 mr-2" />
              {autoRefresh ? "Auto-refresh On" : "Auto-refresh Off"}
            </Button>
            <Badge variant="outline" className="bg-white/30 dark:bg-black/30">
              IoT-Powered
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 lg:p-6 space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
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
                  "flex items-center gap-2 transition-all duration-300",
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
                {/* Leaf Wetness Chart */}
                <Card className="p-4 bg-white/50 dark:bg-gray-900/50">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300 flex items-center gap-2">
                        <Droplets className="w-5 h-5" />
                        Leaf Wetness
                      </h3>
                      <p className="text-sm text-green-600 dark:text-blue-200">
                        Current: {latestReadings?.leafWetness}%
                      </p>
                    </div>
                    <Badge variant="outline">Humidity</Badge>
                  </div>
                  <div className="h-48 lg:h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={currentData}>
                        <CartesianGrid strokeDasharray="3 3" className="opacity-50" />
                        <XAxis
                          dataKey="createdAt"
                          tickFormatter={(timestamp) => new Date(timestamp).toLocaleTimeString()}
                        />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                        <Line
                          type="monotone"
                          dataKey="leafWetness"
                          stroke="#22c55e"
                          strokeWidth={2}
                          dot={false}
                          name="Leaf Wetness"
                          unit="%"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </Card>

                {/* Soil Temperature Chart */}
                <Card className="p-4 bg-white/50 dark:bg-gray-900/50">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300 flex items-center gap-2">
                        <Thermometer className="w-5 h-5" />
                        Soil Temperature
                      </h3>
                      <p className="text-sm text-green-600 dark:text-blue-200">
                        Current: {latestReadings?.soilTemp}°C
                      </p>
                    </div>
                    <Badge variant="outline">Temperature</Badge>
                  </div>
                  <div className="h-48 lg:h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={currentData}>
                        <CartesianGrid strokeDasharray="3 3" className="opacity-50" />
                        <XAxis
                          dataKey="createdAt"
                          tickFormatter={(timestamp) => new Date(timestamp).toLocaleTimeString()}
                        />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                        <Line
                          type="monotone"
                          dataKey="soilTemprature"
                          stroke="#ef4444"
                          strokeWidth={2}
                          dot={false}
                          name="Soil Temperature"
                          unit="°C"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </Card>

                {/* Soil Moisture Charts */}
                <Card className="p-4 bg-white/50 dark:bg-gray-900/50 lg:col-span-2">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300 flex items-center gap-2">
                        <ArrowDownToLine className="w-5 h-5" />
                        Soil Moisture Levels
                      </h3>
                      <p className="text-sm text-green-600 dark:text-blue-200">
                        L1: {latestReadings?.soilMoistureL1} cbar | L2: {latestReadings?.soilMoistureL2} cbar
                      </p>
                    </div>
                    <Badge variant="outline">Moisture</Badge>
                  </div>
                  <div className="h-48 lg:h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={currentData}>
                        <CartesianGrid strokeDasharray="3 3" className="opacity-50" />
                        <XAxis
                          dataKey="createdAt"
                          tickFormatter={(timestamp) => new Date(timestamp).toLocaleTimeString()}
                        />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="soilMoistureL1"
                          stroke="#3b82f6"
                          strokeWidth={2}
                          dot={false}
                          name="Level 1"
                          unit=" cbar"
                        />
                        <Line
                          type="monotone"
                          dataKey="soilMoistureL2"
                          stroke="#8b5cf6"
                          strokeWidth={2}
                          dot={false}
                          name="Level 2"
                          unit=" cbar"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </div>
            </motion.div>
          </AnimatePresence>
        </Tabs>

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
          <div className="flex flex-wrap items-center gap-4">
            <Button 
              variant="default" 
              className="bg-green-600 hover:bg-green-700 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              Detailed Analysis
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Badge 
              variant="outline" 
              className="bg-white/30 dark:bg-black/30"
            >
              Last Updated: {currentData.length > 0 
                ? new Date(currentData[currentData.length - 1].createdAt).toLocaleTimeString() 
                : 'N/A'}
            </Badge>
          </div>
        </div>

        {/* Additional Features Section */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="p-4 bg-white/50 dark:bg-gray-900/50">
            <CardTitle className="text-lg font-semibold text-green-800 dark:text-blue-300 mb-2">
              Optimal Ranges
            </CardTitle>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-green-600 dark:text-blue-200">Leaf Wetness</span>
                <Badge variant="outline">60-80%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-green-600 dark:text-blue-200">Soil Temperature</span>
                <Badge variant="outline">18-24°C</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-green-600 dark:text-blue-200">Soil Moisture</span>
                <Badge variant="outline">20-40 cbar</Badge>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-white/50 dark:bg-gray-900/50">
            <CardTitle className="text-lg font-semibold text-green-800 dark:text-blue-300 mb-2">
              Status Alerts
            </CardTitle>
            <div className="space-y-2">
              {latestReadings && (
                <>
                  {latestReadings.soilTemp > 24 && (
                    <Alert className="bg-red-100/50 dark:bg-red-900/50 border-red-200">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <AlertDescription className="text-red-700 dark:text-red-200">
                        High soil temperature detected
                      </AlertDescription>
                    </Alert>
                  )}
                  {latestReadings.soilMoistureL1 < 20 && (
                    <Alert className="bg-yellow-100/50 dark:bg-yellow-900/50 border-yellow-200">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <AlertDescription className="text-yellow-700 dark:text-yellow-200">
                        Low moisture level in upper soil
                      </AlertDescription>
                    </Alert>
                  )}
                  {latestReadings.leafWetness > 80 && (
                    <Alert className="bg-blue-100/50 dark:bg-blue-900/50 border-blue-200">
                      <AlertTriangle className="h-4 w-4 text-blue-600" />
                      <AlertDescription className="text-blue-700 dark:text-blue-200">
                        High leaf wetness - disease risk
                      </AlertDescription>
                    </Alert>
                  )}
                </>
              )}
            </div>
          </Card>

          <Card className="p-4 bg-white/50 dark:bg-gray-900/50">
            <CardTitle className="text-lg font-semibold text-green-800 dark:text-blue-300 mb-2">
              Quick Stats
            </CardTitle>
            <div className="space-y-2">
              {currentData.length > 0 && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-green-600 dark:text-blue-200">Avg Temp Today</span>
                    <Badge variant="outline">
                      {(currentData.reduce((acc, curr) => acc + curr.soilTemprature, 0) / currentData.length).toFixed(1)}°C
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-green-600 dark:text-blue-200">Peak Moisture</span>
                    <Badge variant="outline">
                      {Math.max(...currentData.map(d => d.soilMoistureL1))} cbar
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-green-600 dark:text-blue-200">Data Points</span>
                    <Badge variant="outline">
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

export default SoilHistory04;
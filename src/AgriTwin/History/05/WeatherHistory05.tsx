import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  GaugeIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";
import { GET } from '../../../utils/ApiHandler';
import { useSelector } from 'react-redux';
import { useToast } from "@/hooks/use-toast";

interface TenantResponse {
  success: boolean;
  data: {
    tenant: {
      iotSystem: {
        username: string;
      };
    };
  };
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    unit?: string;
    color: string;
  }>;
  label?: string;
}

const WeatherHistory05 = () => {
  const { token, tenantId } = useSelector((state: { login: { token: string; tenantId: string } }) => state.login);
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [historicalData, setHistoricalData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    fetchHistoricalData();
    
    if (autoRefresh) {
      const interval = setInterval(fetchHistoricalData, 5000);
      return () => clearInterval(interval);
    }
  }, [activeTab, tenantId, token, autoRefresh]);

  const fetchHistoricalData = async () => {
    try {
      setIsLoading(true);
      setError(null);


    //   const profileResponse = await GET(
    //     `${import.meta.env.VITE_USERS_API_URL}/api/v1/users/tenants/profile/${tenantId}`,
    //     token
    //   );

    //   if (!profileResponse.success || !profileResponse.data?.tenant?.iotSystem?.username) {
    //     throw new Error('IoT system not configured for this tenant');
    //   }

    //   const plotId = profileResponse.data.tenant.iotSystem.username;

      const response = await GET(
        `${import.meta.env.VITE_API_URL}/api/v1/fyllo/historicalData?type=${activeTab}&category=weather`,
        token
      );

      if (!response.success || !response.data) {
        throw new Error(response.message || 'Failed to fetch historical data');
      }

      setHistoricalData(response.data.historicalData);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch historical data';
      setError(message);
      toast({
        variant: "destructive",
        title: "Error",
        description: message
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value as 'daily' | 'weekly' | 'monthly');
  };

  const getCurrentValues = () => {
    if (!historicalData) return { temp: 'N/A', humidity: 'N/A', pressure: 'N/A', rainfall: 'N/A' };
    
    return {
      temp: historicalData.temperature[historicalData.temperature.length - 1]?.value.toFixed(1) ?? 'N/A',
      humidity: historicalData.humidity[historicalData.humidity.length - 1]?.value.toFixed(1) ?? 'N/A',
      pressure: historicalData.pressure[historicalData.pressure.length - 1]?.value.toFixed(1) ?? 'N/A',
      rainfall: historicalData.rainfall[historicalData.rainfall.length - 1]?.value.toFixed(1) ?? 'N/A'
    };
  };

  const getLastUpdatedTime = () => {
    if (!historicalData?.temperature.length) return 'N/A';
    const lastTimestamp = historicalData.temperature[historicalData.temperature.length - 1].timestamp;
    return new Date(lastTimestamp).toLocaleTimeString();
  };

  const getAverages = () => {
    if (!historicalData) return { avgTemp: 'N/A', peakHumidity: 'N/A', dataPoints: 0 };

    const avgTemp = historicalData.temperature.length > 0
      ? (historicalData.temperature.reduce((acc, curr) => acc + curr.value, 0) / historicalData.temperature.length).toFixed(1)
      : 'N/A';

    const peakHumidity = historicalData.humidity.length > 0
      ? Math.max(...historicalData.humidity.map(h => h.value)).toFixed(1)
      : 'N/A';

    return {
      avgTemp,
      peakHumidity,
      dataPoints: historicalData.temperature.length
    };
  };

  const downloadData = () => {
    if (!historicalData) return;

    const combinedData = historicalData.temperature.map((temp, index) => ({
      timestamp: temp.timestamp,
      'Temperature': temp.value,
      'Humidity': historicalData.humidity[index]?.value,
      'Pressure': historicalData.pressure[index]?.value,
      'Rainfall': historicalData.rainfall[index]?.value
    }));

    const csv = [
      ['Timestamp', 'Temperature (°C)', 'Humidity (%)', 'Pressure (hPa)', 'Rainfall (mm)'],
      ...combinedData.map(record => [
        new Date(record.timestamp).toISOString(),
        record.Temperature,
        record.Humidity,
        record.Pressure,
        record.Rainfall
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `weather-history-${activeTab}-${new Date().toISOString()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg border border-green-100/50 dark:border-blue-900/30">
          <p className="text-sm text-green-800 dark:text-blue-200">
            {label ? new Date(label).toLocaleString() : ''}
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

  const renderAlerts = () => {
    if (!historicalData) return null;

    return (
      <>
        {historicalData.temperature.some(temp => temp.value > 30) && (
          <Alert className="bg-red-100/50 dark:bg-red-900/50 border-red-200">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-700 dark:text-red-200">
              High temperature detected
            </AlertDescription>
          </Alert>
        )}
        {historicalData.humidity.some(hum => hum.value > 85) && (
          <Alert className="bg-yellow-100/50 dark:bg-yellow-900/50 border-yellow-200">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-700 dark:text-yellow-200">
              High humidity levels
            </AlertDescription>
          </Alert>
        )}
        {historicalData.rainfall.some(rain => rain.value > 50) && (
          <Alert className="bg-blue-100/50 dark:bg-blue-900/50 border-blue-200">
            <AlertTriangle className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-700 dark:text-blue-200">
              Heavy rainfall detected
            </AlertDescription>
          </Alert>
        )}
      </>
    );
  };

  return (
    <Card className="w-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-2xl hover:shadow-green-100/50 transition-all duration-300 ease-in-out">
      <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-6 rounded-t-2xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <CardTitle className="text-2xl font-bold text-green-900 dark:text-white flex items-center gap-3">
              <Cloud className="text-green-600 dark:text-blue-400" />
              Weather Analytics
            </CardTitle>
            <CardDescription className="text-green-700 dark:text-blue-200">
              Real-time Weather monitoring and analysis
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
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

      <CardContent className="p-6 space-y-6">
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
          onValueChange={handleTabChange}
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
              <ScrollArea className="h-[600px] rounded-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
                  {/* Temperature Chart */}
                  <Card className="p-4 bg-white/50 dark:bg-gray-900/50">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300 flex items-center gap-2">
                          <ThermometerIcon className="w-5 h-5" />
                          Temperature
                        </h3>
                        <p className="text-sm text-green-600 dark:text-blue-200">
                          Current: {getCurrentValues().temp}°C
                        </p>
                      </div>
                      <Badge variant="outline">Temperature</Badge>
                    </div>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={historicalData?.temperature || []}>
                          <CartesianGrid strokeDasharray="3 3" className="opacity-50" />
                          <XAxis
                            dataKey="timestamp"
                            tickFormatter={(timestamp) => new Date(timestamp).toLocaleTimeString()}
                          />
                          <YAxis />
                          <Tooltip content={<CustomTooltip />} />
                          <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#22c55e"
                            strokeWidth={2}
                            dot={false}
                            name="temperatue"
                            unit="°C"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </Card>

                  {/* RainFall Chart */}
                  <Card className="p-4 bg-white/50 dark:bg-gray-900/50">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300 flex items-center gap-2">
                          <CloudRainIcon className="w-5 h-5" />
                          Rainfall
                        </h3>
                        <p className="text-sm text-green-600 dark:text-blue-200">
                          Current: {getCurrentValues().rainfall} mm
                        </p>
                      </div>
                      <Badge variant="outline">Rainfall</Badge>
                    </div>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={historicalData?.rainfall || []}>
                          <CartesianGrid strokeDasharray="3 3" className="opacity-50" />
                          <XAxis
                            dataKey="timestamp"
                            tickFormatter={(timestamp) => new Date(timestamp).toLocaleTimeString()}
                          />
                          <YAxis />
                          <Tooltip content={<CustomTooltip />} />
                          <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#ef4444"
                            strokeWidth={2}
                            dot={false}
                            name="Rainfall"
                            unit="mm"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </Card>

                  {/* Humidity Chart */}
                  <Card className="p-4 bg-white/50 dark:bg-gray-900/50 md:col-span-2">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300 flex items-center gap-2">
                          <Droplets className="w-5 h-5" />
                          Humidity
                        </h3>
                        <p className="text-sm text-green-600 dark:text-blue-200">
                          L1: {getCurrentValues().humidity}%
                        </p>
                      </div>
                      <Badge variant="outline">Humidity</Badge>
                    </div>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={historicalData?.humidity || []}>
                          <CartesianGrid strokeDasharray="3 3" className="opacity-50" />
                          <XAxis
                            dataKey="timestamp"
                            tickFormatter={(timestamp) => new Date(timestamp).toLocaleTimeString()}
                          />
                          <YAxis />
                          <Tooltip content={<CustomTooltip />} />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            dot={false}
                            name="Humidity"
                            unit="%"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </Card>

                  {/* Pressure Chart */}
                  <Card className="p-4 bg-white/50 dark:bg-gray-900/50 md:col-span-2">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300 flex items-center gap-2">
                          <GaugeIcon className="w-5 h-5" />
                          Pressure
                        </h3>
                        <p className="text-sm text-green-600 dark:text-blue-200">
                          {getCurrentValues().pressure} hPa
                        </p>
                      </div>
                      <Badge variant="outline">Pressure</Badge>
                    </div>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={historicalData?.pressure || []}>
                          <CartesianGrid strokeDasharray="3 3" className="opacity-50" />
                          <XAxis
                            dataKey="timestamp"
                            tickFormatter={(timestamp) => new Date(timestamp).toLocaleTimeString()}
                          />
                          <YAxis />
                          <Tooltip content={<CustomTooltip />} />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            dot={false}
                            name="Pressure"
                            unit="hPa"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </Card>
                </div>
              </ScrollArea>
            </motion.div>
          </AnimatePresence>
        </Tabs>

        <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="group hover:bg-green-100 dark:hover:bg-blue-900 transition-all"
              onClick={downloadData}
            >
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <Button 
              variant="outline" 
              className="group hover:bg-green-100 dark:hover:bg-blue-900 transition-all"
              onClick={() => fetchHistoricalData()}
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
          <div className="flex items-center gap-4">
            <Button 
              variant="default" 
              className="bg-green-600 hover:bg-green-700 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              Detailed Analysis
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <div className="flex items-center space-x-2">
              <Badge 
                variant="outline" 
                className="bg-white/30 dark:bg-black/30"
              >
                Last Updated: {getLastUpdatedTime()}
              </Badge>
            </div>
          </div>
        </div>

        {/* Additional Features Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 bg-white/50 dark:bg-gray-900/50">
            <CardTitle className="text-lg font-semibold text-green-800 dark:text-blue-300 mb-2">
              Optimal Ranges
            </CardTitle>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-green-600 dark:text-blue-200">Temperature</span>
                <Badge variant="outline">24 °C</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-green-600 dark:text-blue-200">Rainfall</span>
                <Badge variant="outline">20 mm</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-green-600 dark:text-blue-200">Humidity</span>
                <Badge variant="outline">60 %</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-green-600 dark:text-blue-200">Pressure</span>
                <Badge variant="outline">920 hPa</Badge>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-white/50 dark:bg-gray-900/50">
            <CardTitle className="text-lg font-semibold text-green-800 dark:text-blue-300 mb-2">
              Status Alerts
            </CardTitle>
            <div className="space-y-2">
              {renderAlerts()}
            </div>
          </Card>

          <Card className="p-4 bg-white/50 dark:bg-gray-900/50">
            <CardTitle className="text-lg font-semibold text-green-800 dark:text-blue-300 mb-2">
              Quick Stats
            </CardTitle>
            <div className="space-y-2">
              {historicalData && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-green-600 dark:text-blue-200">Avg Temp Today</span>
                    <Badge variant="outline">
                      {getAverages().avgTemp}°C
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-green-600 dark:text-blue-200">Peak Humidity</span>
                    <Badge variant="outline">
                      {getAverages().peakHumidity} %
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-green-600 dark:text-blue-200">Data Points</span>
                    <Badge variant="outline">
                      {getAverages().dataPoints}
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

export default WeatherHistory05;
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
  GaugeIcon,
  WindIcon,
  SunIcon,
  SunriseIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";
import { GET } from '@/utils/ApiHandler';
import { useSelector } from 'react-redux';
import { useToast } from "@/hooks/use-toast";
//import { EnvironmentHistoryData, HistoryResponse } from '@/types/iothistory.types';

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

const EnvironmentHistory05 = () => {
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

    //   const profileResponse = await ApiHandler.GET<TenantResponse>(
    //     `${import.meta.env.VITE_USERS_API_URL}/api/v1/users/tenants/profile/${tenantId}`,
    //     token
    //   );

    //   if (!profileResponse.success || !profileResponse.data?.tenant?.iotSystem?.username) {
    //     throw new Error('IoT system not configured for this tenant');
    //   }

    //   const plotId = profileResponse.data.tenant.iotSystem.username;

      const response = await GET(
        `${import.meta.env.VITE_API_URL}/api/v1/fyllo/historicalData?type=${activeTab}&category=environment`,
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
    if (!historicalData) return { light: 'N/A', wind: 'N/A' };
    
    return {
      light: historicalData.lightIntensity[historicalData.lightIntensity.length - 1]?.value.toFixed(1) ?? 'N/A',
      wind: historicalData.windSpeed[historicalData.windSpeed.length - 1]?.value.toFixed(1) ?? 'N/A'
    };
  };

  const getLastUpdatedTime = () => {
    if (!historicalData?.lightIntensity.length) return 'N/A';
    const lastTimestamp = historicalData.lightIntensity[historicalData.lightIntensity.length - 1].timestamp;
    return new Date(lastTimestamp).toLocaleTimeString();
  };

  const getAverages = () => {
    if (!historicalData) return { avgLight: 'N/A', avgWind: 'N/A', dataPoints: 0 };

    const avgLight = historicalData.lightIntensity.length > 0
      ? (historicalData.lightIntensity.reduce((acc, curr) => acc + curr.value, 0) / historicalData.lightIntensity.length).toFixed(1)
      : 'N/A';

    const avgWind = historicalData.windSpeed.length > 0
      ? (historicalData.windSpeed.reduce((acc, curr) => acc + curr.value, 0) / historicalData.windSpeed.length).toFixed(1)
      : 'N/A';

    return {
      avgLight,
      avgWind,
      dataPoints: historicalData.lightIntensity.length
    };
  };

  const downloadData = () => {
    if (!historicalData) return;

    const combinedData = historicalData.lightIntensity.map((light, index) => ({
      timestamp: light.timestamp,
      'Light Intensity': light.value,
      'Wind Speed': historicalData.windSpeed[index]?.value
    }));

    const csv = [
      ['Timestamp', 'Light Intensity (lux)', 'Wind Speed (km/h)'],
      ...combinedData.map(record => [
        new Date(record.timestamp).toISOString(),
        record['Light Intensity'],
        record['Wind Speed']
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `environment-history-${activeTab}-${new Date().toISOString()}.csv`;
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
        {historicalData.lightIntensity.some(light => light.value > 100000) && (
          <Alert className="bg-red-100/50 dark:bg-red-900/50 border-red-200">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-700 dark:text-red-200">
              High light intensity detected
            </AlertDescription>
          </Alert>
        )}
        {historicalData.windSpeed.some(wind => wind.value > 30) && (
          <Alert className="bg-yellow-100/50 dark:bg-yellow-900/50 border-yellow-200">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-700 dark:text-yellow-200">
              High wind speed detected
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
              Environment Analytics
            </CardTitle>
            <CardDescription className="text-green-700 dark:text-blue-200">
              Real-time Environment monitoring and analysis
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
                  {/* Light Intensity Chart */}
                  <Card className="p-4 bg-white/50 dark:bg-gray-900/50">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300 flex items-center gap-2">
                          <SunIcon className="w-5 h-5" />
                          Light Intensity
                        </h3>
                        <p className="text-sm text-green-600 dark:text-blue-200">
                          Current: {getCurrentValues().light} lux
                        </p>
                      </div>
                      <Badge variant="outline">Light Intensity</Badge>
                    </div>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={historicalData?.lightIntensity || []}>
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
                            name="Light Intensity"
                            unit="lux"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </Card>

                  {/* Wind Speed Chart */}
                  <Card className="p-4 bg-white/50 dark:bg-gray-900/50">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300 flex items-center gap-2">
                          <WindIcon className="w-5 h-5" />
                          Wind Speed
                        </h3>
                        <p className="text-sm text-green-600 dark:text-blue-200">
                          Current: {getCurrentValues().wind} km/h
                        </p>
                      </div>
                      <Badge variant="outline">Wind Speed</Badge>
                    </div>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={historicalData?.windSpeed || []}>
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
                            name="Wind Speed"
                            unit="km/h"
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
                <span className="text-sm text-green-600 dark:text-blue-200">Light Intensity</span>
                <Badge variant="outline">1000 lux</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-green-600 dark:text-blue-200">Wind Speed</span>
                <Badge variant="outline">30 km/h</Badge>
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
              {getAverages().dataPoints > 0 && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-green-600 dark:text-blue-200">Avg Light Intensity</span>
                    <Badge variant="outline">
                      {getAverages().avgLight} lux
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-green-600 dark:text-blue-200">Avg Wind Speed</span>
                    <Badge variant="outline">
                      {getAverages().avgWind} km/h
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

export default EnvironmentHistory05;
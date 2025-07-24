import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ChevronRight,
  Droplets,
  Sprout,
  Thermometer,
  Flower,
  BarChart2,
  RefreshCcw,
  AlertCircle
} from 'lucide-react';
import { useSelector } from "react-redux";
import { GET } from '../../../utils/ApiHandler';
import { cn } from "@/lib/utils";

const Soil05 = () => {
  const { token } = useSelector((state) => state.login);
  const [isLoading, setIsLoading] = useState(true);
  const [soilData, setSoilData] = useState(null);
  const [activeTab, setActiveTab] = useState('moisture1');
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GET(`${import.meta.env.VITE_API_URL}/api/v1/fyllo/analytics`, token);
        if (response?.data?.analytics) {
          setSoilData(response.data.analytics);
          setLastUpdated(new Date());
        }
        setIsLoading(false);
      } catch (e) {
        console.error("Error fetching data:", e);
        setIsLoading(false);
      }
    };
    fetchData();

    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchData, 300000);
    return () => clearInterval(interval);
  }, [token]);

  const getSoilMetrics = () => {
    if (!soilData?.iotData) return [];
    
    const { soilMoisture1, soilMoisture2, soilTemp, leafWetness } = soilData.iotData;
    return [
      {
        id: 'moisture1',
        name: 'Layer 1 Moisture',
        value: soilMoisture1.toFixed(2),
        unit: 'cbar',
        icon: Droplets,
        analyticsKey: 'soilMoistureL1Analytics',
        status: soilData.analytics?.soilMoisture1Analytics?.status,
        description: soilData.analytics?.soilMoisture1Analytics?.description,
        trend: soilMoisture1 > 30 ? 'increasing' : 'stable',
        alert: soilMoisture1 < 10 ? 'Low moisture detected' : null
      },
      {
        id: 'moisture2',
        name: 'Layer 2 Moisture',
        value: soilMoisture2.toFixed(2),
        unit: 'cbar',
        icon: Sprout,
        analyticsKey: 'soilMoistureL2Analytics',
        status: soilData.analytics?.soilMoisture2Analytics?.status,
        description: soilData.analytics?.soilMoisture2Analytics?.description,
        trend: soilMoisture2 > 35 ? 'increasing' : 'stable',
        alert: soilMoisture2 < 15 ? 'Low moisture detected' : null
      },
      {
        id: 'temperature',
        name: 'Soil Temperature',
        value: soilTemp,
        unit: '°C',
        icon: Thermometer,
        analyticsKey: 'soilTemperatureAnalytics',
        status: soilData.analytics?.soilTempAnalytics?.status,
        description: soilData.analytics?.soilTempAnalytics?.description,
        trend: soilTemp > 25 ? 'warning' : 'optimal',
        alert: soilTemp > 30 ? 'High temperature alert' : null
      },
      {
        id: 'wetness',
        name: 'Leaf Wetness',
        value: leafWetness,
        unit: '%',
        icon: Flower,
        analyticsKey: 'leafWetnessAnalytics',
        status: soilData.analytics?.leafWetnessAnalytics?.status,
        description: soilData.analytics?.leafWetnessAnalytics?.description,
        trend: leafWetness > 70 ? 'warning' : 'optimal',
        alert: leafWetness > 80 ? 'High wetness alert' : null
      }
    ];
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      const response = await GET(`${import.meta.env.VITE_API_URL}/api/v1/fyllo`, token);
      if (response?.data?.analytics) {
        setSoilData(response.data.analytics);
        setLastUpdated(new Date());
      }
    } catch (e) {
      console.error("Error refreshing data:", e);
    }
    setIsLoading(false);
  };

  return (
    <Card className="w-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-2xl hover:shadow-green-100/50 transition-all duration-300 ease-in-out">
      <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-6 rounded-t-2xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <CardTitle className="text-2xl font-bold text-green-900 dark:text-white flex items-center gap-3">
              <BarChart2 className="text-green-600 dark:text-blue-400" />
              Soil Analytics
            </CardTitle>
            <CardDescription className="text-green-700 dark:text-blue-200">
              Real-time soil health monitoring system
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-white/30 dark:bg-black/30">
              IoT Enabled
            </Badge>
            <Button
              size="sm"
              variant="outline"
              onClick={handleRefresh}
              disabled={isLoading}
              className="bg-white/30 dark:bg-black/30"
            >
              <RefreshCcw className={cn(
                "w-4 h-4 mr-2",
                isLoading && "animate-spin"
              )} />
              Refresh
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {isLoading ? (
          <div className="flex items-center justify-center h-48">
            <div className="text-green-700 dark:text-blue-200 animate-pulse">
              Loading soil data...
            </div>
          </div>
        ) : (
          <>
            <Tabs 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full h-full grid-cols-2 md:grid-cols-4 bg-green-50 dark:bg-gray-800">
                {getSoilMetrics().map((metric) => (
                  <TabsTrigger
                    key={metric.id}
                    value={metric.id}
                    className={cn(
                      "flex items-center gap-2 transition-all duration-300",
                      activeTab === metric.id ? 'bg-green-200 dark:bg-blue-900' : ''
                    )}
                  >
                    <metric.icon className="w-4 h-4" />
                    {metric.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              <div className="mt-6 bg-white/50 dark:bg-gray-900/50 rounded-lg p-6">
                {getSoilMetrics().map((metric) => (
                  metric.id === activeTab && (
                    <div key={metric.id} className="space-y-6">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                          <h3 className="text-xl font-semibold text-green-800 dark:text-blue-300">
                            {metric.name} Analysis
                          </h3>
                          <p className="text-sm text-green-600 dark:text-blue-200">
                            Last updated: {lastUpdated.toLocaleTimeString()}
                          </p>
                        </div>
                        <Badge variant={metric.trend === 'warning' ? 'destructive' : 'outline'}>
                          {metric.status || metric.trend}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white/70 dark:bg-gray-800/70 rounded-lg p-4">
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-green-100 dark:bg-blue-900 rounded-full">
                              <metric.icon className="w-6 h-6 text-green-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <p className="text-sm text-green-600 dark:text-blue-200">Current Reading</p>
                              <p className="text-2xl font-bold text-green-800 dark:text-blue-300">
                                {metric.value} {metric.unit}
                              </p>
                            </div>
                          </div>
                        </div>

                        {metric.alert && (
                          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                            <div className="flex items-center gap-4">
                              <AlertCircle className="w-6 h-6 text-red-500" />
                              <p className="text-red-600 dark:text-red-400">{metric.alert}</p>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="bg-green-50/50 dark:bg-gray-800/50 rounded-lg p-4">
                        <h4 className="font-semibold text-green-800 dark:text-blue-300 mb-2">Analysis</h4>
                        <p className="text-green-700 dark:text-blue-200">
                          {metric.description || 'No analysis available for this parameter'}
                        </p>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </Tabs>

            <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
              <Button 
                variant="outline" 
                className="w-full md:w-auto group hover:bg-green-100 dark:hover:bg-blue-900 transition-all"
              >
                View Historical Data
                <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <p className="text-sm text-green-600 dark:text-blue-200">
                Auto-refreshes every 5 minutes
              </p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default Soil05;
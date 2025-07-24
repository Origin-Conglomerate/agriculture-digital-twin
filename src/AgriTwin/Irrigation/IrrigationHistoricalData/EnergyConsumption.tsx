import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Battery,
  Zap,
  GaugeCircle,
  BarChart3,
  Download,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Energy Consumption Analytics Hook
const useEnergyAnalytics = () => {
  const [data, setData] = useState({
    current: {
      pumps: 44,
      valves: 55,
      sensors: 13,
      controlSystems: 43,
    },
    historical: Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      consumption: Math.floor(Math.random() * 100) + 20
    })),
    insights: {
      efficiency: null,
      alerts: null,
      forecast: null
    }
  });

  const generateInsights = () => {
    const efficiencyInsights = [
      { type: 'saving', message: "20% reduction in pump energy usage" },
      { type: 'optimal', message: "Peak efficiency hours: 2 PM - 4 PM" },
      { type: 'trend', message: "15% below monthly average consumption" }
    ];

    const alertInsights = [
      { type: 'warning', message: "High energy spike detected in Zone 2" },
      { type: 'maintenance', message: "Pump 3 showing irregular consumption patterns" },
      { type: 'critical', message: "Backup system drawing excess power" }
    ];

    const forecastInsights = [
      { type: 'prediction', message: "Expected 10% increase in demand tomorrow" },
      { type: 'optimization', message: "Suggested load balancing at 3 PM" },
      { type: 'schedule', message: "Optimal maintenance window: 11 PM" }
    ];

    setData(prev => ({
      ...prev,
      insights: {
        efficiency: efficiencyInsights[Math.floor(Math.random() * efficiencyInsights.length)],
        alerts: alertInsights[Math.floor(Math.random() * alertInsights.length)],
        forecast: forecastInsights[Math.floor(Math.random() * forecastInsights.length)]
      }
    }));
  };

  useEffect(() => {
    generateInsights();
    const interval = setInterval(() => {
      setData(prev => ({
        ...prev,
        current: {
          pumps: Math.floor(Math.random() * 100) + 10,
          valves: Math.floor(Math.random() * 100) + 10,
          sensors: Math.floor(Math.random() * 100) + 10,
          controlSystems: Math.floor(Math.random() * 100) + 10
        },
        historical: prev.historical.map(point => ({
          ...point,
          consumption: Math.floor(Math.random() * 100) + 20
        }))
      }));
      generateInsights();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return data;
};

export default function EnergyConsumption() {
  const data = useEnergyAnalytics();
  const [activeTab, setActiveTab] = useState('realtime');
  
  const totalConsumption = Object.values(data.current).reduce((a, b) => a + b, 0);

  return (
    // <div className="flex justify-center items-center w-full">
    <Card className="w-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-2xl hover:shadow-green-100/50 transition-all duration-300 ease-in-out">
    <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-4 sm:p-6 rounded-t-2xl ">
    <div className="lg:flex flex-col sm:flex-row gap-4 sm:gap-0 sm:justify-between sm:items-center">
      <div>
        <CardTitle className="text-2xl font-bold text-blue-900 dark:text-white flex items-center gap-2 sm:gap-3 mt-2">
          <Battery className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          Energy Consumption Monitor

        </CardTitle>
        <CardDescription className="text-base text-blue-700 dark:text-blue-200">
        Real-time power usage analytics and optimization

        </CardDescription>
      </div>
      <Badge variant="outline" className="bg-white/30 dark:bg-black/30">
      Live Metrics
      </Badge>
    </div>
  </CardHeader>

        <CardContent className="p-6 space-y-6">
          <Tabs
            defaultValue="realtime"
            className="w-full"
            onValueChange={setActiveTab}
          >
            <TabsList className="grid w-full grid-cols-3 bg-blue-50 dark:bg-gray-800">
              <TabsTrigger
                value="realtime"
                className={cn(
                  "flex items-center gap-2 transition-all duration-300",
                  activeTab === 'realtime' ? 'bg-blue-200 dark:bg-green-900' : ''
                )}
              >
                <Zap className="w-4 h-4" /> Real-Time
              </TabsTrigger>
              <TabsTrigger
                value="historical"
                className={cn(
                  "flex items-center gap-2 transition-all duration-300",
                  activeTab === 'historical' ? 'bg-blue-200 dark:bg-green-900' : ''
                )}
              >
                <BarChart3 className="w-4 h-4" /> Historical
              </TabsTrigger>
              <TabsTrigger
                value="insights"
                className={cn(
                  "flex items-center gap-2 transition-all duration-300",
                  activeTab === 'insights' ? 'bg-blue-200 dark:bg-green-900' : ''
                )}
              >
                <GaugeCircle className="w-4 h-4" /> Insights
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
                {activeTab === 'realtime' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {Object.entries(data.current).map(([key, value]) => (
                        <div key={key} className="p-4 rounded-lg bg-white/50 dark:bg-gray-800/50">
                          <h4 className="text-sm font-medium text-blue-700 dark:text-green-300 capitalize">
                            {key}
                          </h4>
                          <p className="text-2xl font-bold text-blue-900 dark:text-white">
                            {value} kWh
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="text-center mt-4">
                      <p className="text-lg text-blue-700 dark:text-green-200">
                        Total Consumption: <span className="font-bold">{totalConsumption} kWh</span>
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'historical' && (
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={data.historical}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="hour" />
                        <YAxis />
                        <Tooltip />
                        <Line 
                          type="monotone" 
                          dataKey="consumption" 
                          stroke="#3b82f6" 
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}

                {activeTab === 'insights' && (
                  <div className="space-y-4">
                    {Object.entries(data.insights).map(([key, insight]) => (
                      insight && (
                        <div key={key} className="p-4 rounded-lg bg-white/60 dark:bg-gray-800/60">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg font-semibold text-blue-800 dark:text-green-300 capitalize">
                              {key}
                            </h3>
                            <Badge variant="secondary">{insight.type}</Badge>
                          </div>
                          <p className="text-blue-700 dark:text-green-200">
                            {insight.message}
                          </p>
                        </div>
                      )
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </Tabs>

          <div className="mt-6 flex justify-between items-center gap-2">
            <Button
              variant="outline"
              className="group hover:bg-blue-100 dark:hover:bg-green-900 transition-all"
            >
              Export Data
              <Download className="ml-2 group-hover:translate-y-1 transition-transform" />
            </Button>
            <div className="flex items-center space-x-2">
              <AlertCircle className="text-blue-600 dark:text-green-400" />
              <span className="text-sm text-blue-700 dark:text-green-200">
                Last updated: {new Date().toLocaleTimeString()}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    // </div>
  );
}
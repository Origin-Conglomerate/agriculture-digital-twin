import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Sprout, CloudRain, Sun, Thermometer, BarChart3, Leaf } from 'lucide-react';

const ProjectDashboard = () => {
  const [metrics, setMetrics] = useState({
    cropHealth: 85,
    soilMoisture: 65,
    temperature: 28,
    rainfall: 45,
    yield: 92
  });

  const growthData = [
    { month: 'Jan', growth: 20 },
    { month: 'Feb', growth: 35 },
    { month: 'Mar', growth: 45 },
    { month: 'Apr', growth: 60 },
    { month: 'May', growth: 75 },
    { month: 'Jun', growth: 85 }
  ];

  return (
    <Card className="w-full mx-auto bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-2xl">
      <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-6 rounded-t-2xl">
        <div className="md:flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl font-bold text-green-900 dark:text-white flex items-center gap-3">
              <Sprout className="text-green-600 dark:text-blue-400" />
              Project Dashboard
            </CardTitle>
            <CardDescription className="text-green-700 dark:text-blue-200">
              Real-time monitoring of your agricultural project
            </CardDescription>
          </div>
          <Badge variant="outline" className="bg-white/30 dark:bg-black/30">
            Live Data
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-white/50 dark:bg-gray-800/50 p-4">
            <div className="lg:flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Leaf className="text-green-600 dark:text-blue-400" />
                <h3 className="font-semibold">Crop Health</h3>
              </div>
              <Badge variant="secondary">{metrics.cropHealth}%</Badge>
            </div>
          </Card>

          <Card className="bg-white/50 dark:bg-gray-800/50 p-4">
            <div className="lg:flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CloudRain className="text-green-600 dark:text-blue-400" />
                <h3 className="font-semibold">Soil Moisture</h3>
              </div>
              <Badge variant="secondary">{metrics.soilMoisture}%</Badge>
            </div>
          </Card>

          <Card className="bg-white/50 dark:bg-gray-800/50 p-4">
            <div className="lg:flex items-center justify-between">
              <div className="lg:flex items-center gap-2">
                <Thermometer className="text-green-600 dark:text-blue-400" />
                <h3 className="font-semibold">Temperature</h3>
              </div>
              <Badge variant="secondary">{metrics.temperature}°C</Badge>
            </div>
          </Card>
        </div>

        <div className="h-[300px] mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="growth" 
                stroke="#22c55e"
                strokeWidth={2}
                dot={{ fill: '#22c55e' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <Tabs defaultValue="activities" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-green-50 dark:bg-gray-800">
            <TabsTrigger value="activities">Recent Activities</TabsTrigger>
            <TabsTrigger value="forecasts">Forecasts</TabsTrigger>
          </TabsList>

          <TabsContent value="activities" className="mt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                <span>Irrigation completed</span>
                <Badge>Today</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                <span>Fertilizer application</span>
                <Badge>Yesterday</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                <span>Pest control measure</span>
                <Badge>2 days ago</Badge>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="forecasts" className="mt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg ">
                <span>Expected harvest date</span>
                <Badge>In 45 days</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                <span>Projected yield</span>
                <Badge>92% of target</Badge>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ProjectDashboard;
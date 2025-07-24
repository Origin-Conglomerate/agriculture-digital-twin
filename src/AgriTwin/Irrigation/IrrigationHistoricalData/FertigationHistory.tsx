import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChevronRight,
  LineChart,
  BarChart3,
  PieChart,
  Droplets,
  Leaf,
  ChartBarBigIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const useFertigationData = () => {
  const [data, setData] = useState([]);

  const generateData = (timeframe) => {
    const dataPoints = timeframe === 'daily' ? 7 : timeframe === 'weekly' ? 4 : 12;
    return Array.from({ length: dataPoints }, (_, i) => ({
      name: timeframe === 'daily' ? `Day ${i + 1}` : 
            timeframe === 'weekly' ? `Week ${i + 1}` : `Month ${i + 1}`,
      nitrogen: Math.floor(Math.random() * 50) + 30,
      phosphorus: Math.floor(Math.random() * 40) + 20,
      potassium: Math.floor(Math.random() * 45) + 25,
      volume: Math.floor(Math.random() * 100) + 50
    }));
  };

  useEffect(() => {
    return setData(generateData('monthly'));
  }, []);

  return { data, generateData };
};

const FertigationHistory = () => {
  const [selectedZone, setSelectedZone] = useState("all");
  const [activeTab, setActiveTab] = useState("volume");
  const [timeframe, setTimeframe] = useState("monthly");
  const { data, generateData } = useFertigationData();
  const [gendata,setGenData] = useState([])

  useEffect(() => {
    const newData = generateData(timeframe);
    setGenData(newData);
  }, [timeframe, selectedZone]);

  return (
    <div className="flex justify-center items-center ">
      <Card className="w-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-2xl hover:shadow-green-100/50 transition-all duration-300 ease-in-out">
          <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-4 sm:p-6 rounded-t-2xl ">
          <div className="lg:flex flex-col sm:flex-row gap-4 sm:gap-0 sm:justify-between sm:items-center">
            <div>
              <CardTitle className="text-2xl font-bold text-green-900 dark:text-white flex items-center gap-2 sm:gap-3 mt-2">
                <ChartBarBigIcon className="w-6 h-6 text-green-600 dark:text-blue-400" />
                Fertigation Analytics
              </CardTitle>
              <CardDescription className="text-base text-green-700 dark:text-blue-200">
              Historical nutrient and water distribution analysis
              </CardDescription>
            </div>
            <Badge variant="outline" className="bg-white/30 dark:bg-black/30">
              Real-time Data
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <Select value={selectedZone} onValueChange={setSelectedZone}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Select Zone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Zones</SelectItem>
                <SelectItem value="zone1">Zone 1</SelectItem>
                <SelectItem value="zone2">Zone 2</SelectItem>
                <SelectItem value="zone3">Zone 3</SelectItem>
              </SelectContent>
            </Select>

            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Select Timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs
            defaultValue="volume"
            className="w-full"
            onValueChange={setActiveTab}
          >
            <TabsList className="grid h-full w-full md:grid-cols-4 grid-cols-2  bg-green-50 dark:bg-gray-800">
              <TabsTrigger
                value="volume"
                className={cn(
                  "flex items-center gap-2 transition-all duration-300",
                  activeTab === 'volume' ? 'bg-green-200 dark:bg-blue-900' : ''
                )}
              >
                <Droplets className="w-4 h-4" /> Volume
              </TabsTrigger>
              <TabsTrigger
                value="nitrogen"
                className={cn(
                  "flex items-center gap-2 transition-all duration-300",
                  activeTab === 'nitrogen' ? 'bg-green-200 dark:bg-blue-900' : ''
                )}
              >
                <Leaf className="w-4 h-4" /> Nitrogen
              </TabsTrigger>
              <TabsTrigger
                value="phosphorus"
                className={cn(
                  "flex items-center gap-2 transition-all duration-300",
                  activeTab === 'phosphorus' ? 'bg-green-200 dark:bg-blue-900' : ''
                )}
              >
                <PieChart className="w-4 h-4" /> Phosphorus
              </TabsTrigger>
              <TabsTrigger
                value="potassium"
                className={cn(
                  "flex items-center gap-2 transition-all duration-300",
                  activeTab === 'potassium' ? 'bg-green-200 dark:bg-blue-900' : ''
                )}
              >
                <BarChart3 className="w-4 h-4" /> Potassium
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="mt-4 p-4 bg-white/50 dark:bg-gray-900/50 rounded-lg h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart data={gendata} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                    <XAxis 
                      dataKey="name" 
                      className="text-gray-600 dark:text-gray-300"
                    />
                    <YAxis className="text-gray-600 dark:text-gray-300" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        border: 'none',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Legend />
                    {activeTab === 'volume' && (
                      <Line 
                        type="monotone" 
                        dataKey="volume" 
                        stroke="#22c55e" 
                        strokeWidth={2}
                        dot={{ stroke: '#22c55e', strokeWidth: 2 }}
                      />
                    )}
                    {activeTab === 'nitrogen' && (
                      <Line 
                        type="monotone" 
                        dataKey="nitrogen" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        dot={{ stroke: '#3b82f6', strokeWidth: 2 }}
                      />
                    )}
                    {activeTab === 'phosphorus' && (
                      <Line 
                        type="monotone" 
                        dataKey="phosphorus" 
                        stroke="#f59e0b" 
                        strokeWidth={2}
                        dot={{ stroke: '#f59e0b', strokeWidth: 2 }}
                      />
                    )}
                    {activeTab === 'potassium' && (
                      <Line 
                        type="monotone" 
                        dataKey="potassium" 
                        stroke="#ec4899" 
                        strokeWidth={2}
                        dot={{ stroke: '#ec4899', strokeWidth: 2 }}
                      />
                    )}
                  </RechartsLineChart>
                </ResponsiveContainer>
              </motion.div>
            </AnimatePresence>
          </Tabs>

          <div className="mt-6 flex justify-between items-center gap-2">
            <Button
              variant="outline"
              className="group hover:bg-green-100 dark:hover:bg-blue-900 transition-all"
            >
              Download Report
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <div className="flex items-center space-x-2">
              <LineChart className="text-green-600 dark:text-blue-400" />
              <span className="text-sm text-green-700 dark:text-blue-200">
                Last Updated: {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FertigationHistory;
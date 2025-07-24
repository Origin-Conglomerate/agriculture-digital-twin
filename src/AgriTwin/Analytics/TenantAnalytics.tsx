import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BarChart2,
  TrendingUp,
  Users,
  Package,
  Sprout,
  ChevronRight,
  IndianRupee

} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { RevenueChart, ExpensePieChart } from './RevenueExpenseCharts';
import { Stats } from './Stats';
import { cn } from "@/lib/utils";

const useAnalyticsData = () => {
  const [data, setData] = useState({
    revenue: 0,
    laborers: 0,
    inventory: 0,
    cropProgress: 0,
  });

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setData({
        revenue: Math.floor(Math.random() * 100000),
        laborers: Math.floor(Math.random() * 50),
        inventory: Math.floor(Math.random() * 1000),
        cropProgress: Math.floor(Math.random() * 100),
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return data;
};

export default function TenantAnalytics() {
  const [activeTab, setActiveTab] = useState('overview');
  const analyticsData = useAnalyticsData();

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-2xl">
        <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-6 rounded-t-2xl">
          <div className="flex flex-wrap md:flex-nowrap justify-between items-center gap-4">
            <div className="flex flex-col">
              <CardTitle className="text-lg md:text-2xl font-bold text-green-900 dark:text-white flex items-center gap-3">
                <BarChart2 className="w-5 h-5 md:w-6 md:h-6 text-green-600 dark:text-blue-400" />
                Farm Analytics Dashboard
              </CardTitle>
              <CardDescription className="text-sm md:text-base text-green-700 dark:text-blue-200">
                Comprehensive agricultural performance metrics
              </CardDescription>
            </div>
            <Badge variant="outline" className="min-w-fit whitespace-nowrap bg-white/30 dark:bg-black/30 px-3 py-1 text-xs md:text-sm">
              Real-time
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          <Tabs defaultValue="overview" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 bg-green-50 dark:bg-gray-800">
              <TabsTrigger
                value="overview"
                className={cn(
                  "flex items-center gap-2 transition-all duration-300",
                  activeTab === 'overview' ? 'bg-green-200 dark:bg-blue-900' : ''
                )}
              >
                <TrendingUp className="w-4 h-4" /> Overview
              </TabsTrigger>
              <TabsTrigger
                value="financial"
                className={cn(
                  "flex items-center gap-2 transition-all duration-300",
                  activeTab === 'financial' ? 'bg-green-200 dark:bg-blue-900' : ''
                )}
              >
                <IndianRupee className="w-4 h-4" /> Financial
              </TabsTrigger>
              <TabsTrigger
                value="crops"
                className={cn(
                  "flex  items-center gap-2 transition-all duration-300",
                  activeTab === 'crops' ? 'bg-green-200 dark:bg-blue-900' : ''
                )}
              >
                <Sprout className="w-4 h-4" /> Crops
              </TabsTrigger>
              <TabsTrigger
                value="resources"
                className={cn(
                  "flex items-center gap-2 transition-all duration-300",
                  activeTab === 'resources' ? 'bg-green-200 dark:bg-blue-900' : ''
                )}
              >
                <Package className="w-4 h-4" /> Resources
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="mt-6"
              >
                <TabsContent value="overview" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Stats
                      title="Revenue"
                      value={`₹${analyticsData.revenue.toLocaleString()}`}
                      icon={IndianRupee}
                      trend={5.2}
                    />
                    <Stats
                      title="Active Laborers"
                      value={analyticsData.laborers}
                      icon={Users}
                      trend={-2.1}
                    />
                    <Stats
                      title="Inventory Stock"
                      value={analyticsData.inventory}
                      icon={Package}
                      trend={3.4}
                    />
                    <Stats
                      title="Crop Progress"
                      value={analyticsData.cropProgress}
                      icon={Sprout}
                      trend={1.8}
                    />
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <RevenueChart />
                    <ExpensePieChart />
                  </div>
                </TabsContent>

                <TabsContent value="financial" className="space-y-6">
                  <div className="grid grid-cols-1 gap-4">
                    <RevenueChart />
                    <ExpensePieChart />
                  </div>
                </TabsContent>

                <TabsContent value="crops" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="overflow-hidden border-2 border-green-100/50 dark:border-green-900/30 hover:shadow-lg transition-shadow duration-300">
                      <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/30 dark:to-green-900/30 p-4">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">🌾</span>
                          <div>
                            <CardTitle className="text-lg text-emerald-800 dark:text-emerald-200">Wheat</CardTitle>
                            <CardDescription className="text-emerald-600 dark:text-emerald-400">Growing Phase</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="space-y-4">
                          <div className="h-2 w-full bg-emerald-100 dark:bg-emerald-900 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                              style={{ width: '75%' }}
                            />
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-emerald-700 dark:text-emerald-300">Progress</span>
                            <span className="font-semibold text-emerald-800 dark:text-emerald-200">75%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="overflow-hidden border-2 border-green-100/50 dark:border-green-900/30 hover:shadow-lg transition-shadow duration-300">
                      <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/30 dark:to-green-900/30 p-4">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">🍌</span>
                          <div>
                            <CardTitle className="text-lg text-emerald-800 dark:text-emerald-200">Banana</CardTitle>
                            <CardDescription className="text-emerald-600 dark:text-emerald-400">Harvesting</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="space-y-4">
                          <div className="h-2 w-full bg-emerald-100 dark:bg-emerald-900 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                              style={{ width: '90%' }}
                            />
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-emerald-700 dark:text-emerald-300">Progress</span>
                            <span className="font-semibold text-emerald-800 dark:text-emerald-200">90%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="overflow-hidden border-2 border-green-100/50 dark:border-green-900/30 hover:shadow-lg transition-shadow duration-300">
                      <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/30 dark:to-green-900/30 p-4">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">🫘</span>
                          <div>
                            <CardTitle className="text-lg text-emerald-800 dark:text-emerald-200">Soybeans</CardTitle>
                            <CardDescription className="text-emerald-600 dark:text-emerald-400">Planting</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="space-y-4">
                          <div className="h-2 w-full bg-emerald-100 dark:bg-emerald-900 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                              style={{ width: '25%' }}
                            />
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-emerald-700 dark:text-emerald-300">Progress</span>
                            <span className="font-semibold text-emerald-800 dark:text-emerald-200">25%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="overflow-hidden border-2 border-green-100/50 dark:border-green-900/30 hover:shadow-lg transition-shadow duration-300">
                      <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/30 dark:to-green-900/30 p-4">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">🌾</span>
                          <div>
                            <CardTitle className=" text-emerald-800 dark:text-emerald-200">Rice</CardTitle>
                            <CardDescription className="text-emerald-600 dark:text-emerald-400">Irrigation</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="space-y-4">
                          <div className="h-2 w-full bg-emerald-100 dark:bg-emerald-900 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                              style={{ width: '45%' }}
                            />
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-emerald-700 dark:text-emerald-300">Progress</span>
                            <span className="font-semibold text-emerald-800 dark:text-emerald-200">45%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="resources" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Stats
                      title="Equipment Status"
                      value="92% Operational"
                      icon={Package}
                      trend={2.3}
                    />
                    <Stats
                      title="Seed Inventory"
                      value="2,450 kg"
                      icon={Sprout}
                      trend={-1.5}
                    />
                    <Stats
                      title="Labor Hours"
                      value="1,280 hrs"
                      icon={Users}
                      trend={4.7}
                    />
                  </div>
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>

          <div className="mt-6 flex justify-between items-center gap-3">
            <Button
              variant="outline"
              className="group hover:bg-green-100 dark:hover:bg-blue-900 transition-all"
            >
              Export Report
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Badge variant="outline" className="bg-white/30 dark:bg-black/30">
              Last updated: {new Date().toLocaleTimeString()}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

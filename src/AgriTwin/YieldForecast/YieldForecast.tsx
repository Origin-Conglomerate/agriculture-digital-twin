import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChevronRight,
  Crop,
  TrendingUp,
  ShoppingCart,
  Users,
  BarChart4
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import YieldPredictions from './YieldPredictions';
import YieldProgress from './YieldProgress';
import MarketInsights from './MarketInsights';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function YieldForecast() {
  const forecastData = YieldPredictions();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <Card className="w-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-2xl hover:shadow-green-100/50 transition-all duration-300 ease-in-out">
      <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-6 rounded-t-2xl">
        <div className="flex flex-wrap md:flex-nowrap justify-between items-center gap-4">
          <div className="flex flex-col">
            <CardTitle className="text-lg md:text-2xl font-bold text-green-900 dark:text-white flex items-center gap-3">
              <Crop className="w-5 h-5 md:w-6 md:h-6 text-green-600 dark:text-blue-400" />
              Yield Forecast Dashboard
            </CardTitle>
            <CardDescription className="text-sm md:text-base text-green-700 dark:text-blue-200">
              Comprehensive yield monitoring and predictions
            </CardDescription>
          </div>
          <Badge variant="outline" className="min-w-fit whitespace-nowrap bg-white/30 dark:bg-black/30 px-3 py-1 text-xs md:text-sm">
            AI-Enhanced
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        <Tabs
          defaultValue="overview"
          className="w-full"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid grid-cols-3 w-full bg-green-50 dark:bg-gray-800 p-2 rounded-lg">
            <TabsTrigger value="overview">
              <BarChart4 className="w-4 h-4 mr-2" /> Overview
            </TabsTrigger>
            <TabsTrigger value="forecast">
              <TrendingUp className="w-4 h-4 mr-2" /> Forecast
            </TabsTrigger>
            <TabsTrigger value="market">
              <ShoppingCart className="w-4 h-4 mr-2" /> Market
            </TabsTrigger>
            {/* <TabsTrigger value="labor">
              <Users className="w-4 h-4 mr-2" /> Labor
            </TabsTrigger> */}
          </TabsList>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-6 space-y-6"
            >
              <TabsContent value="overview" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <YieldProgress currentYield={forecastData.currentYield} />
                  <MarketInsights marketData={forecastData.marketData} />
                </div>
                <Card className="w-full bg-white/60 dark:bg-gray-900/60">
                  <CardHeader>
                    <CardTitle className="text-lg text-green-800 dark:text-blue-300">
                      Historical Yield Trends
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={forecastData.historicalData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="yield"
                          stroke="#22c55e"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Additional tab content components would go here */}
            </motion.div>
          </AnimatePresence>
        </Tabs>

        <div className="mt-6 flex flex-wrap md:flex-nowrap justify-between items-center gap-3 md:gap-6">
          <Button
            variant="outline"
            className="group hover:bg-green-100 dark:hover:bg-blue-900 transition-all px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm"
          >
            Export Report
            <ChevronRight className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-green-600 dark:text-blue-400" />
            <span className="text-xs md:text-sm text-green-700 dark:text-blue-200 min-w-fit whitespace-nowrap">
              Last updated: {new Date().toLocaleTimeString()}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
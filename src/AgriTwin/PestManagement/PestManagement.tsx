import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bug,
  AlertTriangle,
  Map,
  TrendingUp,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";
import { PestDetection } from './PestDetection';
import { PestAlerts } from './PestAlerts';
import { PestDensityMap } from './PestDensityMap';
import { PestTrendAnalytics } from './PestTrendAnalytics';
import { usePestData } from './hooks/usePestData';

export default function PestManagement() {
  const [activeTab, setActiveTab] = useState('detection');
  const pestData = usePestData();

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-2xl hover:shadow-green-100/50 transition-all duration-300">
      <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-6 rounded-t-2xl">
  <div className="flex flex-wrap md:flex-nowrap justify-between items-center gap-4">
    <div className="flex flex-col">
      <CardTitle className="text-lg md:text-2xl font-bold text-green-900 dark:text-white flex items-center gap-3">
        <Bug className="w-5 h-5 md:w-6 md:h-6 text-green-600 dark:text-blue-400" />
        Advanced Pest Management
      </CardTitle>
      <CardDescription className="text-sm md:text-base text-green-700 dark:text-blue-200">
        Real-time pest monitoring and control system
      </CardDescription>
    </div>
    <Badge variant="outline" className="min-w-fit whitespace-nowrap bg-white/30 dark:bg-black/30 px-3 py-1 text-xs md:text-sm">
      AI-Powered
    </Badge>
  </div>
</CardHeader>

        <CardContent className="p-6 space-y-6">
          <Tabs
            defaultValue="detection"
            className="w-full"
            onValueChange={setActiveTab}
          >
            <TabsList className="grid w-full grid-cols-4 bg-green-50 dark:bg-gray-800">
              <TabsTrigger
                value="detection"
                className={cn(
                  "flex items-center gap-2 transition-all duration-300",
                  activeTab === 'detection' ? 'bg-green-200 dark:bg-blue-900' : ''
                )}
              >
                <Bug className="w-4 h-4" /> Detection
              </TabsTrigger>
              <TabsTrigger
                value="alerts"
                className={cn(
                  "flex items-center gap-2 transition-all duration-300",
                  activeTab === 'alerts' ? 'bg-green-200 dark:bg-blue-900' : ''
                )}
              >
                <AlertTriangle className="w-4 h-4" /> Alerts
              </TabsTrigger>
              <TabsTrigger
                value="mapping"
                className={cn(
                  "flex items-center gap-2 transition-all duration-300",
                  activeTab === 'mapping' ? 'bg-green-200 dark:bg-blue-900' : ''
                )}
              >
                <Map className="w-4 h-4" /> Mapping
              </TabsTrigger>
              <TabsTrigger
                value="trends"
                className={cn(
                  "flex items-center gap-2 transition-all duration-300",
                  activeTab === 'trends' ? 'bg-green-200 dark:bg-blue-900' : ''
                )}
              >
                <TrendingUp className="w-4 h-4" /> Trends
              </TabsTrigger>
            </TabsList>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-6"
            >
              <TabsContent value="detection" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {pestData.detections.map((detection, index) => (
                    <PestDetection key={index} detection={detection} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="alerts" className="mt-0">
                <PestAlerts alerts={pestData.alerts} />
              </TabsContent>

              <TabsContent value="mapping" className="mt-0">
                <PestDensityMap />
              </TabsContent>

              <TabsContent value="trends" className="mt-0">
                <PestTrendAnalytics />
              </TabsContent>
            </motion.div>
          </Tabs>

          <div className="mt-6 flex justify-between items-center">
            <Button
              variant="outline"
              className="group hover:bg-green-100 dark:hover:bg-blue-900 transition-all"
            >
              Export Report
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <div className="flex items-center space-x-2">
              <Sparkles className="text-green-600 dark:text-blue-400" />
              <span className="text-sm text-green-700 dark:text-blue-200">
                Real-time monitoring active
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
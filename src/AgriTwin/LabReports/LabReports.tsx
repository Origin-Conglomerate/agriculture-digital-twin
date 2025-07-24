import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";

// Icons
import {
  FileText,
  Microscope,
  BarChart2,
  Calendar,
  Archive,
  Radiation,
  TrendingUp,
  FileSpreadsheet,
  ChartCandlestickIcon,
  ChartNetworkIcon
} from 'lucide-react';

// Sub-components
import ReportOverview from './ReportsOverview';
import ReportHistory from './ReportsHistory';
import ScheduleLabTest from './ScheduleLabTest';
import ReportTrends from './ReportTrends';
import ReportAnalytics from './ReportAnalytics';
import ReportsPDF from './ReportsPDF';

// Lab Reports Insights Hook
const useLabReportInsights = () => {
  const [insights, setInsights] = useState({
    soilHealth: null,
    plantPathology: null,
    cropNutrition: null
  });

  const generateLabInsights = () => {
    const soilInsights = [
      { type: 'assessment', message: "Soil pH balance optimal for current crop cycle" },
      { type: 'nutrients', message: "Nitrogen levels slightly below recommended range" },
      { type: 'composition', message: "Organic matter content: 4.2%" }
    ];

    const pathologyInsights = [
      { type: 'disease', message: "Low risk of fungal infections detected" },
      { type: 'health', message: "Plant immune response indicators strong" },
      { type: 'prevention', message: "Recommended preventive treatments identified" }
    ];

    const nutritionInsights = [
      { type: 'analysis', message: "Micronutrient balance within optimal range" },
      { type: 'supplement', message: "Recommended foliar spray for enhanced nutrition" },
      { type: 'yield', message: "Projected yield improvement: 8-12%" }
    ];

    setInsights({
      soilHealth: soilInsights[Math.floor(Math.random() * soilInsights.length)],
      plantPathology: pathologyInsights[Math.floor(Math.random() * pathologyInsights.length)],
      cropNutrition: nutritionInsights[Math.floor(Math.random() * nutritionInsights.length)]
    });
  };

  React.useEffect(() => {
    generateLabInsights();
    const interval = setInterval(generateLabInsights, 10000);
    return () => clearInterval(interval);
  }, []);

  return insights;
};

export default function LabReports() {
  const [activeTab, setActiveTab] = useState('overview');
  const insights = useLabReportInsights();

  return (
    <div className='flex justify-center items-center'>
      <Card className="w-full max-w-[92vw] bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-2xl hover:shadow-green-100/50 transition-all duration-300 ease-in-out">
        <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-6 rounded-t-2xl">
          <div className="md:flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-bold text-green-900 dark:text-white flex items-center gap-3">
                <FileText className="text-green-600 dark:text-blue-400" />
                Lab Reports Intelligence
              </CardTitle>
              <CardDescription className="text-green-700 dark:text-blue-200">
                Comprehensive Agricultural Laboratory Insights
              </CardDescription>
            </div>
            <Badge variant="outline" className="bg-white/30 dark:bg-black/30">
              Advanced Analytics
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          <Tabs
            defaultValue="overview"
            className="w-full h-full"
            onValueChange={setActiveTab}
          >
            <TabsList className="grid w-full h-full grid-cols-3 md:grid-cols-6 bg-green-50 dark:bg-gray-800">
              <TabsTrigger
                value="overview"
                className={cn(
                  "flex items-center gap-2 transition-all duration-300",
                  activeTab === 'overview' ? 'bg-green-200 dark:bg-blue-900' : ''
                )}
              >
                <Microscope className="w-4 h-4" /> Overview
              </TabsTrigger>
              <TabsTrigger
                value="reports"
                className={cn(
                  "flex items-center gap-2 transition-all duration-300",
                  activeTab === 'reports' ? 'bg-green-200 dark:bg-blue-900' : ''
                )}
              >
                <FileSpreadsheet className="w-4 h-4" /> Reports
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className={cn(
                  "flex items-center gap-2 transition-all duration-300",
                  activeTab === 'history' ? 'bg-green-200 dark:bg-blue-900' : ''
                )}
              >
                <Archive className="w-4 h-4" /> History
              </TabsTrigger>
              <TabsTrigger
                value="schedule"
                className={cn(
                  "flex items-center gap-2 transition-all duration-300",
                  activeTab === 'schedule' ? 'bg-green-200 dark:bg-blue-900' : ''
                )}
              >
                <Calendar className="w-4 h-4" /> Schedule
              </TabsTrigger>
              <TabsTrigger
                value="trends"
                className={cn(
                  "flex items-center gap-2 transition-all duration-300",
                  activeTab === 'trends' ? 'bg-green-200 dark:bg-blue-900' : ''
                )}
              >
                <ChartCandlestickIcon className="w-4 h-4" /> Trends
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className={cn(
                  "flex items-center gap-2 transition-all duration-300",
                  activeTab === 'analytics' ? 'bg-green-200 dark:bg-blue-900' : ''
                )}
              >
                <ChartNetworkIcon className="w-4 h-4" /> Analytics
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
                {activeTab === 'overview' && (
                  <ReportOverview insights={insights} />
                )}
                {activeTab === 'reports' && (
                  <ReportsPDF />
                )}
                {activeTab === 'history' && (
                  <ReportHistory />
                )}
                {activeTab === 'schedule' && (
                  <ScheduleLabTest />
                )}
                {activeTab === 'trends' && (
                  <ReportTrends />
                )}
                {activeTab === 'analytics' && (
                  <ReportAnalytics />
                )}
              </motion.div>
            </AnimatePresence>
          </Tabs>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full p-4">
      <div className="flex flex-wrap gap-2 w-full sm:w-auto">
        <Button
          variant="outline"
          className="group hover:bg-green-100 dark:hover:bg-blue-900 transition-all w-full sm:w-auto"
        >
          Detailed Analytics
          <BarChart2 className="ml-2 group-hover:scale-110 transition-transform" />
        </Button>
        <Button
          variant="outline"
          className="group hover:bg-green-100 dark:hover:bg-blue-900 transition-all w-full sm:w-auto"
        >
          Export Reports
          <FileSpreadsheet className="ml-2 group-hover:scale-110 transition-transform" />
        </Button>
      </div>
      <div className="flex items-center gap-2 w-full sm:w-auto justify-start">
        <Radiation className="text-green-600 dark:text-blue-400" />
        <span className="text-sm text-green-700 dark:text-blue-200">
          Lab Analytics v3.0
        </span>
      </div>
    </div>
        </CardContent>
      </Card>
    </div>
  );
}
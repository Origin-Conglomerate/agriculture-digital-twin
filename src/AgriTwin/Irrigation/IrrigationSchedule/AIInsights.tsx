import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChevronRight,
  Lightbulb,
  Sparkles,
  Zap,
  AlertTriangle,
  Workflow,
  PieChart
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";

// AI-Powered Predictive Analytics Hook
const useAIPredictions = () => {
  const [insights, setInsights] = useState({
    waterOptimization: null,
    cropHealth: null,
    resourceEfficiency: null
  });

  const generateAIInsights = () => {
    const waterInsights = [
      { type: 'optimization', message: "Optimal watering time: 6 AM - 8 AM" },
      { type: 'reduction', message: "Potential water savings: 15% this week" },
      { type: 'zone', message: "Reduce watering in Zone 2 by 20%" }
    ];

    const cropHealthInsights = [
      { type: 'stress', message: "Crop stress detected in Zone 3" },
      { type: 'nutrition', message: "Soil pH levels indicate nutrient deficiency" },
      { type: 'growth', message: "Predicted 12% yield increase with current strategies" }
    ];

    const efficiencyInsights = [
      { type: 'energy', message: "Solar panel efficiency: 92% this month" },
      { type: 'resource', message: "Optimized irrigation reduces energy consumption" },
      { type: 'carbon', message: "Carbon footprint reduction: 25% YoY" }
    ];

    setInsights({
      waterOptimization: waterInsights[Math.floor(Math.random() * waterInsights.length)],
      cropHealth: cropHealthInsights[Math.floor(Math.random() * cropHealthInsights.length)],
      resourceEfficiency: efficiencyInsights[Math.floor(Math.random() * efficiencyInsights.length)]
    });
  };

  useEffect(() => {
    generateAIInsights();
    const interval = setInterval(generateAIInsights, 7000);
    return () => clearInterval(interval);
  }, []);

  return insights;
};

// Advanced AI Insights Component
export default function AIInsights() {
  const insights = useAIPredictions();
  const [activeTab, setActiveTab] = useState('water');

  return (
    <div className='flex justify-center items-center'>
      <Card className="w-full  bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-2xl hover:shadow-green-100/50 transition-all duration-300 ease-in-out">
        <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-6 rounded-t-2xl">
          <div className="lg:flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-bold text-green-900 dark:text-white flex items-center gap-3">
                <Sparkles className="text-green-600 dark:text-blue-400" />
                AI Intelligent Insights
              </CardTitle>
              <CardDescription className="text-green-700 dark:text-blue-200">
                Real-time predictive agricultural intelligence
              </CardDescription>
            </div>
            <Badge variant="outline" className="bg-white/30 dark:bg-black/30">
              AI-Powered
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          <Tabs
            defaultValue="water"
            className="w-full"
            onValueChange={setActiveTab}
          >
            <TabsList className="grid w-full h-full grid-cols-3 md:grid-cols-1 bg-green-50 dark:bg-gray-800">
              <TabsTrigger
                value="water"
                className={cn(
                  "flex items-center gap-2 transition-all duration-300",
                  activeTab === 'water' ? 'bg-green-200 dark:bg-blue-900' : ''
                )}
              >
                <Zap className="w-4 h-4" /> Water
              </TabsTrigger>
              <TabsTrigger
                value="crop"
                className={cn(
                  "flex items-center gap-2 transition-all duration-300",
                  activeTab === 'crop' ? 'bg-green-200 dark:bg-blue-900' : ''
                )}
              >
                <AlertTriangle className="w-4 h-4" /> Crop Health
              </TabsTrigger>
              <TabsTrigger
                value="efficiency"
                className={cn(
                  "flex items-center gap-2 transition-all duration-300",
                  activeTab === 'efficiency' ? 'bg-green-200 dark:bg-blue-900' : ''
                )}
              >
                <PieChart className="w-4 h-4" /> Efficiency
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
                {activeTab === 'water' && insights.waterOptimization && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300">
                        Water Optimization
                      </h3>
                      <Badge variant="secondary">{insights.waterOptimization.type}</Badge>
                    </div>
                    <p className="text-green-700 dark:text-blue-200">
                      {insights.waterOptimization.message}
                    </p>
                  </div>
                )}

                {activeTab === 'crop' && insights.cropHealth && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300">
                        Crop Health Analysis
                      </h3>
                      <Badge variant="destructive">{insights.cropHealth.type}</Badge>
                    </div>
                    <p className="text-green-700 dark:text-blue-200">
                      {insights.cropHealth.message}
                    </p>
                  </div>
                )}

                {activeTab === 'efficiency' && insights.resourceEfficiency && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300">
                        Resource Efficiency
                      </h3>
                      <Badge variant="outline">{insights.resourceEfficiency.type}</Badge>
                    </div>
                    <p className="text-green-700 dark:text-blue-200">
                      {insights.resourceEfficiency.message}
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </Tabs>

          <div className="mt-6 lg:flex justify-between items-center">
            <Button
              variant="outline"
              className="group hover:bg-green-100 dark:hover:bg-blue-900 transition-all"
            >
              Detailed Report
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <div className="flex items-center space-x-2">
              <Workflow className="text-green-600 dark:text-blue-400" />
              <span className="text-sm text-green-700 dark:text-blue-200">
                AI Model v2.5
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
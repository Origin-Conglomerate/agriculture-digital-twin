import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Leaf,
  BarChart2,
  Droplets,
  Wind,
  Recycle,
  ChevronRight,
  Repeat,
  Target,
  HouseIcon,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SustainabilityMetrics } from './SustainabilityMetrics';
import { ResourceOptimization } from './ResourceOptimization';
import { BiodiversityMonitor } from './BiodiversityMonitor';
import { CircularEconomyMetrics } from './CircularEconomyMetrics';
import { SustainabilityGoalTracker } from './SustainabilityGoalTracker';
import { cn } from "@/lib/utils";
import Greenhouse from './Greenhouse';

const useSustainabilityData = () => {
  const [data, setData] = useState({
    energy: null,
    water: null,
    waste: null,
    emissions: null
  });

  const generateInsights = () => {
    // Similar to useAIPredictions but with sustainability metrics
    setData({
      energy: {
        type: 'optimization',
        message: 'Solar energy utilization increased by 25%'
      },
      water: {
        type: 'conservation',
        message: 'Smart irrigation saved 50,000 gallons this month'
      },
      waste: {
        type: 'reduction',
        message: 'Waste recycling rate improved to 85%'
      },
      emissions: {
        type: 'tracking',
        message: 'Carbon emissions reduced by 30% YoY'
      }
    });
  };

  useEffect(() => {
    generateInsights();
    const interval = setInterval(generateInsights, 7000);
    return () => clearInterval(interval);
  }, []);

  return data;
};

export default function Sustainability() {
  const data = useSustainabilityData();
  const [activeTab, setActiveTab] = useState('biodiversity');

  return (
    // <div className="p-4 max-w-7xl mx-auto space-y-8">
    <Card className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-2xl hover:shadow-green-100/50 transition-all duration-300">
      <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-6 rounded-t-2xl">
        <div className="flex flex-wrap md:flex-nowrap justify-between items-center gap-4">
          <div className="flex flex-col">
            <CardTitle className="text-lg md:text-2xl font-bold text-green-900 dark:text-white flex items-center gap-3">
              <Leaf className="w-5 h-5 md:w-6 md:h-6 text-green-600 dark:text-blue-400" />
              Sustainability Dashboard
            </CardTitle>
            <CardDescription className="text-sm md:text-base text-green-700 dark:text-blue-200">
              Comprehensive environmental impact monitoring
            </CardDescription>
          </div>
          <Badge variant="outline" className="min-w-fit whitespace-nowrap bg-white/30 dark:bg-black/30 px-3 py-1 text-xs md:text-sm">
            Real-time Analytics
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        <SustainabilityMetrics />

        <Tabs defaultValue="biodiversity" onValueChange={setActiveTab}>
          <TabsList className="grid w-full h-full grid-cols-2 sm:grid-cols-4 md:grid-cols-3 bg-green-50 dark:bg-gray-800">
            <TabsTrigger
              value="biodiversity"
              className={cn(
                "flex items-center gap-2",
                activeTab === 'biodiversity' ? 'bg-green-200 dark:bg-blue-900' : ''
              )}
            >
              <BarChart2 className="w-4 h-4" /> Biodiversity
            </TabsTrigger>
            <TabsTrigger
              value="resourcemonitor"
              className={cn(
                "flex items-center gap-2",
                activeTab === 'resourcemonitor' ? 'bg-green-200 dark:bg-blue-900' : ''
              )}
            >
              <Droplets className="w-4 h-4" /> Resources
            </TabsTrigger>
            <TabsTrigger
              value="circular"
              className={cn(
                "flex items-center gap-2",
                activeTab === 'circular' ? 'bg-green-200 dark:bg-blue-900' : ''
              )}
            >
              <Recycle className="w-4 h-4" /> Circular Economy
            </TabsTrigger>
            <TabsTrigger
              value="goals"
              className={cn(
                "flex items-center gap-2",
                activeTab === 'goals' ? 'bg-green-200 dark:bg-blue-900' : ''
              )}
            >
              <Target className="w-4 h-4" /> Goals
            </TabsTrigger>
            <TabsTrigger
              value="greenhouse"
              className={cn(
                "flex items-center gap-2",
                activeTab === 'greenhouse' ? 'bg-green-200 dark:bg-blue-900' : ''
              )}
            >
              <HouseIcon className="w-4 h-4" /> Greenhouse
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
              <TabsContent value="biodiversity">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <BiodiversityMonitor />
                </motion.div>
              </TabsContent>

              <TabsContent value="resourcemonitor">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <ResourceOptimization />
                </motion.div>
              </TabsContent>

              <TabsContent value="circular">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <CircularEconomyMetrics />
                </motion.div>
              </TabsContent>

              <TabsContent value="goals" className="h-full flex flex-col">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <SustainabilityGoalTracker />
                </motion.div>
              </TabsContent>

              <TabsContent value="greenhouse">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Greenhouse />
                </motion.div>
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>

        <div className="mt-6 flex justify-between items-center">
          <Button
            variant="outline"
            className="group hover:bg-green-100 dark:hover:bg-blue-900 transition-all"
          >
            Generate Report
            <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Badge variant="outline" className="bg-white/30 dark:bg-black/30">
            Last updated: {new Date().toLocaleDateString()}
          </Badge>
        </div>
      </CardContent>
    </Card>
    // </div>
  );
}
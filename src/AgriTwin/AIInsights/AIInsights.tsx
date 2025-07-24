import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ChevronRight,
  Lightbulb,
  Sparkles,
  SproutIcon,
  Droplets,
  Bug,
  TrendingUp,
  DollarSign,
  Thermometer,
  Cloud,
  Box,
  IndianRupee
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";

// Insight Card Component
const InsightCard = ({ title, type, message, icon: Icon }) => (
  <Card className="bg-white/40 dark:bg-gray-800/40 hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all duration-300">
    <CardContent className="p-4 space-y-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Icon className="text-green-600 dark:text-blue-400" />
          <h4 className="font-medium text-green-800 dark:text-blue-300">{title}</h4>
        </div>
        <Badge variant="outline" className="bg-white/30 dark:bg-black/30">
          {type}
        </Badge>
      </div>
      <p className="text-sm text-green-700 dark:text-blue-200">{message}</p>
    </CardContent>
  </Card>
);

// AI Predictions Hook with Extended Features
const useAIPredictions = () => {
  const [insights, setInsights] = useState({
    cropRotation: [],
    irrigation: [],
    soilHealth: [],
    pests: [],
    yield: [],
    market: [],
    inventory: [],
    weather: []
  });

  const generateAIInsights = () => {
    const newInsights = {
      cropRotation: [
        { title: "Rotation Planning", type: "recommendation", message: "Switch to legumes in Field 3 next season for nitrogen fixation", icon: SproutIcon },
        { title: "Crop Compatibility", type: "analysis", message: "Current rotation pattern shows 95% compatibility score", icon: SproutIcon }
      ],
      irrigation: [
        { title: "Water Schedule", type: "optimization", message: "Optimal irrigation window: 5:30 AM - 7:30 AM", icon: Droplets },
        { title: "Water Usage", type: "efficiency", message: "20% water savings potential through smart irrigation", icon: Droplets }
      ],
      soilHealth: [
        { title: "Soil Temperature", type: "monitoring", message: "Zone 2 soil temperature: 24°C - Optimal for current crop", icon: Thermometer },
        { title: "Moisture Levels", type: "alert", message: "Field 4 showing signs of water stress - Increase irrigation", icon: Droplets }
      ],
      pests: [
        { title: "Pest Detection", type: "warning", message: "Early signs of aphid infestation in Zone 1", icon: Bug },
        { title: "Treatment Plan", type: "action", message: "Recommended: Organic pesticide application in affected areas", icon: Bug }
      ],
      yield: [
        { title: "Yield Forecast", type: "prediction", message: "Expected yield increase of 15% compared to last season", icon: TrendingUp },
        { title: "Growth Tracking", type: "analysis", message: "Crop growth rate 5% above average in all zones", icon: TrendingUp }
      ],
      market: [
        { title: "Price Trends", type: "market", message: "Current crop prices trending 10% higher than last month", icon: IndianRupee },
        { title: "Market Demand", type: "forecast", message: "High demand expected for organic produce next month", icon: IndianRupee }
      ],
      inventory: [
        { title: "Stock Status", type: "inventory", message: "Fertilizer stocks low - Order needed within 5 days", icon: Box },
        { title: "Resource Planning", type: "planning", message: "Seed requirement for next season: 500kg", icon: Box }
      ],
      weather: [
        { title: "Weather Alert", type: "forecast", message: "Heavy rainfall expected in 48 hours - Adjust irrigation", icon: Cloud },
        { title: "Climate Impact", type: "analysis", message: "Current conditions optimal for crop development", icon: Cloud }
      ]
    };

    setInsights(newInsights);
  };

  useEffect(() => {
    generateAIInsights();
    const interval = setInterval(generateAIInsights, 10000);
    return () => clearInterval(interval);
  }, []);

  return insights;
};

// Main Help Component
export default function AIInsights() {
  const insights = useAIPredictions();
  const [activeTab, setActiveTab] = useState('cropRotation');

  const tabs = [
    { id: 'cropRotation', label: 'Crop Rotation', icon: SproutIcon },
    { id: 'irrigation', label: 'Irrigation', icon: Droplets },
    { id: 'soilHealth', label: 'Soil Health', icon: Thermometer },
    { id: 'pests', label: 'Pest Management', icon: Bug },
    { id: 'yield', label: 'Yield Analysis', icon: TrendingUp },
    { id: 'market', label: 'Market Insights', icon: IndianRupee },
    { id: 'inventory', label: 'Inventory', icon: Box },
    { id: 'weather', label: 'Weather', icon: Cloud }
  ];

  return (
    <Card className="w-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-2xl hover:shadow-green-100/50 transition-all duration-300 ease-in-out">
      <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-6 rounded-t-2xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <CardTitle className="text-2xl font-bold text-green-900 dark:text-white flex items-center gap-3">
              <Sparkles className="text-green-600 dark:text-blue-400" />
              Farm Intelligence Hub
            </CardTitle>
            <CardDescription className="text-green-700 dark:text-blue-200">
              AI-Powered Agricultural Insights & Recommendations
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="bg-white/30 dark:bg-black/30">
              Real-time Analysis
            </Badge>
            <Badge variant="outline" className="bg-white/30 dark:bg-black/30">
              AI-Powered
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-7">
        <ScrollArea className="w-full">
          <Tabs 
            defaultValue="cropRotation" 
            className="w-full"
            onValueChange={setActiveTab}
          >
            <TabsList className="grid grid-cols-2 lg:grid-cols-8 md:grid-cols-2 w-full h-full overflow-x-auto space-x-2 bg-green-50 dark:bg-gray-800 p-1 mb-4 ">
              {tabs.map(tab => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className={cn(
                    "flex items-center gap-2 whitespace-nowrap transition-all duration-300",
                    activeTab === tab.id ? 'bg-green-200 dark:bg-blue-900' : ''
                  )}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <AnimatePresence mode="wait">
              {tabs.map(tab => (
                <TabsContent key={tab.id} value={tab.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    {insights[tab.id]?.map((insight, index) => (
                      <InsightCard
                        key={index}
                        title={insight.title}
                        type={insight.type}
                        message={insight.message}
                        icon={insight.icon}
                      />
                    ))}
                  </motion.div>
                </TabsContent>
              ))}
            </AnimatePresence>
          </Tabs>
        </ScrollArea>

        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="group hover:bg-green-100 dark:hover:bg-blue-900 transition-all"
            >
              Detailed Analysis
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              className="group hover:bg-green-100 dark:hover:bg-blue-900 transition-all"
            >
              Export Report
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Lightbulb className="text-green-600 dark:text-blue-400" />
            <span className="text-sm text-green-700 dark:text-blue-200">
              Advanced AI Model v3.0
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
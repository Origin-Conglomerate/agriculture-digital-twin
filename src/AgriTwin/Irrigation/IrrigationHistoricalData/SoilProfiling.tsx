import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileDown,
  Microscope,
  Map,
  BarChart3,
  Share2,
  Download,
  RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";

// Soil Analysis Data Hook
const useSoilAnalysis = () => {
  const [soilData, setSoilData] = useState({
    composition: null,
    nutrients: null,
    recommendations: null
  });

  const generateSoilData = () => {
    const compositionData = [
      { type: 'texture', message: "Sandy loam soil with 60% sand, 30% silt, 10% clay" },
      { type: 'structure', message: "Granular structure with good aeration" },
      { type: 'depth', message: "Effective soil depth: 90cm" }
    ];

    const nutrientData = [
      { type: 'macronutrients', message: "Nitrogen: Low, Phosphorus: Medium, Potassium: High" },
      { type: 'pH', message: "Soil pH: 6.5 - Optimal for most crops" },
      { type: 'organic', message: "Organic matter content: 3.2%" }
    ];

    const recommendationData = [
      { type: 'fertilizer', message: "Apply nitrogen-rich fertilizer at 150kg/ha" },
      { type: 'amendment', message: "Add organic matter to improve soil structure" },
      { type: 'management', message: "Implement crop rotation with legumes" }
    ];

    setSoilData({
      composition: compositionData[Math.floor(Math.random() * compositionData.length)],
      nutrients: nutrientData[Math.floor(Math.random() * nutrientData.length)],
      recommendations: recommendationData[Math.floor(Math.random() * recommendationData.length)]
    });
  };

  useEffect(() => {
    generateSoilData();
    const interval = setInterval(generateSoilData, 8000);
    return () => clearInterval(interval);
  }, []);

  return soilData;
};

export default function SoilProfilingReport() {
  const soilData = useSoilAnalysis();
  const [activeTab, setActiveTab] = useState('composition');
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    setIsLoading(true);
    // Simulate download delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  return (
    <div className="flex justify-center items-center ">
          <Card className="w-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-2xl hover:shadow-green-100/50 transition-all duration-300 ease-in-out">
          <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-4 sm:p-6 rounded-t-2xl ">
          <div className=" flex-col sm:flex-row gap-4 sm:gap-0 sm:justify-between sm:items-center">
            <div>
              <CardTitle className="text-2xl font-bold text-green-900 dark:text-white flex items-center gap-2 sm:gap-3 mt-2">
                <Microscope className="w-6 h-6 text-green-600 dark:text-blue-400" />
                Soil Profile Analysis
              </CardTitle>
              <CardDescription className="text-base text-green-700 dark:text-blue-200">
                Comprehensive soil composition and health analysis
              </CardDescription>
            </div>
            <Badge variant="outline" className="bg-white/30 dark:bg-black/30 ">
              Real-time Analysis
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          <Tabs
            defaultValue="composition"
            className="w-full"
            onValueChange={setActiveTab}
          >
            <TabsList className="grid w-full h-full md:grid-cols-3 grid-cols-2 bg-green-50 dark:bg-gray-800 gap-1">
              <TabsTrigger
                value="composition"
                className={cn(
                  "flex items-center transition-all duration-300",
                  activeTab === 'composition' ? 'bg-green-200 dark:bg-blue-900' : ''
                )}
              >
                <Map className="w-4 h-4" /> Composition
              </TabsTrigger>
              <TabsTrigger
                value="nutrients"
                className={cn(
                  "flex items-center gap-0 transition-all duration-300",
                  activeTab === 'nutrients' ? 'bg-green-200 dark:bg-blue-900' : ''
                )}
              >
                <BarChart3 className="w-4 h-4" /> Nutrients
              </TabsTrigger>
              <TabsTrigger
                value="recommendations"
                className={cn(
                  "flex items-center gap-2 transition-all duration-300",
                  activeTab === 'recommendations' ? 'bg-green-200 dark:bg-blue-900' : ''
                )}
              >
                <Share2 className="w-4 h-4" /> Recommendations
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
                {activeTab === 'composition' && soilData.composition && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300">
                        Soil Composition
                      </h3>
                      <Badge variant="secondary">{soilData.composition.type}</Badge>
                    </div>
                    <p className="text-green-700 dark:text-blue-200">
                      {soilData.composition.message}
                    </p>
                  </div>
                )}

                {activeTab === 'nutrients' && soilData.nutrients && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300">
                        Nutrient Analysis
                      </h3>
                      <Badge variant="destructive">{soilData.nutrients.type}</Badge>
                    </div>
                    <p className="text-green-700 dark:text-blue-200">
                      {soilData.nutrients.message}
                    </p>
                  </div>
                )}

                {activeTab === 'recommendations' && soilData.recommendations && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300">
                        Recommendations
                      </h3>
                      <Badge variant="outline">{soilData.recommendations.type}</Badge>
                    </div>
                    <p className="text-green-700 dark:text-blue-200">
                      {soilData.recommendations.message}
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </Tabs>

          <div className="mt-6 flex justify-between items-center gap-2">
            <Button
              variant="outline"
              className="group hover:bg-green-100 dark:hover:bg-blue-900 transition-all"
              onClick={handleDownload}
              disabled={isLoading}
            >
              {isLoading ? (
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Download className="mr-2 h-4 w-4" />
              )}
              Download Full Report
            </Button>
            <div className="flex items-center space-x-2">
              <FileDown className="text-green-600 dark:text-blue-400" />
              <span className="text-sm text-green-700 dark:text-blue-200">
                Last updated: {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
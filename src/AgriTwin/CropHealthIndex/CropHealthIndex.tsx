import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Sprout, Calendar, Upload, ChevronRight, TrendingUp, Cloud } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";
import { HealthIndex } from './HealthIndex';
import { LifeCycleTimeline } from './LifeCycleTimeline';
import { useCropHealth } from './UseCropHealth';
import { PredictiveAnalysis } from './PredictiveAnalysis';
import { WeatherImpact } from './WeatherImpact';
import { CropLifeCycleStage } from './Types';

export default function CropHealthIndex() {
    const { healthData, currentMonth, setCurrentMonth } = useCropHealth();
    const [activeTab, setActiveTab] = useState('health');

    const lifeCycleStages: CropLifeCycleStage[] = [
        {
            stage: "Germination",
            duration: "Week 1-2",
            currentStage: false,
            completed: true,
            healthIndex: 95,
            description: "Seeds sprouting and initial root development"
        },
        {
            stage: "Vegetative Growth",
            duration: "Month 2-4",
            currentStage: true,
            completed: false,
            healthIndex: 88,
            description: "Rapid leaf and stem development"
        },
        {
            stage: "Flowering",
            duration: "Month 5-7",
            currentStage: false,
            completed: false,
            healthIndex: 0,
            description: "Flower development and pollination"
        },
        {
            stage: "Fruit Development",
            duration: "Month 8-10",
            currentStage: false,
            completed: false,
            healthIndex: 0,
            description: "Fruit setting and growth"
        },
        {
            stage: "Harvesting",
            duration: "Month 11-12",
            currentStage: false,
            completed: false,
            healthIndex: 0,
            description: "Crop maturity and harvest readiness"
        }
    ];

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Handle image upload and processing
        console.log("Image uploaded:", event.target.files?.[0]);
    };

    const predictiveData = Array.from({ length: 12 }, (_, i) => ({
        month: i + 1,
        actual: Math.floor(Math.random() * (95 - 60) + 60),
        predicted: Math.floor(Math.random() * (95 - 60) + 60)
    }));

    // Add mock weather data
    const weatherData = {
        temperature: 25,
        humidity: 65,
        rainfall: 25,
        windSpeed: 12,
        impact: 'Positive' as const,
        recommendations: [
            'Optimal conditions for growth',
            'Consider reducing irrigation due to recent rainfall',
            'Monitor humidity levels in the evening'
        ]
    };

    return (
        <div className="container mx-auto p-2 space-y-6">
            <Card className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-2xl hover:shadow-green-100/50 transition-all duration-300">
                <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-6 rounded-t-2xl">
                    <div className="md:flex justify-between items-center">
                        <div>
                            <CardTitle className="text-2xl font-bold text-green-900 dark:text-white flex items-center gap-3">
                                <Sprout className="text-green-600 dark:text-blue-400" />
                                Crop Health Monitor
                            </CardTitle>
                            <CardDescription className="text-green-700 dark:text-blue-200">
                                Comprehensive crop health analysis and lifecycle tracking
                            </CardDescription>
                        </div>
                        <Badge variant="outline" className="bg-white/30 dark:bg-black/30">
                            AI-Enhanced
                        </Badge>
                    </div>
                </CardHeader>

                <CardContent className="p-4 space-y-6">
                    <Tabs
                        defaultValue="health"
                        className="w-full"
                        onValueChange={setActiveTab}
                    >
                        <TabsList className="grid h-full w-full grid-cols-2   bg-green-50 dark:bg-gray-800 p-1">
                            <TabsTrigger
                                value="health"
                                className={cn(
                                    "flex items-center gap-2 transition-all duration-300 text-xs sm:text-sm px-2 py-1.5 bg-white/50 dark:bg-gray-700/50 rounded-md",
                                    activeTab === 'health' ? 'bg-green-200 dark:bg-blue-900' : ''
                                )}
                            >
                                <Sprout className="w-4 h-4" />
                                <span className="hidden sm:inline">Health</span>
                                <span className="sm:hidden">Health</span>
                            </TabsTrigger>

                            <TabsTrigger
                                value="lifecycle"
                                className={cn(
                                    "flex items-center gap-1 transition-all duration-300 text-xs sm:text-sm px-2 py-1.5 bg-white/50 dark:bg-gray-700/50 rounded-md",
                                    activeTab === 'lifecycle' ? 'bg-green-200 dark:bg-blue-900' : ''
                                )}
                            >
                                <Calendar className="w-4 h-4" />
                                <span className="hidden sm:inline">Life Cycle</span>
                                <span className="sm:hidden">Life</span>
                            </TabsTrigger>

                            <TabsTrigger
                                value="predictive"
                                className={cn(
                                    "flex items-center gap-1 transition-all duration-300 text-xs sm:text-sm px-2 py-1.5 bg-white/50 dark:bg-gray-700/50 rounded-md",
                                    activeTab === 'predictive' ? 'bg-green-300 dark:bg-blue-900' : ''
                                )}
                            >
                                <TrendingUp className="w-4 h-4" />
                                <span className="hidden sm:inline">Predictions</span>
                                <span className="sm:hidden">Pred.</span>
                            </TabsTrigger>

                            <TabsTrigger
                                value="weather"
                                className={cn(
                                    "flex items-center gap-1 transition-all duration-300 text-xs sm:text-sm px-2 py-1.5 bg-white/50 dark:bg-gray-700/50 rounded-md",
                                    activeTab === 'weather' ? 'bg-green-200 dark:bg-blue-900' : ''
                                )}
                            >
                                <Cloud className="w-4 h-4" />
                                <span className="hidden sm:inline">Weather Impact</span>
                                <span className="sm:hidden">Weather</span>
                            </TabsTrigger>
                        </TabsList>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="mt-8"
                            >
                                {activeTab === 'health' && (
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {healthData.map((data) => (
                                                <HealthIndex key={data.month} data={data} />
                                            ))}
                                        </div>
                                        <div className="flex justify-center">
                                            <Button
                                                variant="outline"
                                                className="group hover:bg-green-100 dark:hover:bg-blue-900 transition-all"
                                                onClick={() => document.getElementById('image-upload')?.click()}
                                            >
                                                <Upload className="mr-2" />
                                                Upload Monthly Health Image
                                                <input
                                                    id="image-upload"
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={handleImageUpload}
                                                />
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'lifecycle' && (
                                    <LifeCycleTimeline stages={lifeCycleStages} />
                                )}

                                {activeTab === 'predictive' && (
                                    <PredictiveAnalysis historicalData={predictiveData} />
                                )}

                                {activeTab === 'weather' && (
                                    <WeatherImpact weatherData={weatherData} />
                                )}


                            </motion.div>
                        </AnimatePresence>
                    </Tabs>

                    <div className="mt-6 flex justify-between items-center">
                        <Button
                            variant="outline"
                            className="group hover:bg-green-100 dark:hover:bg-blue-900 transition-all"
                        >
                            Export Report
                            <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                        <Badge variant="outline" className="bg-white/30 dark:bg-black/30">
                            Last updated: {new Date().toLocaleDateString()}
                        </Badge>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  ChevronRight,
  Lightbulb,
  Sparkles,
  Zap,
  AlertTriangle,
  Workflow,
  PieChart,
  Leaf,
  Thermometer,
  Users,
  CreditCard,
  Package,
  Activity,
  Info,
  BarChart2,
  Calendar,
  CloudRain,
  Sun,
  Wind,
  Truck,
  Clipboard,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Download,
  IndianRupee
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";

// Simulation Hook
const useSimulation = () => {
  const [simulationData, setSimulationData] = useState({
    farmArea: 0,
    requiredResources: [],
    timeline: [],
    environmentFactors: {},
    machines: [],
    labor: [],
    expenses: [],
    inventory: [],
    expectedYield: 0,
    cropHealth: 100,
    soilQuality: 100,
    weatherData: {
      temperature: 0,
      humidity: 0,
      rainfall: 0,
      sunlight: 0,
      windSpeed: 0
    },
    financialProjections: {
      totalRevenue: 0,
      totalExpenses: 0,
      netProfit: 0,
      breakEvenPoint: 0
    }
  });

  const initializeSimulation = (farmArea) => {
    // Simulate farm requirements, timeline, environment factors, resources, etc. based on farmArea input
    setSimulationData({
      farmArea: farmArea,
      requiredResources: [
        { type: 'seeds', quantity: 500, vendor: 'GreenFields Inc.' },
        { type: 'fertilizer', quantity: 200, vendor: 'AgroChem Ltd.' },
        { type: 'irrigation', quantity: 1, vendor: 'WaterWorks Corp.' }
      ],
      timeline: [
        { milestone: 'Soil Preparation', duration: 7 },
        { milestone: 'Sowing', duration: 3 },
        { milestone: 'Irrigation Setup', duration: 5 },
        { milestone: 'Fertigation', duration: 2 },
        { milestone: 'Crop Growth', duration: 90 },
        { milestone: 'Harvesting', duration: 7 }
      ],
      environmentFactors: {
        temperature: 28,
        humidity: 65,
        rainfall: 50,
        sunlight: 8,
        windSpeed: 10
      },
      machines: [
        { type: 'Tractor', quantity: 2, vendor: 'FarmMachines Inc.' },
        { type: 'Harvester', quantity: 1, vendor: 'HarvestPro Ltd.' }
      ],
      labor: [
        { type: 'Farm Manager', quantity: 1, cost: 3000 },
        { type: 'Farm Laborers', quantity: 10, cost: 1500 }
      ],
      expenses: [
        { type: 'Seeds', cost: 1000 },
        { type: 'Fertilizer', cost: 500 },
        { type: 'Irrigation', cost: 800 },
        { type: 'Labor', cost: 15000 },
        { type: 'Machinery', cost: 8000 }
      ],
      inventory: [
        { type: 'Wheat', quantity: 2000, unit: 'kg' },
        { type: 'Corn', quantity: 1500, unit: 'kg' },
        { type: 'Tomatoes', quantity: 500, unit: 'kg' }
      ],
      expectedYield: 4500,
      cropHealth: 100,
      soilQuality: 100,
      weatherData: {
        temperature: 28,
        humidity: 65,
        rainfall: 50,
        sunlight: 8,
        windSpeed: 10
      },
      financialProjections: {
        totalRevenue: 90000,
        totalExpenses: 25000,
        netProfit: 65000,
        breakEvenPoint: 6
      }
    });
  };

  const updateWeather = (weatherData) => {
    setSimulationData((prevState) => ({
      ...prevState,
      weatherData: weatherData
    }));
  };

  const updateCropHealth = (cropHealth) => {
    setSimulationData((prevState) => ({
      ...prevState,
      cropHealth: cropHealth
    }));
  };

  const updateSoilQuality = (soilQuality) => {
    setSimulationData((prevState) => ({
      ...prevState,
      soilQuality: soilQuality
    }));
  };

  const updateFinancialProjections = (financialProjections) => {
    setSimulationData((prevState) => ({
      ...prevState,
      financialProjections: financialProjections
    }));
  };

  return { simulationData, initializeSimulation, updateWeather, updateCropHealth, updateSoilQuality, updateFinancialProjections };
};

// Simulation Component
export default function Simulator() {
  const { simulationData, initializeSimulation, updateWeather, updateCropHealth, updateSoilQuality, updateFinancialProjections } = useSimulation();
  const [activeTab, setActiveTab] = useState('overview');
  const [farmArea, setFarmArea] = useState(10);

  useEffect(() => {
    initializeSimulation(farmArea);
  }, [farmArea, initializeSimulation]);

  // Function to update weather data
  const handleWeatherUpdate = () => {
    const newWeatherData = {
      temperature: Math.floor(Math.random() * (35 - 20 + 1)) + 20,
      humidity: Math.floor(Math.random() * (90 - 40 + 1)) + 40,
      rainfall: Math.floor(Math.random() * (80 - 20 + 1)) + 20,
      sunlight: Math.floor(Math.random() * (10 - 4 + 1)) + 4,
      windSpeed: Math.floor(Math.random() * (20 - 5 + 1)) + 5
    };
    updateWeather(newWeatherData);

    // Update crop health and soil quality based on weather
    const cropHealth = Math.max(0, simulationData.cropHealth + (newWeatherData.temperature - 28) + (newWeatherData.rainfall - 50) + (newWeatherData.sunlight - 8) + (newWeatherData.windSpeed - 10));
    updateCropHealth(cropHealth);

    const soilQuality = Math.max(0, simulationData.soilQuality + (newWeatherData.rainfall - 50) + (newWeatherData.windSpeed - 10));
    updateSoilQuality(soilQuality);

    // Update financial projections based on weather and crop/soil conditions
    const revenue = simulationData.expectedYield * 2; // Assume $2 per kg
    const expenses = simulationData.expenses.reduce((total, expense) => total + expense.cost, 0);
    const netProfit = revenue - expenses;
    const breakEvenPoint = expenses / revenue * 12; // Months to break even

    updateFinancialProjections({
      totalRevenue: revenue,
      totalExpenses: expenses,
      netProfit: netProfit,
      breakEvenPoint: breakEvenPoint
    });
  };

  return (
    <div className='flex justify-center items-center'>
      <Card className="w-full  bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-2xl hover:shadow-green-100/50 transition-all duration-300 ease-in-out">
        <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-6 rounded-t-2xl">
          <div className="md:flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-bold text-green-900 dark:text-white flex items-center gap-3">
                <Leaf className="text-green-600 dark:text-blue-400" />
                Farm Simulation
              </CardTitle>
              <CardDescription className="text-green-700 dark:text-blue-200">
                Visualize, plan, and optimize your future smart farm
              </CardDescription>
            </div>
            <Badge variant="outline" className="bg-white/30 dark:bg-black/30">
              AI-Powered
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6 ">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center space-x-4 ">
              <label htmlFor="farmArea" className="text-green-700 dark:text-blue-200">
                Farm Area (acres):
              </label>
              <input
                id="farmArea"
                type="number"
                min="1"
                max="500"
                value={farmArea}
                onChange={(e) => setFarmArea(parseInt(e.target.value))}
                className="px-2 py-2  bg-white/50 dark:bg-gray-800/50 border border-green-200 dark:border-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-blue-500 transition-colors duration-300"
              />
            </div>
            <Button
              variant="outline"
              className="group hover:bg-green-100 dark:hover:bg-blue-900 transition-all"
              onClick={() => initializeSimulation(farmArea)}
            >
              Simulate
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <Tabs
            defaultValue="overview"
            className="w-full"
            onValueChange={setActiveTab}
          >
            <div className="relative w-full ">
              <TabsList className="h-full flex overflow-x-auto md:overflow-x-visible scrollbar-hide min-w-full bg-green-50 dark:bg-gray-800">
                <div className="flex h-full w-full sm:grid sm:grid-cols-3 lg:grid lg:grid-cols-6">
                  <TabsTrigger
                    value="overview"
                    className={cn(
                      "flex items-center justify-center gap-2 transition-all duration-300 whitespace-nowrap min-w-[120px] sm:min-w-0",
                      activeTab === 'overview' ? 'bg-green-200 dark:bg-blue-900' : ''
                    )}
                  >
                    <Lightbulb className="w-4 h-4" /> Overview
                  </TabsTrigger>
                  <TabsTrigger
                    value="resources"
                    className={cn(
                      "flex items-center justify-center gap-2 transition-all duration-300 whitespace-nowrap min-w-[120px] sm:min-w-0",
                      activeTab === 'resources' ? 'bg-green-200 dark:bg-blue-900' : ''
                    )}
                  >
                    <Package className="w-4 h-4" /> Resources
                  </TabsTrigger>
                  <TabsTrigger
                    value="timeline"
                    className={cn(
                      "flex items-center justify-center gap-2 transition-all duration-300 whitespace-nowrap min-w-[120px] sm:min-w-0",
                      activeTab === 'timeline' ? 'bg-green-200 dark:bg-blue-900' : ''
                    )}
                  >
                    <Activity className="w-4 h-4" /> Timeline
                  </TabsTrigger>
                  <TabsTrigger
                    value="environment"
                    className={cn(
                      "flex items-center justify-center gap-2 transition-all duration-300 whitespace-nowrap min-w-[120px] sm:min-w-0",
                      activeTab === 'environment' ? 'bg-green-200 dark:bg-blue-900' : ''
                    )}
                  >
                    <Thermometer className="w-4 h-4" /> Environment
                  </TabsTrigger>
                  <TabsTrigger
                    value="economics"
                    className={cn(
                      "flex items-center justify-center gap-2 transition-all duration-300 whitespace-nowrap min-w-[120px] sm:min-w-0",
                      activeTab === 'economics' ? 'bg-green-200 dark:bg-blue-900' : ''
                    )}
                  >
                    <CreditCard className="w-4 h-4" /> Economics
                  </TabsTrigger>
                  <TabsTrigger
                    value="simulation"
                    className={cn(
                      "flex items-center justify-center gap-2 transition-all duration-300 whitespace-nowrap min-w-[120px] sm:min-w-0",
                      activeTab === 'simulation' ? 'bg-green-200 dark:bg-blue-900' : ''
                    )}
                  >
                    <Workflow className="w-4 h-4" /> Simulation
                  </TabsTrigger>
                </div>
              </TabsList>
            </div>

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
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300">
                        Farm Overview
                      </h3>
                      <Badge variant="secondary">AI-Powered</Badge>
                    </div>
                    <p className="text-green-700 dark:text-blue-200">
                      Your simulated farm covers an area of {simulationData.farmArea} acres. Based on the inputs, we've generated a comprehensive plan to help you set up and manage your smart farm effectively.
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <Leaf className="text-green-600 dark:text-blue-400" />
                        <span className="text-green-700 dark:text-blue-200">Crop Health</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Slider

                          onValueChange={(value) => updateCropHealth(value)}
                          min={0}
                          max={100}
                          step={1}
                          className="w-28"
                        />
                        <span className="text-green-700 dark:text-blue-200">{simulationData.cropHealth}%</span>
                      </div>
                    </div>


                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <Thermometer className="text-green-600 dark:text-blue-400" />
                        <span className="text-green-700 dark:text-blue-200">Soil Quality</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Slider

                          onValueChange={(value) => updateSoilQuality(value)}
                          min={0}
                          max={100}
                          step={1}
                          className="w-28"
                        />
                        <span className="text-green-700 dark:text-blue-200">{simulationData.soilQuality}%</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'resources' && (
                  <div className="space-y-4">
                    <div className="md:flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300">
                        Required Resources
                      </h3>
                      <Badge variant="secondary">Smart Recommendations</Badge>
                    </div>
                    <ul className="space-y-2">
                      {simulationData.requiredResources.map((resource, index) => (
                        <li key={index} className="md:flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <Sparkles className="text-green-600 dark:text-blue-400" />
                            <span className="text-green-700 dark:text-blue-200">{resource.type}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-green-700 dark:text-blue-200">{resource.quantity}</span>
                            <Badge variant="outline" className="bg-white/30 dark:bg-black/30">
                              {resource.vendor}
                            </Badge>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === 'timeline' && (
                  <div className="space-y-4">
                    <div className="md:flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300">
                        Project Timeline
                      </h3>
                      <Badge variant="secondary">Milestones</Badge>
                    </div>
                    <ul className="space-y-2">
                      {simulationData.timeline.map((milestone, index) => (
                        <li key={index} className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <Activity className="text-green-600 dark:text-blue-400" />
                            <span className="text-green-700 dark:text-blue-200">{milestone.milestone}</span>
                          </div>
                          <span className="text-green-700 dark:text-blue-200">{milestone.duration} days</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === 'environment' && (
                  <div className="space-y-4">
                    <div className="md:flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300">
                        Environmental Factors
                      </h3>
                      <Badge variant="secondary">Optimal Conditions</Badge>
                    </div>
                    {/* Use grid-cols-1 on mobile and grid-cols-2 on medium screens and above */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <Thermometer className="text-green-600 dark:text-blue-400" />
                          <span className="text-green-700 dark:text-blue-200">Temperature</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-green-700 dark:text-blue-200">
                            {simulationData.weatherData.temperature}°C
                          </span>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info />
                              </TooltipTrigger>
                              <TooltipContent>
                                <div className="space-y-2">
                                  <p className="text-green-700 dark:text-blue-200">
                                    Optimal temperature range: 20-30°C
                                  </p>
                                  <p className="text-green-700 dark:text-blue-200">
                                    Current temperature: {simulationData.weatherData.temperature}°C
                                  </p>
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <Zap className="text-green-600 dark:text-blue-400" />
                          <span className="text-green-700 dark:text-blue-200">Humidity</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-green-700 dark:text-blue-200">
                            {simulationData.weatherData.humidity}%
                          </span>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info />
                              </TooltipTrigger>
                              <TooltipContent>
                                <div className="space-y-2">
                                  <p className="text-green-700 dark:text-blue-200">
                                    Optimal humidity range: 50-80%
                                  </p>
                                  <p className="text-green-700 dark:text-blue-200">
                                    Current humidity: {simulationData.weatherData.humidity}%
                                  </p>
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <Sparkles className="text-green-600 dark:text-blue-400" />
                          <span className="text-green-700 dark:text-blue-200">Rainfall</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-green-700 dark:text-blue-200">
                            {simulationData.weatherData.rainfall}mm
                          </span>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info />
                              </TooltipTrigger>
                              <TooltipContent>
                                <div className="space-y-2">
                                  <p className="text-green-700 dark:text-blue-200">
                                    Optimal rainfall range: 40-60mm
                                  </p>
                                  <p className="text-green-700 dark:text-blue-200">
                                    Current rainfall: {simulationData.weatherData.rainfall}mm
                                  </p>
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <Lightbulb className="text-green-600 dark:text-blue-400" />
                          <span className="text-green-700 dark:text-blue-200">Sunlight</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-green-700 dark:text-blue-200">
                            {simulationData.weatherData.sunlight} hours
                          </span>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info />
                              </TooltipTrigger>
                              <TooltipContent>
                                <div className="space-y-2">
                                  <p className="text-green-700 dark:text-blue-200">
                                    Optimal sunlight range: 6-10 hours
                                  </p>
                                  <p className="text-green-700 dark:text-blue-200">
                                    Current sunlight: {simulationData.weatherData.sunlight} hours
                                  </p>
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <Wind className="text-green-600 dark:text-blue-400" />
                          <span className="text-green-700 dark:text-blue-200">Wind Speed</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-green-700 dark:text-blue-200">
                            {simulationData.weatherData.windSpeed} km/h
                          </span>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info />
                              </TooltipTrigger>
                              <TooltipContent>
                                <div className="space-y-2">
                                  <p className="text-green-700 dark:text-blue-200">
                                    Optimal wind speed range: 5-15 km/h
                                  </p>
                                  <p className="text-green-700 dark:text-blue-200">
                                    Current wind speed: {simulationData.weatherData.windSpeed} km/h
                                  </p>
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                    </div>
                  </div>

                )}

                {activeTab === 'economics' && (
                  <div className="space-y-4">
                    <div className="md:flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300">
                        Economic Projections
                      </h3>
                      <Badge variant="secondary">Smart Estimates</Badge>
                    </div>
                    {/* First set of economic factors */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <CreditCard className="text-green-600 dark:text-blue-400" />
                            <span className="text-green-700 dark:text-blue-200">Total Expenses</span>
                          </div>
                          <span className="text-green-700 dark:text-blue-200">
                            ₹{simulationData.financialProjections.totalExpenses.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <Users className="text-green-600 dark:text-blue-400" />
                            <span className="text-green-700 dark:text-blue-200">Labor Cost</span>
                          </div>
                          <span className="text-green-700 dark:text-blue-200">
                            ₹{simulationData.labor.reduce((total, worker) => total + worker.cost, 0).toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <Package className="text-green-600 dark:text-blue-400" />
                            <span className="text-green-700 dark:text-blue-200">Inventory Value</span>
                          </div>
                          <span className="text-green-700 dark:text-blue-200">
                            ₹{simulationData.inventory.reduce((total, item) => total + (item.quantity * 2), 0).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <PieChart className="text-green-600 dark:text-blue-400" />
                            <span className="text-green-700 dark:text-blue-200">Expected Yield</span>
                          </div>
                          <span className="text-green-700 dark:text-blue-200">
                            {simulationData.expectedYield.toLocaleString()} kg
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* Second set of economic factors */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <TrendingUp className="text-green-600 dark:text-blue-400" />
                            <span className="text-green-700 dark:text-blue-200">Total Revenue</span>
                          </div>
                          <span className="text-green-700 dark:text-blue-200">
                            ₹{simulationData.financialProjections.totalRevenue.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <IndianRupee className="text-green-600 dark:text-blue-400" />
                            <span className="text-green-700 dark:text-blue-200">Net Profit</span>
                          </div>
                          <span className="text-green-700 dark:text-blue-200">
                            ₹{simulationData.financialProjections.netProfit.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <Calendar className="text-green-600 dark:text-blue-400" />
                            <span className="text-green-700 dark:text-blue-200">Break-Even Point</span>
                          </div>
                          <span className="text-green-700 dark:text-blue-200">
                            {simulationData.financialProjections.breakEvenPoint.toFixed(1)} months
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <TrendingDown className="text-green-600 dark:text-blue-400" />
                            <span className="text-green-700 dark:text-blue-200">Cost-to-Revenue Ratio</span>
                          </div>
                          <span className="text-green-700 dark:text-blue-200">
                            {(simulationData.financialProjections.totalExpenses / simulationData.financialProjections.totalRevenue * 100).toFixed(2)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                )}

                {activeTab === 'simulation' && (
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row items-center justify-between pb-4 border-b border-gray-300">
                      <div>
                        <h3 className="text-2xl font-bold text-green-800 dark:text-blue-300">
                          Farm Simulation
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Simple & Easy-to-Use Overview
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        className="mt-4 md:mt-0 group hover:bg-green-100 dark:hover:bg-blue-900 transition-all"
                        onClick={handleWeatherUpdate}
                      >
                        Update Weather
                        <CloudRain className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>

                    {/* Section 1: Field Conditions */}
                    <div className="space-y-2 border-b border-gray-300 pb-4">
                      {/* Crop Health */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Leaf className="text-green-600 dark:text-blue-400" />
                          <span className="text-lg font-medium text-green-700 dark:text-blue-200">
                            Crop Health
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Slider
                            onValueChange={(value) => updateCropHealth(value)}
                            min={0}
                            max={100}
                            step={1}
                            className="w-28"
                          />
                          <span className="text-lg font-semibold text-green-700 dark:text-blue-200">
                            {simulationData.cropHealth}%
                          </span>
                        </div>
                      </div>

                      {/* Soil Condition */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Thermometer className="text-green-600 dark:text-blue-400" />
                          <span className="text-lg font-medium text-green-700 dark:text-blue-200">
                            Soil Condition
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Slider
                            onValueChange={(value) => updateSoilQuality(value)}
                            min={0}
                            max={100}
                            step={1}
                            className="w-28"
                          />
                          <span className="text-lg font-semibold text-green-700 dark:text-blue-200">
                            {simulationData.soilQuality}%
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Section 2: Weather Metrics */}
                    <div className="space-y-2 border-b border-gray-300 pb-4">
                      {/* Temperature */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Thermometer className="text-green-600 dark:text-blue-400" />
                          <span className="text-lg font-medium text-green-700 dark:text-blue-200">
                            Temperature
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-semibold text-green-700 dark:text-blue-200">
                            {simulationData.weatherData.temperature}°C
                          </span>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="cursor-pointer text-green-600 dark:text-blue-400" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <div className="p-2">
                                  <p className="text-sm text-green-700 dark:text-blue-200">
                                    Best: 20-30°C
                                  </p>
                                  <p className="text-sm text-green-700 dark:text-blue-200">
                                    Now: {simulationData.weatherData.temperature}°C
                                  </p>
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>

                      {/* Humidity */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Zap className="text-green-600 dark:text-blue-400" />
                          <span className="text-lg font-medium text-green-700 dark:text-blue-200">
                            Humidity
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-semibold text-green-700 dark:text-blue-200">
                            {simulationData.weatherData.humidity}%
                          </span>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="cursor-pointer text-green-600 dark:text-blue-400" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <div className="p-2">
                                  <p className="text-sm text-green-700 dark:text-blue-200">
                                    Best: 50-80%
                                  </p>
                                  <p className="text-sm text-green-700 dark:text-blue-200">
                                    Now: {simulationData.weatherData.humidity}%
                                  </p>
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                    </div>

                    {/* Section 3: Additional Weather & Financial Data */}
                    <div className="space-y-2 border-b border-gray-300 pb-4">
                      {/* Rainfall */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Sparkles className="text-green-600 dark:text-blue-400" />
                          <span className="text-lg font-medium text-green-700 dark:text-blue-200">
                            Rainfall
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-semibold text-green-700 dark:text-blue-200">
                            {simulationData.weatherData.rainfall}mm
                          </span>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="cursor-pointer text-green-600 dark:text-blue-400" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <div className="p-2">
                                  <p className="text-sm text-green-700 dark:text-blue-200">
                                    Best: 40-60mm
                                  </p>
                                  <p className="text-sm text-green-700 dark:text-blue-200">
                                    Now: {simulationData.weatherData.rainfall}mm
                                  </p>
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>

                      {/* Sunlight */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Lightbulb className="text-green-600 dark:text-blue-400" />
                          <span className="text-lg font-medium text-green-700 dark:text-blue-200">
                            Sunlight
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-semibold text-green-700 dark:text-blue-200">
                            {simulationData.weatherData.sunlight} hrs
                          </span>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="cursor-pointer text-green-600 dark:text-blue-400" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <div className="p-2">
                                  <p className="text-sm text-green-700 dark:text-blue-200">
                                    Best: 6-10 hrs
                                  </p>
                                  <p className="text-sm text-green-700 dark:text-blue-200">
                                    Now: {simulationData.weatherData.sunlight} hrs
                                  </p>
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>

                      {/* Wind Speed */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Wind className="text-green-600 dark:text-blue-400" />
                          <span className="text-lg font-medium text-green-700 dark:text-blue-200">
                            Wind Speed
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-semibold text-green-700 dark:text-blue-200">
                            {simulationData.weatherData.windSpeed} km/h
                          </span>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="cursor-pointer text-green-600 dark:text-blue-400" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <div className="p-2">
                                  <p className="text-sm text-green-700 dark:text-blue-200">
                                    Best: 5-15 km/h
                                  </p>
                                  <p className="text-sm text-green-700 dark:text-blue-200">
                                    Now: {simulationData.weatherData.windSpeed} km/h
                                  </p>
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>

                      {/* Financial Projections */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <BarChart2 className="text-green-600 dark:text-blue-400" />
                          <span className="text-lg font-medium text-green-700 dark:text-blue-200">
                            Financials
                          </span>
                        </div>
                        <Button
                          variant="outline"
                          className="group hover:bg-green-100 dark:hover:bg-blue-900 transition-all"
                          onClick={() =>
                            updateFinancialProjections({
                              totalRevenue: simulationData.financialProjections.totalRevenue,
                              totalExpenses: simulationData.financialProjections.totalExpenses,
                              netProfit: simulationData.financialProjections.netProfit,
                              breakEvenPoint: simulationData.financialProjections.breakEvenPoint,
                            })
                          }
                        >
                          Update
                          <Clipboard className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>

                    {/* Section 4: Operations */}
                    <div className="space-y-2">
                      {/* Machinery */}
                      <div className="flex items-center justify-between border-b border-gray-300 pb-4">
                        <div className="flex items-center space-x-2">
                          <Truck className="text-green-600 dark:text-blue-400" />
                          <span className="text-lg font-medium text-green-700 dark:text-blue-200">
                            Machinery
                          </span>
                        </div>
                        <Button
                          variant="outline"
                          className="group hover:bg-green-100 dark:hover:bg-blue-900 transition-all"
                        >
                          View
                          <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>

                      {/* Labor */}
                      <div className="flex items-center justify-between border-b border-gray-300 pb-4">
                        <div className="flex items-center space-x-2">
                          <Users className="text-green-600 dark:text-blue-400" />
                          <span className="text-lg font-medium text-green-700 dark:text-blue-200">
                            Labor
                          </span>
                        </div>
                        <Button
                          variant="outline"
                          className="group hover:bg-green-100 dark:hover:bg-blue-900 transition-all"
                        >
                          View
                          <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>

                      {/* Inventory */}
                      <div className="flex items-center justify-between border-b border-gray-300 pb-4">
                        <div className="flex items-center space-x-2">
                          <Package className="text-green-600 dark:text-blue-400" />
                          <span className="text-lg font-medium text-green-700 dark:text-blue-200">
                            Inventory
                          </span>
                        </div>
                        <Button
                          variant="outline"
                          className="group hover:bg-green-100 dark:hover:bg-blue-900 transition-all"
                        >
                          View
                          <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>

                      {/* Alerts */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <AlertTriangle className="text-green-600 dark:text-blue-400" />
                          <span className="text-lg font-medium text-green-700 dark:text-blue-200">
                            Alerts
                          </span>
                        </div>
                        <Button
                          variant="outline"
                          className="group hover:bg-green-100 dark:hover:bg-blue-900 transition-all"
                        >
                          Check
                          <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

              </motion.div>
            </AnimatePresence>
          </Tabs>

          <div className="mt-6 flex justify-between items-center gap-1">
            <Button
              variant="outline"
              className="group hover:bg-green-100 dark:hover:bg-blue-900 transition-all"
            >
              Report
              <Download className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <div className="flex items-center space-x-2">
              <Workflow className="text-green-600 dark:text-blue-400" />
              <span className="text-sm text-green-700 dark:text-blue-200">
                Simulation v1.0
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

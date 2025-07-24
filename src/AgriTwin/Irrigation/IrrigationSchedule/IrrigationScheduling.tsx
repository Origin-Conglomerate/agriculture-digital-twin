import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropletIcon,
  CloudRainWind,
  PlaneIcon,
  Calendar as CalendarIcon,
  Settings2,
  Activity,
  BarChart3,
  Sparkles,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useSelector } from 'react-redux';
import { useToast } from "@/hooks/use-toast";
import { GET, POST } from '@/utils/ApiHandler';

// Types
interface Pipeline {
  name: string;
  status: string;
  config: {
    manner: string;
    days?: number;
    hours?: number;
    minutes?: number;
    sDays?: number;
    sTime?: string;
  };
}

interface TenantData {
  irrigation_system_username: string;
  irrigation_system_password: string;
}

const IrrigationScheduling = () => {
  // Redux state
  const { token, tenantId } = useSelector((state: { login: { token: string; tenantId: string } }) => state.login);
  const { toast } = useToast();

  // Component state
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tenantData, setTenantData] = useState<TenantData | null>(null);
  const [pipelines, setPipelines] = useState<Pipeline[]>([]);
  const [selectedPipeline, setSelectedPipeline] = useState<Pipeline | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // UI state
  const [activeTab, setActiveTab] = useState('basic');
  const [scheduleType, setScheduleType] = useState("interval");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // Schedule configuration state
  const [scheduleConfig, setScheduleConfig] = useState({
    interval: { days: 0, hours: 0, minutes: 0 },
    scheduled: { days: "", time: "" },
    advanced: {
      moistureSensing: false,
      weatherIntegration: false,
      cropSpecificScheduling: false,
      aiOptimization: false,
      waterEfficiencyMonitoring: false
    },
    analytics: {
      waterUsage: Math.floor(Math.random() * 1000),
      efficiency: Math.floor(Math.random() * 100),
      savings: Math.floor(Math.random() * 30)
    }
  });

  // AI recommendations state
  const [aiRecommendations, setAiRecommendations] = useState<any>(null);

  // API Functions
  const fetchTenantData = async () => {
    try {
      const response = await GET(
        `${import.meta.env.VITE_API_URL}/api/v1/tenants/list?tenantId=${tenantId}`,
        token
      );

      if (response?.data?.tenants?.[0]) {
        const tenant = response.data.tenants[0];
        if (!tenant.irrigation_system_username || !tenant.irrigation_system_password) {
          throw new Error('Irrigation system not setup for this plot');
        }
        setTenantData(tenant);
        return tenant;
      } else {
        throw new Error('No tenant data found');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch tenant data';
      throw new Error(errorMessage);
    }
  };

  const fetchPipelines = async (currentTenantData: TenantData) => {
    try {
      const response = await POST(
        `${import.meta.env.VITE_API_URL}/api/v1/irrigation/profiles/pipelines`,
        { tenantData: currentTenantData },
        token
      );

      if (response.success && response.data.pipelines) {
        setPipelines(response.data.pipelines);
      } else {
        throw new Error('No pipelines found');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch pipelines';
      throw new Error(errorMessage);
    }
  };

  // Initialize data
  useEffect(() => {
    const initializeData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // First fetch tenant data
        const currentTenantData = await fetchTenantData();

        // Only proceed to fetch pipelines if we have valid tenant data
        if (currentTenantData) {
          await fetchPipelines(currentTenantData);
        }

        setIsInitialized(true);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Initialization failed');
        toast({
          variant: "destructive",
          title: "Error",
          description: error instanceof Error ? error.message : 'Initialization failed'
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (!isInitialized) {
      initializeData();
    }
  }, [tenantId, token, isInitialized]);

  // AI recommendations update
  useEffect(() => {
    const generateAIRecommendations = () => {
      const recommendations = {
        optimalTime: '6:00 AM - 8:00 AM',
        waterVolume: '2.5 L/m²',
        weatherForecast: 'Light rain expected in 48 hours',
        soilMoisture: '65% (Optimal)',
        efficiency: '92%'
      };
      setAiRecommendations(recommendations);
    };

    generateAIRecommendations();
    const interval = setInterval(generateAIRecommendations, 10000);
    return () => clearInterval(interval);
  }, []);

  // Handler functions
  const handlePipelineSelect = (pipelineName: string) => {
    const pipeline = pipelines.find(p => p.name === pipelineName);
    if (pipeline) {
      setSelectedPipeline(pipeline);
      setScheduleType(pipeline.config.manner);

      if (pipeline.config.manner === "Interval Based") {
        setScheduleConfig(prev => ({
          ...prev,
          interval: {
            days: pipeline.config.days || "0",
            hours: pipeline.config.hours || "0",
            minutes: pipeline.config.minutes || "0"
          }
        }));
      } else if (pipeline.config.manner === "Scheduled") {
        setScheduleConfig(prev => ({
          ...prev,
          scheduled: {
            days: pipeline.config.sDays?.toString() || "",
            time: pipeline.config.sTime || ""
          }
        }));
      }
    }
  };

  const handleScheduleModification = async () => {
    if (!selectedPipeline || !tenantData) {
      setAlertMessage("Please select a pipeline and ensure tenant data is available");
      setAlertOpen(true);
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        pipelineName: selectedPipeline.name,
        scheduleType: scheduleType,
        tenantData,
        ...(scheduleType === "Interval Based" ? {
          days: scheduleConfig.interval.days,
          hours: scheduleConfig.interval.hours,
          minutes: scheduleConfig.interval.minutes,
        } : scheduleType === "Scheduled" ? {
          sDays: parseInt(scheduleConfig.scheduled.days),
          sTime: scheduleConfig.scheduled.time,
        } : {})
      };

      const response = await POST(
        `${import.meta.env.VITE_API_URL}/api/v1/irrigation/pipeline-schedule`,
        payload,
        token
      );

      if (response.success) {
        setAlertMessage("Schedule modified successfully");
        await fetchPipelines(tenantData);
      } else {
        throw new Error(response.message || "Failed to modify schedule");
      }
    } catch (error) {
      setAlertMessage(error instanceof Error ? error.message : "Failed to modify schedule");
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to modify schedule"
      });
    } finally {
      setIsLoading(false);
      setAlertOpen(true);
    }
  };

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case 'active':
        return 'default';
      case 'maintenance':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  // Add loading and error states to the UI
  // if (isLoading) {
  //   return (
  //     <Card className="w-full max-w-4xl mx-auto">
  //       <CardContent className="p-6">
  //         <div className="flex items-center justify-center">
  //           <span className="loading loading-spinner loading-lg"></span>
  //         </div>
  //       </CardContent>
  //     </Card>
  //   );
  // }

  // if (error) {
  //   return (
  //     <Card className="w-full max-w-4xl mx-auto">
  //       <CardContent className="p-6">
  //         <div className="flex flex-col items-center justify-center gap-4">
  //           <AlertCircle className="w-12 h-12 text-red-500" />
  //           <p className="text-lg text-red-500">{error}</p>
  //         </div>
  //       </CardContent>
  //     </Card>
  //   );
  // }

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-2xl hover:shadow-green-100/50 transition-all duration-300 ease-in-out">
      <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-6 rounded-t-2xl">
        <div className="lg:flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl font-bold text-green-900 dark:text-white flex items-center gap-3">
              <DropletIcon className="text-green-600 dark:text-blue-400" />
              Irrigation Control
            </CardTitle>
            <CardDescription className="text-green-700 dark:text-blue-200">
              AI-Powered Precision Water Management System
            </CardDescription>
          </div>
          <Badge variant="outline" className="bg-white/30 dark:bg-black/30">
            AI-Enhanced
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        <Tabs
          defaultValue="basic"
          className="w-full"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full  h-full grid-cols-4 md:grid-cols-2 bg-green-50 dark:bg-gray-800 gap-4">
            <TabsTrigger
              value="basic"
              className={cn(
                "flex items-center gap-2 transition-all duration-300",
                activeTab === 'basic' ? 'bg-green-200 dark:bg-blue-900' : ''
              )}
            >
              <Settings2 className="w-4 h-4" /> Basic
            </TabsTrigger>
            <TabsTrigger
              value="advanced"
              className={cn(
                "flex items-center gap-0 transition-all duration-300",
                activeTab === 'advanced' ? 'bg-green-200 dark:bg-blue-900' : ''
              )}
            >
              <PlaneIcon className="w-4 h-4" /> Advanced
            </TabsTrigger>
            <TabsTrigger
              value="ai"
              className={cn(
                "flex items-center gap-2 transition-all duration-300",
                activeTab === 'ai' ? 'bg-green-200 dark:bg-blue-900' : ''
              )}
            >
              <Sparkles className="w-4 h-4" /> AI Insights
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className={cn(
                "flex items-center gap-2 transition-all duration-300",
                activeTab === 'analytics' ? 'bg-green-200 dark:bg-blue-900' : ''
              )}
            >
              <BarChart3 className="w-4 h-4" /> Analytics
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
              <TabsContent value="basic" className="space-y-4">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center min-h-[200px] gap-4">
                    <span className="loading loading-spinner loading-lg text-purple-600"></span>
                    <p className="text-purple-700 dark:text-purple-200">Fetching/Updating Irrigation data...</p>
                  </div>
                ) : error ? (
                  <div className="flex flex-col items-center justify-center gap-4 py-8">
                    <AlertCircle className="w-8 h-8 text-red-500" />
                    <p className="text-red-500 text-center">{error}</p>
                  </div>
                ) : (
                  <>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Pipeline Selection</Label>
                        <Select
                          onValueChange={handlePipelineSelect}
                          value={selectedPipeline?.name}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Pipeline" />
                          </SelectTrigger>
                          <SelectContent>
                            {pipelines.map(pipeline => (
                              <SelectItem key={pipeline.name} value={pipeline.name}>
                                <span className="flex items-center gap-2">
                                  {pipeline.name}
                                  <Badge variant={getBadgeVariant(pipeline.status)}>
                                    {pipeline.status}
                                  </Badge>
                                </span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Schedule Type</Label>
                        <Select
                          value={scheduleType}
                          onValueChange={setScheduleType}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Schedule Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Continuous">Continuous</SelectItem>
                            <SelectItem value="Interval Based">Interval</SelectItem>
                            <SelectItem value="Scheduled">Scheduled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {scheduleType === "Interval Based" && (
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>Days</Label>
                          <Input
                            type="text"
                            placeholder="Days"
                            value={scheduleConfig.interval.days}
                            onChange={(e) => setScheduleConfig(prev => ({
                              ...prev,
                              interval: { ...prev.interval, days: Number(e.target.value) }
                            }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Hours</Label>
                          <Input
                            type="text"
                            placeholder="Hours"
                            value={scheduleConfig.interval.hours}
                            onChange={(e) => setScheduleConfig(prev => ({
                              ...prev,
                              interval: { ...prev.interval, hours: Number(e.target.value) }
                            }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Minutes</Label>
                          <Input
                            type="text"
                            placeholder="Minutes"
                            value={scheduleConfig.interval.minutes}
                            onChange={(e) => setScheduleConfig(prev => ({
                              ...prev,
                              interval: { ...prev.interval, minutes: Number(e.target.value) }
                            }))}
                          />
                        </div>
                      </div>
                    )}

                    {scheduleType === "Scheduled" && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Days</Label>
                          <Input
                            type="text"
                            placeholder="Enter days"
                            value={scheduleConfig.scheduled.days}
                            onChange={(e) => setScheduleConfig(prev => ({
                              ...prev,
                              scheduled: { ...prev.scheduled, days: e.target.value }
                            }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Time</Label>
                          <Input
                            type="time"
                            value={scheduleConfig.scheduled.time}
                            onChange={(e) => setScheduleConfig(prev => ({
                              ...prev,
                              scheduled: { ...prev.scheduled, time: e.target.value }
                            }))}
                          />
                        </div>
                      </div>
                    )}
                  </>
                )}
              </TabsContent>

              <TabsContent value="advanced" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="lg:flex items-center justify-between space-x-2">
                      <Label htmlFor="moisture-sensing" className="flex items-center gap-2">
                        <Activity className="w-4 h-4" />
                        Adaptive Moisture Sensing
                      </Label>
                      <Switch
                        id="moisture-sensing"
                        checked={scheduleConfig.advanced.moistureSensing}
                        onCheckedChange={(checked) => setScheduleConfig(prev => ({
                          ...prev,
                          advanced: { ...prev.advanced, moistureSensing: checked }
                        }))}
                      />
                    </div>

                    <div className="lg:flex items-center justify-between space-x-2">
                      <Label htmlFor="weather-integration" className="flex items-center gap-2">
                        <CloudRainWind className="w-4 h-4" />
                        Weather Integration
                      </Label>
                      <Switch
                        id="weather-integration"
                        checked={scheduleConfig.advanced.weatherIntegration}
                        onCheckedChange={(checked) => setScheduleConfig(prev => ({
                          ...prev,
                          advanced: { ...prev.advanced, weatherIntegration: checked }
                        }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="lg:flex items-center justify-between space-x-2">
                      <Label htmlFor="crop-specific" className="flex items-center gap-2">
                        <PlaneIcon className="w-4 h-4" />
                        Crop-Specific Irrigation
                      </Label>
                      <Switch
                        id="crop-specific"
                        checked={scheduleConfig.advanced.cropSpecificScheduling}
                        onCheckedChange={(checked) => setScheduleConfig(prev => ({
                          ...prev,
                          advanced: { ...prev.advanced, cropSpecificScheduling: checked }
                        }))}
                      />
                    </div>

                    <div className="lg:flex items-center justify-between space-x-2 ">
                      <Label htmlFor="ai-optimization" className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        AI Optimization
                      </Label>
                      <Switch
                        id="ai-optimization"
                        checked={scheduleConfig.advanced.aiOptimization}
                        onCheckedChange={(checked) => setScheduleConfig(prev => ({
                          ...prev,
                          advanced: { ...prev.advanced, aiOptimization: checked }
                        }))}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="ai" className="space-y-4">
                {aiRecommendations && (
                  <div className=" md:flex grid gap-4 md:overflow-x-scroll md:grid-cols-1 scroll- ">
                    <Card className="bg-white/30 dark:bg-gray-800/30">
                      <CardHeader>
                        <CardTitle className="text-lg">Optimal Irrigation Window</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-green-700 dark:text-blue-200">{aiRecommendations.optimalTime}</p>
                      </CardContent>
                    </Card>

                    <Card className="bg-white/30 dark:bg-gray-800/30">
                      <CardHeader>
                        <CardTitle className="text-lg">Recommended Water Volume</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-green-700 dark:text-blue-200">{aiRecommendations.waterVolume}</p>
                      </CardContent>
                    </Card>

                    <Card className="bg-white/30 dark:bg-gray-800/30">
                      <CardHeader>
                        <CardTitle className="text-lg">Weather Forecast</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-green-700 dark:text-blue-200">{aiRecommendations.weatherForecast}</p>
                      </CardContent>
                    </Card>

                    <Card className="bg-white/30 dark:bg-gray-800/30">
                      <CardHeader>
                        <CardTitle className="text-lg">Soil Moisture Status</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-green-700 dark:text-blue-200">{aiRecommendations.soilMoisture}</p>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="analytics" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <Card className="bg-white/30 dark:bg-gray-800/30">
                    <CardHeader>
                      <CardTitle className="text-lg">Water Usage</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-green-700 dark:text-blue-200">
                          {scheduleConfig.analytics.waterUsage}L
                        </span>
                        <DropletIcon className="w-6 h-6 text-green-600 dark:text-blue-400" />
                      </div>
                      <p className="text-sm text-green-600 dark:text-blue-300 mt-2">
                        Total water consumption this week
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/30 dark:bg-gray-800/30">
                    <CardHeader>
                      <CardTitle className="text-lg">Efficiency Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-green-700 dark:text-blue-200">
                          {scheduleConfig.analytics.efficiency}%
                        </span>
                        <Activity className="w-6 h-6 text-green-600 dark:text-blue-400" />
                      </div>
                      <p className="text-sm text-green-600 dark:text-blue-300 mt-2">
                        Current irrigation efficiency
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/30 dark:bg-gray-800/30">
                    <CardHeader>
                      <CardTitle className="text-lg">Water Savings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-green-700 dark:text-blue-200">
                          {scheduleConfig.analytics.savings}%
                        </span>
                        <Sparkles className="w-6 h-6 text-green-600 dark:text-blue-400" />
                      </div>
                      <p className="text-sm text-green-600 dark:text-blue-300 mt-2">
                        Savings compared to last month
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Additional Analytics Charts could be added here */}
                <Card className="bg-white/30 dark:bg-gray-800/30 mt-4">
                  <CardHeader>
                    <CardTitle className="text-lg">Weekly Usage Patterns</CardTitle>
                  </CardHeader>
                  <CardContent className="h-48 flex items-center justify-center">
                    <p className="text-green-600 dark:text-blue-300">
                      Charts and detailed analytics visualization would go here
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>
        
        <div className="lg:flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            onClick={handleScheduleModification}
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 dark:from-blue-600 dark:to-blue-800 dark:hover:from-blue-700 dark:hover:to-blue-900 text-white"
          >
            Apply Schedule
          </Button>
        </motion.div>
        <div className="flex items-center gap-2 text-sm text-green-700 dark:text-blue-200">
              <Activity className="w-4 h-4" />
              <span>Last updated: {new Date().toLocaleTimeString()}</span>
            </div>

          <div className="flex gap-3">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* <Button 
                variant="outline" 
                className="border-green-200 dark:border-blue-800 hover:bg-green-50 dark:hover:bg-blue-900/50"
                onClick={() => {
                  // Reset form logic here
                  setScheduleConfig({
                    interval: { days: 0, hours: 0, minutes: 0 },
                    scheduled: { days:"", time: "" },
                    advanced: {
                      moistureSensing: false,
                      weatherIntegration: false,
                      cropSpecificScheduling: false,
                      aiOptimization: false,
                      waterEfficiencyMonitoring: false
                    }
                  });
                }}
              >
                Reset
              </Button> */}
            </motion.div>
            

          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IrrigationScheduling;
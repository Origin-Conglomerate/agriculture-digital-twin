import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Thermometer,
  Droplet,
  Wind,
  Leaf,
  Sprout,
  Sun,
  CloudSun,
  Compass,
  CloudRain,
  Gauge,
  Info,
  Download,
  TrendingUp,
  TrendingDown,
  Minus,
  RefreshCcw,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Zap,
  Eye,
  XCircle,
  ArrowRight
} from 'lucide-react';
import { ToastAction } from "@/components/ui/toast"

const parameters = [
  { name: 'Temperature', icon: Thermometer, color: 'red', gradient: 'from-red-500 via-orange-500 to-yellow-500', unit: ' °C', key: 'temperature', valueAccessor: (data) => data.iotData.temperature?.latestReading, analyticsAccessor: 'temperatureAnalytics' },
  { name: 'Humidity', icon: Droplet, color: 'blue', gradient: 'from-blue-500 via-cyan-500 to-sky-500', unit: ' %', key: 'humidity', valueAccessor: (data) => data.iotData.humidity?.latestReading, analyticsAccessor: 'humidityAnalytics' },
  { name: 'Rainfall', icon: CloudRain, color: 'indigo', gradient: 'from-indigo-500 via-blue-500 to-cyan-500', unit: ' mm', key: 'rainfall', valueAccessor: (data) => data.iotData.rainFall?.last24Hour, analyticsAccessor: 'rainfallAnalytics' },
  { name: 'Pressure', icon: Gauge, color: 'purple', gradient: 'from-purple-500 via-fuchsia-500 to-pink-500', unit: ' hPa', key: 'pressure', valueAccessor: (data) => data.iotData.pressure?.latestReading, analyticsAccessor: 'pressureAnalytics' },
  { name: 'Soil Moisture L1', icon: Droplet, color: 'blue', gradient: 'from-blue-400 via-sky-500 to-cyan-500', unit: ' cbar', key: 'soilMoistureL1', valueAccessor: (data) => data.iotData.soilMoistureL1, analyticsAccessor: 'soilMoistureL1Analytics' },
  { name: 'Soil Moisture L2', icon: Sprout, color: 'green', gradient: 'from-green-400 via-emerald-500 to-teal-500', unit: ' cbar', key: 'soilMoistureL2', valueAccessor: (data) => data.iotData.soilMoistureL2, analyticsAccessor: 'soilMoistureL2Analytics' },
  { name: 'Soil Temperature', icon: Thermometer, color: 'amber', gradient: 'from-amber-400 via-orange-500 to-yellow-500', unit: ' °C', key: 'soilTemperature', valueAccessor: (data) => data.iotData.soilTemperature, analyticsAccessor: 'soilTemperatureAnalytics' },
  { name: 'Leaf Wetness', icon: Leaf, color: 'emerald', gradient: 'from-emerald-400 via-green-500 to-teal-500', unit: ' %', key: 'leafWetness', valueAccessor: (data) => data.iotData.leafWetness, analyticsAccessor: 'leafWetnessAnalytics' },
  { name: 'Lux', icon: CloudSun, color: 'yellow', gradient: 'from-yellow-400 via-amber-500 to-orange-500', unit: ' lx', key: 'lux', valueAccessor: (data) => data.iotData.lux?.latestReading, analyticsAccessor: 'luxAnalytics' },
  { name: 'Solar Intensity', icon: Sun, color: 'orange', gradient: 'from-orange-400 via-red-500 to-rose-500', unit: ' W/m²', key: 'solarIntensity', valueAccessor: (data) => data.iotData.solarIntensity?.latestReading, analyticsAccessor: 'solarIntensityAnalytics' },
  { name: 'Wind Speed', icon: Wind, color: 'teal', gradient: 'from-teal-400 via-cyan-500 to-sky-500', unit: ' km/h', key: 'windSpeed', valueAccessor: (data) => data.iotData.windSpeed, analyticsAccessor: 'windSpeedAnalytics' },
  { name: 'Wind Direction', icon: Compass, color: 'gray', gradient: 'from-gray-400 via-slate-500 to-zinc-500', unit: '', key: 'windDirection', valueAccessor: (data) => data.iotData.windDirection, analyticsAccessor: 'windDirectionAnalytics' },
];

// Dummy data generator
const generateDummyData = () => {
  const dummyData = {
    iotData: {
      temperature: { latestReading: (Math.random() * 30 + 10).toFixed(1) },
      humidity: { latestReading: (Math.random() * 60 + 20).toFixed(1) },
      rainFall: { last24Hour: (Math.random() * 20).toFixed(1) },
      pressure: { latestReading: (Math.random() * 200 + 900).toFixed(1) },
      soilMoistureL1: (Math.random() * 100).toFixed(1),
      soilMoistureL2: (Math.random() * 100).toFixed(1),
      soilTemperature: (Math.random() * 20 + 10).toFixed(1),
      leafWetness: (Math.random() * 100).toFixed(1),
      lux: { latestReading: (Math.random() * 10000 + 1000).toFixed(1) },
      solarIntensity: { latestReading: (Math.random() * 500 + 100).toFixed(1) },
      windSpeed: (Math.random() * 30 + 5).toFixed(1),
      windDirection: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'][Math.floor(Math.random() * 8)],
    },
    analytics: {
      temperatureAnalytics: {
        status: Math.random() > 0.8 ? 'High' : (Math.random() > 0.6 ? 'Low' : 'Optimal'),
        description: 'Temperature is within optimal range for most crops. Maintain current conditions.',
        actions: 'If temperature rises above 30°C, consider increasing irrigation or providing shade.'
      },
      humidityAnalytics: {
        status: Math.random() > 0.8 ? 'High' : (Math.random() > 0.6 ? 'Low' : 'Optimal'),
        description: 'Humidity levels are good for plant growth. Monitor for sudden changes.',
        actions: 'If humidity drops below 40%, consider misting or increasing irrigation.'
      },
      rainfallAnalytics: {
        status: Math.random() > 0.8 ? 'High' : (Math.random() > 0.6 ? 'Low' : 'Optimal'),
        description: 'Recent rainfall is adequate for soil moisture. No immediate action needed.',
        actions: 'If rainfall exceeds 15mm in 24 hours, check for waterlogging.'
      },
      pressureAnalytics: {
        status: 'Optimal',
        description: 'Atmospheric pressure is normal for the region.',
        actions: 'No specific actions required for current pressure conditions.'
      },
      soilMoistureL1Analytics: {
        status: Math.random() > 0.8 ? 'High' : (Math.random() > 0.6 ? 'Low' : 'Optimal'),
        description: 'Topsoil moisture is at good levels for plant roots.',
        actions: 'If soil moisture drops below 30%, increase irrigation frequency.'
      },
      soilMoistureL2Analytics: {
        status: Math.random() > 0.8 ? 'High' : (Math.random() > 0.6 ? 'Low' : 'Optimal'),
        description: 'Subsoil moisture is adequate for deep root systems.',
        actions: 'Monitor for consistent moisture levels in deeper soil layers.'
      },
      soilTemperatureAnalytics: {
        status: Math.random() > 0.8 ? 'High' : (Math.random() > 0.6 ? 'Low' : 'Optimal'),
        description: 'Soil temperature supports microbial activity and root growth.',
        actions: 'If soil temp exceeds 25°C, consider mulching to retain moisture.'
      },
      leafWetnessAnalytics: {
        status: Math.random() > 0.8 ? 'High' : (Math.random() > 0.6 ? 'Low' : 'Optimal'),
        description: 'Leaf wetness duration is within normal parameters.',
        actions: 'If wetness persists >12 hours, consider fungicide application.'
      },
      luxAnalytics: {
        status: Math.random() > 0.8 ? 'High' : (Math.random() > 0.6 ? 'Low' : 'Optimal'),
        description: 'Light levels are sufficient for photosynthesis.',
        actions: 'If lux drops below 2000, consider supplemental lighting.'
      },
      solarIntensityAnalytics: {
        status: Math.random() > 0.8 ? 'High' : (Math.random() > 0.6 ? 'Low' : 'Optimal'),
        description: 'Solar radiation is adequate for plant growth.',
        actions: 'If intensity exceeds 800 W/m², consider shade cloth for sensitive plants.'
      },
      windSpeedAnalytics: {
        status: Math.random() > 0.8 ? 'High' : (Math.random() > 0.6 ? 'Low' : 'Optimal'),
        description: 'Wind speeds are moderate and beneficial for plant transpiration.',
        actions: 'If winds exceed 25 km/h, consider windbreaks for delicate plants.'
      },
      windDirectionAnalytics: {
        status: 'Optimal',
        description: 'Wind direction is typical for this season.',
        actions: 'No specific actions required for current wind direction.'
      }
    }
  };
  return dummyData;
};

const StatusIndicator = ({ status, size = "normal" }) => {
  const getStatusConfig = (status) => {
    switch (status?.toLowerCase()) {
      case 'optimal':
        return {
          icon: CheckCircle2,
          color: 'text-green-500',
          bgColor: 'bg-green-50 dark:bg-green-900/20',
          borderColor: 'border-green-200 dark:border-green-800'
        };
      case 'low':
        return {
          icon: AlertTriangle,
          color: 'text-yellow-500',
          bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
          borderColor: 'border-yellow-200 dark:border-yellow-800'
        };
      case 'high':
        return {
          icon: AlertTriangle,
          color: 'text-red-500',
          bgColor: 'bg-red-50 dark:bg-red-900/20',
          borderColor: 'border-red-200 dark:border-red-800'
        };
      default:
        return {
          icon: Minus,
          color: 'text-gray-500',
          bgColor: 'bg-gray-50 dark:bg-gray-900/20',
          borderColor: 'border-gray-200 dark:border-gray-800'
        };
    }
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;
  const sizeClasses = size === "large" ? "p-4 text-lg" : "p-2 text-sm";

  return (
    <div className={`flex items-center gap-2 rounded-full border ${sizeClasses} ${config.bgColor} ${config.borderColor}`}>
      <Icon className={`${config.color} ${size === "large" ? "h-6 w-6" : "h-4 w-4"}`} />
      <span className={`font-medium ${config.color}`}>
        {status || 'No Status'}
      </span>
    </div>
  );
};

const CircularProgress = ({ value, max = 100, size = 100, strokeWidth = 8, color }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = (value / max) * 100;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          className="text-gray-200 dark:text-gray-800"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className={`text-${color}-500`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: offset,
            transition: 'stroke-dashoffset 0.5s ease'
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-bold">{Math.round(progress)}%</span>
      </div>
    </div>
  );
};

const CardView = ({ parameter, value, analytics, onClick }) => {
  const numericValue = parseFloat(value);
  const isValidNumber = !isNaN(numericValue);
  const normalizedValue = isValidNumber ? Math.min(Math.max(numericValue, 0), 100) : 0;

  return (
    <motion.div
      layout
      className="group relative"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card className=" relative overflow-hidden border-2 border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-all duration-300">
        <div className={`absolute inset-0 opacity-10 bg-gradient-to-br ${parameter.gradient}`} />

        <CardHeader className="relative z-10">
          <CardTitle className="flex items-center justify-between md:flex-col md:items-start md:justify-start lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-1">
              <div className={`p-2 rounded-lg bg-${parameter.color}-100 dark:bg-${parameter.color}-900/30`}>
                <parameter.icon className={`h-5 w-5 text-${parameter.color}-500`} />
              </div>
              <span className="font-semibold">{parameter.name}</span>
            </div>
            <StatusIndicator status={analytics?.status} />
          </CardTitle>
        </CardHeader>

        <CardContent className="relative z-10 flex items-center justify-between">
          <div className="space-y-2">
            <div className="text-3xl font-bold">
              {isValidNumber ? `${numericValue.toFixed(1)}${parameter.unit}` : 'N/A'}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {analytics?.description?.split('.')[0] || 'No description available'}
            </p>
          </div>
          {isValidNumber && (
            <CircularProgress
              value={normalizedValue}
              color={parameter.color}
              size={80}
              strokeWidth={6}
            />
          )}
        </CardContent>

        <CardFooter className="relative z-10">
          <Button
            variant="ghost"
            className="w-full justify-between group-hover:bg-gray-100 dark:group-hover:bg-gray-800"
            onClick={onClick}
          >
            <span>View Details</span>
            <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default function Reports() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [selectedParameter, setSelectedParameter] = useState(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [viewMode, setViewMode] = useState('all');
  const { toast } = useToast();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      const dummyData = generateDummyData();
      setData(dummyData);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Error generating dummy data:", error);
      toast({
        title: "Error",
        description: "Failed to load data. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 300000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, []);

  const handleDownloadReport = async () => {
    setIsGeneratingPDF(true);
    try {
      // Simulate PDF generation delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast({
        title: "Success",
        description: "Farm analytics report has been downloaded (simulated).",
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Error",
        description: "Failed to generate PDF report. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const getAnalytics = (param) => {
    if (!data || !data.analytics || !data.analytics[param.analyticsAccessor]) return null;
    return data.analytics[param.analyticsAccessor];
  };

  const getValue = (param) => {
    if (!data || !data.iotData) return 'N/A';
    const value = param.valueAccessor(data);
    return value !== undefined ? value : 'N/A';
  };

  const renderValue = (param) => {
    const value = getValue(param);
    if (value === 'N/A') return value;

    if (param.key === 'windDirection') return value;

    const numValue = parseFloat(value);
    if (isNaN(numValue)) return value;

    return `${numValue.toFixed(2)} ${param.unit}`;
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'optimal':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'low':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100';
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-4">
            <Skeleton className="h-12 w-64" />
            <Skeleton className="h-4 w-48" />
          </div>
          <div className="flex gap-4">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-40" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(12)].map((_, index) => (
            <Skeleton key={index} className="h-64 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  const criticalParameters = parameters.filter(param => {
    const analytics = getAnalytics(param);
    return analytics?.status?.toLowerCase() === 'high' || analytics?.status?.toLowerCase() === 'low';
  });

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-gray-50/50 dark:bg-gray-900/50">
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Farm Sensors Report - 04
              </span>
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Last updated: {new Date(lastUpdated).toLocaleString()}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-green-50 dark:hover:bg-green-900/20"
                onClick={() => window.location.reload()}
              >
                <RefreshCcw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button
              variant="outline"
              className="gap-2"
              onClick={handleDownloadReport}
              disabled={isGeneratingPDF}
            >
              <Download className="h-4 w-4" />
              {isGeneratingPDF ? 'Generating...' : 'Export Report'}
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                toast({
                  title: "Scheduled: Catch up ",
                  description: "Friday, February 10, 2023 at 5:57 PM",
                  action: (
                    <ToastAction altText="Close">Close</ToastAction>
                  ),
                })
              }}
            >
              Add to calendar
            </Button>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs value={viewMode} onValueChange={setViewMode} className="space-y-6">
          <TabsList>
            <TabsTrigger value="all" className="gap-2">
              <Eye className="h-4 w-4" />
              All Parameters
            </TabsTrigger>
            <TabsTrigger value="critical" className="gap-2">
              <AlertTriangle className="h-4 w-4" />
              Critical ({criticalParameters.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence>
                {parameters.map((param) => (
                  <CardView
                    key={param.key}
                    parameter={param}
                    value={getValue(param)}
                    analytics={getAnalytics(param)}
                    onClick={() => setSelectedParameter(param)}
                  />
                ))}
              </AnimatePresence>
            </div>
          </TabsContent>

          <TabsContent value="critical" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence>
                {criticalParameters.map((param) => (
                  <CardView
                    key={param.key}
                    parameter={param}
                    value={getValue(param)}
                    analytics={getAnalytics(param)}
                    onClick={() => setSelectedParameter(param)}
                  />
                ))}
              </AnimatePresence>
            </div>
          </TabsContent>
        </Tabs>

        {/* Parameter Details Dialog */}
        <Dialog open={!!selectedParameter} onOpenChange={() => setSelectedParameter(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {selectedParameter && (
                  <>
                    <div className={`p-2 rounded-lg bg-${selectedParameter.color}-100 dark:bg-${selectedParameter.color}-900/30`}>
                      <selectedParameter.icon className={`h-5 w-5 text-${selectedParameter.color}-500`} />
                    </div>
                    {selectedParameter.name}
                  </>
                )}
              </DialogTitle>
            </DialogHeader>

            <ScrollArea className="max-h-[60vh]">
              {selectedParameter && (
                <div className="space-y-6 p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="text-4xl font-bold">
                        {getValue(selectedParameter)}{selectedParameter.unit}
                      </div>
                      <StatusIndicator
                        status={getAnalytics(selectedParameter)?.status}
                        size="large"
                      />
                    </div>
                    <CircularProgress
                      value={parseFloat(getValue(selectedParameter))}
                      color={selectedParameter.color}
                      size={120}
                      strokeWidth={8}
                    />
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Analysis</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {getAnalytics(selectedParameter)?.description || 'No analysis available.'}
                    </p>
                    <h3 className="text-lg font-semibold">Recommended Actions</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {getAnalytics(selectedParameter)?.actions || 'No recommended actions available.'}
                    </p>
                  </div>
                </div>
              )}
            </ScrollArea>

            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedParameter(null)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { 
  Card, CardHeader, CardTitle, CardContent, CardFooter 
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Thermometer, Droplets, Sun, Wind, Sprout, Binary, 
  AlertCircle, Activity, Camera, Leaf, DropletIcon, 
  CloudLightningIcon, GlassWaterIcon, AirVentIcon,
  RadiationIcon, BugIcon, SatelliteIcon, BotIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion'; // Added framer-motion
import { cn } from "@/lib/utils"; // Added cn utility

// Advanced Metric Card Component (with improved responsiveness)
const AdvancedMetricCard = ({ 
  icon: Icon, 
  title, 
  value, 
  unit, 
  status, 
  trend, 
  onControlChange,
}) => {
  const [controlValue, setControlValue] = useState(value);

  return (
    <div className="p-3 md:p-4 border rounded-lg border-green-100/50 dark:border-blue-900/30 bg-white/40 dark:bg-gray-800/40 space-y-2 md:space-y-3 transition-all hover:bg-white/60 dark:hover:bg-gray-800/60">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 md:gap-2">
          <div className="p-1.5 md:p-2 rounded-lg bg-green-100 dark:bg-green-900/50">
            <Icon className="w-3 h-3 md:w-4 md:h-4 text-green-600 dark:text-blue-400" />
          </div>
          <span className="text-xs md:text-sm font-medium text-green-700 dark:text-blue-200">
            {title}
          </span>
        </div>
        <Badge 
          variant={
            status === 'optimal' ? 'success' : 
            status === 'warning' ? 'warning' : 
            'destructive'
          }
          className="text-xs px-1.5 py-0.5 md:text-sm md:px-2 md:py-0.5"
        >
          {status}
        </Badge>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-xl md:text-2xl font-bold text-green-800 dark:text-blue-100">
          {value}{unit}
          <span className={`ml-1 md:ml-2 text-xs md:text-sm ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {trend > 0 ? '▲' : '▼'} {Math.abs(trend)}%
          </span>
        </div>
        {onControlChange && (
          <div className="flex items-center gap-1 md:gap-2">
            <Slider
              defaultValue={[controlValue]}
              onValueChange={(val) => {
                setControlValue(val[0]);
                onControlChange(val[0]);
              }}
              max={100}
              step={1}
              className="w-16 md:w-24"
            />
          </div>
        )}
      </div>
    </div>
  );
};

// AI Advanced Insights Component (with improved responsiveness)
const AIAdvancedInsights = () => {
  const [predictiveInsights, setPredictiveInsights] = useState([
    {
      type: 'Harvest Optimization',
      description: "Predicted optimal harvest time in 3 days based on advanced growth patterns",
      confidence: 92
    },
    {
      type: 'Disease Prevention',
      description: "Low disease risk - Recommend targeted micronutrient treatment",
      confidence: 88
    },
    {
      type: 'Resource Optimization',
      description: "Suggested CO2 and nutrient balancing for peak photosynthetic efficiency",
      confidence: 95
    }
  ]);

  return (
    <div className="space-y-3 md:space-y-4 p-3 md:p-4 bg-green-50/50 dark:bg-gray-800/50 rounded-lg">
      <div className="flex items-center gap-1.5 md:gap-2 mb-2 md:mb-3">
        <SatelliteIcon className="w-4 h-4 text-green-600 dark:text-blue-400" />
        <h3 className="text-sm md:text-base font-semibold text-green-800 dark:text-blue-100">
          Advanced AI Predictive Insights
        </h3>
      </div>
      <div className="space-y-2 md:space-y-3">
        {predictiveInsights.map((insight, i) => (
          <div 
            key={i} 
            className="flex items-start gap-2 md:gap-3 p-2 md:p-3 bg-white/50 dark:bg-gray-900/50 rounded-lg"
          >
            <div className="flex-grow">
              <h4 className="text-xs md:text-sm font-medium text-green-700 dark:text-blue-200">
                {insight.type}
              </h4>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
                {insight.description}
              </p>
            </div>
            <Badge variant="outline" className="text-xs whitespace-nowrap text-green-600">
              {insight.confidence}% Confidence
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
};

// Advanced System Control Component (with improved responsiveness)
const SystemControl = () => {
  const [systemStates, setSystemStates] = useState({
    irrigation: false,
    climate: false,
    lighting: false,
    co2: false,
    pest: false
  });

  const toggleSystem = (system) => {
    setSystemStates(prev => ({
      ...prev,
      [system]: !prev[system]
    }));
  };

  const systemControls = [
    { 
      name: 'Irrigation', 
      icon: DropletIcon, 
      description: 'Precision Drip & Hydroponic Nutrient Management' 
    },
    { 
      name: 'Climate', 
      icon: CloudLightningIcon, 
      description: 'Multi-Zone Temperature & Humidity Regulation' 
    },
    { 
      name: 'Lighting', 
      icon: RadiationIcon, 
      description: 'Spectral Light Optimization for Plant Growth' 
    },
    { 
      name: 'CO2 Enrichment', 
      icon: GlassWaterIcon, 
      description: 'Automated Atmospheric Carbon Dioxide Management' 
    },
    { 
      name: 'Pest Control', 
      icon: BugIcon, 
      description: 'AI-Driven Biological Pest Mitigation System' 
    }
  ];

  return (
    <div className="space-y-3 md:space-y-4">
      {systemControls.map((system) => (
        <div 
          key={system.name} 
          className="flex items-center justify-between p-2 md:p-4 border rounded-lg border-green-100/50 dark:border-blue-900/30 transition-all hover:bg-white/30 dark:hover:bg-gray-800/30"
        >
          <div className="flex items-center gap-2 md:gap-3">
            <system.icon className="w-4 h-4 text-green-600 dark:text-blue-400" />
            <div>
              <h4 className="text-xs md:text-sm text-green-700 dark:text-blue-200 font-medium">
                {system.name}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
                {system.description}
              </p>
            </div>
          </div>
          <Switch
            checked={systemStates[system.name.toLowerCase().replace(/\s+/g, '')]}
            onCheckedChange={() => toggleSystem(system.name.toLowerCase().replace(/\s+/g, ''))}
          />
        </div>
      ))}
    </div>
  );
};

export const Greenhouse = () => {
  const [activeTab, setActiveTab] = useState("monitoring");
  const [metrics, setMetrics] = useState({
    temperature: { value: 23.5, status: 'optimal', trend: 1.2 },
    humidity: { value: 65, status: 'warning', trend: -0.5 },
    lightIntensity: { value: 850, status: 'optimal', trend: 2.3 },
    co2Level: { value: 800, status: 'optimal', trend: 1.7 }
  });

  const updateMetric = (metric, newValue) => {
    setMetrics(prev => ({
      ...prev,
      [metric]: { ...prev[metric], value: newValue }
    }));
  };

  return (
    <Card className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-lg hover:shadow-green-100/50 transition-all duration-300">
      <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-4 md:p-6 rounded-t-2xl">
        <div className="flex flex-wrap md:flex-nowrap justify-between items-center gap-2 md:gap-4">
          <div className="flex flex-col">
            <CardTitle className="text-lg md:text-2xl font-bold text-green-900 dark:text-white flex items-center gap-2 md:gap-3">
              <BotIcon className="w-4 h-4 md:w-6 md:h-6 text-green-600 dark:text-blue-400" />
              Quantum Greenhouse Intelligence
            </CardTitle>
            <div className="text-xs md:text-sm text-green-700 dark:text-blue-200">
              Smart monitoring and control system
            </div>
          </div>
          <Badge variant="outline" className="min-w-fit whitespace-nowrap bg-white/30 dark:bg-black/30 px-2 py-1 text-xs">
            Real-time Analytics
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-3 md:p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-3 md:space-y-4">
          <TabsList className="w-full h-full bg-green-50 dark:bg-gray-800 grid grid-cols-3 sm:grid-cols-5">
            {['Monitoring', 'Control', 'Analytics', 'AI', 'Live'].map((tab) => (
              <TabsTrigger 
                key={tab.toLowerCase()} 
                value={tab.toLowerCase()}
                className={cn(
                  "text-xs md:text-sm flex-1",
                  activeTab === tab.toLowerCase() ? 'bg-green-200 dark:bg-blue-900' : ''
                )}
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="mt-2 md:mt-4 bg-white/50 dark:bg-gray-900/50 rounded-lg p-2 md:p-4"
            >
              {/* Monitoring Tab */}
              <TabsContent value="monitoring" className="space-y-2 md:space-y-4 m-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4">
                  {Object.entries(metrics).map(([key, metric]) => (
                    <AdvancedMetricCard
                      key={key}
                      icon={
                        key === 'temperature' ? Thermometer :
                        key === 'humidity' ? Droplets :
                        key === 'lightIntensity' ? Sun :
                        Wind
                      }
                      title={
                        key === 'temperature' ? 'Temperature' :
                        key === 'humidity' ? 'Humidity' :
                        key === 'lightIntensity' ? 'Light Intensity' :
                        'CO2 Level'
                      }
                      value={metric.value}
                      unit={
                        key === 'temperature' ? '°C' :
                        key === 'humidity' ? '%' :
                        key === 'lightIntensity' ? ' lux' :
                        ' ppm'
                      }
                      status={metric.status}
                      trend={metric.trend}
                      onControlChange={(val) => updateMetric(key, val)}
                    />
                  ))}
                </div>
              </TabsContent>

              {/* Control Tab */}
              <TabsContent value="control" className="m-0">
                <SystemControl />
              </TabsContent>

              {/* Analytics Tab */}
              <TabsContent value="analytics" className="space-y-3 md:space-y-4 m-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm md:text-base text-green-800 dark:text-blue-100 font-semibold">
                    Growth Performance
                  </h3>
                  <Badge variant="outline" className="text-xs">Last 30 Days</Badge>
                </div>
                <Progress value={85} className="h-2 md:h-3">
                  <div className="bg-green-500 dark:bg-blue-500 h-full transition-all" />
                </Progress>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4 mt-2 md:mt-4">
                  <div className="bg-green-50 dark:bg-gray-800 p-3 md:p-4 rounded-lg">
                    <h4 className="text-xs md:text-sm text-green-700 dark:text-blue-200 mb-1 md:mb-2">Crop Health</h4>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div className="bg-green-50 dark:bg-gray-800 p-3 md:p-4 rounded-lg">
                    <h4 className="text-xs md:text-sm text-green-700 dark:text-blue-200 mb-1 md:mb-2">Resource Efficiency</h4>
                    <Progress value={88} className="h-2" />
                  </div>
                </div>
              </TabsContent>

              {/* Advanced AI Tab */}
              <TabsContent value="ai" className="m-0">
                <AIAdvancedInsights />
              </TabsContent>

              {/* Live Feed Tab */}
              <TabsContent value="live" className="space-y-2 md:space-y-4 m-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4">
                  <div className="relative h-40 md:h-64 bg-gray-800 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Camera className="w-8 h-8 md:w-12 md:h-12 text-green-500 dark:text-blue-400" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/50">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-white">Section A</span>
                        <Badge variant="outline" className="text-xs text-green-400">LIVE</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="relative h-40 md:h-64 bg-gray-800 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Camera className="w-8 h-8 md:w-12 md:h-12 text-green-500 dark:text-blue-400" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/50">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-white">Section B</span>
                        <Badge variant="outline" className="text-xs text-green-400">LIVE</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </CardContent>
      <CardFooter className="flex flex-wrap sm:flex-nowrap justify-between items-center bg-green-50/50 dark:bg-gray-800/50 p-3 md:p-4 gap-2">
        <div className="flex items-center gap-1 md:gap-2 text-green-700 dark:text-blue-200">
          <AirVentIcon className="w-4 h-4 md:w-5 md:h-5" />
          <span className="text-xs md:text-sm">All Systems Operational</span>
        </div>
        <Button variant="outline" className="text-xs md:text-sm text-green-600 dark:text-blue-400 ml-auto">
          Generate Report
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Greenhouse;
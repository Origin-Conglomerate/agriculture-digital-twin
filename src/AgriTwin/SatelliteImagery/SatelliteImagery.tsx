import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Satellite,
  Map,
  TrendingUp,
  Layers,
  Zap,
  Download,
  RefreshCw,
  Calendar,
  MapPin,
  Activity,
  Droplets,
  Sprout,
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";

// Types
interface SatelliteData {
  date: string;
  cloudCoverage: number;
  ndvi: number;
  moisture: number;
  temperature: number;
  resolution: string;
  satellite: string;
}

interface ProcessingJob {
  id: string;
  type: string;
  status: 'processing' | 'completed' | 'failed';
  progress: number;
  startTime: string;
}

const SatelliteImagery = () => {
  // States
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedIndex, setSelectedIndex] = useState('NDVI');
  const [selectedDate, setSelectedDate] = useState('latest');
  const [isProcessing, setIsProcessing] = useState(false);
  const [satelliteData, setSatelliteData] = useState<SatelliteData[]>([]);
  const [currentData, setCurrentData] = useState<SatelliteData | null>(null);
  const [processingJobs, setProcessingJobs] = useState<ProcessingJob[]>([]);

  // Generate realistic satellite data
  const generateSatelliteData = (): SatelliteData[] => {
    const satellites = ['Sentinel-2', 'Landsat-8', 'Planet'];
    const dates = [];
    const now = new Date();

    for (let i = 0; i < 10; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() - (i * 7)); // Weekly data

      dates.push({
        date: date.toISOString().split('T')[0],
        cloudCoverage: Math.floor(Math.random() * 40),
        ndvi: 0.5 + Math.random() * 0.4, // 0.5 to 0.9
        moisture: 30 + Math.random() * 40, // 30% to 70%
        temperature: 22 + Math.random() * 12, // 22°C to 34°C
        resolution: Math.random() > 0.5 ? '10m' : '30m',
        satellite: satellites[Math.floor(Math.random() * satellites.length)]
      });
    }

    return dates;
  };

  // Initialize data
  useEffect(() => {
    const data = generateSatelliteData();
    setSatelliteData(data);
    setCurrentData(data[0]);

    // Simulate initial processing job
    const initialJob: ProcessingJob = {
      id: 'JOB-' + Date.now(),
      type: 'NDVI Analysis',
      status: 'completed',
      progress: 100,
      startTime: new Date(Date.now() - 300000).toISOString()
    };
    setProcessingJobs([initialJob]);
  }, []);

  // Simulate processing
  const handleProcessImage = () => {
    setIsProcessing(true);

    const newJob: ProcessingJob = {
      id: 'JOB-' + Date.now(),
      type: selectedIndex + ' Processing',
      status: 'processing',
      progress: 0,
      startTime: new Date().toISOString()
    };

    setProcessingJobs(prev => [newJob, ...prev]);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;

      setProcessingJobs(prev =>
        prev.map(job =>
          job.id === newJob.id
            ? { ...job, progress, status: progress === 100 ? 'completed' : 'processing' }
            : job
        )
      );

      if (progress >= 100) {
        clearInterval(interval);
        setIsProcessing(false);
      }
    }, 500);
  };

  // Get index color
  const getIndexColor = (value: number, type: string) => {
    if (type === 'NDVI') {
      if (value > 0.7) return 'text-green-600';
      if (value > 0.5) return 'text-yellow-600';
      return 'text-red-600';
    }
    return 'text-blue-600';
  };

  // Get health status
  const getHealthStatus = (ndvi: number) => {
    if (ndvi > 0.7) return { label: 'Excellent', color: 'bg-green-500', icon: CheckCircle };
    if (ndvi > 0.6) return { label: 'Good', color: 'bg-green-400', icon: CheckCircle };
    if (ndvi > 0.5) return { label: 'Moderate', color: 'bg-yellow-500', icon: AlertCircle };
    return { label: 'Poor', color: 'bg-red-500', icon: AlertCircle };
  };

  const healthStatus = currentData ? getHealthStatus(currentData.ndvi) : null;
  const HealthIcon = healthStatus?.icon || CheckCircle;

  return (
    <Card className="w-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-2xl hover:shadow-green-100/50 transition-all duration-300">
      <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-6 rounded-t-2xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <CardTitle className="text-2xl font-bold text-green-900 dark:text-white flex items-center gap-3">
              <Satellite className="text-green-600 dark:text-blue-400" />
              Satellite Imagery & Analysis
            </CardTitle>
            <CardDescription className="text-green-700 dark:text-blue-200">
              Multi-spectral satellite data processing and crop health monitoring
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-white/30 dark:bg-black/30">
              <Activity className="w-4 h-4 mr-2" />
              Live Processing
            </Badge>
            {currentData && (
              <Badge className={cn("text-white", healthStatus?.color)}>
                <HealthIcon className="w-4 h-4 mr-2" />
                {healthStatus?.label}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-white/50 dark:bg-gray-800/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">NDVI Index</p>
                  <p className={cn("text-2xl font-bold", getIndexColor(currentData?.ndvi || 0, 'NDVI'))}>
                    {currentData?.ndvi.toFixed(3)}
                  </p>
                </div>
                <Sprout className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/50 dark:bg-gray-800/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Soil Moisture</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {currentData?.moisture.toFixed(1)}%
                  </p>
                </div>
                <Droplets className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/50 dark:bg-gray-800/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Cloud Cover</p>
                  <p className="text-2xl font-bold text-gray-600">
                    {currentData?.cloudCoverage}%
                  </p>
                </div>
                <Map className="w-8 h-8 text-gray-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/50 dark:bg-gray-800/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Temperature</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {currentData?.temperature.toFixed(1)}°C
                  </p>
                </div>
                <Activity className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-green-50 dark:bg-gray-800">
            <TabsTrigger value="overview" className={cn(activeTab === 'overview' && 'bg-green-200 dark:bg-blue-900')}>
              <Map className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="indices" className={cn(activeTab === 'indices' && 'bg-green-200 dark:bg-blue-900')}>
              <Layers className="w-4 h-4 mr-2" />
              Indices
            </TabsTrigger>
            <TabsTrigger value="processing" className={cn(activeTab === 'processing' && 'bg-green-200 dark:bg-blue-900')}>
              <Zap className="w-4 h-4 mr-2" />
              Processing
            </TabsTrigger>
            <TabsTrigger value="history" className={cn(activeTab === 'history' && 'bg-green-200 dark:bg-blue-900')}>
              <Clock className="w-4 h-4 mr-2" />
              History
            </TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-4"
            >
              <TabsContent value="overview" className="space-y-4">
                {/* Satellite Image Placeholder */}
                <Card className="bg-white/50 dark:bg-gray-800/50">
                  <CardContent className="p-6">
                    <div className="aspect-video bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 rounded-lg flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 opacity-20">
                        {Array.from({ length: 64 }).map((_, i) => (
                          <div key={i} className="border border-white/20" />
                        ))}
                      </div>
                      <div className="z-10 text-center space-y-2">
                        <Satellite className="w-16 h-16 mx-auto text-green-600 dark:text-blue-400" />
                        <p className="text-lg font-semibold text-green-900 dark:text-blue-200">
                          {currentData?.satellite} Imagery
                        </p>
                        <p className="text-sm text-green-700 dark:text-blue-300">
                          Resolution: {currentData?.resolution} | Date: {currentData?.date}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Field Analysis */}
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="bg-white/50 dark:bg-gray-800/50">
                    <CardHeader>
                      <CardTitle className="text-lg">Crop Health Analysis</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Vegetation Health</span>
                        <Badge variant="outline">{(currentData?.ndvi * 100).toFixed(1)}%</Badge>
                      </div>
                      <Progress value={currentData?.ndvi * 100} className="h-2" />

                      <div className="flex justify-between items-center">
                        <span className="text-sm">Moisture Adequacy</span>
                        <Badge variant="outline">{currentData?.moisture.toFixed(1)}%</Badge>
                      </div>
                      <Progress value={currentData?.moisture} className="h-2" />

                      <div className="flex justify-between items-center">
                        <span className="text-sm">Image Quality</span>
                        <Badge variant="outline">{100 - (currentData?.cloudCoverage || 0)}%</Badge>
                      </div>
                      <Progress value={100 - (currentData?.cloudCoverage || 0)} className="h-2" />
                    </CardContent>
                  </Card>

                  <Card className="bg-white/50 dark:bg-gray-800/50">
                    <CardHeader>
                      <CardTitle className="text-lg">Recommendations</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {currentData && currentData.ndvi > 0.7 ? (
                        <>
                          <div className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                            <p className="text-sm">Excellent crop health detected</p>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                            <p className="text-sm">Continue current management practices</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-start gap-2">
                            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                            <p className="text-sm">Monitor vegetation health closely</p>
                          </div>
                          <div className="flex items-start gap-2">
                            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                            <p className="text-sm">Consider adjusting irrigation schedule</p>
                          </div>
                        </>
                      )}
                      <div className="flex items-start gap-2">
                        <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
                        <p className="text-sm">Next satellite pass in 3-5 days</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="indices" className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="bg-white/50 dark:bg-gray-800/50">
                    <CardHeader>
                      <CardTitle className="text-lg">Select Index</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Select value={selectedIndex} onValueChange={setSelectedIndex}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="NDVI">NDVI - Vegetation Health</SelectItem>
                          <SelectItem value="NDWI">NDWI - Water Content</SelectItem>
                          <SelectItem value="EVI">EVI - Enhanced Vegetation</SelectItem>
                          <SelectItem value="SAVI">SAVI - Soil Adjusted</SelectItem>
                          <SelectItem value="MSAVI">MSAVI - Modified SAVI</SelectItem>
                        </SelectContent>
                      </Select>

                      <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <h4 className="font-semibold mb-2">{selectedIndex} Information</h4>
                        <p className="text-sm text-muted-foreground">
                          {selectedIndex === 'NDVI' && 'Normalized Difference Vegetation Index - Measures vegetation health and density'}
                          {selectedIndex === 'NDWI' && 'Normalized Difference Water Index - Indicates water content in vegetation'}
                          {selectedIndex === 'EVI' && 'Enhanced Vegetation Index - Improved vegetation monitoring with atmospheric corrections'}
                          {selectedIndex === 'SAVI' && 'Soil Adjusted Vegetation Index - Minimizes soil brightness influence'}
                          {selectedIndex === 'MSAVI' && 'Modified SAVI - Further reduces soil background effects'}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/50 dark:bg-gray-800/50">
                    <CardHeader>
                      <CardTitle className="text-lg">Index Values</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Current Value</span>
                          <span className="font-bold text-green-600">{currentData?.ndvi.toFixed(3)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">7 Days Ago</span>
                          <span className="font-bold">{(currentData?.ndvi - 0.05).toFixed(3)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">30 Days Ago</span>
                          <span className="font-bold">{(currentData?.ndvi - 0.12).toFixed(3)}</span>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t">
                          <span className="text-sm font-semibold">Trend</span>
                          <Badge className="bg-green-500 text-white">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            +15% Improving
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="processing" className="space-y-4">
                <Card className="bg-white/50 dark:bg-gray-800/50">
                  <CardHeader>
                    <CardTitle className="text-lg">Process New Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-4">
                      <Button
                        onClick={handleProcessImage}
                        disabled={isProcessing}
                        className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                      >
                        {isProcessing ? (
                          <>
                            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Zap className="w-4 h-4 mr-2" />
                            Start Processing
                          </>
                        )}
                      </Button>
                      <Button variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Export Data
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Processing Jobs */}
                <Card className="bg-white/50 dark:bg-gray-800/50">
                  <CardHeader>
                    <CardTitle className="text-lg">Processing Queue</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {processingJobs.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-8">No processing jobs</p>
                    ) : (
                      processingJobs.map(job => (
                        <div key={job.id} className="p-4 bg-white/50 dark:bg-gray-900/50 rounded-lg space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-semibold">{job.type}</span>
                            <Badge variant={job.status === 'completed' ? 'default' : 'secondary'}>
                              {job.status}
                            </Badge>
                          </div>
                          <Progress value={job.progress} className="h-2" />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Job ID: {job.id}</span>
                            <span>{job.progress}%</span>
                          </div>
                        </div>
                      ))
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history" className="space-y-4">
                <Card className="bg-white/50 dark:bg-gray-800/50">
                  <CardHeader>
                    <CardTitle className="text-lg">Historical Data</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {satelliteData.map((data, index) => (
                      <div
                        key={index}
                        className="p-3 bg-white/50 dark:bg-gray-900/50 rounded-lg flex justify-between items-center hover:bg-white/70 dark:hover:bg-gray-900/70 transition-colors cursor-pointer"
                        onClick={() => setCurrentData(data)}
                      >
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-green-600" />
                          <div>
                            <p className="font-semibold">{data.date}</p>
                            <p className="text-xs text-muted-foreground">{data.satellite} • {data.resolution}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm font-semibold">NDVI: {data.ndvi.toFixed(3)}</p>
                            <p className="text-xs text-muted-foreground">Cloud: {data.cloudCoverage}%</p>
                          </div>
                          <Badge className={cn("text-white", getHealthStatus(data.ndvi).color)}>
                            {getHealthStatus(data.ndvi).label}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SatelliteImagery;

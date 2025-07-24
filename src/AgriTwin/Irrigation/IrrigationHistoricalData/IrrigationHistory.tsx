import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  ChevronRight,
  DropletIcon,
  BarChart3,
  Calendar,
  Download,
  Share2,
  Filter,
  RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";
import ReactApexChart from 'react-apexcharts'
// Dynamically import ApexCharts with no SSR to avoid hydration issues


const generateDataPoint = () => ({
  volume: Math.floor(Math.random() * 80) + 20, // 20-100
  efficiency: Math.floor(Math.random() * 30) + 70, // 70-100
  savings: Math.floor(Math.random() * 25) + 5 // 5-30
});

const generateDataSet = (points) => {
  return Array.from({ length: points }, () => generateDataPoint());
};

const useIrrigationData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Initial data generation
    const initialData = {
      daily: generateDataSet(24),
      weekly: generateDataSet(7),
      monthly: generateDataSet(12)
    };
    setData(initialData);

    // Update data every 5 seconds
    // const interval = setInterval(() => {
    //   setData(prev => {
    //     if (!prev) return prev;
    //     return {
    //       ...prev,
    //       daily: generateDataSet(24),
    //       weekly: prev.weekly,
    //       monthly: prev.monthly
    //     };
    //   });
    // }, 5000);

    // return () => clearInterval(interval);
  }, []);

  return data;
};

const getChartOptions = (mode, categories) => ({
  chart: {
    type: 'line',
    toolbar: {
      show: true,
      tools: {
        download: true,
        selection: true,
        zoom: true,
        zoomin: true,
        zoomout: true,
        pan: true,
      }
    },
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800,
      dynamicAnimation: {
        enabled: true,
        speed: 350
      }
    },
    background: 'transparent'
  },
  stroke: {
    curve: 'smooth',
    width: 3
  },
  colors: mode === 'dark' ? ['#22c55e', '#3b82f6', '#f59e0b'] : ['#16a34a', '#2563eb', '#d97706'],
  xaxis: {
    categories: categories,
    labels: {
      style: {
        colors: mode === 'dark' ? '#94a3b8' : '#64748b'
      }
    }
  },
  yaxis: [
    {
      title: {
        text: 'Volume (L)',
        style: {
          color: mode === 'dark' ? '#22c55e' : '#16a34a'
        }
      },
      labels: {
        style: {
          colors: mode === 'dark' ? '#94a3b8' : '#64748b'
        }
      }
    },
    {
      opposite: true,
      title: {
        text: 'Percentage (%)',
        style: {
          color: mode === 'dark' ? '#3b82f6' : '#2563eb'
        }
      },
      labels: {
        style: {
          colors: mode === 'dark' ? '#94a3b8' : '#64748b'
        }
      }
    }
  ],
  grid: {
    borderColor: mode === 'dark' ? '#1f2937' : '#e2e8f0',
    strokeDashArray: 4
  },
  legend: {
    labels: {
      colors: mode === 'dark' ? '#e2e8f0' : '#1f2937'
    }
  },
  tooltip: {
    theme: mode,
    y: {
      formatter: (value, { seriesIndex }) => {
        return seriesIndex === 0 ? `${value}L` : `${value}%`;
      }
    }
  }
});

const viewConfigs = {
  daily: {
    categories: Array.from({ length: 24 }, (_, i) => `${i}:00`),
    title: "24-Hour View"
  },
  weekly: {
    categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    title: "Weekly Analysis"
  },
  monthly: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    title: "Yearly Overview"
  }
};

export default function IrrigationHistory() {
  const [selectedZone, setSelectedZone] = useState("all");
  const [activeView, setActiveView] = useState("daily");
  const [isDark, setIsDark] = useState(false);
  const irrigationData = useIrrigationData();

  useEffect(() => {
    // Check for dark mode preference
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(darkModeQuery.matches);

    const handler = (e) => setIsDark(e.matches);
    darkModeQuery.addEventListener('change', handler);

    return () => darkModeQuery.removeEventListener('change', handler);
  }, []);

  const chartData = React.useMemo(() => {
    if (!irrigationData || !irrigationData[activeView]) return null;

    return {
      options: getChartOptions(isDark ? 'dark' : 'light', viewConfigs[activeView].categories),
      series: [
        {
          name: 'Water Volume',
          data: irrigationData[activeView].map(d => d.volume || 0)
        },
        {
          name: 'Efficiency',
          data: irrigationData[activeView].map(d => d.efficiency || 0)
        },
        {
          name: 'Water Savings',
          data: irrigationData[activeView].map(d => d.savings || 0)
        }
      ]
    };
  }, [irrigationData, activeView, isDark]);

  if (!irrigationData) {
    return (
      <Card className="w-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-[400px]">
            <RefreshCw className="w-8 h-8 animate-spin text-green-600 dark:text-blue-400" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-2xl hover:shadow-green-100/50 transition-all duration-300 ease-in-out">
      <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-6 rounded-t-2xl">
        <div className="lg:flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <CardTitle className="text-2xl font-bold text-green-900 dark:text-white flex items-center gap-3">
              <DropletIcon className="text-green-600 dark:text-blue-400" />
              Irrigation Analytics
            </CardTitle>
            <CardDescription className="text-green-700 dark:text-blue-200">
              Historical water usage and efficiency metrics
            </CardDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-white/30 dark:bg-black/30">
              Real-time Updates
            </Badge>
            <Badge variant="outline" className="bg-white/30 dark:bg-black/30">
              Smart Analytics
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        <div className="lg:flex flex-col md:flex-row gap-4 items-center justify-between">
          <Select value={selectedZone} onValueChange={setSelectedZone}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Select Zone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Zones</SelectItem>
              <SelectItem value="zone1">Zone 1</SelectItem>
              <SelectItem value="zone2">Zone 2</SelectItem>
              <SelectItem value="zone3">Zone 3</SelectItem>
            </SelectContent>
          </Select>

          <Tabs
            value={activeView}
            className="w-full md:w-auto"
            onValueChange={setActiveView}
          >
            <TabsList className="grid w-full md:w-auto grid-cols-3 bg-green-50 dark:bg-gray-800">
              <TabsTrigger
                value="daily"
                className={cn(
                  "flex items-center gap-2 transition-all duration-300",
                  activeView === 'daily' ? 'bg-green-200 dark:bg-blue-900' : ''
                )}
              >
                <BarChart3 className="w-4 h-4" /> Daily
              </TabsTrigger>
              <TabsTrigger
                value="weekly"
                className={cn(
                  "flex items-center gap-2 transition-all duration-300",
                  activeView === 'weekly' ? 'bg-green-200 dark:bg-blue-900' : ''
                )}
              >
                <Calendar className="w-4 h-4" /> Weekly
              </TabsTrigger>
              <TabsTrigger
                value="monthly"
                className={cn(
                  "flex items-center gap-2 transition-all duration-300",
                  activeView === 'monthly' ? 'bg-green-200 dark:bg-blue-900' : ''
                )}
              >
                <Filter className="w-4 h-4" /> Monthly
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeView}-${selectedZone}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white/50 dark:bg-gray-900/50 rounded-lg p-4"
          >
            <div className="h-[400px]">
              {typeof window !== 'undefined' && chartData && (
                <ReactApexChart
                  key={`${activeView}-${selectedZone}-${isDark}`}
                  options={chartData.options}
                  series={chartData.series}
                  type="line"
                  height="100%"
                  width="100%"
                />
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="lg:flex gap-2">
            <Button
              variant="outline"
              className="group hover:bg-green-100 dark:hover:bg-blue-900 transition-all"
            >
              <Download className="mr-2 h-4 w-4" />
              Export Data
            </Button>
            <Button
              variant="outline"
              className="group hover:bg-green-100 dark:hover:bg-blue-900 transition-all"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <RefreshCw className="text-green-600 dark:text-blue-400 animate-spin" />
            <span className="text-sm text-green-700 dark:text-blue-200">
              Live Updates Every 5s
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
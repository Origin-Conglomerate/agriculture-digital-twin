// FaultReporting.tsx (Main Component)
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Download,
  Filter,
  RefreshCcw,
  AlertTriangle,
  PieChart as PieChartIcon,
  List
} from 'lucide-react';
import { motion } from 'framer-motion';
import { FaultMetrics } from './FaultMetrics';
import { FaultList } from './FaultList';
import { FaultStats } from './FaultStats';

// Mock data generator
const generateMockData = () => {
  const faults = [
    {
      id: '1',
      title: 'Irrigation System Failure - Zone A',
      severity: 'high',
      timestamp: '2024-07-19 10:30 AM',
      location: 'North Field',
      status: 'open'
    },
    {
      id: '2',
      title: 'Soil Moisture Sensor Malfunction',
      severity: 'medium',
      timestamp: '2024-06-19 09:15 AM',
      location: 'South Field',
      status: 'in-progress'
    },
    // Add more mock faults
  ];

  const metricsData = Array.from({ length: 7 }, (_, i) => ({
    name: `Day ${i + 1}`,
    faults: Math.floor(Math.random() * 10),
    resolution: Math.floor(Math.random() * 8)
  }));

  const distributionData = [
    { name: 'Irrigation', value: 35, color: '#10B981' },
    { name: 'Sensors', value: 25, color: '#3B82F6' },
    { name: 'Equipment', value: 20, color: '#F59E0B' },
    { name: 'Other', value: 20, color: '#6B7280' }
  ];

  return { faults, metricsData, distributionData };
};

export default function FaultReporting() {
  const [data, setData] = useState(generateMockData());
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateMockData());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container max-w-[92vw] p-2 space-y-6">
      <Card className="w-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-2xl hover:shadow-green-100/50 transition-all duration-300 ease-in-out">
                <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-4 sm:p-6 rounded-t-2xl ">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 sm:justify-between sm:items-center">
            <div>
              <CardTitle className="text-2xl font-bold text-green-900 dark:text-white flex items-center gap-3">
                <AlertTriangle className="text-green-600 dark:text-blue-400" />
                Fault Reporting Dashboard
              </CardTitle>
              <CardDescription className="text-green-700 dark:text-blue-200">
                Real-time fault monitoring and analysis
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="bg-white/30 dark:bg-black/30">
                Live Updates
              </Badge>
              <Button
                variant="outline"
                size="sm"
                className="bg-white/30 dark:bg-black/30"
                onClick={() => setData(generateMockData())}
              >
                <RefreshCcw className=" w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          <Tabs
            defaultValue="overview"
            className="w-full"
            onValueChange={setActiveTab}
          >
            <TabsList className="grid w-full grid-cols-3 bg-green-50 dark:bg-gray-800">
              <TabsTrigger
                value="overview"
                className={`flex items-center gap-2 transition-all duration-300 ${
                  activeTab === 'overview' ? 'bg-green-200 dark:bg-blue-900' : ''
                }`}
              >
                <PieChartIcon className="w-4 h-4" /> Overview
              </TabsTrigger>
              <TabsTrigger
                value="list"
                className={`flex items-center gap-2 transition-all duration-300 ${
                  activeTab === 'list' ? 'bg-green-200 dark:bg-blue-900' : ''
                }`}
              >
                <List className="w-4 h-4" /> Fault List
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className={`flex items-center gap-2 transition-all duration-300 ${
                  activeTab === 'analytics' ? 'bg-green-200 dark:bg-blue-900' : ''
                }`}
              >
                <Filter className="w-4 h-4" /> Analytics
              </TabsTrigger>
            </TabsList>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-6"
            >
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FaultMetrics
                    title="Fault Trends"
                    data={data.metricsData}
                    dataKey="faults"
                    stroke="#10B981"
                  />
                  <FaultStats data={data.distributionData} />
                </div>
                <FaultList faults={data.faults} />
              </TabsContent>

              <TabsContent value="list">
                <FaultList faults={data.faults} />
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FaultMetrics
                    title="Resolution Time"
                    data={data.metricsData}
                    dataKey="resolution"
                    stroke="#3B82F6"
                  />
                  <FaultStats data={data.distributionData} />
                </div>
              </TabsContent>
            </motion.div>
          </Tabs>

          <div className="mt-6 flex justify-between items-center">
            <Button
              variant="outline"
              className="group hover:bg-green-100 dark:hover:bg-blue-900 transition-all"
              onClick={() => {
                // Implement report download logic
                console.log('Downloading report...');
              }}
            >
              <Download className="mr-2" />
              Download Report
            </Button>
            <Badge variant="outline" className="bg-white/30 dark:bg-black/30">
              Last updated: {new Date().toLocaleTimeString()}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
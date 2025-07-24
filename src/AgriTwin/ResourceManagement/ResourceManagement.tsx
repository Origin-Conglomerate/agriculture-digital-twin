import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  Calendar,
  ClipboardList,
  Cog,
  Database,
  LineChart,
  Settings,
  Tractor,
  Users,
  Workflow
} from 'lucide-react';

import { motion, AnimatePresence } from 'framer-motion';
import ResourceScheduling from './ResourceScheduling';
import WorkflowAutomation from './WorkflowAutomation';
import Resources from './Resources';
import ResourceAnalytics from './ResourcesAnalytics';

// Stats Card Component
const StatsCard = ({ title, value, icon: Icon, trend }) => (
  <Card className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 hover:shadow-green-100/50 transition-all duration-300">
    <CardContent className="p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-green-700 dark:text-blue-200">{title}</p>
          <h3 className="text-2xl font-bold text-green-900 dark:text-white mt-2">{value}</h3>
        </div>
        <Icon className="text-green-600 dark:text-blue-400 h-6 w-6" />
      </div>
      {trend && (
        <div className="mt-4">
          <Badge variant={trend.type === 'increase' ? 'success' : 'destructive'}>
            {trend.value}
          </Badge>
        </div>
      )}
    </CardContent>
  </Card>
);

// Resource Overview Component
const ResourceOverview = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
    <StatsCard
      title="Total Equipment"
      value="124"
      icon={Tractor}
      trend={{ type: 'increase', value: '+12% vs last month' }}
    />
    <StatsCard
      title="Active Workers"
      value="45"
      icon={Users}
      trend={{ type: 'increase', value: '+5% vs last month' }}
    />
    <StatsCard
      title="Resource Utilization"
      value="87%"
      icon={BarChart3}
      trend={{ type: 'increase', value: '+3% vs last month' }}
    />
    <StatsCard
      title="Operating Costs"
      value="₹45,678"
      icon={LineChart}
      trend={{ type: 'decrease', value: '-8% vs last month' }}
    />
  </div>
);

// Main Resource Management Component
const ResourceManagement = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card className="w-full max-w-[89vw] bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-2xl hover:shadow-green-100/50 transition-all duration-300">
        <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-6 rounded-t-2xl">
          <div className="flex flex-wrap md:flex-nowrap justify-between items-center gap-4">
            <div className="flex flex-col">
              <CardTitle className="text-lg md:text-2xl font-bold text-green-900 dark:text-white flex items-center gap-3">
                <Settings className="w-5 h-5 md:w-6 md:h-6 text-green-600 dark:text-blue-400" />
                Resource Management Dashboard
              </CardTitle>
              <CardDescription className="text-sm md:text-base text-green-700 dark:text-blue-200">
                Comprehensive resource management and analytics platform
              </CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="min-w-fit whitespace-nowrap bg-white/30 dark:bg-black/30 px-3 py-1 text-xs md:text-sm">
                Enterprise
              </Badge>
              <Badge variant="outline" className="min-w-fit whitespace-nowrap bg-white/30 dark:bg-black/30 px-3 py-1 text-xs md:text-sm">
                Real-time
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full h-full bg-green-50 dark:bg-gray-800">
              <TabsTrigger
                value="overview"
                className={`flex items-center gap-2 transition-all duration-300 ${activeTab === 'overview' ? 'bg-green-200 dark:bg-blue-900' : ''
                  }`}
              >
                <BarChart3 className="w-4 h-4" /> Overview
              </TabsTrigger>
              <TabsTrigger
                value="scheduling"
                className={`flex items-center gap-2 transition-all duration-300 ${activeTab === 'scheduling' ? 'bg-green-200 dark:bg-blue-900' : ''
                  }`}
              >
                <Calendar className="w-4 h-4" /> Scheduling
              </TabsTrigger>
              <TabsTrigger
                value="workflows"
                className={`flex items-center gap-2 transition-all duration-300 ${activeTab === 'workflows' ? 'bg-green-200 dark:bg-blue-900' : ''
                  }`}
              >
                <Workflow className="w-4 h-4" /> Workflows
              </TabsTrigger>
              <TabsTrigger
                value="resources"
                className={`flex items-center gap-2 transition-all duration-300 ${activeTab === 'inventory' ? 'bg-green-200 dark:bg-blue-900' : ''
                  }`}
              >
                <Database className="w-4 h-4" /> Resources
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className={`flex items-center gap-2 transition-all duration-300 ${activeTab === 'reports' ? 'bg-green-200 dark:bg-blue-900' : ''
                  }`}
              >
                <ClipboardList className="w-4 h-4" /> Analytics
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="mt-6"
              >
                <TabsContent value="overview" className="mt-0">
                  <ResourceOverview />
                </TabsContent>

                <TabsContent value="scheduling" className="mt-0">
                  <ResourceScheduling />
                </TabsContent>

                <TabsContent value="workflows" className="mt-0">
                  <WorkflowAutomation />
                </TabsContent>

                <TabsContent value="resources" className="mt-0">
                  <Resources />
                </TabsContent>

                <TabsContent value="analytics" className="mt-0">
                  <ResourceAnalytics />
                </TabsContent>

              </motion.div>
            </AnimatePresence>

            {/* Other tab contents will be implemented similarly */}
          </Tabs>

          <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <Button
              variant="outline"
              className="w-full md:w-auto group hover:bg-green-100 dark:hover:bg-blue-900 transition-all"
            >
              Export Data
              <BarChart3 className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <div className="flex items-center space-x-2">
              <Cog className="text-green-600 dark:text-blue-400" />
              <span className="text-sm text-green-700 dark:text-blue-200">
                Last updated: Just now
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourceManagement;
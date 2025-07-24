import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Building2,
  ScrollText,
  Users2,
  Settings2,
  BarChart3,
  Trophy,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";

// Import sub-components
import ProjectOverview from './ProjectOverview';
import ResourceManagement from './ResourceManagement';
import ProjectDashboard from './ProjectDashboard';
import ProjectAutomationServices from './ProjectAutomationServices';
import ProjectAnalytics from './ProjectAnalytics';

const ProjectManagement = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [projectMetrics, setProjectMetrics] = useState({
    totalProjects: 0,
    activeClients: 0,
    landArea: 0,
    efficiency: 0
  });

  useEffect(() => {
    // Simulate fetching project metrics
    setProjectMetrics({
      totalProjects: 45,
      activeClients: 28,
      landArea: 1250,
      efficiency: 92
    });
  }, []);

  return (
    <div className='flex justify-center items-center min-h-screen p-4 md:p-6'>
      <Card className="w-full max-w-7xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-2xl hover:shadow-green-100/50 transition-all duration-300 ease-in-out">
        <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-6 rounded-t-2xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle className="text-2xl font-bold text-green-900 dark:text-white flex items-center gap-3">
                <Building2 className="text-green-600 dark:text-blue-400" />
                Agricultural Project Management
              </CardTitle>
              <CardDescription className="text-green-700 dark:text-blue-200">
                Professional farm management services for landowners and investors
              </CardDescription>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Badge variant="outline" className="bg-white/30 dark:bg-black/30">
                {projectMetrics.totalProjects} Projects
              </Badge>
              <Badge variant="outline" className="bg-white/30 dark:bg-black/30">
                {projectMetrics.activeClients} Clients
              </Badge>
              <Badge variant="outline" className="bg-white/30 dark:bg-black/30">
                {projectMetrics.landArea} Acres
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          <Tabs
            defaultValue="overview"
            className="w-full"
            onValueChange={setActiveTab}
          >
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 bg-green-50 dark:bg-gray-800">
              <TabsTrigger
                value="overview"
                className={cn(
                  "flex items-center gap-2 transition-all duration-300",
                  activeTab === 'overview' ? 'bg-green-200 dark:bg-blue-900' : ''
                )}
              >
                <ScrollText className="w-4 h-4" /> Overview
              </TabsTrigger>
              <TabsTrigger
                value="resources"
                className={cn(
                  "flex items-center gap-2 transition-all duration-300",
                  activeTab === 'resources' ? 'bg-green-200 dark:bg-blue-900' : ''
                )}
              >
                <Users2 className="w-4 h-4" /> Resources
              </TabsTrigger>
              <TabsTrigger
                value="clients"
                className={cn(
                  "flex items-center gap-2 transition-all duration-300",
                  activeTab === 'clients' ? 'bg-green-200 dark:bg-blue-900' : ''
                )}
              >
                <Trophy className="w-4 h-4" /> Clients
              </TabsTrigger>
              <TabsTrigger
                value="automation"
                className={cn(
                  "flex items-center gap-2 transition-all duration-300",
                  activeTab === 'automation' ? 'bg-green-200 dark:bg-blue-900' : ''
                )}
              >
                <Settings2 className="w-4 h-4" /> Automation
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
                className="mt-4"
              >
                <TabsContent value="overview" className="m-0">
                  <ProjectOverview />
                </TabsContent>
                <TabsContent value="resources" className="m-0">
                  <ResourceManagement />
                </TabsContent>
                <TabsContent value="clients" className="m-0">
                  <ProjectDashboard />
                </TabsContent>
                <TabsContent value="automation" className="m-0">
                  <ProjectAutomationServices />
                </TabsContent>
                <TabsContent value="analytics" className="m-0">
                  <ProjectAnalytics />
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectManagement;
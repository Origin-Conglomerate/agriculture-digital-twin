import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Droplets,
  Timer,
  Edit2,
  MoreHorizontal,
  AlertCircle,
  RefreshCw,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";

const ScheduledIrrigation = () => {
  const [schedules, setSchedules] = useState([]);
  const [activeView, setActiveView] = useState('current');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Preserve existing data fetch logic
    const fetchedSchedules = [
      { 
        id: 1, 
        zone: "Zone 1", 
        date: "2024-07-26", 
        crop: "Banana", 
        status: "In Progress", 
        volume: "20000 L", 
        remarks: "Initial Flow",
        efficiency: "92%",
        nextSchedule: "Tomorrow, 6:00 AM",
        waterSaved: "2000L saved vs last week"
      },
      { 
        id: 2, 
        zone: "Zone 2", 
        date: "2024-07-26", 
        crop: "Tomatoes", 
        status: "Scheduled", 
        volume: "15000 L", 
        remarks: "Regular watering",
        efficiency: "88%",
        nextSchedule: "Tomorrow, 7:30 AM",
        waterSaved: "1500L saved vs last week"
      },
    ];
    setSchedules(fetchedSchedules);
  }, []);

  const refreshData = () => {
    setLoading(true);
    // Simulate refresh
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const getStatusBadgeVariant = (status) => {
    switch (status.toLowerCase()) {
      case 'in progress':
        return 'default';
      case 'scheduled':
        return 'secondary';
      case 'completed':
        return 'success';
      default:
        return 'outline';
    }
  };

  return (
    <div className="flex justify-center items-center p-1">
      <Card className="w-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-2xl hover:shadow-green-100/50 transition-all duration-300 ease-in-out">
      <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-4 sm:p-6 rounded-t-2xl">
      <div className="lg:flex flex-col sm:flex-row gap-4 sm:gap-0 sm:justify-between sm:items-center">
        <div>
          <CardTitle className="text-2xl font-bold text-green-900 dark:text-white flex items-center gap-2 sm:gap-3">
            <Droplets className="w-6 h-6 text-green-600 dark:text-blue-400" />
            Irrigation Schedule
          </CardTitle>
          <CardDescription className="text-base text-green-700 dark:text-blue-200">
            Smart water management system
          </CardDescription>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-white/30 dark:bg-black/30 text-xs sm:text-sm h-8 sm:h-9"
            onClick={refreshData}
          >
            <RefreshCw className={cn(
              "w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2",
              loading ? "animate-spin" : ""
            )} />
            Refresh
          </Button>
          <Badge variant="outline" className="bg-white/30 dark:bg-black/30 text-xs sm:text-sm px-2 py-1">
            Auto-Optimized
          </Badge>
        </div>
      </div>
    </CardHeader>

        <CardContent className="p-6 space-y-6">
          <Tabs
            defaultValue="current"
            className="w-full"
            onValueChange={setActiveView}
          >
            <TabsList className="grid w-full grid-cols-3 bg-green-50 dark:bg-gray-800">
              <TabsTrigger
                value="current"
                className={cn(
                  "flex items-center gap-2 transition-all duration-300",
                  activeView === 'current' ? 'bg-green-200 dark:bg-blue-900' : ''
                )}
              >
                <Timer className="w-4 h-4" /> Current
              </TabsTrigger>
              <TabsTrigger
                value="upcoming"
                className={cn(
                  "flex items-center gap-2 transition-all duration-300",
                  activeView === 'upcoming' ? 'bg-green-200 dark:bg-blue-900' : ''
                )}
              >
                <Calendar className="w-4 h-4" /> Upcoming
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className={cn(
                  "flex items-center gap-2 transition-all duration-300",
                  activeView === 'history' ? 'bg-green-200 dark:bg-blue-900' : ''
                )}
              >
                <AlertCircle className="w-4 h-4" /> History
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeView}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="mt-4 overflow-x-auto"
              >
                <table className="w-full min-w-[640px]">
                  <thead className="bg-green-50 dark:bg-gray-800/50">
                    <tr>
                      <th className="py-3 px-4 text-left text-sm font-medium text-green-800 dark:text-blue-300">Zone</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-green-800 dark:text-blue-300">Date</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-green-800 dark:text-blue-300">Crop</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-green-800 dark:text-blue-300">Status</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-green-800 dark:text-blue-300">Volume</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-green-800 dark:text-blue-300">Efficiency</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-green-800 dark:text-blue-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schedules.map((schedule, index) => (
                      <motion.tr
                        key={schedule.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="border-b border-green-100 dark:border-gray-800"
                      >
                        <td className="py-4 px-4">
                          <span className="text-green-700 dark:text-blue-200">{schedule.zone}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-green-700 dark:text-blue-200">{schedule.date}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-green-700 dark:text-blue-200">{schedule.crop}</span>
                        </td>
                        <td className="py-4 px-4">
                          <Badge variant={getStatusBadgeVariant(schedule.status)}>
                            {schedule.status}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <div className="space-y-1">
                            <span className="text-green-700 dark:text-blue-200">{schedule.volume}</span>
                            <div className="text-xs text-green-600 dark:text-blue-300">{schedule.waterSaved}</div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="space-y-1">
                            <span className="text-green-700 dark:text-blue-200">{schedule.efficiency}</span>
                            <div className="text-xs text-green-600 dark:text-blue-300">{schedule.nextSchedule}</div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="hover:bg-green-100 dark:hover:bg-blue-900">
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="hover:bg-green-100 dark:hover:bg-blue-900">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            </AnimatePresence>
          </Tabs>

          <div className="mt-6 flex justify-between items-center gap-2">
            <Button
              variant="outline"
              className="group hover:bg-green-100 dark:hover:bg-blue-900 transition-all"
            >
              Generate Report
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <div className="flex items-center space-x-2">
              <Timer className="text-green-600 dark:text-blue-400" />
              <span className="text-sm text-green-700 dark:text-blue-200">
                Next Update: 5 mins
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScheduledIrrigation;
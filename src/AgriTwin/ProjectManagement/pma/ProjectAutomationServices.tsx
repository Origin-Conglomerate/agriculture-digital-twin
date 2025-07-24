import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
    Bot,
  Droplets,
  Sun,
  Wind,
  Settings2,
  AlertCircle,
  CloudSun,
  Zap,
  Sprout,
  Wifi
} from 'lucide-react';

const ProjectAutomationServices = () => {
  const [systemStatus] = useState({
    irrigation: {
      status: "Active",
      lastRun: "2 hours ago",
      nextSchedule: "Tomorrow 6:00 AM",
      efficiency: 95
    },
    climate: {
      status: "Active",
      temperature: "24°C",
      humidity: "65%",
      lastAdjusted: "30 mins ago"
    },
    monitoring: {
      status: "Active",
      devices: 24,
      alerts: 2,
      uptime: "99.9%"
    }
  });

  const [automationRules] = useState([
    {
      name: "Smart Irrigation",
      description: "Automated watering based on soil moisture and weather",
      status: true,
      type: "Critical"
    },
    {
      name: "Climate Control",
      description: "Temperature and humidity regulation",
      status: true,
      type: "Critical"
    },
    {
      name: "Pest Detection",
      description: "AI-powered pest and disease detection",
      status: true,
      type: "Important"
    },
    {
      name: "Nutrient Management",
      description: "Automated fertilizer distribution",
      status: false,
      type: "Optional"
    }
  ]);

  return (
    <div className="space-y-6">
      {/* System Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white/50 dark:bg-gray-800/50">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Droplets className="w-5 h-5 text-green-600 dark:text-blue-400" />
                <h3 className="font-semibold text-green-800 dark:text-blue-300">
                  Irrigation System
                </h3>
              </div>
              <Badge 
                variant="outline" 
                className="bg-green-100/50 dark:bg-blue-900/50"
              >
                {systemStatus.irrigation.status}
              </Badge>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-green-600 dark:text-blue-200">
                Last Run: {systemStatus.irrigation.lastRun}
              </p>
              <p className="text-sm text-green-600 dark:text-blue-200">
                Next Schedule: {systemStatus.irrigation.nextSchedule}
              </p>
              <p className="text-sm text-green-600 dark:text-blue-200">
                Efficiency: {systemStatus.irrigation.efficiency}%
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/50 dark:bg-gray-800/50">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CloudSun className="w-5 h-5 text-green-600 dark:text-blue-400" />
                <h3 className="font-semibold text-green-800 dark:text-blue-300">
                  Climate Control
                </h3>
              </div>
              <Badge 
                variant="outline" 
                className="bg-green-100/50 dark:bg-blue-900/50"
              >
                {systemStatus.climate.status}
              </Badge>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-green-600 dark:text-blue-200">
                Temperature: {systemStatus.climate.temperature}
              </p>
              <p className="text-sm text-green-600 dark:text-blue-200">
                Humidity: {systemStatus.climate.humidity}
              </p>
              <p className="text-sm text-green-600 dark:text-blue-200">
                Last Adjusted: {systemStatus.climate.lastAdjusted}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/50 dark:bg-gray-800/50">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wifi className="w-5 h-5 text-green-600 dark:text-blue-400" />
                <h3 className="font-semibold text-green-800 dark:text-blue-300">
                  IoT Monitoring
                </h3>
              </div>
              <Badge 
                variant="outline" 
                className="bg-green-100/50 dark:bg-blue-900/50"
              >
                {systemStatus.monitoring.status}
              </Badge>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-green-600 dark:text-blue-200">
                Connected Devices: {systemStatus.monitoring.devices}
              </p>
              <p className="text-sm text-green-600 dark:text-blue-200">
                Active Alerts: {systemStatus.monitoring.alerts}
              </p>
              <p className="text-sm text-green-600 dark:text-blue-200">
                System Uptime: {systemStatus.monitoring.uptime}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Automation Rules */}
      <Card className="bg-white/50 dark:bg-gray-800/50">
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300 mb-4 flex items-center gap-2">
            <Bot className="w-5 h-5" />
            Automation Rules
          </h3>
          <div className="space-y-4">
            {automationRules.map((rule, index) => (
              <div 
                key={index}
                className="p-4 bg-white/30 dark:bg-gray-900/30 rounded-lg flex flex-col md:flex-row justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-green-800 dark:text-blue-300">
                      {rule.name}
                    </h4>
                    <Badge variant={rule.type === "Critical" ? "destructive" : "outline"}>
                      {rule.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-green-600 dark:text-blue-200">
                    {rule.description}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Switch 
                    checked={rule.status}
                    className="data-[state=checked]:bg-green-500 dark:data-[state=checked]:bg-blue-500"
                  />
                  <span className="text-sm text-green-600 dark:text-blue-200">
                    {rule.status ? "Enabled" : "Disabled"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: <Settings2 className="w-5 h-5" />, label: "System Settings" },
          { icon: <AlertCircle className="w-5 h-5" />, label: "Alert Configuration" },
          { icon: <Zap className="w-5 h-5" />, label: "Power Management" },
          { icon: <Sprout className="w-5 h-5" />, label: "Growth Tracking" },
        ].map((action, index) => (
          <button
            key={index}
            className="flex items-center justify-center gap-2 p-4 bg-green-100 dark:bg-blue-900 text-green-800 dark:text-blue-200 rounded-lg hover:bg-green-200 dark:hover:bg-blue-800 transition-colors"
          >
            {action.icon}
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProjectAutomationServices;
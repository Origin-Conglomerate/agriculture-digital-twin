import React from 'react';
import { Card } from "@/components/ui/card";
import {
  Droplets,
  Thermometer,
  Sun,
  Sprout,
  Droplet,
  Wind
} from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: number;
  alert?: 'warning' | 'critical' | null;
}

function MetricCard({ title, value, icon, trend, alert }: MetricCardProps) {
  return (
    <Card className={`p-4 bg-white/60 dark:bg-gray-900/60 border-green-100/50 dark:border-blue-900/30 ${
      alert === 'critical' ? 'border-l-4 border-l-red-500' :
      alert === 'warning' ? 'border-l-4 border-l-yellow-500' : ''
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {icon}
          <div>
            <p className="text-sm text-green-700 dark:text-blue-200">{title}</p>
            <p className="text-lg font-bold text-green-900 dark:text-white">{value}</p>
          </div>
        </div>
        {trend && (
          <span className={`text-sm ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
    </Card>
  );
}

export default function SimulationMetricsDisplay() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      <MetricCard
        title="Soil Moisture"
        value="65%"
        icon={<Droplets className="h-5 w-5 text-green-600 dark:text-blue-400" />}
        trend={-2.5}
        alert="warning"
      />
      <MetricCard
        title="Temperature"
        value="24.5°C"
        icon={<Thermometer className="h-5 w-5 text-green-600 dark:text-blue-400" />}
      />
      <MetricCard
        title="Light Intensity"
        value="75.2 klux"
        icon={<Sun className="h-5 w-5 text-green-600 dark:text-blue-400" />}
        trend={1.8}
      />
      <MetricCard
        title="Crop Health"
        value="92%"
        icon={<Sprout className="h-5 w-5 text-green-600 dark:text-blue-400" />}
        trend={-0.5}
      />
      <MetricCard
        title="Soil pH"
        value="6.5"
        icon={<Droplet className="h-5 w-5 text-green-600 dark:text-blue-400" />}
        alert="critical"
      />
      <MetricCard
        title="Wind Speed"
        value="12 km/h"
        icon={<Wind className="h-5 w-5 text-green-600 dark:text-blue-400" />}
      />
    </div>
  );
}
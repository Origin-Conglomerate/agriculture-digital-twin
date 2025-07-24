import React from 'react';
import { 
  Droplet, 
  Wind, 
  Trees, 
  CloudSun 
} from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const EcoImpactMetrics: React.FC = () => {
  const impactMetrics = [
    {
      icon: Droplet,
      title: 'Water Conservation',
      value: '45,000',
      unit: 'Liters',
      color: 'text-blue-600',
      description: 'Water saved through efficient irrigation'
    },
    {
      icon: Wind,
      title: 'Carbon Reduction',
      value: '12.5',
      unit: 'Tons CO2',
      color: 'text-green-600',
      description: 'Carbon emissions offset'
    },
    {
      icon: Trees,
      title: 'Biodiversity',
      value: '24',
      unit: 'Acres',
      color: 'text-green-800',
      description: 'Land preserved for wildlife'
    },
    {
      icon: CloudSun,
      title: 'Renewable Energy',
      value: '8,200',
      unit: 'kWh',
      color: 'text-yellow-600',
      description: 'Clean energy generated'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300">
          Environmental Impact
        </h3>
        <Badge variant="outline">Quarterly Report</Badge>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {impactMetrics.map((metric) => (
          <Card 
            key={metric.title} 
            className="bg-white/50 dark:bg-gray-900/50 p-4 rounded-lg shadow-sm border border-green-100/50 dark:border-blue-900/30"
          >
            <div className="flex items-center space-x-3">
              <metric.icon className={`w-8 h-8 ${metric.color}`} />
              <div>
                <h4 className="text-green-700 dark:text-blue-200 font-medium">
                  {metric.title}
                </h4>
                <div className="flex items-baseline space-x-2">
                  <span className="text-xl font-bold text-green-900 dark:text-blue-300">
                    {metric.value}
                  </span>
                  <span className="text-sm text-green-600 dark:text-blue-400">
                    {metric.unit}
                  </span>
                </div>
                <p className="text-xs text-green-600 dark:text-blue-300 mt-1">
                  {metric.description}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EcoImpactMetrics;
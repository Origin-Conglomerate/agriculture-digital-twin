import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Leaf,
  Droplet,
  Sun,
  Wind,
  Calendar,
  TrendingUp
} from 'lucide-react';

const ProjectOverview = () => {
  const projectStats = [
    {
      icon: <Leaf className="w-5 h-5 text-green-600 dark:text-blue-400" />,
      title: "Active Crops",
      value: "12 varieties",
      trend: "+3 this season",
      badge: "Growing"
    },
    {
      icon: <Droplet className="w-5 h-5 text-green-600 dark:text-blue-400" />,
      title: "Water Usage",
      value: "85% efficient",
      trend: "-15% vs last year",
      badge: "Optimized"
    },
    {
      icon: <Sun className="w-5 h-5 text-green-600 dark:text-blue-400" />,
      title: "Solar Power",
      value: "12.5 kWh/day",
      trend: "+20% generation",
      badge: "Renewable"
    },
    {
      icon: <Wind className="w-5 h-5 text-green-600 dark:text-blue-400" />,
      title: "Climate Control",
      value: "Auto-regulated",
      trend: "24/7 monitoring",
      badge: "Active"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {projectStats.map((stat, index) => (
          <Card key={index} className="bg-white/50 dark:bg-gray-800/50 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {stat.icon}
                    <h3 className="font-medium text-green-800 dark:text-blue-300">
                      {stat.title}
                    </h3>
                  </div>
                  <p className="text-2xl font-bold text-green-900 dark:text-white">
                    {stat.value}
                  </p>
                  <p className="text-sm text-green-600 dark:text-blue-200 flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    {stat.trend}
                  </p>
                </div>
                <Badge variant="outline" className="bg-green-100/50 dark:bg-blue-900/50">
                  {stat.badge}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-white/50 dark:bg-gray-800/50">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300">
                Upcoming Activities
              </h3>
              <div className="space-y-3">
                {[
                  "Crop rotation planning - Next week",
                  "Soil analysis report review - Tomorrow",
                  "Irrigation system maintenance - In 3 days",
                  "Harvest scheduling - Next month"
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-green-600 dark:text-blue-400" />
                    <p className="text-green-700 dark:text-blue-200">{activity}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300">
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "Schedule Inspection",
                  "Update Reports",
                  "Resource Planning",
                  "Client Meeting"
                ].map((action, index) => (
                  <button
                    key={index}
                    className="px-3 py-2 text-sm bg-green-100 dark:bg-blue-900 text-green-800 dark:text-blue-200 rounded-lg hover:bg-green-200 dark:hover:bg-blue-800 transition-colors"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectOverview;
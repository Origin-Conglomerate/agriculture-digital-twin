import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  TrendingUp,
  BarChart3,
  PieChart as PieChartIcon,
  Download,
  Share2,
  Filter
} from 'lucide-react';

const ProjectAnalytics = () => {
  const monthlyData = [
    { month: 'Jan', yield: 4200, cost: 3100, efficiency: 85 },
    { month: 'Feb', yield: 4500, cost: 3200, efficiency: 88 },
    { month: 'Mar', yield: 4800, cost: 3300, efficiency: 90 },
    { month: 'Apr', yield: 4300, cost: 3150, efficiency: 86 },
    { month: 'May', yield: 4600, cost: 3250, efficiency: 89 },
    { month: 'Jun', yield: 5000, cost: 3400, efficiency: 92 }
  ];

  const cropDistribution = [
    { name: 'Rice', value: 35 },
    { name: 'Wheat', value: 25 },
    { name: 'Vegetables', value: 20 },
    { name: 'Fruits', value: 20 }
  ];

  const COLORS = ['#059669', '#0891b2', '#6366f1', '#8b5cf6'];

  return (
    <div className="space-y-6">
      {/* Analytics Header */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300 flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Performance Analytics
          </h3>
          <p className="text-sm text-green-600 dark:text-blue-200">
            Last updated: Today at 10:30 AM
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-green-100 dark:bg-blue-900 text-green-800 dark:text-blue-200 rounded-lg hover:bg-green-200 dark:hover:bg-blue-800 transition-colors flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="px-4 py-2 bg-green-100 dark:bg-blue-900 text-green-800 dark:text-blue-200 rounded-lg hover:bg-green-200 dark:hover:bg-blue-800 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="px-4 py-2 bg-green-100 dark:bg-blue-900 text-green-800 dark:text-blue-200 rounded-lg hover:bg-green-200 dark:hover:bg-blue-800 transition-colors flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>
      </div>

      {/* Performance Metrics */}
      <Card className="bg-white/50 dark:bg-gray-800/50">
        <CardContent className="p-4">
          <div className="space-y-4">
            <h4 className="font-semibold text-green-800 dark:text-blue-300 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Yield and Efficiency Trends
            </h4>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="yield"
                    stroke="#059669"
                    strokeWidth={2}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="efficiency"
                    stroke="#0891b2"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Crop Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-white/50 dark:bg-gray-800/50">
          <CardContent className="p-4">
            <div className="space-y-4">
              <h4 className="font-semibold text-green-800 dark:text-blue-300 flex items-center gap-2">
                <PieChartIcon className="w-5 h-5" />
                Crop Distribution
              </h4>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={cropDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {cropDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {cropDistribution.map((entry, index) => (
                  <Badge
                    key={`legend-${index}`}
                    className="flex items-center gap-2"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  >
                    {entry.name}: {entry.value}%
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary Statistics */}
        <Card className="bg-white/50 dark:bg-gray-800/50">
          <CardContent className="p-4">
            <h4 className="font-semibold text-green-800 dark:text-blue-300 mb-4">
              Key Metrics
            </h4>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 dark:bg-blue-950 rounded-lg">
                  <p className="text-sm text-green-600 dark:text-blue-300">Total Yield</p>
                  <p className="text-2xl font-bold text-green-800 dark:text-blue-200">
                    27,400 tons
                  </p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-blue-950 rounded-lg">
                  <p className="text-sm text-green-600 dark:text-blue-300">Avg Efficiency</p>
                  <p className="text-2xl font-bold text-green-800 dark:text-blue-200">
                    88.3%
                  </p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-blue-950 rounded-lg">
                  <p className="text-sm text-green-600 dark:text-blue-300">Total Cost</p>
                  <p className="text-2xl font-bold text-green-800 dark:text-blue-200">
                    $19,400
                  </p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-blue-950 rounded-lg">
                  <p className="text-sm text-green-600 dark:text-blue-300">Growth Rate</p>
                  <p className="text-2xl font-bold text-green-800 dark:text-blue-200">
                    +19.0%
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectAnalytics;
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
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
  BarChart3,
  TrendingUp,
  PieChartIcon,
  Activity,
  AlertCircle,
  Clock,
  Settings
} from 'lucide-react';

const ResourceAnalytics = () => {
  // Sample data for charts
  const utilizationData = [
    { month: 'Jan', tractors: 85, drones: 65, irrigation: 75 },
    { month: 'Feb', tractors: 88, drones: 70, irrigation: 78 },
    { month: 'Mar', tractors: 82, drones: 72, irrigation: 80 },
    { month: 'Apr', tractors: 89, drones: 76, irrigation: 85 },
    { month: 'May', tractors: 90, drones: 80, irrigation: 82 },
    { month: 'Jun', tractors: 85, drones: 85, irrigation: 88 }
  ];

  const maintenanceData = [
    { name: 'Scheduled', value: 45 },
    { name: 'Preventive', value: 30 },
    { name: 'Emergency', value: 25 }
  ];

  const COLORS = ['#22c55e', '#3b82f6', '#ef4444'];

  const resourceDistribution = [
    { category: 'Heavy Equipment', count: 15 },
    { category: 'Monitoring Tools', count: 25 },
    { category: 'Infrastructure', count: 20 },
    { category: 'Vehicles', count: 10 }
  ];

  const resourceMetrics = [
    {
      title: "Average Utilization",
      value: "78%",
      trend: "+5%",
      icon: Activity
    },
    {
      title: "Maintenance Rate",
      value: "92%",
      trend: "+2%",
      icon: Settings
    },
    {
      title: "Downtime",
      value: "4.2hrs",
      trend: "-1.5hrs",
      icon: Clock
    },
    {
      title: "Incidents",
      value: "12",
      trend: "-3",
      icon: AlertCircle
    }
  ];

  return (
    // <div className="container mx-auto p-4">
      <Card className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-2xl">
        {/* <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-6 rounded-t-2xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle className="text-2xl font-bold text-green-900 dark:text-white flex items-center gap-3">
                <Activity className="text-green-600 dark:text-blue-400" />
                Resource Analytics
              </CardTitle>
              <p className="text-green-700 dark:text-blue-200 mt-1">
                Comprehensive analysis of resource utilization and performance
              </p>
            </div>
            <Select defaultValue="6m">
              <SelectTrigger className="w-[180px] bg-white/80 dark:bg-gray-800/80">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1m">Last Month</SelectItem>
                <SelectItem value="3m">Last 3 Months</SelectItem>
                <SelectItem value="6m">Last 6 Months</SelectItem>
                <SelectItem value="1y">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader> */}

        <CardContent className="p-6">
          {/* Metrics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {resourceMetrics.map((metric, index) => (
              <Card key={index} className="bg-white/80 dark:bg-gray-800/80">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-green-700 dark:text-blue-200">{metric.title}</p>
                      <h4 className="text-2xl font-bold text-green-800 dark:text-white mt-1">
                        {metric.value}
                      </h4>
                    </div>
                    <metric.icon className="w-5 h-5 text-green-600 dark:text-blue-400" />
                  </div>
                  <div className="mt-2">
                    <Badge 
                      variant={metric.trend.startsWith('+') ? 'outline' : 'secondary'}
                      className="bg-white/30 dark:bg-black/30"
                    >
                      {metric.trend} vs last period
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Resource Utilization Chart */}
            <Card className="bg-white/80 dark:bg-gray-800/80">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-green-800 dark:text-blue-200 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Resource Utilization
                  </h3>
                  <Badge variant="outline" className="bg-white/30 dark:bg-black/30">
                    6 Month Trend
                  </Badge>
                </div>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={utilizationData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="tractors" stroke="#22c55e" />
                      <Line type="monotone" dataKey="drones" stroke="#3b82f6" />
                      <Line type="monotone" dataKey="irrigation" stroke="#f59e0b" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Resource Distribution Chart */}
            <Card className="bg-white/80 dark:bg-gray-800/80">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-green-800 dark:text-blue-200 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    Resource Distribution
                  </h3>
                  <Badge variant="outline" className="bg-white/30 dark:bg-black/30">
                    By Category
                  </Badge>
                </div>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={resourceDistribution}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#22c55e" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Maintenance Distribution */}
            <Card className="bg-white/80 dark:bg-gray-800/80">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-green-800 dark:text-blue-200 flex items-center gap-2">
                    <PieChartIcon className="w-4 h-4" />
                    Maintenance Distribution
                  </h3>
                  <Badge variant="outline" className="bg-white/30 dark:bg-black/30">
                    By Type
                  </Badge>
                </div>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={maintenanceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {maintenanceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Performance Insights */}
            <Card className="bg-white/80 dark:bg-gray-800/80">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-green-800 dark:text-blue-200 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Performance Insights
                  </h3>
                  <Badge variant="outline" className="bg-white/30 dark:bg-black/30">
                    Last 30 Days
                  </Badge>
                </div>
                <div className="space-y-4">
                  {[
                    { label: "Resource Efficiency", value: 92, color: "bg-green-500" },
                    { label: "Maintenance Compliance", value: 87, color: "bg-blue-500" },
                    { label: "Utilization Rate", value: 78, color: "bg-yellow-500" },
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm text-green-700 dark:text-blue-200">
                        <span>{item.label}</span>
                        <span>{item.value}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className={`${item.color} h-2 rounded-full transition-all duration-300`}
                          style={{ width: `${item.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    // </div>
  );
};

export default ResourceAnalytics;
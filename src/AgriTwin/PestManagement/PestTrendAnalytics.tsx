// components/PestTrendsAnalysis.tsx
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, AlertTriangle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { cn } from "@/lib/utils";

type TrendData = {
  month: string;
  aphids: number;
  beetles: number;
  mites: number;
  damage: number;
};

const mockTrendData: TrendData[] = [
  { month: 'Jan', aphids: 45, beetles: 30, mites: 20, damage: 15 },
  { month: 'Feb', aphids: 52, beetles: 35, mites: 25, damage: 18 },
  { month: 'Mar', aphids: 48, beetles: 32, mites: 28, damage: 20 },
  { month: 'Apr', aphids: 70, beetles: 45, mites: 30, damage: 25 },
  { month: 'May', aphids: 65, beetles: 40, mites: 35, damage: 28 },
  { month: 'Jun', aphids: 55, beetles: 38, mites: 32, damage: 22 },
];

const insights = [
  { id: 1, type: 'warning', message: '45% increase in aphid population since last month' },
  { id: 2, type: 'info', message: 'Beetle activity showing seasonal pattern' },
  { id: 3, type: 'success', message: 'Mite population controlled within threshold' },
];

export const PestTrendAnalytics = () => {
  const [timeRange, setTimeRange] = useState('6m');
  const [pestType, setPestType] = useState('all');

  return (
    <Card className=" w-full max-w-[92vw] bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30">
      <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50  p-4 rounded-t-xl">
        <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center">
          <CardTitle className="text-xl font-semibold text-green-900 dark:text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-blue-400" />
            Pest Population Trends
          </CardTitle>
          <Badge variant="outline" className="self-start sm:self-auto bg-white/30 dark:bg-black/30">
            Analysis
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">Last Month</SelectItem>
              <SelectItem value="3m">Last 3 Months</SelectItem>
              <SelectItem value="6m">Last 6 Months</SelectItem>
              <SelectItem value="1y">Last Year</SelectItem>
            </SelectContent>
          </Select>

          <Select value={pestType} onValueChange={setPestType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Pest Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Pests</SelectItem>
              <SelectItem value="aphids">Aphids</SelectItem>
              <SelectItem value="beetles">Beetles</SelectItem>
              <SelectItem value="mites">Mites</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Population Trends Chart */}
          <Card className="bg-white/50 dark:bg-gray-800/50 p-4">
            <CardTitle className="text-lg mb-4 text-green-800 dark:text-blue-300">
              Population Trends
            </CardTitle>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockTrendData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                  <XAxis dataKey="month" className="text-green-800 dark:text-blue-300" />
                  <YAxis className="text-green-800 dark:text-blue-300" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      borderColor: '#10B981'
                    }}
                  />
                  <Line type="monotone" dataKey="aphids" stroke="#EF4444" strokeWidth={2} />
                  <Line type="monotone" dataKey="beetles" stroke="#F59E0B" strokeWidth={2} />
                  <Line type="monotone" dataKey="mites" stroke="#3B82F6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Damage Impact Chart */}
          <Card className="bg-white/50 dark:bg-gray-800/50 p-4">
            <CardTitle className="text-lg mb-4 text-green-800 dark:text-blue-300">
              Crop Damage Impact
            </CardTitle>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockTrendData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                  <XAxis dataKey="month" className="text-green-800 dark:text-blue-300" />
                  <YAxis className="text-green-800 dark:text-blue-300" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      borderColor: '#10B981'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="damage" 
                    stroke="#EF4444"
                    fill="#EF4444"
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Insights Panel */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4 text-green-800 dark:text-blue-300">
            Key Insights
          </h3>
          <div className="space-y-3">
            {insights.map((insight) => (
              <div
                key={insight.id}
                className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg flex items-center gap-3"
              >
                <AlertTriangle 
                  className={cn(
                    "w-5 h-5",
                    insight.type === 'warning' ? 'text-yellow-500' :
                    insight.type === 'info' ? 'text-blue-500' : 'text-green-500'
                  )}
                />
                <span className="text-green-700 dark:text-blue-200">
                  {insight.message}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
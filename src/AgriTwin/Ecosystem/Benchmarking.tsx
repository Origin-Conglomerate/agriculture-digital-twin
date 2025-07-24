import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, TrendingUp, PieChart, Activity } from 'lucide-react';

export const Benchmarking = () => {
  const benchmarkData = {
    yieldComparison: "+15%",
    costEfficiency: "+8%",
    waterUsage: "-12%",
    qualityScore: "92/100"
  };

  return (
    <Card className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-xl">
      <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-4">
        <div className="md:flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart className="text-green-600 dark:text-blue-400" />
            <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300">
              Performance Benchmarking
            </h3>
          </div>
          <Badge variant="outline" className="bg-white/30 dark:bg-black/30">
            Real-time Analysis
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-green-50 dark:bg-gray-800 p-3 rounded-lg">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-600 dark:text-blue-400" />
              <p className="text-sm text-green-700 dark:text-blue-200">Yield vs Avg</p>
            </div>
            <p className="text-lg font-bold text-green-900 dark:text-white">
              {benchmarkData.yieldComparison}
            </p>
          </div>
          <div className="bg-green-50 dark:bg-gray-800 p-3 rounded-lg">
            <div className="flex items-center gap-2">
              <PieChart className="w-4 h-4 text-green-600 dark:text-blue-400" />
              <p className="text-sm text-green-700 dark:text-blue-200">Cost Efficiency</p>
            </div>
            <p className="text-lg font-bold text-green-900 dark:text-white">
              {benchmarkData.costEfficiency}
            </p>
          </div>
          <div className="bg-green-50 dark:bg-gray-800 p-3 rounded-lg">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-green-600 dark:text-blue-400" />
              <p className="text-sm text-green-700 dark:text-blue-200">Water Usage</p>
            </div>
            <p className="text-lg font-bold text-green-900 dark:text-white">
              {benchmarkData.waterUsage}
            </p>
          </div>
          <div className="bg-green-50 dark:bg-gray-800 p-3 rounded-lg">
            <div className="flex items-center gap-2">
              <BarChart className="w-4 h-4 text-green-600 dark:text-blue-400" />
              <p className="text-sm text-green-700 dark:text-blue-200">Quality Score</p>
            </div>
            <p className="text-lg font-bold text-green-900 dark:text-white">
              {benchmarkData.qualityScore}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
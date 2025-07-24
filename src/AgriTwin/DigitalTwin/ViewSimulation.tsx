import React from 'react';
import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

export default function ViewSimulation({ dataType = 'growth' }) {
  const growthData = [
    { time: 'Week 1', actual: 15, predicted: 14, optimal: 16 },
    { time: 'Week 2', actual: 22, predicted: 23, optimal: 24 },
    { time: 'Week 3', actual: 28, predicted: 29, optimal: 32 },
    { time: 'Week 4', actual: 35, predicted: 36, optimal: 40 },
    { time: 'Week 5', actual: 42, predicted: 44, optimal: 48 },
    { time: 'Week 6', actual: 48, predicted: 50, optimal: 56 },
  ];

  return (
    <Card className="p-4 bg-white/60 dark:bg-gray-900/60 border-green-100/50 dark:border-blue-900/30">
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={growthData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="actual" 
              stroke="#22c55e" 
              name="Actual Growth" 
              strokeWidth={2}
            />
            <Line 
              type="monotone" 
              dataKey="predicted" 
              stroke="#3b82f6" 
              name="Predicted Growth"
              strokeWidth={2}
              strokeDasharray="5 5"
            />
            <Line 
              type="monotone" 
              dataKey="optimal" 
              stroke="#f59e0b" 
              name="Optimal Growth"
              strokeWidth={2}
              opacity={0.5}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, AlertCircle } from 'lucide-react';

interface PredictiveAnalysisProps {
  historicalData: {
    month: number;
    actual: number;
    predicted: number;
  }[];
}

export function PredictiveAnalysis({ historicalData }: PredictiveAnalysisProps) {
  return (
    <Card className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30">
      <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50">
        <div className="md:flex justify-between items-center">
          <CardTitle className="text-xl font-bold text-green-900 dark:text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Predictive Health Analysis
          </CardTitle>
          <Badge variant="outline" className="bg-white/30 dark:bg-black/30">
            AI Forecast
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-64 w-full">
          <ResponsiveContainer>
            <LineChart data={historicalData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
              <XAxis dataKey="month" stroke="#888888" />
              <YAxis stroke="#888888" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  borderRadius: '8px',
                  border: '1px solid #ddd'
                }}
              />
              <Line
                type="monotone"
                dataKey="actual"
                stroke="#22c55e"
                strokeWidth={2}
                dot={{ fill: '#22c55e' }}
                name="Actual Health"
              />
              <Line
                type="monotone"
                dataKey="predicted"
                stroke="#3b82f6"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: '#3b82f6' }}
                name="Predicted Health"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
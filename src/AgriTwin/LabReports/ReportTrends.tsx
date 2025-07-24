import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Activity } from 'lucide-react';

const mockTrendsData = [
  { name: 'Jan', 
    soilHealth: 65, 
    plantHealth: 70, 
    nutrientLevel: 68 
  },
  { name: 'Feb', 
    soilHealth: 68, 
    plantHealth: 72, 
    nutrientLevel: 71 
  },
  { name: 'Mar', 
    soilHealth: 72, 
    plantHealth: 75, 
    nutrientLevel: 74 
  },
  { name: 'Apr', 
    soilHealth: 75, 
    plantHealth: 78, 
    nutrientLevel: 77 
  },
  { name: 'May', 
    soilHealth: 78, 
    plantHealth: 80, 
    nutrientLevel: 80 
  }
];

const ReportTrends: React.FC = () => {
  return (
    <Card className="w-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30">
      <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50">
        <CardTitle className="text-green-900 dark:text-white flex items-center gap-3">
          <TrendingUp className="text-green-600 dark:text-blue-400" />
          Agricultural Health Trends
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={mockTrendsData}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="rgba(0,0,0,0.1)" 
            />
            <XAxis 
              dataKey="name" 
              stroke="rgba(0,0,0,0.5)" 
            />
            <YAxis 
              stroke="rgba(0,0,0,0.5)" 
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255,255,255,0.9)', 
                borderRadius: '8px' 
              }} 
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="soilHealth" 
              stroke="#10B981" 
              strokeWidth={2} 
            />
            <Line 
              type="monotone" 
              dataKey="plantHealth" 
              stroke="#3B82F6" 
              strokeWidth={2} 
            />
            <Line 
              type="monotone" 
              dataKey="nutrientLevel" 
              stroke="#F43F5E" 
              strokeWidth={2} 
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ReportTrends;
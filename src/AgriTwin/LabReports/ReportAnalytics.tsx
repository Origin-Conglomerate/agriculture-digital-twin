import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Zap 
} from 'lucide-react';

const mockAnalyticsData = [
  { 
    name: 'Soil pH', 
    current: 6.8, 
    optimal: 7.0, 
    risk: 2 
  },
  { 
    name: 'Nutrient Balance', 
    current: 85, 
    optimal: 90, 
    risk: 1 
  },
  { 
    name: 'Water Retention', 
    current: 72, 
    optimal: 80, 
    risk: 3 
  }
];

const ReportAnalytics: React.FC = () => {
  return (
    <Card className="w-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30">
      <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50">
        <CardTitle className="text-green-900 dark:text-white flex items-center gap-3">
          <Zap className="text-green-600 dark:text-blue-400" />
          Comprehensive Field Analytics
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-green-800 dark:text-blue-300">
              <ShieldCheck className="text-green-600" /> Risk Assessment
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={mockAnalyticsData}>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="rgba(0,0,0,0.1)" 
              />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255,255,255,0.9)', 
                  borderRadius: '8px' 
                }} 
              />
              <Bar 
                dataKey="current" 
                fill="#10B981" 
                name="Current Value" 
              />
              <Bar 
                dataKey="optimal" 
                fill="#3B82F6" 
                name="Optimal Value" 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="space-y-4 bg-green-50 dark:bg-gray-800/50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300 flex items-center gap-2">
            <AlertTriangle className="text-yellow-600" /> Risk Indicators
          </h3>
          {mockAnalyticsData.map((item, index) => (
            <div 
              key={index} 
              className="flex justify-between items-center border-b pb-2 last:border-b-0"
            >
              <span className="text-green-700 dark:text-blue-200">
                {item.name}
              </span>
              <div 
                className={`px-2 py-1 rounded-full text-xs ${
                  item.risk === 1 
                    ? 'bg-green-200 text-green-800' 
                    : item.risk === 2 
                    ? 'bg-yellow-200 text-yellow-800' 
                    : 'bg-red-200 text-red-800'
                }`}
              >
                Risk Level: {item.risk}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportAnalytics;
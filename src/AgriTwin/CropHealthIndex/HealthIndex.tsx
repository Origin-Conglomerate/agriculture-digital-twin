import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, AlertTriangle, CheckCircle } from 'lucide-react';
import { CropHealthData } from './Types';

interface HealthIndexCardProps {
  data: CropHealthData;
}

export function HealthIndex({ data }: HealthIndexCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Excellent': return 'bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Good': return 'bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Fair': return 'bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Poor': return 'bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return '';
    }
  };

  return (
    <Card className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 hover:shadow-green-100/50 transition-all duration-300">
      <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold text-green-900 dark:text-white">
            Month {data.month} Health Index
          </CardTitle>
          <Badge className={getStatusColor(data.status)}>
            {data.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-green-700 dark:text-blue-200">Health Score</span>
            <span className="text-2xl font-bold text-green-800 dark:text-blue-300">
              {data.healthIndex}%
            </span>
          </div>
          {data.issues && data.issues.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold text-green-800 dark:text-blue-300 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Issues Detected
              </h4>
              <ul className="list-disc list-inside text-green-700 dark:text-blue-200">
                {data.issues.map((issue, i) => (
                  <li key={i}>{issue}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
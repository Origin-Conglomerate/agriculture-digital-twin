import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from 'lucide-react';

interface Fault {
  id: string;
  title: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
  location: string;
  status: 'open' | 'in-progress' | 'resolved';
}

interface FaultListProps {
  faults: Fault[];
}

export const FaultList: React.FC<FaultListProps> = ({ faults }) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300';
      default: return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
    }
  };

  return (
    <Card className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-green-900 dark:text-white">
          Active Faults
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {faults.map((fault) => (
          <Alert key={fault.id} className="border-l-4 border-l-green-500 dark:border-l-blue-500">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle className="flex items-center justify-between">
              <span>{fault.title}</span>
              <Badge className={getSeverityColor(fault.severity)}>
                {fault.severity}
              </Badge>
            </AlertTitle>
            <AlertDescription className="text-green-700 dark:text-blue-200">
              <div className="flex justify-between items-center">
                <span>{fault.location}</span>
                <span>{fault.timestamp}</span>
              </div>
            </AlertDescription>
          </Alert>
        ))}
      </CardContent>
    </Card>
  );
};
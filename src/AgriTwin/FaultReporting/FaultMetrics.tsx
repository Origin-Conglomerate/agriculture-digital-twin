import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface FaultMetricsCardProps {
  title: string;
  data: any[];
  dataKey: string;
  stroke: string;
}

export const FaultMetrics: React.FC<FaultMetricsCardProps> = ({
  title,
  data,
  dataKey,
  stroke
}) => {
  return (
    <Card className="w-full m bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-green-800 dark:text-blue-300">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey={dataKey} stroke={stroke} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', price: 4000 },
  { name: 'Feb', price: 3000 },
  { name: 'Mar', price: 5000 },
  { name: 'Apr', price: 4500 },
  { name: 'May', price: 4800 },
  { name: 'Jun', price: 5200 },
];

export const Market = () => {
  return (
    <Card className="w-full max-w-[89vw] bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl">
      <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-6 rounded-t-2xl">
        <CardTitle className="text-xl font-bold text-green-900 dark:text-white">
          Market Analytics
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="price" stroke="#22c55e" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Plant, DollarSign, Package } from 'lucide-react';

export const Stats = ({ title, value, icon: Icon, trend }) => (
  <Card className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl">
    <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-4">
      <div className="flex justify-between items-center">
        <CardTitle className="text-lg font-semibold text-green-800 dark:text-blue-300">{title}</CardTitle>
        <Icon className="w-6 h-6 text-green-600 dark:text-blue-400" />
      </div>
    </CardHeader>
    <CardContent className="p-4">
      <div className="text-2xl font-bold text-green-700 dark:text-blue-200">{value}</div>
      <div className={`text-sm ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
        {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}% from last month
      </div>
    </CardContent>
  </Card>
);
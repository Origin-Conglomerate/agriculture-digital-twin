import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = [
    { month: 'Jan', deliveries: 65, orders: 85, efficiency: 76 },
    { month: 'Feb', deliveries: 75, orders: 88, efficiency: 82 },
    { month: 'Mar', deliveries: 85, orders: 92, efficiency: 89 },
    // Add more data as needed
  ];

export const DeliveryChart = () => {
  return (
    <Card className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-green-800 dark:text-blue-300">
          Delivery Performance Metrics
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mockData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-green-200 dark:stroke-blue-900" />
            <XAxis dataKey="month" className="text-green-700 dark:text-blue-200" />
            <YAxis className="text-green-700 dark:text-blue-200" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid #ccc'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="deliveries" 
              stroke="#059669"
              strokeWidth={2}
            />
            <Line 
              type="monotone" 
              dataKey="orders" 
              stroke="#3B82F6"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
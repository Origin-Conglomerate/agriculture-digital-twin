import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TruckIcon, PackageIcon, WarehouseIcon, ClockIcon } from 'lucide-react';

const mockData = [
  { month: 'Jan', deliveries: 65, orders: 85, efficiency: 76 },
  { month: 'Feb', deliveries: 75, orders: 88, efficiency: 82 },
  { month: 'Mar', deliveries: 85, orders: 92, efficiency: 89 },
  // Add more data as needed
];

export const LogisticsStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {[
        {
          title: "Total Deliveries",
          value: "1,284",
          icon: TruckIcon,
          color: "text-green-600 dark:text-blue-400"
        },
        {
          title: "Pending Orders",
          value: "126",
          icon: PackageIcon,
          color: "text-green-600 dark:text-blue-400"
        },
        {
          title: "Warehouse Capacity",
          value: "78%",
          icon: WarehouseIcon,
          color: "text-green-600 dark:text-blue-400"
        },
        {
          title: "Avg Delivery Time",
          value: "2.3 days",
          icon: ClockIcon,
          color: "text-green-600 dark:text-blue-400"
        }
      ].map((stat, index) => (
        <Card key={index} className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-green-700 dark:text-blue-200">{stat.title}</p>
                <h3 className="text-2xl font-bold text-green-900 dark:text-white">{stat.value}</h3>
              </div>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
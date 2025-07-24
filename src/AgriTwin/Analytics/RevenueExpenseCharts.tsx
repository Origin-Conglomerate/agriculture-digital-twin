import { LineChart, Line, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sprout, Users, WrenchIcon, Droplet } from 'lucide-react';

const sampleData = {
  revenue: [
    { month: 'Jan', value: 4000 },
    { month: 'Feb', value: 3000 },
    { month: 'Mar', value: 2000 },
    { month: 'Apr', value: 2780 },
    { month: 'May', value: 1890 },
    { month: 'Jun', value: 2390 },
  ],
  expenses: [
    { category: 'Labor', value: 400 },
    { category: 'Seeds', value: 300 },
    { category: 'Equipment', value: 300 },
    { category: 'Fertilizer', value: 200 },
  ]
};

export const RevenueChart = () => (
  <Card className="w-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl">
    <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-4">
      <CardTitle className="text-lg font-semibold text-green-800 dark:text-blue-300">Revenue Trend</CardTitle>
    </CardHeader>
    <CardContent className="p-4">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={sampleData.revenue}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-green-200 dark:stroke-blue-900/30" />
          <XAxis dataKey="month" className="text-green-700 dark:text-blue-200" />
          <YAxis className="text-green-700 dark:text-blue-200" />
          <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0' }} />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#22c55e" />
        </LineChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

export const ExpensePieChart = () => {
  const categoryIcons = {
    'Labor': <Users className="h-6 w-6" />,
    'Seeds': <Sprout className="h-6 w-6" />,
    'Equipment': <WrenchIcon className="h-6 w-6" />,
    'Fertilizer': <Droplet className="h-6 w-6" />
  };

  const categoryColors = {
    'Labor': '#4CAF50',
    'Seeds': '#2196F3',
    'Equipment': '#FF9800',
    'Fertilizer': '#9C27B0'
  };

  const totalExpense = sampleData.expenses.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="w-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl">
      <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-4">
        <CardTitle className="text-lg font-semibold text-green-800 dark:text-blue-300">Expense Distribution</CardTitle>
        
        {/* Icons Row */}
        <div className="flex justify-around py-4">
          {sampleData.expenses.map((expense) => (
            <div key={expense.category} className="flex flex-col items-center gap-2">
              <div 
                className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-sm"
                style={{ color: categoryColors[expense.category as keyof typeof categoryColors] }}
              >
                {categoryIcons[expense.category as keyof typeof categoryIcons]}
              </div>
              <span className="text-sm font-medium text-green-700 dark:text-blue-200">
                {expense.category}
              </span>
              <span className="text-xs text-green-600/80 dark:text-blue-300/80">
                {(expense.value / totalExpense * 100).toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={sampleData.expenses}
              dataKey="value"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={100}
            >
              {sampleData.expenses.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={categoryColors[entry.category as keyof typeof categoryColors]}
                />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              formatter={(value) => `₹${value.toLocaleString()}`}
            />
            <Legend 
              formatter={(value) => (
                <span className="text-sm text-green-800/80 dark:text-blue-200/80">
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { Card, CardContent } from "@/components/ui/card";
import { IndianRupee, TrendingUp, PlusCircle } from 'lucide-react';

interface ExpenseChartProps {
  expenses: Array<{
    title: string;
    amount: string;
    date: string;
    category?: string;
  }>;
}

const ExpenseChart: React.FC<ExpenseChartProps> = ({ expenses }) => {
  // Process expenses into chart-friendly format
  const processedData = expenses.reduce((acc, expense) => {
    const date = new Date(expense.date);
    const monthKey = date.toLocaleString('default', { month: 'short', year: 'numeric' });
    
    const existingMonth = acc.find(item => item.month === monthKey);
    if (existingMonth) {
      existingMonth.amount += parseFloat(expense.amount);
    } else {
      acc.push({
        month: monthKey,
        amount: parseFloat(expense.amount)
      });
    }
    
    return acc;
  }, [] as Array<{ month: string; amount: number }>);

  // Sort data by date
  const sortedData = processedData.sort((a, b) => {
    const dateA = new Date(`01 ${a.month}`);
    const dateB = new Date(`01 ${b.month}`);
    return dateA.getTime() - dateB.getTime();
  });

  // Empty state component
  const EmptyState = () => (
    <div className="h-full flex flex-col items-center justify-center text-center p-6">
      <div className="bg-green-50 dark:bg-blue-900/20 p-4 rounded-full mb-4">
        <PlusCircle className="w-12 h-12 text-green-500 dark:text-blue-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
        No Expenses Yet
      </h3>
      <p className="text-gray-600 dark:text-gray-400 max-w-sm">
        Add your expenses to see them visualized in this chart. Track your spending patterns over time.
      </p>
    </div>
  );

  return (
    <Card className="bg-white/50 dark:bg-gray-900/50 w-full h-[400px] backdrop-blur-sm border border-gray-200 dark:border-gray-800">
      <CardContent className="p-4 h-full">
        {sortedData.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="flex items-center mb-4">
              <TrendingUp className="w-5 h-5 text-green-600 dark:text-blue-400 mr-2" />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Expense Trends
              </h3>
            </div>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart
                data={sortedData}
                margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(0,0,0,0.1)"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  angle={-45}
                  textAnchor="end"
                  tick={{ fill: '#666666' }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `₹${value}`}
                  tick={{ fill: '#666666' }}
                />
                <Tooltip
                  cursor={{ fill: 'rgba(0,0,0,0.1)' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                          <p className="font-bold text-green-800 dark:text-blue-200 mb-1">
                            {payload[0].payload.month}
                          </p>
                          <div className="flex items-center">
                            <IndianRupee className="w-4 h-4 mr-1 text-green-600 dark:text-blue-400" />
                            <span className="text-green-900 dark:text-blue-300 text-lg">
                              {Number(payload[0]?.value).toLocaleString('en-IN', {
                                maximumFractionDigits: 2
                              })}
                            </span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar
                  dataKey="amount"
                  fill="url(#colorGradient)"
                  radius={[4, 4, 0, 0]}
                />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor="rgba(34, 197, 94, 0.8)"
                      stopOpacity={1}
                    />
                    <stop
                      offset="100%"
                      stopColor="rgba(34, 197, 94, 0.4)"
                      stopOpacity={1}
                    />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ExpenseChart;
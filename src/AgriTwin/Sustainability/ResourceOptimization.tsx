import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const data = [
  { month: "Jan", energy: 400, water: 240, waste: 200 },
  { month: "Feb", energy: 300, water: 139, waste: 220 },
  { month: "Mar", energy: 200, water: 980, waste: 190 },
  // ... more data
];

export const ResourceOptimization = () => {
  const [chartWidth, setChartWidth] = useState(800);

  useEffect(() => {
    const updateWidth = () => {
      setChartWidth(window.innerWidth < 1024 ? window.innerWidth - 40 : 800);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <Card className="w-full max-w-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-green-100/50 dark:border-blue-900/30 p-4">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl text-green-900 dark:text-white">
          Resource Usage Trends
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[300px] overflow-auto">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data} width={chartWidth} height={300}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="energy" stroke="#22c55e" />
              <Line type="monotone" dataKey="water" stroke="#3b82f6" />
              <Line type="monotone" dataKey="waste" stroke="#ef4444" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

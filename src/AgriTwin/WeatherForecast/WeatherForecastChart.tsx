import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { WeatherCard } from './WeatherCard';
interface WeatherChartProps {
  dailyForecasts: any[];
}

export const WeatherForecastChart = ({ dailyForecasts }: WeatherChartProps) => {
  const chartData = dailyForecasts.map(forecast => ({
    date: new Date(forecast.Date).toLocaleDateString(),
    temperature: forecast.Temperature.Maximum.Value
  }));

  return (
    <WeatherCard
      title="Temperature Trend"
      description="5-day temperature forecast"
      badge="Forecast"
    >
      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-green-200 dark:stroke-blue-900" />
            <XAxis 
              dataKey="date" 
              className="text-green-700 dark:text-blue-200"
            />
            <YAxis
              className="text-green-700 dark:text-blue-200"
              label={{ 
                value: 'Temperature (°C)', 
                angle: -90, 
                position: 'insideLeft',
                className: "fill-green-700 dark:fill-blue-200"
              }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="temperature" 
              stroke="#22c55e"
              strokeWidth={2}
              dot={{ fill: '#22c55e', strokeWidth: 2 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </WeatherCard>
  );
};
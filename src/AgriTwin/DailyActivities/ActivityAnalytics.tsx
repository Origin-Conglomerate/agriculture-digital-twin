import { Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const dummyData = [
  { name: 'Mon', activities: 4 },
  { name: 'Tue', activities: 3 },
  { name: 'Wed', activities: 5 },
  { name: 'Thu', activities: 2 },
  { name: 'Fri', activities: 6 },
  { name: 'Sat', activities: 3 },
  { name: 'Sun', activities: 4 },
];

export function ActivityAnalytics() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={dummyData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="activities"
            fill="#22c55e"
            className="fill-green-500 dark:fill-blue-500"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
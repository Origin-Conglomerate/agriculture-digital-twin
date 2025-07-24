import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Target, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface Goal {
  id: string;
  title: string;
  target: string;
  deadline: string;
  progress: number;
  status: 'on-track' | 'at-risk' | 'completed';
}

const statusColors = {
  'on-track': 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200',
  'at-risk': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200',
  'completed': 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200',
};

export const SustainabilityGoalTracker = () => {
  const [goals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Reduce Carbon Emissions',
      target: '30% Reduction',
      deadline: '2024 Q4',
      progress: 65,
      status: 'on-track',
    },
    {
      id: '2',
      title: 'Water Conservation',
      target: '25% Reduction',
      deadline: '2024 Q3',
      progress: 45,
      status: 'at-risk',
    },
    {
      id: '3',
      title: 'Zero Waste to Landfill',
      target: '90% Diversion',
      deadline: '2024 Q4',
      progress: 88,
      status: 'completed',
    },
  ]);

  return (
    <Card className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-green-100/50 dark:border-blue-900/30 w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-green-900 dark:text-white flex items-center gap-2">
            <Target className="text-green-600 dark:text-blue-400" />
            <span className="text-lg sm:text-xl">Sustainability Goals</span>
          </CardTitle>
          <Button variant="outline" className="hover:bg-green-100 dark:hover:bg-blue-900">
            Add New Goal
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {goals.map((goal) => (
            <div
              key={goal.id}
              className="bg-white/80 dark:bg-gray-800/80 p-4 rounded-lg border border-green-100/50 dark:border-blue-900/30"
            >
              <div className="flex justify-between items-center">
                <Badge className={`${statusColors[goal.status]} border-none`}>
                  {goal.status}
                </Badge>
                <div className="flex items-center gap-2 text-sm text-green-700 dark:text-blue-200">
                  <Calendar className="w-4 h-4 text-green-600 dark:text-blue-400" />
                  {goal.deadline}
                </div>
              </div>
              <h3 className="font-medium text-green-800 dark:text-blue-200 mt-2">
                {goal.title}
              </h3>
              <p className="text-sm text-green-700 dark:text-blue-200 mt-1">
                Target: {goal.target}
              </p>
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm text-green-700 dark:text-blue-200">
                  <span>Progress</span>
                  <span>{goal.progress}%</span>
                </div>
                <Progress value={goal.progress} className="mt-2">
                  <div className="bg-green-500 dark:bg-blue-500 h-full transition-all" />
                </Progress>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
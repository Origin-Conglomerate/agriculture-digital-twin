import React from 'react';
import { 
  Check, 
  ClockIcon, 
  Zap 
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ActionReward {
  id: number;
  title: string;
  description: string;
  pointsReward: number;
  completed: boolean;
}

const ActionRewards: React.FC = () => {
  const actions: ActionReward[] = [
    {
      id: 1,
      title: 'Complete Crop Rotation Survey',
      description: 'Provide insights on your crop rotation practices',
      pointsReward: 250,
      completed: false
    },
    {
      id: 2,
      title: 'Implement Water-Saving Technique',
      description: 'Adopt drip irrigation or rainwater harvesting',
      pointsReward: 500,
      completed: true
    },
    {
      id: 3,
      title: 'Solar Panel Installation',
      description: 'Install renewable energy solution on your farm',
      pointsReward: 1000,
      completed: false
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300 flex items-center gap-2">
          <Zap className="w-5 h-5" /> Quick Actions
        </h3>
        <Badge variant="secondary">Earn Points</Badge>
      </div>
      
      {actions.map((action) => (
        <div 
          key={action.id} 
          className={`
            p-4 rounded-lg border 
            ${action.completed 
              ? 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700' 
              : 'bg-white dark:bg-gray-800 border-green-100 dark:border-blue-900'}
          `}
        >
          <div className="md:flex justify-between items-center">
            <div>
              <h4 className={`
                font-medium 
                ${action.completed 
                  ? 'text-green-800 dark:text-green-200' 
                  : 'text-green-900 dark:text-blue-200'}
              `}>
                {action.title}
              </h4>
              <p className={`
                text-sm 
                ${action.completed 
                  ? 'text-green-600 dark:text-green-300' 
                  : 'text-green-700 dark:text-blue-300'}
              `}>
                {action.description}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant={action.completed ? "default" : "outline"}>
                {action.pointsReward} Points
              </Badge>
              <Button 
                size="sm" 
                variant={action.completed ? "secondary" : "default"}
                disabled={action.completed}
              >
                {action.completed ? <Check className="mr-2 h-4 w-4" /> : <ClockIcon className="mr-2 h-4 w-4" />}
                {action.completed ? 'Completed' : 'Start'}
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActionRewards;
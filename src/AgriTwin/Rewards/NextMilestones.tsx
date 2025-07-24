import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Target, Gift } from 'lucide-react';

interface Reward {
  id: number;
  title: string;
  pointsCost: number;
  description: string;
}

interface NextMilestonesProps {
  currentPoints: number;
  availableRewards: Reward[];
}

const NextMilestones: React.FC<NextMilestonesProps> = ({ currentPoints, availableRewards }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300 flex items-center gap-2">
          <Target className="w-5 h-5" /> Next Milestones
        </h3>
      </div>
      {availableRewards.map((reward) => (
        <div 
          key={reward.id} 
          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-green-100 dark:border-blue-900"
        >
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-medium text-green-900 dark:text-blue-200">
                {reward.title}
              </h4>
              <p className="text-sm text-green-700 dark:text-blue-300">
                {reward.description}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge 
                variant={currentPoints >= reward.pointsCost ? "default" : "outline"}
              >
                {reward.pointsCost} Points
              </Badge>
              <Button 
                size="sm" 
                variant={currentPoints >= reward.pointsCost ? "default" : "ghost"}
                disabled={currentPoints < reward.pointsCost}
              >
                <Gift className="mr-2 h-4 w-4" /> Claim
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NextMilestones;
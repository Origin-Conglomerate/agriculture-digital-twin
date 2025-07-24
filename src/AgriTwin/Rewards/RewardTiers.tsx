import React from 'react';
import { 
  Leaf, 
  TreePine, 
  Mountain, 
  Globe 
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const RewardTiers: React.FC<{ currentPoints: number }> = ({ currentPoints }) => {
  const tierLevels = [
    {
      name: 'Green Starter',
      icon: Leaf,
      pointsRequired: 0,
      color: 'text-green-500',
      description: 'Initial sustainability commitment'
    },
    {
      name: 'Green Innovator',
      icon: TreePine,
      pointsRequired: 5000,
      color: 'text-green-600',
      description: 'Implementing innovative eco-practices'
    },
    {
      name: 'Eco Champion',
      icon: Mountain,
      pointsRequired: 10000,
      color: 'text-green-700',
      description: 'Leading sustainable agricultural transformation'
    },
    {
      name: 'Sustainability Leader',
      icon: Globe,
      pointsRequired: 20000,
      color: 'text-green-900',
      description: 'Global environmental impact'
    }
  ];

  const getCurrentTier = () => {
    return tierLevels.reverse().find(tier => currentPoints >= tier.pointsRequired) || tierLevels[0];
  };

  const currentTier = getCurrentTier();
  const nextTier = tierLevels.find(tier => tier.pointsRequired > currentPoints);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300">
          Reward Tiers
        </h3>
        <Badge variant="secondary">{currentTier.name}</Badge>
      </div>
      
      <div className="flex items-center space-x-4">
        <currentTier.icon className={`w-10 h-10 ${currentTier.color}`} />
        <div className="flex-1">
          <p className="text-green-700 dark:text-blue-200">
            {currentTier.description}
          </p>
          {nextTier && (
            <div className="mt-2">
              <div className="flex justify-between text-sm text-green-600 dark:text-blue-300">
                <span>Progress to {nextTier.name}</span>
                <span>
                  {currentPoints} / {nextTier.pointsRequired} pts
                </span>
              </div>
              <Progress 
                value={
                  ((currentPoints - currentTier.pointsRequired) / 
                  (nextTier.pointsRequired - currentTier.pointsRequired)) * 100
                } 
                className="mt-1"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RewardTiers;
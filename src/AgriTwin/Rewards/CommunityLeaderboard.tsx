import React from 'react';
import { Medal } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

const CommunityLeaderboard: React.FC = () => {
  const leaderboardData = [
    { 
      rank: 1, 
      name: 'EcoFarm Solutions', 
      points: 25000, 
      impact: 'Carbon Neutral' 
    },
    { 
      rank: 2, 
      name: 'Green Harvest Co.', 
      points: 22500, 
      impact: 'Water Conservation' 
    },
    { 
      rank: 3, 
      name: 'Sustainable Acres', 
      points: 20000, 
      impact: 'Biodiversity Protection' 
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300 flex items-center gap-2">
          <Medal className="w-5 h-5" /> Community Leaderboard
        </h3>
      </div>
      {leaderboardData.map((leader) => (
        <div 
          key={leader.rank} 
          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-green-100 dark:border-blue-900 flex justify-between items-center"
        >
          <div className="flex items-center space-x-4">
            <Badge 
              variant="outline" 
              className={`
                ${leader.rank === 1 ? 'bg-yellow-100 text-yellow-800' : 
                  leader.rank === 2 ? 'bg-gray-100 text-gray-800' : 
                  'bg-orange-100 text-orange-800'}
              `}
            >
              #{leader.rank}
            </Badge>
            <div>
              <h4 className="font-medium text-green-900 dark:text-blue-200">
                {leader.name}
              </h4>
              <p className="text-sm text-green-700 dark:text-blue-300">
                {leader.impact}
              </p>
            </div>
          </div>
          <Badge variant="secondary">
            {leader.points} Points
          </Badge>
        </div>
      ))}
    </div>
  );
};

export default CommunityLeaderboard;
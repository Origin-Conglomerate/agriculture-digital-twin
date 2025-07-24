import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Trophy,
  Medal,
  Star,
  Leaf,
  Target,
  CheckCircle,
  Gift,
  Rocket,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";

// Subcomponents
import RewardTiers from './RewardTiers';
import EcoImpactMetrics from './EcoImpactMetrics';
import ActionRewards from './ActionRewards';
import NextMilestones from './NextMilestones';
import CommunityLeaderboard from './CommunityLeaderboard';

// Custom Hook for Rewards Management
const useRewardSystem = () => {
  const [rewardData, setRewardData] = useState({
    currentLevel: 'Green Innovator',
    totalPoints: 4750,
    progressToNextLevel: 65,
    availableRewards: [
      {
        id: 1,
        title: 'Sustainable Farming Kit',
        pointsCost: 5000,
        description: 'Advanced eco-friendly farming tools'
      },
      {
        id: 2,
        title: 'Carbon Offset Credits',
        pointsCost: 7500,
        description: 'Contribute to global sustainability'
      }
    ],
    recentActions: [
      {
        action: 'Water Conservation',
        points: 250,
        date: '2 days ago'
      },
      {
        action: 'Crop Rotation Optimization',
        points: 500,
        date: '5 days ago'
      }
    ]
  });

  const calculateRewardProgress = () => {
    // Advanced reward progression logic
    const levelThresholds = {
      'Green Starter': 0,
      'Green Innovator': 5000,
      'Eco Champion': 10000,
      'Sustainability Leader': 20000
    };

    // Additional logic for calculating progress
    return rewardData;
  };

  useEffect(() => {
    const updatedRewards = calculateRewardProgress();
    setRewardData(updatedRewards);
  }, []);

  return rewardData;
};

export default function Rewards() {
  const rewardData = useRewardSystem();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className='flex justify-center items-center'>
      <Card className="w-full max-w-[89vw] bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-2xl hover:shadow-green-100/50 transition-all duration-300 ease-in-out">
        <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-6 rounded-t-2xl">
          <div className="flex flex-wrap md:flex-nowrap justify-between items-center gap-4">
            <div className="flex flex-col">
              <CardTitle className="text-lg md:text-2xl font-bold text-green-900 dark:text-white flex items-center gap-3">
                <Trophy className="w-5 h-5 md:w-6 md:h-6 text-green-600 dark:text-blue-400" />
                Rewards & Impact Dashboard
              </CardTitle>
              <CardDescription className="text-sm md:text-base text-green-700 dark:text-blue-200">
                Your sustainable agriculture journey rewards
              </CardDescription>
            </div>
            <Badge variant="outline" className="min-w-fit whitespace-nowrap bg-white/30 dark:bg-black/30 px-3 py-1 text-xs md:text-sm">
              Eco Rewards
            </Badge>
          </div>
        </CardHeader>


        <CardContent className="p-6 space-y-6">
          <Tabs
            defaultValue="overview"
            className="w-full"
            onValueChange={setActiveTab}
          >
            <TabsList className="grid w-full h-full grid-cols-2 sm:grid-cols-4 md:grid-cols-3 bg-green-50 dark:bg-gray-800">
              <TabsTrigger
                value="overview"
                className={cn(
                  "flex items-center gap-2 transition-all duration-300",
                  activeTab === 'overview' ? 'bg-green-200 dark:bg-blue-900' : ''
                )}
              >
                <Star className="w-4 h-4" /> Overview
              </TabsTrigger>
              <TabsTrigger
                value="milestones"
                className={cn(
                  "flex items-center gap-2 transition-all duration-300",
                  activeTab === 'milestones' ? 'bg-green-200 dark:bg-blue-900' : ''
                )}
              >
                <Target className="w-4 h-4" /> Milestones
              </TabsTrigger>
              <TabsTrigger
                value="leaderboard"
                className={cn(
                  "flex items-center gap-2 transition-all duration-300",
                  activeTab === 'leaderboard' ? 'bg-green-200 dark:bg-blue-900' : ''
                )}
              >
                <Medal className="w-4 h-4" /> Leaderboard
              </TabsTrigger>

              <TabsTrigger
                value="tiers"
                className={cn(
                  "flex items-center gap-2 transition-all duration-300",
                  activeTab === 'tiers' ? 'bg-green-200 dark:bg-blue-900' : ''
                )}
              >
                <Medal className="w-4 h-4" /> Tiers
              </TabsTrigger>

              <TabsTrigger
                value="actionrewards"
                className={cn(
                  "flex items-center gap-2 transition-all duration-300",
                  activeTab === 'actionrewards' ? 'bg-green-200 dark:bg-blue-900' : ''
                )}
              >
                <Medal className="w-4 h-4" /> Action Rewards
              </TabsTrigger>

              <TabsTrigger
                value="ecoimpactmetrics"
                className={cn(
                  "flex items-center gap-2 transition-all duration-300",
                  activeTab === 'ecoimpactmetrics' ? 'bg-green-200 dark:bg-blue-900' : ''
                )}
              >
                <Medal className="w-4 h-4" /> EcoImpact Metrics
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="mt-4 p-4 bg-white/50 dark:bg-gray-900/50 rounded-lg"
              >
                {activeTab === 'overview' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300">
                        Your Progress
                      </h3>
                      <Badge variant="secondary">{rewardData.currentLevel}</Badge>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Leaf className="text-green-600 dark:text-blue-400" />
                      <div>
                        <p className="text-green-700 dark:text-blue-200">
                          Total Points: {rewardData.totalPoints}
                        </p>
                        <div className="w-full bg-green-100 dark:bg-blue-900 rounded-full h-2.5 mt-2">
                          <div
                            className="bg-green-600 dark:bg-blue-400 h-2.5 rounded-full"
                            style={{ width: `${rewardData.progressToNextLevel}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'milestones' && (
                  <NextMilestones
                    currentPoints={rewardData.totalPoints}
                    availableRewards={rewardData.availableRewards}
                  />
                )}

                {activeTab === 'leaderboard' && (
                  <CommunityLeaderboard />
                )}

                {activeTab === 'tiers' && (
                  <RewardTiers />
                )}

                {activeTab === 'actionrewards' && (
                  <ActionRewards />
                )}

                {activeTab === 'ecoimpactmetrics' && (
                  <EcoImpactMetrics />
                )}
              </motion.div>
            </AnimatePresence>
          </Tabs>

          <div className="mt-6 flex justify-between items-center gap-4">
            <Button
              variant="outline"
              className="group hover:bg-green-100 dark:hover:bg-blue-900 transition-all"
            >
              Claim Rewards
              <Gift className="ml-2 group-hover:scale-110 transition-transform" />
            </Button>
            <div className="flex items-center space-x-2">
              <Rocket className="text-green-600 dark:text-blue-400" />
              <span className="text-sm text-green-700 dark:text-blue-200">
                Rewards Program v2.0
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
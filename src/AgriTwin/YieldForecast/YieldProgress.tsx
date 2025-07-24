import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Progress } from "@/components/ui/progress";

const YieldProgress = ({ currentYield }) => {
  if (!currentYield) return null;

  return (
    <Card className="w-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-green-800 dark:text-blue-300">
          Current Growth Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-green-700 dark:text-blue-200">Growth Stage: {currentYield.growthStage}</span>
            <span className="text-green-700 dark:text-blue-200">{currentYield.completionPercentage}%</span>
          </div>
          <Progress value={currentYield.completionPercentage} className="bg-green-100 dark:bg-blue-900" />
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-sm text-green-700 dark:text-blue-200">Expected Harvest</p>
              <p className="font-semibold text-green-800 dark:text-blue-300">{currentYield.expectedHarvestDate}</p>
            </div>
            <div>
              <p className="text-sm text-green-700 dark:text-blue-200">Health Status</p>
              <p className="font-semibold text-green-800 dark:text-blue-300">{currentYield.healthStatus}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default YieldProgress;
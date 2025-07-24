import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CropLifeCycleStage } from './Types';

interface LifeCycleTimelineProps {
  stages: CropLifeCycleStage[];
}

export function LifeCycleTimeline({ stages }: LifeCycleTimelineProps) {
  return (
    <Card className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30">
      <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50">
        <CardTitle className="text-xl font-bold text-green-900 dark:text-white">
          Crop Life Cycle
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="relative">
          {stages.map((stage, index) => (
            <div key={index} className="mb-8 flex items-start">
              <div className="flex flex-col items-center mr-4">
                <div className={`rounded-full h-4 w-4 ${
                  stage.completed ? 'bg-green-500' : 
                  stage.currentStage ? 'bg-blue-500 animate-pulse' : 
                  'bg-gray-300'
                }`} />
                {index < stages.length - 1 && (
                  <div className="h-full w-0.5 bg-gray-300 dark:bg-gray-700" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300">
                    {stage.stage}
                  </h3>
                  <Badge variant={stage.currentStage ? "default" : "outline"}>
                    {stage.duration}
                  </Badge>
                </div>
                <p className="text-green-700 dark:text-blue-200">
                  {stage.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
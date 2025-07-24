import React from 'react';
import { Badge } from "@/components/ui/badge";
import { TrendingUp, AlertOctagon, ShieldCheck } from 'lucide-react';

interface ReportOverviewProps {
  insights: {
    soilHealth: any;
    plantPathology: any;
    cropNutrition: any;
  };
}

const ReportsOverview: React.FC<ReportOverviewProps> = ({ insights }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="space-y-4 bg-green-50 dark:bg-gray-800 p-4 rounded-lg">
        <div className=" justify-between items-center">
          <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300 flex items-center gap-2">
            <TrendingUp className="text-green-600 dark:text-blue-400" /> 
            Soil Health
          </h3>
          <Badge variant="secondary">{insights.soilHealth?.type}</Badge>
        </div>
        <p className="text-green-700 dark:text-blue-200">
          {insights.soilHealth?.message || 'Analyzing soil composition...'}
        </p>
      </div>

      <div className="space-y-4 bg-green-50 dark:bg-gray-800 p-4 rounded-lg">
        <div className=" justify-between items-center">
          <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300 flex items-center gap-2">
            <AlertOctagon className="text-yellow-600 dark:text-yellow-400" /> 
            Plant Pathology
          </h3>
          <Badge variant="destructive">{insights.plantPathology?.type}</Badge>
        </div>
        <p className="text-green-700 dark:text-blue-200">
          {insights.plantPathology?.message || 'Scanning plant health...'}
        </p>
      </div>

      <div className="space-y-4 bg-green-50 dark:bg-gray-800 p-4 rounded-lg">
        <div className=" justify-between items-center">
          <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300 flex items-center gap-1">
            <ShieldCheck className="text-blue-600 dark:text-blue-400" /> 
            Crop Nutrition
          </h3>
          <Badge variant="outline">{insights.cropNutrition?.type}</Badge>
        </div>
        <p className="text-green-700 dark:text-blue-200">
          {insights.cropNutrition?.message || 'Evaluating nutritional metrics...'}
        </p>
      </div>
    </div>
  );
};

export default ReportsOverview;
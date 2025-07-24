import { useState,useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";


// AI Predictions Hook
const useLabourPredictions = () => {
    const [predictions, setPredictions] = useState({
        staffing: null,
        performance: null,
        scheduling: null
    });

    const generatePredictions = () => {
        const staffingPredictions = [
            { type: 'optimization', message: "Recommended hiring: 2 harvesters for next week" },
            { type: 'allocation', message: "Redistribute 3 workers to Zone B for better efficiency" },
            { type: 'planning', message: "Peak season approaching: Plan 30% workforce increase" }
        ];

        const performancePredictions = [
            { type: 'productivity', message: "Team A performing 15% above average" },
            { type: 'improvement', message: "Suggested training for new equipment operators" },
            { type: 'efficiency', message: "Labor cost reduction potential: 12%" }
        ];

        const schedulingPredictions = [
            { type: 'optimization', message: "Optimal shift distribution detected" },
            { type: 'warning', message: "Potential overtime in Section C next week" },
            { type: 'suggestion', message: "Consider split shifts for harvest season" }
        ];

        setPredictions({
            staffing: staffingPredictions[Math.floor(Math.random() * staffingPredictions.length)],
            performance: performancePredictions[Math.floor(Math.random() * performancePredictions.length)],
            scheduling: schedulingPredictions[Math.floor(Math.random() * schedulingPredictions.length)]
        });
    };

    useEffect(() => {
        generatePredictions();
        const interval = setInterval(generatePredictions, 7000);
        return () => clearInterval(interval);
    }, []);

    return predictions;
};

const LabourAnalytics = () => {
    const predictions = useLabourPredictions();

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300">
                    AI Staffing Recommendations
                </h3>
                <Badge variant="secondary">{predictions.staffing.type}</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-white/50 dark:bg-gray-800/50 p-4">
                    <h4 className="font-semibold text-green-700 dark:text-blue-200">Staffing</h4>
                    <p className="text-green-600 dark:text-blue-300 mt-2">{predictions.staffing.message}</p>
                </Card>
                <Card className="bg-white/50 dark:bg-gray-800/50 p-4">
                    <h4 className="font-semibold text-green-700 dark:text-blue-200">Performance</h4>
                    <p className="text-green-600 dark:text-blue-300 mt-2">{predictions.performance.message}</p>
                </Card>
                <Card className="bg-white/50 dark:bg-gray-800/50 p-4">
                    <h4 className="font-semibold text-green-700 dark:text-blue-200">Scheduling</h4>
                    <p className="text-green-600 dark:text-blue-300 mt-2">{predictions.scheduling.message}</p>
                </Card>
            </div>
        </div>
    )
}

export default LabourAnalytics;
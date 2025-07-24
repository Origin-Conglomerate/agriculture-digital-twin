// LabourStats.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Users, UserCheck, UserMinus } from "lucide-react";

const LabourStats = ({ labours }) => {
    // Calculate stats from labours data
    const totalWorkers = labours?.length || 0;
    const activeWorkers = labours?.filter(worker => worker.status === 'Active').length || 0;
    const onLeaveWorkers = labours?.filter(worker => worker.status === 'On Leave').length || 0;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-white/50 dark:bg-gray-900/50">
                <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-green-700 dark:text-blue-200">Total Workers</p>
                            <h3 className="text-2xl font-bold text-green-800 dark:text-blue-300">{totalWorkers}</h3>
                        </div>
                        <Users className="text-green-600 dark:text-blue-400" />
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-white/50 dark:bg-gray-900/50">
                <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-green-700 dark:text-blue-200">Active Workers</p>
                            <h3 className="text-2xl font-bold text-green-800 dark:text-blue-300">{activeWorkers}</h3>
                        </div>
                        <UserCheck className="text-green-600 dark:text-blue-400" />
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-white/50 dark:bg-gray-900/50">
                <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-green-700 dark:text-blue-200">On Leave</p>
                            <h3 className="text-2xl font-bold text-green-800 dark:text-blue-300">{onLeaveWorkers}</h3>
                        </div>
                        <UserMinus className="text-green-600 dark:text-blue-400" />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default LabourStats;
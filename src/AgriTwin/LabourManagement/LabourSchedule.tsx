import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const ScheduleTable = ({ schedule }) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Worker</TableHead>
                    <TableHead>Task</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {schedule.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.worker}</TableCell>
                        <TableCell>{item.task}</TableCell>
                        <TableCell>{item.time}</TableCell>
                        <TableCell>
                            <Badge
                                className={`${
                                    item.status === "Completed"
                                        ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300"
                                        : "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300"
                                }`}
                            >
                                {item.status}
                            </Badge>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

const LabourSchedule = () => {
    const [schedule] = useState([
        { id: 1, worker: "Rajesh", task: "Irrigation", time: "08:00 AM - 10:00 AM", status: "Completed" },
        { id: 2, worker: "Chethan", task: "Harvesting", time: "10:30 AM - 12:30 PM", status: "Pending" },
        { id: 3, worker: "Mahesh", task: "Fertilization", time: "01:00 PM - 03:00 PM", status: "Completed" },
    ]);

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300">
                    Work Schedule
                </h3>
                <Button className="bg-green-600 hover:bg-green-700 dark:bg-blue-600 dark:hover:bg-blue-700">
                    <Calendar className="w-4 h-4 mr-2" /> Create Schedule
                </Button>
            </div>
            <ScheduleTable schedule={schedule} />
        </div>
    );
};

export default LabourSchedule;

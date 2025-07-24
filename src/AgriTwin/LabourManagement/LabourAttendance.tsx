import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const AttendanceTable = ({ attendanceData }) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Worker</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Login Time</TableHead>
                    <TableHead>Logout Time</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {attendanceData.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>
                            <Badge
                                className={`${
                                    item.status === "Present"
                                        ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300"
                                        : item.status === "Absent"
                                        ? "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300"
                                        : "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300"
                                }`}
                            >
                                {item.status}
                            </Badge>
                        </TableCell>
                        <TableCell>{item.loginTime}</TableCell>
                        <TableCell>{item.logoutTime}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

const LabourAttendance = () => {
    const [attendanceData] = useState([
        { id: 1, name: "John Doe", status: "Present", loginTime: "8:45 AM", logoutTime: "5:00 PM" },
        { id: 2, name: "Jane Smith", status: "Absent", loginTime: "N/A", logoutTime: "N/A" },
        { id: 3, name: "Robert Brown", status: "Present", loginTime: "9:00 AM", logoutTime: "6:00 PM" },
        { id: 4, name: "Emily Davis", status: "Late", loginTime: "9:15 AM", logoutTime: "5:30 PM" },
    ]);

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300">
                    Attendance Tracking
                </h3>
            </div>
            <AttendanceTable attendanceData={attendanceData} />
        </div>
    );
};

export default LabourAttendance;

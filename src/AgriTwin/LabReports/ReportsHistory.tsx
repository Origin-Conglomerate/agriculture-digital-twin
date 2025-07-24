import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, FileText } from 'lucide-react';
import labreport from "@/assets/LabReports/report.pdf"

const mockReportHistory = [
  {
    date: '2024-07-15',
    type: 'Soil Test',
    status: 'Completed',
    severity: 'low',
    pdfUrl: labreport
  },
  {
    date: '2024-07-22',
    type: 'Plant Pathology',
    status: 'In Progress',
    severity: 'medium',
    pdfUrl: '/reports/pathology-2023-10-22.pdf'
  },
  {
    date: '2024-06-05',
    type: 'Nutrient Analysis',
    status: 'Completed',
    severity: 'high',
    pdfUrl: '/reports/nutrition-2023-09-05.pdf'
  }
];

const ReportsHistory: React.FC = () => {
  const [reports] = useState(mockReportHistory);

  return (
    <div className="space-y-4">
  <div className="w-full overflow-x-scroll sm:overflow-x-auto md:overflow-x-scroll lg:overflow-visible">
    <Table>
      <TableHeader className="bg-green-50 dark:bg-gray-800">
        <TableRow>
          <TableHead className="text-green-800 dark:text-blue-300">Date</TableHead>
          <TableHead className="text-green-800 dark:text-blue-300">Report Type</TableHead>
          <TableHead className="text-green-800 dark:text-blue-300">Status</TableHead>
          <TableHead className="text-green-800 dark:text-blue-300">Severity</TableHead>
          <TableHead className="text-green-800 dark:text-blue-300 text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reports.map((report, index) => (
          <TableRow key={index} className="hover:bg-green-50/50 dark:hover:bg-gray-800/50">
            <TableCell>{report.date}</TableCell>
            <TableCell>
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-green-600 dark:text-blue-400" />
                <span>{report.type}</span>
              </div>
            </TableCell>
            <TableCell>
              <Badge 
                variant={report.status === 'Completed' ? 'default' : 'secondary'}
                className="bg-green-200 dark:bg-blue-900"
              >
                {report.status}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge 
                variant={
                  report.severity === 'high' 
                    ? 'destructive' 
                    : report.severity === 'medium' 
                    ? 'warning' 
                    : 'outline'
                }
              >
                {report.severity}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <Button 
                variant="outline" 
                size="sm" 
                className="hover:bg-green-100 dark:hover:bg-blue-900"
              >
                <Download className="w-4 h-4 mr-2" /> Download
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
</div>
  );
};

export default ReportsHistory;
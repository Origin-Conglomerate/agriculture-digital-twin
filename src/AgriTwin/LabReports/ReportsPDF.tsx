import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Download, 
  Search, 
  Filter 
} from 'lucide-react';
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import labreport from "@/assets/LabReports/report.pdf"

// Mock report data structure
interface ReportData {
  id: string;
  title: string;
  date: string;
  type: string;
  size: string;
  previewUrl?: string;
  downloadUrl: string;
}

const mockReports: ReportData[] = [
  {
    id: '1',
    title: 'Soil Composition Analysis',
    date: '2023-11-15',
    type: 'Soil Test',
    size: '2.3 MB',
    previewUrl: labreport,
    downloadUrl: '/download/soil-test-1.pdf'
  },
  {
    id: '2',
    title: 'Crop Nutrient Report',
    date: '2023-10-22',
    type: 'Nutrient Analysis',
    size: '1.9 MB',
    previewUrl: '/preview/nutrient-report-1.jpg',
    downloadUrl: '/download/nutrient-report-1.pdf'
  },
  {
    id: '3',
    title: 'Plant Health Assessment',
    date: '2023-09-05',
    type: 'Pathology',
    size: '2.1 MB',
    previewUrl: '/preview/plant-health-1.jpg',
    downloadUrl: '/download/plant-health-1.pdf'
  },
  {
    id: '4',
    title: 'Water Quality Test',
    date: '2023-08-18',
    type: 'Water Analysis',
    size: '1.7 MB',
    previewUrl: '/preview/water-test-1.jpg',
    downloadUrl: '/download/water-test-1.pdf'
  },
  {
    id: '5',
    title: 'Pest Resistance Study',
    date: '2023-07-30',
    type: 'Entomology',
    size: '2.5 MB',
    previewUrl: '/preview/pest-resistance-1.jpg',
    downloadUrl: '/download/pest-resistance-1.pdf'
  },
  {
    id: '6',
    title: 'Micronutrient Evaluation',
    date: '2023-06-12',
    type: 'Nutrient Content',
    size: '1.6 MB',
    previewUrl: '/preview/micronutrient-1.jpg',
    downloadUrl: '/download/micronutrient-1.pdf'
  }
];

const ReportPreviewDialog: React.FC<{ report: ReportData }> = ({ report }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="absolute top-2 right-2 z-10 hover:bg-green-100 dark:hover:bg-blue-900"
        >
          {/* <Search className="h-4 w-4" /> */}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full h-full object-fit">
        <DialogHeader>
          <DialogTitle className="text-green-900 dark:text-white">
            {report.title}
          </DialogTitle>
        </DialogHeader>
        {report.previewUrl ? (
          <div className="w-full h-full flex justify-center items-center">
            <iframe 
              src={report.previewUrl} 
              className="w-full h-full"
            />
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No preview available
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
};

const ReportsPDF: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');

  const filteredReports = mockReports.filter(report => 
    report.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filter === 'All' || report.type === filter)
  );

  const reportTypes = ['All', ...new Set(mockReports.map(report => report.type))];

  return (
    <div className="flex justify-center items-center p-4 sm:p-6 lg:p-8 w-full">
      <Card className="w-full max-w-[89vw] bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-2xl">
        <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-4 sm:p-6 rounded-t-2xl">
          <div className="md:flex flex-col sm:flex-row gap-4 sm:gap-0 sm:justify-between sm:items-center">
            <CardTitle className="text-2xl font-bold text-green-900 dark:text-white flex items-center gap-3">
              <FileText className="w-6 h-6 text-green-600 dark:text-blue-400" /> Laboratory Reports
            </CardTitle>
            <Badge variant="outline" className="bg-white/30 dark:bg-black/30">Comprehensive Archive</Badge>
          </div>
        </CardHeader>

        <CardContent className="p-4 sm:p-6 space-y-6">
          <div className="flex space-y-1 md:space-y-0 md:space-x-4">
            <Input 
              placeholder="Search reports..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
              icon={<Search className="text-green-600 dark:text-blue-400" />}
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" className="hover:bg-green-100 dark:hover:bg-blue-900">
                    <Filter className="h-5 w-5 gap-1 text-green-600 dark:text-blue-400" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="flex flex-wrap gap-4">
                    {reportTypes.map((type) => (
                      <Badge 
                        key={type}
                        variant={filter === type ? 'default' : 'outline'}
                        onClick={() => setFilter(type)}
                        className="cursor-pointer hover:bg-green-200 dark:hover:bg-blue-900"
                      >
                        {type}
                      </Badge>
                    ))}
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {filteredReports.map((report) => (
              <Card key={report.id} className="relative bg-green-50 dark:bg-gray-800/50 hover:shadow-lg transition-all duration-300 w-full">
                <CardContent className="p-4 space-y-3">
                  <div className="lg:flex justify-between items-center flex-row space-x-6">
                    <h3 className="text-lg  font-semibold text-green-800 dark:text-blue-300">{report.title}</h3>
                    <Badge variant="secondary" >{report.type}</Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm text-green-700 dark:text-blue-200">
                    <span>{report.date}</span>
                    <span>{report.size}</span>
                  </div>
                  <Button variant="outline" className="w-full hover:bg-green-100 dark:hover:bg-blue-900">
                    <Download className="mr-2 h-4 w-4" /> Download Report
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredReports.length === 0 && (
            <div className="text-center py-10 text-green-700 dark:text-blue-200">
              No reports match your search criteria.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsPDF;
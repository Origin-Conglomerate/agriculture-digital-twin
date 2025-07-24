import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  FileDown,
  Calendar,
  Clock,
  Download,
  RefreshCw,
  FileText,
  BarChart,
  Calculator
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DownloadReports() {
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedReport, setSelectedReport] = useState(null);

  const reports = [
    {
      id: 'weekly',
      title: 'Weekly Analysis Report',
      description: 'Detailed week-by-week breakdown of farm performance',
      icon: Clock,
      color: 'text-blue-500 dark:text-blue-400'
    },
    {
      id: 'monthly',
      title: 'Monthly Performance Report',
      description: 'Comprehensive monthly statistics and trends',
      icon: Calendar,
      color: 'text-green-500 dark:text-green-400'
    },
    {
      id: 'analytics',
      title: 'Analytics Dashboard Export',
      description: 'Export of all analytics data and visualizations',
      icon: BarChart,
      color: 'text-purple-500 dark:text-purple-400'
    }
  ];

  const handleGenerateReport = async (report) => {
    setGenerating(true);
    setSelectedReport(report);
    setProgress(0);

    // Simulate progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setProgress(i);
    }

    // Simulate download completion
    setTimeout(() => {
      setGenerating(false);
      setSelectedReport(null);
      setProgress(0);
      // Trigger download simulation
      const link = document.createElement("a");
      link.href = "#";
      link.download = `${report.id}_report.pdf`;
      link.click();
    }, 2500);
  };

  return (
    <div className="flex justify-center items-center ">
      <Card className="w-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-2xl hover:shadow-green-100/50 transition-all duration-300 ease-in-out">
          <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-4 sm:p-6 rounded-t-2xl">
          <div className="lg:flex flex-col sm:flex-row gap-4 sm:gap-0 sm:justify-between sm:items-center">
            <div>
              <CardTitle className="text-2xl font-bold text-green-900 dark:text-white flex items-center gap-2 sm:gap-3 mt-2">
                <FileText className="w-6 h-6 text-green-600 dark:text-blue-400" />
                Report Generation Center
              </CardTitle>
              <CardDescription className="text-base text-green-700 dark:text-blue-200">
              Generate and download comprehensive farm reports
              </CardDescription>
            </div>
            <Badge variant="outline" className="bg-white/30 dark:bg-black/30">
            Auto-Generated
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {reports.map((report) => (
              <motion.div
                key={report.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="bg-white/80 dark:bg-gray-800/80 hover:bg-green-50 dark:hover:bg-gray-700/80 transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center space-x-4">
                        <report.icon className={`h-6 w-6 ${report.color}`} />
                        <div>
                          <h3 className="font-semibold text-green-900 dark:text-white">
                            {report.title}
                          </h3>
                          <p className="text-sm text-green-700 dark:text-blue-200">
                            {report.description}
                          </p>
                        </div>
                      </div>
                      <Button 
                        variant="outline"
                        className="w-full group hover:bg-green-100 dark:hover:bg-blue-900 transition-all"
                        onClick={() => handleGenerateReport(report)}
                        disabled={generating}
                      >
                        {generating && selectedReport?.id === report.id ? (
                          <>
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Download className="mr-2 h-4 w-4" />
                            Generate Report
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <AnimatePresence>
            {generating && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="mt-6"
              >
                <div className="flex items-center space-x-4">
                  <span className="text-green-900 dark:text-blue-200 font-semibold">
                    Generating {selectedReport?.title}...
                  </span>
                  <Progress value={progress} className="flex-grow" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ApiHandler } from '@/utils/ApiHandler';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Bar,
  Line,
  Pie,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  BarChart,
  LineChart,
  PieChart,
  AreaChart,
  Cell
} from 'recharts';
import { Download, TrendingUp } from 'lucide-react';

// Add types
interface VisualizationData {
  activityByType: Array<{ name: string; value: number }>;
  activityByMonth: Array<{ name: string; activities: number; trend: number }>;
  dailyTrends: Array<{ name: string; activities: number; average: number }>;
  timeDistribution: Array<{ name: string; activities: number; projected: number }>;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <p className="font-semibold">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function ActivityVisualization() {
  const { t } = useTranslation();
  const { token, tenantId } = useSelector((state: any) => state.login);
  const [data, setData] = useState<VisualizationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState<Date>();

  useEffect(() => {
    fetchVisualizationData();
  }, []);

  const fetchVisualizationData = async () => {
    try {
      const response = await ApiHandler.GET(
        `${import.meta.env.VITE_DAILY_LOGS_API_URL}/api/v1/daily-logs/visualization`,
        token,
        tenantId
      );
      setData(response.data);
    } catch (error) {
      console.error('Error fetching visualization data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateReport = async () => {
    if (!date) {
      // Show error notification
      return;
    }

    try {
      const formattedDate = format(date, 'yyyy-MM-dd');
      const response = await ApiHandler.GET(
        `${import.meta.env.VITE_DAILY_LOGS_API_URL}/api/v1/daily-logs/report?date=${formattedDate}`,
        token,
        tenantId,
        { responseType: 'blob' }
      );

      // Create blob link to download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `activity-report-${formattedDate}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };

  // Rest of the component remains the same, just add the date picker next to the Generate Report button:

  return (
    <div className="space-y-8 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            {t('dailyActivities.analytics.title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Comprehensive analysis of agricultural activities
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Button 
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            onClick={handleGenerateReport}
            disabled={!date}
          >
            <Download className="w-4 h-4 mr-2" />
            {t('dailyActivities.analytics.generateReport')}
          </Button>
        </div>
      </div>

      {/* Rest of the visualization components remain the same */}
    </div>
  );
}

export default ActivityVisualization;
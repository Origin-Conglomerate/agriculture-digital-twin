import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
    ChevronRight,
    ArrowUpRight,
    Calendar,
    Loader2,
    SproutIcon,
    PlayCircle,
    AlertCircle,
    CheckCircle2,
    Filter,
    RefreshCcw
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { GET } from "../../utils/ApiHandler";

// Custom hook for process data management
const useProcessData = (token: string, tenantId: string, projectStartDate: string | null) => {
    const [isLoading, setIsLoading] = useState(true);
    const [currentWeekProcesses, setCurrentWeekProcesses] = useState<any[]>([]);
    const [completedProcesses, setCompletedProcesses] = useState<any[]>([]);
    const [upcomingProcesses, setUpcomingProcesses] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [currentWeek, setCurrentWeek] = useState<number>(0);

    const calculateCurrentWeek = (startDate: string | null) => {
        if (!startDate) return 0;
        const start = new Date(startDate);
        const now = new Date();
        const diffInTime = now.getTime() - start.getTime();
        const diffInDays = diffInTime / (1000 * 3600 * 24);
        return Math.ceil(diffInDays / 7);
    };

    const fetchProcesses = async () => {
        try {
            setIsLoading(true);
            // Use project_code instead of tenantId if tenantId represents the project code.
            const processData = await GET(
                `${import.meta.env.VITE_API_URL}/api/v1/process/list?project_code=${tenantId}`,
                token
            );

            if (processData?.data) {
                const week = calculateCurrentWeek(projectStartDate);
                setCurrentWeek(week);

                // Filter current week processes
                const currentWeekData = processData.data.process
                    .filter((process: any) => Number(process.week_number) === week)
                    .map((process: any) => ({
                        ...process,
                        status: Math.random() > 0.5 ? "completed" : "in-progress",
                        progress: Math.floor(Math.random() * 100),
                        lastUpdated: new Date().toISOString()
                    }));
                setCurrentWeekProcesses(currentWeekData);

                // Filter previous week (completed) processes
                const previousWeekData = processData.data.process
                    .filter((process: any) => Number(process.week_number) === (week - 1))
                    .map((process: any) => ({
                        ...process,
                        status: "completed",
                        progress: 100,
                        lastUpdated: new Date().toISOString()
                    }));
                setCompletedProcesses(previousWeekData);

                // Filter upcoming week processes
                const upcomingWeekData = processData.data.process
                    .filter((process: any) => Number(process.week_number) === (week + 1))
                    .map((process: any) => ({
                        ...process,
                        status: "pending",
                        progress: 0,
                        lastUpdated: new Date().toISOString()
                    }));
                setUpcomingProcesses(upcomingWeekData);
            }
        } catch (error: any) {
            setError(error.message);
            console.error("Error fetching processes:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (token && tenantId && projectStartDate) {
            fetchProcesses();
        }
    }, [token, tenantId, projectStartDate]);

    return { currentWeekProcesses, completedProcesses, upcomingProcesses, isLoading, error, refetch: fetchProcesses, currentWeek };
};

const MediaPreview = ({ media }: { media: { sasUrl: string; fileName: string }[] }) => {
    const [selectedMedia, setSelectedMedia] = useState<{ sasUrl: string; fileName: string } | null>(null);

    if (!media?.length) return null;

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
                {media.map((item, index) => {
                    if (!item) return null;
                    const isVideo = item.sasUrl.toLowerCase().includes(".mp4") || item.sasUrl.toLowerCase().includes(".mpeg");

                    return (
                        <motion.div
                            key={index}
                            className="relative group cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedMedia(item)}
                        >
                            <div className="w-20 h-20 md:w-24 md:h-24 overflow-hidden rounded-xl border-2 border-green-100/50 dark:border-blue-900/30">
                                {isVideo ? (
                                    <div className="relative w-full h-full bg-black/10 dark:bg-white/10">
                                        <PlayCircle className="absolute inset-0 m-auto text-green-600 dark:text-blue-400" />
                                        <video src={item.sasUrl} className="w-full h-full object-cover opacity-80" />
                                    </div>
                                ) : (
                                    <img src={item.sasUrl} alt={item.fileName} className="w-full h-full object-cover" />
                                )}
                            </div>
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 dark:group-hover:bg-white/20 transition-all rounded-xl" />
                        </motion.div>
                    );
                })}
            </div>

            <AnimatePresence>
                {selectedMedia && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                        onClick={() => setSelectedMedia(null)}
                    >
                        <div className="relative max-w-4xl w-full bg-white dark:bg-gray-900 rounded-2xl overflow-hidden">
                            {selectedMedia.sasUrl.toLowerCase().includes(".mp4") ? (
                                <video src={selectedMedia.sasUrl} controls className="w-full h-auto" />
                            ) : (
                                <img src={selectedMedia.sasUrl} alt={selectedMedia.fileName} className="w-full h-auto" />
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const ProcessCard = ({ process, isExpanded, onToggle }: { process: any; isExpanded: boolean; onToggle: () => void; }) => {
    const isCompleted = process.status === "completed";
    return (
        <motion.div initial={false} animate={{ height: "auto" }} className="overflow-hidden">
            <Card
                className={cn(
                    "backdrop-blur-xl border-2 transition-all duration-300",
                    isCompleted
                        ? "bg-green-50/60 dark:bg-green-200/5 border-green-100/50 dark:border-green-900/30 hover:shadow-green-100/50"
                        : "bg-blue-50/50 dark:bg-blue-200/5 border-blue-100/50 dark:border-blue-900/30 hover:shadow-blue-100/50"
                )}
            >
                <CardHeader className="p-4 cursor-pointer min-h-[100px]" onClick={onToggle}>
                    <div className="flex gap-4">
                        <SproutIcon
                            className={cn(
                                "transition-colors mt-1 shrink-0",
                                isCompleted ? "text-green-600 dark:text-green-400" : "text-blue-600 dark:text-blue-400"
                            )}
                        />
                        <div className="flex flex-col sm:flex-row justify-between w-full gap-2">
                            <div className="space-y-1 flex-1">
                                <CardTitle
                                    className={cn(
                                        "text-lg",
                                        isCompleted ? "text-green-900 dark:text-green-100" : "text-blue-900 dark:text-blue-100"
                                    )}
                                >
                                    {process.subtitle}
                                </CardTitle>
                                <CardDescription className={isCompleted ? "text-green-700 dark:text-green-200" : "text-blue-700 dark:text-blue-200"}>
                                    Last updated: {new Date(process.lastUpdated).toLocaleDateString()}
                                </CardDescription>
                            </div>
                            <div className="flex items-start gap-2 shrink-0">
                                <Badge
                                    variant={isCompleted ? "success" : "secondary"}
                                    className={isCompleted ? "bg-green-500 text-white hover:bg-green-600" : "bg-blue-500 text-white hover:bg-blue-600"}
                                >
                                    {isCompleted ? (
                                        <CheckCircle2 className="w-4 h-4 mr-1" />
                                    ) : (
                                        <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                                    )}
                                    {process.status}
                                </Badge>
                                <ChevronRight
                                    className={cn(
                                        "transition-transform duration-300",
                                        isExpanded ? "rotate-90" : "rotate-0",
                                        isCompleted ? "text-green-600 dark:text-green-400" : "text-blue-600 dark:text-blue-400"
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </CardHeader>

                <AnimatePresence>
  {isExpanded && (
    <motion.div 
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 5 }}
      transition={{ duration: 0.2 }}
    >
      <CardContent className="p-4 bg-white dark:bg-gray-800 rounded-md shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="space-y-4">
          {/* Process Description */}
          <Alert
            className={cn(
              "rounded-md border-l-4 p-3",
              isCompleted 
                ? "border-green-500 bg-green-50 dark:bg-green-900" 
                : "border-blue-500 bg-blue-50 dark:bg-blue-900"
            )}
          >
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-gray-700 dark:text-gray-300 mr-2" />
              <div>
                <AlertTitle className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                  Process Overview
                </AlertTitle>
                <AlertDescription className="text-sm text-gray-600 dark:text-gray-400">
                  {process.description}
                </AlertDescription>
              </div>
            </div>
          </Alert>

          {/* Process Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Week Card */}
            {/* <div
              className={cn(
                "flex flex-col items-center justify-center p-3 border rounded-md",
                isCompleted 
                  ? "bg-green-50 border-green-400" 
                  : "bg-blue-50 border-blue-400"
              )}
            >
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4 text-gray-600" />
                <span className="text-xs font-medium text-gray-600">Week</span>
              </div>
              <div className="mt-1 text-base font-bold text-gray-800">
                {process.week_number}
              </div>
            </div> */}

            {/* Progress Card */}
            {/* <div
              className={cn(
                "flex flex-col items-center justify-center p-3 border rounded-md",
                isCompleted 
                  ? "bg-green-50 border-green-400" 
                  : "bg-blue-50 border-blue-400"
              )}
            >
              <div className="flex items-center space-x-1">
                <Loader2 className="w-4 h-4 text-gray-600" />
                <span className="text-xs font-medium text-gray-600">Progress</span>
              </div>
              <div className="mt-1 text-base font-bold text-gray-800">
                {process.progress}%
              </div>
            </div> */}
          </div>

          {/* Media Preview */}
          <MediaPreview media={process.media} />
        </div>
      </CardContent>
    </motion.div>
  )}
</AnimatePresence>

            </Card>
        </motion.div>
    );
};

const ProcessStatistics = ({ processes }: { processes: any[] }) => {
    const stats = {
        total: processes.length,
        completed: processes.filter((p) => p.status === "completed").length,
        inProgress: processes.filter((p) => p.status === "in-progress").length,
        averageProgress:
            processes.length > 0
                ? Math.round(processes.reduce((acc, curr) => acc + curr.progress, 0) / processes.length)
                : 0
    };

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-white/80 dark:bg-gray-800/80">
                <CardContent className="p-4">
                    <div className="text-sm text-green-700 dark:text-blue-200">Total Processes</div>
                    <div className="text-2xl font-bold text-green-900 dark:text-white">{stats.total}</div>
                </CardContent>
            </Card>
            <Card className="bg-white/80 dark:bg-gray-800/80">
                <CardContent className="p-4">
                    <div className="text-sm text-green-700 dark:text-blue-200">Completed</div>
                    <div className="text-2xl font-bold text-green-900 dark:text-white">{stats.completed}</div>
                </CardContent>
            </Card>
            <Card className="bg-white/80 dark:bg-gray-800/80">
                <CardContent className="p-4">
                    <div className="text-sm text-green-700 dark:text-blue-200">In Progress</div>
                    <div className="text-2xl font-bold text-green-900 dark:text-white">{stats.inProgress}</div>
                </CardContent>
            </Card>
            <Card className="bg-white/80 dark:bg-gray-800/80">
                <CardContent className="p-4">
                    <div className="text-sm text-green-700 dark:text-blue-200">Avg. Progress</div>
                    <div className="text-2xl font-bold text-green-900 dark:text-white">{stats.averageProgress}%</div>
                </CardContent>
            </Card>
        </div>
    );
};

const ProcessFilters = ({ onFilterChange }: { onFilterChange: (filters: { status: string; sort: string }) => void }) => {
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [selectedSort, setSelectedSort] = useState("newest");

    const handleStatusChange = (status: string) => {
        setSelectedStatus(status);
        onFilterChange({ status, sort: selectedSort });
    };

    const handleSortChange = (sort: string) => {
        setSelectedSort(sort);
        onFilterChange({ status: selectedStatus, sort });
    };

    return (
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-green-600 dark:text-blue-400" />
                <select
                    className="bg-white/80 dark:bg-gray-800/80 border-2 border-green-100/50 dark:border-blue-900/30 rounded-lg p-2"
                    value={selectedStatus}
                    onChange={(e) => handleStatusChange(e.target.value)}
                >
                    <option value="all">All Status</option>
                    <option value="completed">Completed</option>
                    <option value="in-progress">In Progress</option>
                </select>
            </div>
            <div className="flex items-center gap-2">
                <RefreshCcw className="w-4 h-4 text-green-600 dark:text-blue-400" />
                <select
                    className="bg-white/80 dark:bg-gray-800/80 border-2 border-green-100/50 dark:border-blue-900/30 rounded-lg p-2"
                    value={selectedSort}
                    onChange={(e) => handleSortChange(e.target.value)}
                >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="progress">Progress</option>
                </select>
            </div>
        </div>
    );
};

const PlantationProcess = () => {
    const { token, tenantId } = useSelector((state: any) => state.login);
    const [projectStartDate, setProjectStartDate] = useState<string | null>(null);
    const [expandedProcess, setExpandedProcess] = useState<number | null>(null);
    const [activeTab, setActiveTab] = useState("completed");
    const [filters, setFilters] = useState({ status: "all", sort: "newest" });

    const { 
        currentWeekProcesses, 
        completedProcesses, 
        upcomingProcesses, 
        isLoading, 
        error, 
        refetch, 
        currentWeek 
    } = useProcessData(token, tenantId, projectStartDate);

    // Fetch project start date from the tenants API
    useEffect(() => {
        const fetchProjectStartDate = async () => {
            try {
                const response = await GET(
                    `${import.meta.env.VITE_API_URL}/api/v1/tenants/list?tenantId=${tenantId}`,
                    token
                );
                setProjectStartDate(response.data.tenants[0]?.project_start_date || null);
            } catch (error) {
                console.error("Error fetching project start date:", error);
            }
        };

        if (token && tenantId) {
            fetchProjectStartDate();
        }
    }, [token, tenantId]);

    // Handle refresh click
    const handleRefresh = () => {
        refetch();
    };

    return (
        <Card className="w-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-2xl hover:shadow-green-100/50 transition-all duration-300">
            <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-6 rounded-t-2xl">
                <div className="md:flex justify-between items-center">
                    <div>
                        <CardTitle className="text-2xl font-bold text-green-900 dark:text-white flex items-center gap-3">
                            <SproutIcon className="text-green-600 dark:text-blue-400" />
                            Plantation Process
                        </CardTitle>
                        <CardDescription className="text-green-700 dark:text-blue-200">
                            Track and manage plantation processes
                        </CardDescription>
                    </div>
                    <Link to="logprocess">
                        <Button variant="outline" className="group hover:bg-green-100 dark:hover:bg-blue-900 mt-1">
                            View History
                            <ArrowUpRight className="ml-2 group-hover:translate-x-1 -translate-y-1 transition-transform" />
                        </Button>
                    </Link>
                </div>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
                <Tabs defaultValue="current" className="w-full" onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-3 bg-green-50 dark:bg-gray-800">
                        <TabsTrigger
                            value="completed"
                            className={cn("flex items-center gap-2 transition-all duration-300", activeTab === "completed" ? "bg-green-200 dark:bg-blue-900" : "")}
                        >
                            Completed
                        </TabsTrigger>
                        <TabsTrigger
                            value="current"
                            className={cn("flex items-center gap-2 transition-all duration-300", activeTab === "current" ? "bg-green-200 dark:bg-blue-900" : "")}
                        >
                            Current Week
                        </TabsTrigger>
                        <TabsTrigger
                            value="upcoming"
                            className={cn("flex items-center gap-2 transition-all duration-300", activeTab === "upcoming" ? "bg-green-200 dark:bg-blue-900" : "")}
                        >
                            Upcoming
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="current" className="mt-4 space-y-4">
                        {isLoading ? (
                            <div className="flex items-center justify-center p-8">
                                <Loader2 className="w-8 h-8 animate-spin text-green-600 dark:text-blue-400" />
                            </div>
                        ) : error ? (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        ) : currentWeekProcesses.length === 0 ? (
                            <Alert>
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>No Processes</AlertTitle>
                                <AlertDescription>No processes found for the current week.</AlertDescription>
                            </Alert>
                        ) : (
                            <div className="space-y-4">
                                {currentWeekProcesses.map((process, index) => (
                                    <ProcessCard
                                        key={index}
                                        process={process}
                                        isExpanded={expandedProcess === index}
                                        onToggle={() => setExpandedProcess(expandedProcess === index ? null : index)}
                                    />
                                ))}
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="upcoming" className="mt-4 space-y-4">
                        {isLoading ? (
                            <div className="flex items-center justify-center p-8">
                                <Loader2 className="w-8 h-8 animate-spin text-green-600 dark:text-blue-400" />
                            </div>
                        ) : error ? (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        ) : upcomingProcesses.length === 0 ? (
                            <Alert>
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>No Upcoming Processes</AlertTitle>
                                <AlertDescription>No processes scheduled for next week.</AlertDescription>
                            </Alert>
                        ) : (
                            <div className="space-y-4">
                                {upcomingProcesses.map((process, index) => (
                                    <ProcessCard
                                        key={index}
                                        process={process}
                                        isExpanded={expandedProcess === index}
                                        onToggle={() => setExpandedProcess(expandedProcess === index ? null : index)}
                                    />
                                ))}
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="completed" className="mt-4 space-y-4">
                        {isLoading ? (
                            <div className="flex items-center justify-center p-8">
                                <Loader2 className="w-8 h-8 animate-spin text-green-600 dark:text-blue-400" />
                            </div>
                        ) : error ? (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        ) : completedProcesses.length === 0 ? (
                            <Alert>
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>No Completed Processes</AlertTitle>
                                <AlertDescription>No completed processes found from the previous week.</AlertDescription>
                            </Alert>
                        ) : (
                            <div className="space-y-4">
                                {completedProcesses.map((process, index) => (
                                    <ProcessCard
                                        key={index}
                                        process={process}
                                        isExpanded={expandedProcess === index}
                                        onToggle={() => setExpandedProcess(expandedProcess === index ? null : index)}
                                    />
                                ))}
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
                <div className="flex justify-end">
                    <Button onClick={handleRefresh} variant="outline" className="flex items-center gap-2">
                        <RefreshCcw className="w-4 h-4" />
                        Refresh
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default PlantationProcess;

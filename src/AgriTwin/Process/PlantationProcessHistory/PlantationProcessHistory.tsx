import React, { useState, useEffect, useCallback, ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  ChevronRight,
  ChevronLeft,
  Loader2,
  Calendar,
  RefreshCcw,
  Clock,
  AlertCircle,
  ChartAreaIcon,
  FileIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  File,
  FileText,
  Music,
  Play,
  ZoomIn
} from "lucide-react";
import dayjs from "dayjs";

interface Media {
  sasUrl: string;
  fileName: string;
  blobName: string;
}

interface ProcessLog {
  _id: string;
  processLog: string;
  media: Media[];
}

interface ProcessData {
  _id: string;
  title: string;
  instruction: string;
}

const WeekTabHeader = ({
  week,
  desc,
  isActive,
}: {
  week: string;
  desc: string;
  isActive: boolean;
}) => (
  <div className="flex flex-col items-center justify-center text-center leading-tight">
    <span className={`font-semibold text-xs md:text-base ${isActive ? "text-green-600 dark:text-blue-400" : ""}`}>
      Week {week}
    </span>
    <span className="text-[9px] md:text-xs text-green-700 dark:text-blue-200">{desc}</span>
  </div>
);

const isImageFile = (filename: string) => /\.(jpe?g|png|gif)$/i.test(filename);

const PlantationProcessHistory: React.FC = () => {
  // Dummy data configuration
  const DUMMY_PROJECT_START_DATE = dayjs().subtract(10, 'week').format('YYYY-MM-DD');
  const DUMMY_TENANT_ID = "dummy-tenant-123";
  const TOTAL_WEEKS = 55;
  
  // Generate dummy process data for all weeks
  const generateDummyProcessData = (week: number): ProcessData[] => {
    const baseProcesses = [
      {
        _id: `process-${week}-1`,
        title: "Soil Preparation",
        instruction: "Prepare the soil for planting by tilling and adding nutrients"
      },
      {
        _id: `process-${week}-2`,
        title: "Seed Planting",
        instruction: "Plant seeds according to recommended spacing and depth"
      },
      {
        _id: `process-${week}-3`,
        title: "Irrigation",
        instruction: "Ensure proper watering schedule is followed"
      }
    ];
    
    // Add additional processes for certain weeks
    if (week > 5) {
      baseProcesses.push({
        _id: `process-${week}-4`,
        title: "Fertilization",
        instruction: "Apply appropriate fertilizers based on soil test results"
      });
    }
    
    if (week > 10) {
      baseProcesses.push({
        _id: `process-${week}-5`,
        title: "Pest Control",
        instruction: "Monitor and apply pest control measures as needed"
      });
    }
    
    return baseProcesses;
  };
  
  // Generate dummy process log data
  const generateDummyProcessLogData = (processId: string, week: number): ProcessLog | null => {
    // Only generate logs for about 70% of processes to simulate some being empty
    if (Math.random() > 0.3) {
      const logTexts = [
        `Completed all tasks for week ${week}. Everything is progressing well.`,
        `Faced some challenges with weather conditions but managed to complete most tasks.`,
        `Excellent progress this week. Plants are growing as expected.`,
        `Had to adjust some procedures due to unexpected conditions.`,
        `All tasks completed ahead of schedule.`
      ];
      
      const mediaFiles = [
        {
          sasUrl: "https://source.unsplash.com/random/300x300/?farm",
          fileName: `farm-photo-${week}.jpg`,
          blobName: `media-blob-${week}-1`
        },
        {
          sasUrl: "https://source.unsplash.com/random/300x300/?agriculture",
          fileName: `progress-${week}.jpg`,
          blobName: `media-blob-${week}-2`
        }
      ];
      
      // Only add media about 60% of the time
      const media = Math.random() > 0.4 ? mediaFiles : [];
      
      return {
        _id: `log-${processId}`,
        processLog: logTexts[Math.floor(Math.random() * logTexts.length)],
        media
      };
    }
    
    return null;
  };

  const [currentWeek, setCurrentWeek] = useState<number | null>(null);
  const [processData, setProcessData] = useState<ProcessData[]>([]);
  const [processlogData, setProcesslogData] = useState<{ [key: string]: ProcessLog | null }>({});
  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [selectedProcess, setSelectedProcess] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [logText, setLogText] = useState("");
  const [selectedMedia, setSelectedMedia] = useState<File[]>([]);
  const [existingMedia, setExistingMedia] = useState<Media[]>([]);
  const [projectStartDate, setProjectStartDate] = useState(DUMMY_PROJECT_START_DATE);
  const [weekRange, setWeekRange] = useState("");
  const [weekOffset, setWeekOffset] = useState(0);
  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    type: "success" as "success" | "error",
    duration: 3000,
  });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const weeksPerPage = isMobile ? 4 : 7;

  useEffect(() => {
    if (alertState.open) {
      const timer = setTimeout(() => {
        setAlertState(prevState => ({ ...prevState, open: false }));
      }, alertState.duration);

      return () => clearTimeout(timer);
    }
  }, [alertState.open, alertState.duration]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const calculateCurrentWeek = useCallback((startDate: string) => {
    const start = dayjs(startDate);
    const now = dayjs();
    return Math.min(Math.floor(now.diff(start, "day") / 7) + 1, TOTAL_WEEKS);
  }, []);

  useEffect(() => {
    // Initialize with dummy data
    const calculatedWeek = calculateCurrentWeek(DUMMY_PROJECT_START_DATE);
    setCurrentWeek(calculatedWeek);
    setWeekOffset(Math.floor((calculatedWeek - 1) / weeksPerPage) * weeksPerPage);
    const weekStart = dayjs(DUMMY_PROJECT_START_DATE).add((calculatedWeek - 1) * 7, "day");
    const weekEnd = weekStart.add(6, "day");
    setWeekRange(`${weekStart.format("MMM DD")} - ${weekEnd.format("MMM DD")}`);
  }, [calculateCurrentWeek, weeksPerPage]);

  const fetchProcessData = useCallback(async (week: number) => {
    try {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Generate dummy process data
      const dummyProcessData = generateDummyProcessData(week);
      setProcessData(dummyProcessData);
      
      // Generate dummy log data for each process
      const logData: { [key: string]: ProcessLog | null } = {};
      dummyProcessData.forEach(process => {
        logData[process._id] = generateDummyProcessLogData(process._id, week);
      });
      setProcesslogData(logData);
    } catch (error) {
      console.error("Error with dummy data generation:", error);
      setAlertState({ open: true, message: "Failed to generate dummy data", type: "error", duration: 3000 });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (currentWeek !== null) {
      fetchProcessData(currentWeek);
    }
  }, [currentWeek, fetchProcessData]);

  const handleWeekChange = (week: string) => {
    const weekNumber = parseInt(week, 10);
    setCurrentWeek(weekNumber);
  };

  const handleReturnToCurrentWeek = useCallback(() => {
    const currentWeekNumber = calculateCurrentWeek(DUMMY_PROJECT_START_DATE);
    setCurrentWeek(currentWeekNumber);
    setWeekOffset(Math.floor((currentWeekNumber - 1) / weeksPerPage) * weeksPerPage);
  }, [calculateCurrentWeek, weeksPerPage]);

  const handleOpenDialog = (process: any) => {
    setSelectedProcess(process);
    const existingLog = processlogData[process._id];
    setLogText(existingLog && existingLog.processLog ? existingLog.processLog : "");
    setExistingMedia(existingLog && existingLog.media ? existingLog.media : []);
    setSelectedMedia([]);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedProcess(null);
    setLogText("");
    setSelectedMedia([]);
    setExistingMedia([]);
  };

  const handleMediaChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedMedia(Array.from(e.target.files));
    }
  };

  const handleMediaDelete = async (process: any, media: Media) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update existingMedia state to remove the deleted media
      setExistingMedia(prevMedia => prevMedia.filter(m => m.blobName !== media.blobName));

      // Update the processlogData state
      setProcesslogData(prev => {
        if (prev[process._id]) {
          const updatedLog = {
            ...prev[process._id],
            media: prev[process._id]?.media?.filter(m => m.blobName !== media.blobName) || []
          };
          return {
            ...prev,
            [process._id]: updatedLog
          };
        }
        return prev;
      });

      setAlertState({
        open: true,
        message: "Media deleted successfully",
        type: "success",
        duration: 3000,
      });
    } catch (error: any) {
      console.error('Error deleting media:', error);
      setAlertState({
        open: true,
        message: error.message || "Failed to delete media",
        type: "error",
        duration: 3000,
      });
    }
  };

  const handleLogSubmit = async (processId: string) => {
    try {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const isUpdate = !!processlogData[processId];
      
      // Generate new media entries for the uploaded files
      const newMedia = selectedMedia.map((file, index) => ({
        sasUrl: URL.createObjectURL(file),
        fileName: file.name,
        blobName: `new-media-${Date.now()}-${index}`
      }));
      
      const updatedLog: ProcessLog = {
        _id: processId,
        processLog: logText,
        media: [...existingMedia, ...newMedia]
      };
      
      // Update the state
      setProcesslogData(prev => ({
        ...prev,
        [processId]: updatedLog
      }));
      
      setAlertState({
        open: true,
        message: isUpdate ? "Process log updated successfully" : "Process log created successfully",
        type: "success",
        duration: 3000,
      });
      
      handleCloseDialog();
    } catch (error: any) {
      console.error("Error submitting log:", error);
      setAlertState({
        open: true,
        message: error.message || "Failed to update process log",
        type: "error",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteLog = async (processId: string) => {
    try {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setProcesslogData(prev => {
        const updated = { ...prev };
        delete updated[processId];
        return updated;
      });
      
      setAlertState({
        open: true,
        message: "Process log and associated media deleted successfully",
        type: "success",
        duration: 3000,
      });
      
      if (currentWeek) {
        // Regenerate the dummy data to simulate a refresh
        fetchProcessData(currentWeek);
      }
    } catch (error: any) {
      console.error("Error deleting log:", error);
      setAlertState({
        open: true,
        message: error.message || "Failed to delete process log",
        type: "error",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const weekTabs = Array.from({ length: weeksPerPage }, (_, i) => {
    const weekNumber = weekOffset + i + 1;
    if (weekNumber > TOTAL_WEEKS) return null;
    const weekStart = dayjs(projectStartDate).add((weekNumber - 1) * 7, "day");
    const weekEnd = weekStart.add(6, "day");
    const range = `${weekStart.format("MMM DD")} - ${weekEnd.format("MMM DD")}`;
    return { value: weekNumber.toString(), desc: range };
  }).filter(Boolean);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      {!projectStartDate ? (
        <Card className="max-w-md mx-auto mt-20">
          <CardContent className="p-6 text-center">
            <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-green-800 dark:text-blue-300">Loading</h2>
            <p className="text-green-700 dark:text-blue-200 mt-2">Please wait while we load your data...</p>
          </CardContent>
        </Card>
      ) : (
        <Card className="w-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-2xl">
          <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-6 rounded-t-2xl">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div>
                <CardTitle className="text-2xl font-bold text-green-900 dark:text-white flex items-center gap-3">
                  <Calendar className="text-green-600 dark:text-blue-400" />
                  Plantation Process History
                </CardTitle>
                <CardDescription className="text-green-700 dark:text-blue-200">
                  Track and monitor plantation progress (Dummy Data Demo)
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-white/30 dark:bg-black/30">
                  <Clock className="w-4 h-4 mr-1" />
                  Week {currentWeek}/{TOTAL_WEEKS}
                </Badge>
                <Button variant="outline" size="sm" onClick={handleReturnToCurrentWeek} className="bg-white/30 dark:bg-black/30">
                  <RefreshCcw className="w-4 h-4 mr-1" />
                  Current Week
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <Button
                variant="outline"
                onClick={() => {
                  const newOffset = Math.max(weekOffset - weeksPerPage, 0);
                  setWeekOffset(newOffset);
                }}
                disabled={weekOffset === 0}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  const newOffset = Math.min(weekOffset + weeksPerPage, TOTAL_WEEKS - weeksPerPage);
                  setWeekOffset(newOffset);
                }}
                disabled={weekOffset + weeksPerPage >= TOTAL_WEEKS}
                className="flex items-center gap-2"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            <Tabs value={currentWeek?.toString()} onValueChange={handleWeekChange} className="w-full">
              <TabsList className="w-full h-full overflow-hidden bg-green-50 dark:bg-gray-800 grid grid-cols-4 lg:grid-cols-7 gap-0.5 px-1 md:gap-2">
                {weekTabs.filter((tab): tab is { value: string; desc: string } => tab !== null).map(({ value, desc }) => (
                  <TabsTrigger key={value} value={value} className="p-1 md:p-2 min-w-[55px] md:min-w-[80px] text-center rounded-lg data-[state=active]:bg-green-200 dark:data-[state=active]:bg-blue-900">
                    <WeekTabHeader week={value} desc={desc} isActive={value === currentWeek?.toString()} />
                  </TabsTrigger>
                ))}
              </TabsList>
              <TabsContent value={currentWeek?.toString() || "0"} className="mt-6">
                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center h-64">
                      <Loader2 className="w-8 h-8 text-green-600 dark:text-blue-400 animate-spin" />
                      <p className="mt-4 text-green-700 dark:text-blue-200">Loading process data...</p>
                    </motion.div>
                  ) : processData.length === 0 ? (
                    <motion.div key="no-data" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-12">
                      <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-green-800 dark:text-blue-300 mb-2">
                        No Process Data Available
                      </h3>
                      <p className="text-green-700 dark:text-blue-200">
                        There are no plantation processes recorded for Week {currentWeek}
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div key="process-data" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                      <Card className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30">
                        <CardContent className="p-6">
                          <h3 className="text-xl font-semibold text-green-800 dark:text-blue-300 mb-4 flex items-center gap-2">
                            <ChartAreaIcon className="text-green-600 dark:text-blue-400" />
                            Week {currentWeek} Statistics
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            <div className="bg-green-50/50 dark:bg-gray-800/50 rounded-lg p-4">
                              <p className="text-sm text-green-700 dark:text-blue-200">Total Processes</p>
                              <p className="text-2xl font-bold text-green-800 dark:text-blue-300">{processData.length}</p>
                            </div>
                            <div className="bg-green-50/50 dark:bg-gray-800/50 rounded-lg p-4">
                              <p className="text-sm text-green-700 dark:text-blue-200">Logged Processes</p>
                              <p className="text-2xl font-bold text-green-800 dark:text-blue-300">
                                {Object.values(processlogData).filter(
                                  (log) =>
                                    log && log.processLog && log.processLog.trim() !== ""
                                ).length}
                              </p>
                            </div>
                            <div className="bg-green-50/50 dark:bg-gray-800/50 rounded-lg p-4">
                              <p className="text-sm text-green-700 dark:text-blue-200">Media Uploads</p>
                              <p className="text-2xl font-bold text-green-800 dark:text-blue-300">
                                {Object.values(processlogData).reduce((total, log) => total + (log?.media?.length || 0),0)}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <div className="space-y-6">
                        {processData.map((process) => {
                          const log = processlogData[process._id];
                          return (
                            <div key={process._id} className="space-y-6">
                              <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-bold text-green-800 dark:text-blue-300">
                                  {process.title || "Plantation Processes"}
                                </h2>
                                <Badge variant="outline" className="bg-white/30 dark:bg-black/30">
                                  {dayjs(projectStartDate).add(((currentWeek || 1) - 1) * 7, "day").format("MMMM YYYY")}
                                </Badge>
                              </div>

                              <Card>
                                <CardHeader>
                                  <CardTitle className="text-xl font-bold text-green-800 dark:text-blue-300">{process.title}</CardTitle>
                                  <CardDescription className="text-sm text-green-800 dark:text-blue-300">{process.instruction}</CardDescription>
                                </CardHeader>

                                <CardContent>
                                  {log && log.processLog && log.processLog.trim() !== "" ? (
                                    <div>
                                      <p className="mb-2">{log.processLog}</p>
                                      {log.media && log.media.length > 0 && (
                                        <div className="mt-2">
                                          <div className="flex flex-wrap gap-3">
                                            {log.media.map((item, idx) => {
                                              const fileType = item.fileName.split('.').pop()?.toLowerCase() ?? '';
                                              const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(fileType);
                                              const isVideo = ['mp4', 'mov', 'avi', 'webm'].includes(fileType);
                                              const isAudio = ['mp3', 'wav', 'ogg'].includes(fileType);
                                              const isPdf = fileType === 'pdf';

                                              return (
                                                <Dialog key={idx}>
                                                  <DialogTrigger>
                                                    <div className="flex flex-col items-center cursor-pointer">
                                                      {isImage ? (
                                                        <div className="relative group">
                                                          <img
                                                            src={item.sasUrl}
                                                            className="w-52 h-52 object-cover rounded-md"
                                                            alt={item.fileName}
                                                          />
                                                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 flex items-center justify-center rounded-md transition-all">
                                                            <ZoomIn className="text-white opacity-0 group-hover:opacity-100" />
                                                          </div>
                                                        </div>
                                                      ) : isVideo ? (
                                                        <div className="relative group">
                                                          <video
                                                            src={item.sasUrl}
                                                            className="w-52 h-52 object-cover rounded-md"
                                                          />
                                                          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center rounded-md">
                                                            <Play className="text-white" size={24} />
                                                          </div>
                                                        </div>
                                                      ) : isAudio ? (
                                                        <div className="w-52 h-52 flex items-center justify-center">
                                                          <Music className="w-12 h-12 text-green-600" />
                                                        </div>
                                                      ) : isPdf ? (
                                                        <div className="w-52 h-52 flex items-center justify-center">
                                                          <FileText className="w-12 h-12 text-red-500" />
                                                        </div>
                                                      ) : (
                                                        <div className="w-52 h-52 flex items-center justify-center">
                                                          <File className="w-12 h-12 text-gray-500" />
                                                        </div>
                                                      )}
                                                    </div>
                                                  </DialogTrigger>

                                                  <DialogContent className="sm:max-w-[80vw] max-h-[90vh] overflow-y-auto">
                                                    <DialogHeader>
                                                      <DialogTitle className="flex items-center gap-2">
                                                        {isImage ? '📷' : isVideo ? '🎥' : isAudio ? '🎵' : isPdf ? '📄' : '📎'}
                                                        {item.fileName}
                                                      </DialogTitle>
                                                    </DialogHeader>
                                                    <div className="flex justify-center items-center bg-black bg-opacity-5 rounded-lg p-4">
                                                      {isImage ? (
                                                        <img
                                                          src={item.sasUrl}
                                                          alt={item.fileName}
                                                          className="max-h-[70vh] rounded-lg shadow-lg"
                                                        />
                                                      ) : isVideo ? (
                                                        <video
                                                          src={item.sasUrl}
                                                          controls
                                                          className="max-h-[70vh] rounded-lg shadow-lg"
                                                        />
                                                      ) : isAudio ? (
                                                        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
                                                          <div className="flex items-center justify-center mb-4">
                                                            <Music className="w-16 h-16 text-green-600" />
                                                          </div>
                                                          <audio
                                                            src={item.sasUrl}
                                                            controls
                                                            className="w-full"
                                                          />
                                                        </div>
                                                      ) : isPdf ? (
                                                        <div className="text-center">
                                                          <FileText className="w-24 h-24 text-red-500 mb-4" />
                                                          <p className="text-gray-600 mb-4">PDF Document</p>
                                                          <Button
                                                            onClick={() => window.open(item.sasUrl, '_blank')}
                                                            className="bg-green-600 hover:bg-green-700"
                                                          >
                                                            Open PDF
                                                          </Button>
                                                        </div>
                                                      ) : (
                                                        <div className="text-center">
                                                          <File className="w-24 h-24 text-gray-500 mb-4" />
                                                          <Button
                                                            onClick={() => window.open(item.sasUrl, '_blank')}
                                                            className="bg-green-600 hover:bg-green-700"
                                                          >
                                                            Download File
                                                          </Button>
                                                        </div>
                                                      )}
                                                    </div>
                                                    <DialogFooter>
                                                      <Button
                                                        variant="outline"
                                                        onClick={() => window.open(item.sasUrl, '_blank')}
                                                        className="w-full sm:w-auto"
                                                      >
                                                        Open in New Tab
                                                      </Button>
                                                      <Button
                                                        variant="destructive"
                                                        onClick={() => handleMediaDelete(process, item)}
                                                        className="w-full sm:w-auto"
                                                      >
                                                        Delete Media
                                                      </Button>
                                                    </DialogFooter>
                                                  </DialogContent>
                                                </Dialog>
                                              );
                                            })}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  ) : (
                                    <div className="text-center">
                                      <p className="text-green-700 dark:text-blue-200">No log data available</p>
                                    </div>
                                  )}
                                </CardContent>
                                <CardFooter className="flex justify-end gap-2">
                                  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                                    <DialogTrigger asChild>
                                      <Button 
                                        variant="outline"
                                        onClick={() => handleOpenDialog(process)}
                                      >
                                        {log ? "Update Log" : "Add Log"}
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[80vw] max-h-[90vh] overflow-y-auto">
                                      <DialogHeader>
                                        <DialogTitle>{process.title}</DialogTitle>
                                        <DialogDescription>{process.instruction}</DialogDescription>
                                      </DialogHeader>
                                      <div className="grid gap-4 py-4">
                                        <div className="space-y-2">
                                          <label htmlFor="logText" className="block text-sm font-medium">
                                            Process Log
                                          </label>
                                          <textarea
                                            id="logText"
                                            value={logText}
                                            onChange={(e) => setLogText(e.target.value)}
                                            className="w-full h-32 p-2 border rounded"
                                            placeholder="Enter details about the process..."
                                          />
                                        </div>
                                        <div className="space-y-2">
                                          <label htmlFor="mediaUpload" className="block text-sm font-medium">
                                            Upload Media
                                          </label>
                                          <input
                                            type="file"
                                            id="mediaUpload"
                                            multiple
                                            onChange={handleMediaChange}
                                            className="w-full p-2 border rounded"
                                          />
                                        </div>
                                        {existingMedia.length > 0 && (
                                          <div className="space-y-2">
                                            <label className="block text-sm font-medium">
                                              Existing Media
                                            </label>
                                            <div className="flex flex-wrap gap-2">
                                              {existingMedia.map((media, idx) => (
                                                <div key={idx} className="relative">
                                                  <img
                                                    src={media.sasUrl}
                                                    alt={media.fileName}
                                                    className="w-20 h-20 object-cover rounded"
                                                  />
                                                  <button
                                                    onClick={() => handleMediaDelete(process, media)}
                                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                                                  >
                                                    ×
                                                  </button>
                                                </div>
                                              ))}
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                      <DialogFooter className="gap-2">
                                        {log && (
                                          <Button
                                            variant="destructive"
                                            onClick={() => handleDeleteLog(process._id)}
                                            disabled={loading}
                                          >
                                            Delete Log
                                          </Button>
                                        )}
                                        <Button
                                          onClick={() => handleLogSubmit(process._id)}
                                          disabled={loading}
                                        >
                                          {loading ? (
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                          ) : null}
                                          {log ? "Update Log" : "Create Log"}
                                        </Button>
                                      </DialogFooter>
                                    </DialogContent>
                                  </Dialog>
                                </CardFooter>
                              </Card>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 p-6 rounded-b-2xl">
            <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-white/30 dark:bg-black/30">
                  Project Start: {dayjs(projectStartDate).format("MMMM D, YYYY")}
                </Badge>
                <Badge variant="outline" className="bg-white/30 dark:bg-black/30">
                  Current Progress: {currentWeek ? Math.round((currentWeek / TOTAL_WEEKS) * 100) : 0}%
                </Badge>
              </div>
              <Button onClick={handleReturnToCurrentWeek} className="bg-green-600 hover:bg-green-700 text-white dark:bg-blue-600 dark:hover:bg-blue-700">
                <RefreshCcw className="w-4 h-4 mr-2" />
                Return to Current Week
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}

      <AnimatePresence>
        {alertState.open && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 right-4 z-50"
          >
            <Alert variant={alertState.type === "success" ? "default" : "destructive"} className="w-full max-w-xl">
              <AlertDescription>{alertState.message}</AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PlantationProcessHistory;
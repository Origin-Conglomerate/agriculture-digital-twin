import React, { useState, useEffect, useCallback, ChangeEvent } from "react";
import { useSelector } from "react-redux";
import { GET, POST, DELETE } from "../../../utils/ApiHandler";
import dayjs from "dayjs";
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
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
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
  CheckCircle,
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

const LogProcess: React.FC = () => {
  const { token, tenantId } = useSelector((state: any) => state.login);
  const projectCode = tenantId; // Use tenantId as project code

  const [currentWeek, setCurrentWeek] = useState<number | null>(null);
  const [processData, setProcessData] = useState<any[]>([]);
  const [processlogData, setProcesslogData] = useState<{ [key: string]: ProcessLog | null }>({});
  const [loading, setLoading] = useState(true);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [selectedProcess, setSelectedProcess] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [logText, setLogText] = useState("");
  const [selectedMedia, setSelectedMedia] = useState<File[]>([]);
  const [existingMedia, setExistingMedia] = useState<Media[]>([]);
  const [projectStartDate, setProjectStartDate] = useState("");
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
  const totalWeeks = 55;

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
    return Math.floor(now.diff(start, "day") / 7) + 1;
  }, []);

  useEffect(() => {
    const getProjectStartDate = async () => {
      try {
        const data = await GET(
          `${import.meta.env.VITE_API_URL}/api/v1/tenants/list?tenantId=${tenantId}`,
          token
        );
        if (data?.data?.tenants.length > 0) {
          const startDate = data.data.tenants[0].project_start_date;
          setProjectStartDate(startDate);
          const calculatedWeek = calculateCurrentWeek(startDate);
          setCurrentWeek(calculatedWeek);
          setWeekOffset(Math.floor((calculatedWeek - 1) / weeksPerPage) * weeksPerPage);
          const weekStart = dayjs(startDate).add((calculatedWeek - 1) * 7, "day");
          const weekEnd = weekStart.add(6, "day");
          setWeekRange(`${weekStart.format("MMM DD")} - ${weekEnd.format("MMM DD")}`);
        }
      } catch (error) {
        console.error("Error fetching project start date:", error);
        setAlertState({ open: true, message: "Failed to fetch project start date", type: "error", duration: 3000, });
      }
    };
    getProjectStartDate();
  }, [token, tenantId, calculateCurrentWeek, weeksPerPage]);

  const fetchProcessData = useCallback(async (week: number) => {
    try {
      setLoading(true);
      const response = await GET(
        `${import.meta.env.VITE_API_URL}/api/v1/process/history?week=${week}&project_code=${projectCode}`,
        token
      );
      setProcessData(response.data.process || []);
    } catch (error) {
      console.error("Error fetching process data:", error);
      setAlertState({ open: true, message: "Failed to fetch process data", type: "error", duration: 3000, });
    } finally {
      setLoading(false);
    }
  }, [token, projectCode]);

  const fetchProcesslogData = useCallback(async (processId: string, week: number) => {
    try {
      const response = await GET(
        `${import.meta.env.VITE_API_URL}/api/v1/processlogs/history?processId=${processId}&tenantId=${tenantId}&week=${week}`,
        token
      );
      if (response.success) {
        setProcesslogData(prev => ({
          ...prev,
          [processId]: response.data.processlog[0] || null,
        }));
      }
    } catch (error) {
      console.error("Error fetching process log data:", error);
      setAlertState({ open: true, message: "Failed to fetch process log data", type: "error", duration: 3000, });
    }
  }, [token, tenantId]);

  useEffect(() => {
    if (currentWeek !== null) {
      fetchProcessData(currentWeek);
    }
  }, [currentWeek, fetchProcessData]);

  useEffect(() => {
    if (currentWeek !== null && processData.length > 0) {
      processData.forEach(process => {
        fetchProcesslogData(process._id, currentWeek);
      });
    }
  }, [currentWeek, processData, fetchProcesslogData]);

  const handleWeekChange = (week: string) => {
    const weekNumber = parseInt(week, 10);
    setCurrentWeek(weekNumber);
    fetchProcessData(weekNumber);
  };

  const handleReturnToCurrentWeek = useCallback(() => {
    if (projectStartDate) {
      const currentWeekNumber = calculateCurrentWeek(projectStartDate);
      setCurrentWeek(currentWeekNumber);
      setWeekOffset(Math.floor((currentWeekNumber - 1) / weeksPerPage) * weeksPerPage);
      fetchProcessData(currentWeekNumber);
    }
  }, [projectStartDate, calculateCurrentWeek, fetchProcessData, weeksPerPage]);

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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/processlogs/delete-media`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          processId: process._id,
          blobName: media.blobName,
          tenantId,
          week_number: currentWeek?.toString() || ""
        })
      });

      const data = await response.json();

      if (data.success) {
        setExistingMedia(prevMedia => prevMedia.filter(m => m.blobName !== media.blobName));

        if (data.data?.updatedProcessLog?.[0]) {
          setProcesslogData(prev => ({
            ...prev,
            [process._id]: data.data.updatedProcessLog[0]
          }));
        } else {
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
        }

        setAlertState({
          open: true,
          message: "Media deleted successfully",
          type: "success",
          duration: 3000,
        });
      } else {
        throw new Error(data.message || 'Failed to delete media');
      }
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
      const formData = new FormData();
      formData.append("processId", processId);
      formData.append("tenantId", tenantId);
      formData.append("week_number", currentWeek?.toString() || "");
      formData.append("process_week_range", weekRange);
      formData.append("processLog", logText);

      if (selectedMedia.length > 0) {
        selectedMedia.forEach((file) => {
          formData.append("files", file);
        });
      }

      const isUpdate = !!processlogData[processId];
      if (isUpdate) {
        formData.append("isUpdate", "true");
      }

      const url = isUpdate
        ? `${import.meta.env.VITE_API_URL}/api/v1/processlogs/update`
        : `${import.meta.env.VITE_API_URL}/api/v1/processlogs/create`;

      const response = await fetch(url, {
        method: isUpdate ? "PUT" : "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.message || "Failed to update process log");
      }

      if (json.success) {
        setAlertState({
          open: true,
          message: isUpdate ? "Process log updated successfully" : "Process log created successfully",
          type: "success",
          duration: 3000,
        });
        await fetchProcesslogData(processId, currentWeek as number);
        handleCloseDialog();
      } else {
        throw new Error(json.message || "Failed to update process log");
      }
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
      const response = await DELETE(
        `${import.meta.env.VITE_API_URL}/api/v1/processlogs/delete/${processId}`,
        {
          processId,
          tenantId,
          week_number: currentWeek?.toString() || ""
        },
        token
      );

      if (response.success) {
        setAlertState({
          open: true,
          message: "Process log and associated media deleted successfully",
          type: "success",
          duration: 3000,
        });
        setProcesslogData(prev => {
          const updated = { ...prev };
          delete updated[processId];
          return updated;
        });
        if (currentWeek) {
          await fetchProcessData(currentWeek);
        }
      } else {
        throw new Error(response.message || "Failed to delete process log");
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
    if (weekNumber > totalWeeks) return null;
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
                  Plantation Log Process
                </CardTitle>
                <CardDescription className="text-green-700 dark:text-blue-200">
                  Track and monitor plantation log progress
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-white/30 dark:bg-black/30">
                  <Clock className="w-4 h-4 mr-1" />
                  Week {currentWeek}/{totalWeeks}
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
                  const newWeek = newOffset + 1;
                  setCurrentWeek(newWeek);
                  fetchProcessData(newWeek);
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
                  const newOffset = Math.min(weekOffset + weeksPerPage, totalWeeks - weeksPerPage);
                  setWeekOffset(newOffset);
                  const newWeek = newOffset + 1;
                  setCurrentWeek(newWeek);
                  fetchProcessData(newWeek);
                }}
                disabled={weekOffset + weeksPerPage >= totalWeeks}
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
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                              <p className="text-sm text-green-700 dark:text-blue-200">Completion Rate</p>
                              <p className="text-2xl font-bold text-green-800 dark:text-blue-300">
                                {processData.length > 0
                                  ? Math.round(
                                    (Object.values(processlogData).filter(
                                      (log) =>
                                        log && log.processLog && log.processLog.trim() !== ""
                                    ).length / processData.length) * 100
                                  )
                                  : 0}
                                %
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <div className="space-y-6">
                        {processData.map((process) => {
                          const log = processlogData[process._id];
                          return (   
                            <div className="space-y-6">    
                              <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-bold text-green-800 dark:text-blue-300">
                                  {process.title || "Plantation Processes"}
                                </h2>
                                <Badge variant="outline" className="bg-white/30 dark:bg-black/30">
                                  {dayjs(projectStartDate).add(((currentWeek || 1) - 1) * 7, "day").format("MMMM YYYY")}
                                </Badge>
                              </div>
                            
                              <Card key={process._id}>
                                <CardHeader>
                                  <CardTitle className="text-xl font-bold text-green-800 dark:text-blue-300">{process.subtitle}</CardTitle>
                                  <CardTitle className="text-sm text-green-800 dark:text-blue-300">{process.instruction}</CardTitle>
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
                                                    <div className="flex flex-col items-center  cursor-pointer">
                                                      {isImage ? (
                                                        <div className="relative group">
                                                          <img
                                                            src={item.sasUrl}
                                                            className="w-52 h-52 object-cover rounded-md"
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
                                                    </DialogFooter>
                                                  </DialogContent>
                                                </Dialog>
                                              );
                                            })}
                                          </div>
                                        </div>
                                      )}
                                      <div className="flex gap-2 mt-2">
                                        <Button variant="outline" size="sm" onClick={() => handleOpenDialog(process)}>
                                          Update Log
                                        </Button>
                                        <Button variant="destructive" size="sm" onClick={() => handleDeleteLog(process._id)}>
                                          Delete Log
                                        </Button>
                                      </div>
                                    </div>
                                  ) : (
                                    <Button variant="outline" size="sm" onClick={() => handleOpenDialog(process)}>
                                      Add Log
                                    </Button>
                                  )}
                                </CardContent>
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
                  Current Progress: {currentWeek ? Math.round((currentWeek / totalWeeks) * 100) : 0}%
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

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md overflow-y-scroll max-h-screen">
          <DialogHeader>
            <DialogTitle>
              {selectedProcess &&
                processlogData[selectedProcess._id] &&
                processlogData[selectedProcess._id]?.processLog?.trim() !== ""
                ? "Update Log"
                : "Add Log"}
            </DialogTitle>
            <DialogDescription>
              Enter a description for the process log and attach media if needed. You may also add new media.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <textarea
              className="w-full p-2 border rounded-md text-black"
              rows={4}
              value={logText}
              onChange={(e) => setLogText(e.target.value)}
              placeholder="Enter your process log..."
              disabled={uploadLoading}
            />
          </div>
          <label className="block text-sm font-medium mb-1">Existing Media</label>
          {existingMedia.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {existingMedia.map((media, idx) => {
                const isImage = isImageFile(media.fileName);
                const isVideo = /\.(mp4|mov|avi|webm)$/i.test(media.fileName);
                const isAudio = /\.(mp3|wav|ogg|m4a)$/i.test(media.fileName);
                const isPdf = /\.pdf$/i.test(media.fileName);

                return (
                  <div key={idx} className="flex flex-col items-center relative group">
                    <button
                      type="button"
                      onClick={async (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (selectedProcess) {
                          await handleMediaDelete(selectedProcess, media);
                        }
                      }}
                      className="absolute -right-2 -top-2 z-10 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-600 focus:outline-none opacity-0 group-hover:opacity-100 transition-opacity"
                      disabled={uploadLoading}
                    >
                      ×
                    </button>
                    {isImage ? (
                      <img
                        src={media.sasUrl}
                        alt={media.fileName}
                        className="w-32 h-28 object-cover rounded"
                      />
                    ) : isVideo ? (
                      <video
                        src={media.sasUrl}
                        className="w-32 h-28 object-cover rounded"
                        controls
                      />
                    ) : isAudio ? (
                      <audio
                        src={media.sasUrl}
                        className="w-28"
                        controls
                      />
                    ) : isPdf ? (
                      <div className="w-32 h-28 border rounded flex items-center justify-center bg-gray-50">
                        <FileIcon className="w-8 h-8 text-gray-400" />
                      </div>
                    ) : (
                      <Badge variant="outline" className="px-2 py-1">
                        {media.fileName}
                      </Badge>
                    )}
                    <span className="text-xs mt-1 truncate w-20 text-center">
                      {media.fileName}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No media attached.</p>
          )}
          <div>
            <label className="block text-sm font-medium mb-1">Add More Media</label>
            <input
              type="file"
              multiple
              onChange={(e) => {
                const files = e.target.files ? Array.from(e.target.files) : [];
                setSelectedMedia(files);
              }}
              className="block w-full text-sm"
              accept="image/*,video/*,audio/*,application/pdf"
              disabled={uploadLoading}
            />
            {selectedMedia.length > 0 && (
              <div className="mt-2">
                <p className="text-sm font-medium mb-1">New files:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedMedia.map((file, index) => {
                    const isImage = file.type.startsWith('image/');
                    const isVideo = file.type.startsWith('video/');
                    const isAudio = file.type.startsWith('audio/');
                    const isPdf = file.type === 'application/pdf';

                    return (
                      <div key={index} className="flex flex-col items-center">
                        {isImage ? (
                          <img
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            className="w-36 h-32 object-cover rounded"
                          />
                        ) : isVideo ? (
                          <video
                            src={URL.createObjectURL(file)}
                            className="w-32 h-40 object-cover rounded"
                            controls
                          />
                        ) : isAudio ? (
                          <audio
                            src={URL.createObjectURL(file)}
                            className="w-20"
                            controls
                          />
                        ) : isPdf ? (
                          <div className="w-20 h-20 border rounded flex items-center justify-center bg-gray-50">
                            <FileIcon className="w-8 h-8 text-gray-400" />
                          </div>
                        ) : (
                          <Badge variant="outline" className="px-2 py-1">
                            {file.name}
                          </Badge>
                        )}
                        <span className="text-xs mt-1 truncate w-20 text-center">
                          {file.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          <DialogFooter className="mt-4 flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={handleCloseDialog} disabled={uploadLoading}>
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={() => selectedProcess && handleLogSubmit(selectedProcess._id)}
              disabled={uploadLoading || (!logText.trim() && selectedMedia.length === 0 && existingMedia.length === 0)}
            >
              {uploadLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </DialogFooter>
          <DialogClose />
        </DialogContent>
      </Dialog>

      {/* Alert Notifications */}
      <AnimatePresence>
        {alertState.open && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 right-4 z-50"
          >
            <Alert variant={alertState.type === "success" ? "default" : "destructive"} className="w-full max-w-xl">
              {alertState.type === "success" ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
              <AlertTitle>{alertState.type === "success" ? "Success" : "Error"}</AlertTitle>
              <AlertDescription>{alertState.message}</AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LogProcess;
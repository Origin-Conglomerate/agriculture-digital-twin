import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { 
  DropletIcon, 
  StopCircle, 
  PlayCircle, 
  Droplet, 
  Clock, 
  AlertCircle,
  Settings2,
  Activity
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Valve {
  name: string;
  config: {
    method: string;
    hours?: number;
    minutes?: number;
    volume?: number;
  };
}

const ControlPanel = () => {
  const { toast } = useToast();
  
  // Main state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [valves, setValves] = useState<Valve[]>([]);
  
  // UI state
  const [selectedValve, setSelectedValve] = useState<Valve | null>(null);
  const [method, setMethod] = useState("Time-based");
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [volume, setVolume] = useState(0);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [valveStatus, setValveStatus] = useState("No Valve Selected");

  // Dummy data for valves
  const dummyValves: Valve[] = [
    {
      name: "Valve 1 - Front Garden",
      config: {
        method: "Time-based",
        hours: 1,
        minutes: 30
      }
    },
    {
      name: "Valve 2 - Back Garden",
      config: {
        method: "Volume-based",
        volume: 500
      }
    },
    {
      name: "Valve 3 - Vegetable Patch",
      config: {
        method: "Time-based",
        hours: 0,
        minutes: 45
      }
    },
    {
      name: "Valve 4 - Orchard",
      config: {
        method: "Volume-based",
        volume: 1000
      }
    }
  ];

  useEffect(() => {
    // Simulate loading data
    setIsLoading(true);
    setTimeout(() => {
      setValves(dummyValves);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleValveSelect = (valve: Valve) => {
    setSelectedValve(valve);
    setMethod(valve.config.method || "Time-based");
    setHours(valve.config.hours || 0);
    setMinutes(valve.config.minutes || 0);
    setVolume(valve.config.volume || 0);
    updateValveStatus(valve);
  };

  const updateValveStatus = (valve: Valve) => {
    if (valve.config.method === "Time-based") {
      setValveStatus(valve.config.hours > 0 || valve.config.minutes > 0 ? "Running" : "Stopped");
    } else if (valve.config.method === "Volume-based") {
      setValveStatus(valve.config.volume > 0 ? "Running" : "Stopped");
    }
  };

  const handleStartIrrigation = async () => {
    if (!selectedValve) {
      handleAlert("Please select a valve");
      return;
    }

    try {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Update the selected valve in our dummy data
      const updatedValves = valves.map(valve => {
        if (valve.name === selectedValve.name) {
          const updatedValve = {
            ...valve,
            config: {
              method,
              ...(method === "Time-based" ? { hours, minutes } : {}),
              ...(method === "Volume-based" ? { volume } : {})
            }
          };
          return updatedValve;
        }
        return valve;
      });
      
      setValves(updatedValves);
      
      // Update the selected valve reference
      const newSelectedValve = updatedValves.find(v => v.name === selectedValve.name);
      if (newSelectedValve) {
        setSelectedValve(newSelectedValve);
        updateValveStatus(newSelectedValve);
      }
      
      handleAlert("Valve Started Successfully");
    } catch (error) {
      handleAlert("Failed to start valve");
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to start valve"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStopIrrigation = async () => {
    if (!selectedValve) {
      handleAlert("Please select a valve");
      return;
    }

    try {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Update the selected valve in our dummy data to stop it
      const updatedValves = valves.map(valve => {
        if (valve.name === selectedValve.name) {
          const updatedValve = {
            ...valve,
            config: {
              method: valve.config.method,
              ...(valve.config.method === "Time-based" ? { hours: 0, minutes: 0 } : {}),
              ...(valve.config.method === "Volume-based" ? { volume: 0 } : {})
            }
          };
          return updatedValve;
        }
        return valve;
      });
      
      setValves(updatedValves);
      
      // Update the selected valve reference
      const newSelectedValve = updatedValves.find(v => v.name === selectedValve.name);
      if (newSelectedValve) {
        setSelectedValve(newSelectedValve);
        updateValveStatus(newSelectedValve);
      }
      
      handleAlert("Valve Stopped Successfully");
    } catch (error) {
      handleAlert("Failed to stop valve");
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to stop valve"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAlert = (message: string) => {
    setAlertMessage(message);
    setAlertOpen(true);
  };

  const isValveRunning = valveStatus === "Running";

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-2xl hover:shadow-green-100/50 transition-all duration-300 ease-in-out">
      <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-6 rounded-t-2xl">
        <div className="lg:flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl font-bold text-green-900 dark:text-white flex items-center gap-3">
              <Settings2 className="text-green-600 dark:text-blue-400" />
              Irrigation Control Center
            </CardTitle>
            <CardDescription className="text-green-700 dark:text-blue-200">
              Smart valve management and monitoring system
            </CardDescription>
          </div>
          <Badge 
            variant={isValveRunning ? "default" : "secondary"}
            className="bg-black dark:bg-white items-center gap-2"
          >
            {isValveRunning ? (
              <Activity className="w-4 h-4 text-green-500" />
            ) : (
              <StopCircle className="w-4 h-4 text-red-500" />
            )}
            {valveStatus}
          </Badge>
        </div>
      </CardHeader>
        
      <CardContent className="p-6 space-y-6">
      {isLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[200px] gap-4">
            <span className="loading loading-spinner loading-lg text-purple-600"></span>
            <p className="text-purple-700 dark:text-purple-200">Fetching/Updating Irrigation data...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center gap-4 py-8">
            <AlertCircle className="w-8 h-8 text-red-500" />
            <p className="text-red-500 text-center">{error}</p>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select onValueChange={(value) => {
                const selectedValve = valves.find(valve => valve.name === value)
                if (selectedValve) handleValveSelect(selectedValve)
              }}>
                <SelectTrigger className="w-full bg-white/50 dark:bg-gray-800/50 border-green-100 dark:border-blue-900/50">
                  <SelectValue placeholder="Select Valve" />
                </SelectTrigger>
                <SelectContent>
                  {valves.map((valve) => (
                    <SelectItem key={valve.name} value={valve.name} className="flex items-center gap-2">
                      <DropletIcon className="w-4 h-4 text-green-600 dark:text-blue-400" />
                      <span>{valve.name} - {valve.config.method}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={method} onValueChange={setMethod}>
                <SelectTrigger className="w-full bg-white/50 dark:bg-gray-800/50 border-green-100 dark:border-blue-900/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Time-based" className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-green-600 dark:text-blue-400" />
                    Time-based
                  </SelectItem>
                  <SelectItem value="Volume-based" className="flex items-center gap-2">
                    <Droplet className="w-4 h-4 text-green-600 dark:text-blue-400" />
                    Volume-based
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={method}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg border border-green-100/50 dark:border-blue-900/50"
              >
                {method === "Time-based" ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm text-green-700 dark:text-blue-200">Hours</label>
                      <Input 
                        type="number" 
                        placeholder="Hours" 
                        value={hours} 
                        onChange={(e) => setHours(Number(e.target.value))}
                        className="bg-white/70 dark:bg-gray-900/70 border-green-100 dark:border-blue-900/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-green-700 dark:text-blue-200">Minutes</label>
                      <Input 
                        type="number" 
                        placeholder="Minutes" 
                        value={minutes} 
                        onChange={(e) => setMinutes(Number(e.target.value))}
                        className="bg-white/70 dark:bg-gray-900/70 border-green-100 dark:border-blue-900/50"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <label className="text-sm text-green-700 dark:text-blue-200">Volume (liters)</label>
                    <Input 
                      type="number" 
                      placeholder="Volume (liters)" 
                      value={volume} 
                      onChange={(e) => setVolume(Number(e.target.value))}
                      className="bg-white/70 dark:bg-gray-900/70 border-green-100 dark:border-blue-900/50"
                    />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <motion.div 
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  className="w-auto bg-gradient-to-r from-green-500 to-green-600 dark:from-blue-600 dark:to-blue-700 hover:from-green-600 hover:to-green-700 dark:hover:from-blue-700 dark:hover:to-blue-800 text-white" 
                  onClick={handleStartIrrigation}
                >
                  <PlayCircle className="mr-2 w-5 h-5" />
                  {isValveRunning ? "Modify Config" : "Start Irrigation"}
                </Button>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  variant="outline" 
                  className="w-full border-2 border-red-200 dark:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-900/20" 
                  onClick={handleStopIrrigation}
                >
                  <StopCircle className="mr-2 w-5 h-5 text-red-500" />
                  Stop Irrigation
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </CardContent>

      <Dialog open={alertOpen} onOpenChange={setAlertOpen}>
        <DialogContent className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30">
          <DialogHeader>
            <DialogTitle className="flex items-center text-green-900 dark:text-white">
              <AlertCircle className="mr-2 w-5 h-5 text-yellow-500" />
              Irrigation Alert
            </DialogTitle>
            <DialogDescription className="text-green-700 dark:text-blue-200">
              {alertMessage}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              onClick={() => setAlertOpen(false)}
              className="bg-gradient-to-r from-green-500 to-green-600 dark:from-blue-600 dark:to-blue-700"
            >
              Okay
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

export default ControlPanel
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
  Beaker,
  StopCircle, 
  PlayCircle, 
  Settings2,
  Activity,
  AlertCircle,
  Check,
  X
} from "lucide-react"
import { GET, POST } from '@/utils/ApiHandler'
import { useSelector } from 'react-redux'
import { useToast } from "@/hooks/use-toast"
import { Checkbox } from "@/components/ui/checkbox"

interface TenantData {
    irrigation_system_username: string;
    irrigation_system_password: string;
  }
  
  interface FertigationValve {
    name: string;
    config: {
      soak: string;
      c1volflag: boolean;
      c2volflag: boolean;
      c3volflag: boolean;
      c4volflag: boolean;
      c1time: string;
      c1vol: string;
      c2time: string;
      c2vol: string;
      c3time: string;
      c3vol: string;
      c4time: string;
      c4vol: string;
      cycles: string;
    };
  }
  
  const FertigationScheduling = () => {
    const { token, tenantId } = useSelector((state: { login: { token: string; tenantId: string } }) => state.login);
    const { toast } = useToast();
  
    // Main states
    const [isLoading, setIsLoading] = useState(false);
    const [tenantData, setTenantData] = useState<TenantData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [fertigationValves, setFertigationValves] = useState<FertigationValve[]>([]);
    const [selectedValve, setSelectedValve] = useState<FertigationValve | null>(null);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
  
    // Config states
    const [soak, setSoak] = useState("");
    const [cycles, setCycles] = useState("");
    const [c1volflag, setC1volflag] = useState(false);
    const [c2volflag, setC2volflag] = useState(false);
    const [c3volflag, setC3volflag] = useState(false);
    const [c4volflag, setC4volflag] = useState(false);
    const [c1time, setC1time] = useState("");
    const [c1vol, setC1vol] = useState("");
    const [c2time, setC2time] = useState("");
    const [c2vol, setC2vol] = useState("");
    const [c3time, setC3time] = useState("");
    const [c3vol, setC3vol] = useState("");
    const [c4time, setC4time] = useState("");
    const [c4vol, setC4vol] = useState("");
  
    const fetchTenantData = async () => {
      try {
        const response = await GET(`${import.meta.env.VITE_API_URL}/api/v1/tenants/list?tenantId=${tenantId}`, token);
        
        if (response.success && response.data.tenants.length > 0) {
          const tenant = response.data.tenants[0];
          if (!tenant.irrigation_system_username || !tenant.irrigation_system_password) {
            throw new Error('Irrigation system not setup for this plot');
          }
          return tenant;
        } else {
          throw new Error('Failed to fetch tenant data');
        }
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Error fetching tenant data');
      }
    };
  
    const getFertigationValves = async (tenant: TenantData) => {
      try {
        const response = await POST(
          `${import.meta.env.VITE_API_URL}/api/v1/fertigation/profiles/fertigationValves`,
          { tenantData: tenant },
          token
        );
  
        if (!response.data.fertigationValves?.length) {
          throw new Error('No fertigation valves found');
        }
  
        return response.data.fertigationValves;
      } catch (error) {
        throw new Error('Error fetching fertigation valves');
      }
    };
  
    useEffect(() => {
      const initializeData = async () => {
        setIsLoading(true);
        setError(null);
        
        try {
          // First fetch tenant data
          const tenant = await fetchTenantData();
          setTenantData(tenant);
  
          // Only after tenant data is fetched and set, fetch valves
          const valves = await getFertigationValves(tenant);
          setFertigationValves(valves);
        } catch (error) {
          setError(error instanceof Error ? error.message : 'An error occurred');
          toast({
            variant: "destructive",
            title: "Error",
            description: error instanceof Error ? error.message : 'An error occurred'
          });
        } finally {
          setIsLoading(false);
        }
      };
  
      initializeData();
    }, [token, tenantId]);
  
    const handleValveSelect = (valve: FertigationValve) => {
      setSelectedValve(valve);
      setSoak(valve.config.soak);
      setCycles(valve.config.cycles);
      setC1volflag(valve.config.c1volflag);
      setC2volflag(valve.config.c2volflag);
      setC3volflag(valve.config.c3volflag);
      setC4volflag(valve.config.c4volflag);
      setC1time(valve.config.c1time);
      setC1vol(valve.config.c1vol);
      setC2time(valve.config.c2time);
      setC2vol(valve.config.c2vol);
      setC3time(valve.config.c3time);
      setC3vol(valve.config.c3vol);
      setC4time(valve.config.c4time);
      setC4vol(valve.config.c4vol);
    };
  
    const handleUpdateConfig = async () => {
      if (!selectedValve || !tenantData) {
        handleAlert("Please select a valve and ensure tenant data is available");
        return;
      }
  
      setIsLoading(true);
      try {
        const payload = {
          valveName: selectedValve.name,
          tenantData,
          config: {
            soak,
            cycles,
            c1volflag,
            c2volflag,
            c3volflag,
            c4volflag,
            c1time,
            c1vol,
            c2time,
            c2vol,
            c3time,
            c3vol,
            c4time,
            c4vol
          }
        };
  
        const response = await POST(
          `${import.meta.env.VITE_API_URL}/api/v1/fertigation/update-fertigationconfig`,
          payload,
          token
        );
  
        if (response.success) {
          handleAlert("Configuration Updated Successfully");
          // Refresh valve data after successful update
          const valves = await getFertigationValves(tenantData);
          setFertigationValves(valves);
        } else {
          throw new Error("Failed to Update Configuration");
        }
      } catch (error) {
        handleAlert(error instanceof Error ? error.message : "Failed to update configuration");
      } finally {
        setIsLoading(false);
      }
    };
  
    const handleAlert = (message: string) => {
      setAlertMessage(message);
      setAlertOpen(true);
    };

//   if (isLoading) {
//     return (
//       <Card className="w-full max-w-4xl mx-auto">
//         <CardContent className="p-6">
//           <div className="flex items-center justify-center">
//             <span className="loading loading-spinner loading-lg"></span>
//           </div>
//         </CardContent>
//       </Card>
//     );
//   }

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-2xl hover:shadow-green-100/50 transition-all duration-300 ease-in-out">
      <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-6 rounded-t-2xl">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl font-bold text-purple-900 dark:text-white flex items-center gap-3">
              <Beaker className="text-purple-600 dark:text-purple-400" />
              Fertigation Control Center
            </CardTitle>
            <CardDescription className="text-purple-700 dark:text-purple-200">
              Smart fertigation valve management system
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
      {isLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[200px] gap-4">
            <span className="loading loading-spinner loading-lg text-purple-600"></span>
            <p className="text-purple-700 dark:text-purple-200">Fetching/Updating fertigation data...</p>
          </div>
        ) :error ? (
          <div className="flex flex-col items-center justify-center gap-4 py-8">
            <AlertCircle className="w-8 h-8 text-red-500" />
            <p className="text-red-500 text-center">{error}</p>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Select onValueChange={(value) => {
              const selectedValve = fertigationValves.find(valve => valve.name === value);
              if (selectedValve) handleValveSelect(selectedValve);
            }}>
              <SelectTrigger className="w-full bg-white/50 dark:bg-gray-800/50 border-purple-100 dark:border-purple-900/50">
                <SelectValue placeholder="Select Fertigation Valve" />
              </SelectTrigger>
              <SelectContent>
                {fertigationValves.map((valve) => (
                  <SelectItem key={valve.name} value={valve.name}>
                    <span className="flex items-center gap-2">
                      <Beaker className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      {valve.name}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedValve && (
              <AnimatePresence mode="wait">
                <motion.div
                  key="config-form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm text-purple-700 dark:text-purple-200">Soak Time (minutes)</label>
                      <Input
                        type="number"
                        value={soak}
                        onChange={(e) => setSoak(e.target.value)}
                        className="bg-white/70 dark:bg-gray-900/70"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-purple-700 dark:text-purple-200">Number of Cycles</label>
                      <Input
                        type="number"
                        value={cycles}
                        onChange={(e) => setCycles(e.target.value)}
                        className="bg-white/70 dark:bg-gray-900/70"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((cycleNum) => (
                      <div key={cycleNum} className="space-y-4 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold text-purple-700 dark:text-purple-200">
                            Cycle {cycleNum}
                          </h3>
                          <div className="flex items-center gap-2">
                            <Checkbox
                              checked={eval(`c${cycleNum}volflag`)}
                              onCheckedChange={(checked) => {
                                switch(cycleNum) {
                                  case 1: setC1volflag(!!checked); break;
                                  case 2: setC2volflag(!!checked); break;
                                  case 3: setC3volflag(!!checked); break;
                                  case 4: setC4volflag(!!checked); break;
                                }
                              }}
                            />
                            <label>Volume-based</label>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm">Time (minutes)</label>
                            <Input
                              type="number"
                              value={eval(`c${cycleNum}time`)}
                              onChange={(e) => {
                                switch(cycleNum) {
                                  case 1: setC1time(e.target.value); break;
                                  case 2: setC2time(e.target.value); break;
                                  case 3: setC3time(e.target.value); break;
                                  case 4: setC4time(e.target.value); break;
                                }
                              }}
                              disabled={eval(`c${cycleNum}volflag`)}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm">Volume (liters)</label>
                            <Input
                              type="number"
                              value={eval(`c${cycleNum}vol`)}
                              onChange={(e) => {
                                switch(cycleNum) {
                                  case 1: setC1vol(e.target.value); break;
                                  case 2: setC2vol(e.target.value); break;
                                  case 3: setC3vol(e.target.value); break;
                                  case 4: setC4vol(e.target.value); break;
                                }
                              }}
                              disabled={!eval(`c${cycleNum}volflag`)}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white"
                      onClick={handleUpdateConfig}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="loading loading-spinner loading-sm" />
                      ) : (
                        <>
                          <Settings2 className="mr-2 w-5 h-5" />
                          Update Configuration
                        </>
                      )}
                    </Button>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            )}
          </motion.div>
        )}
      </CardContent>

      <Dialog open={alertOpen} onOpenChange={setAlertOpen}>
        <DialogContent className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-2 border-purple-100/50 dark:border-purple-900/30">
          <DialogHeader>
            <DialogTitle className="flex items-center text-purple-900 dark:text-white">
              <AlertCircle className="mr-2 w-5 h-5 text-yellow-500" />
              Fertigation Alert
            </DialogTitle>
            <DialogDescription className="text-purple-700 dark:text-purple-200">
              {alertMessage}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              onClick={() => setAlertOpen(false)}
              className="bg-gradient-to-r from-purple-500 to-purple-600"
            >
              Okay
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default FertigationScheduling;
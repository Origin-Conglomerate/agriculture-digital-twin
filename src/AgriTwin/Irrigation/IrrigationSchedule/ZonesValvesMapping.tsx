import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Layers, 
  Workflow, 
  RefreshCw, 
  AlertCircle, 
  CheckCircle2,
  Filter,
  Download,
  Upload,
  Settings2,
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { GET } from '@/utils/ApiHandler';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

export default function ZonesValvesMapping() {
  
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isConfiguring, setIsConfiguring] = useState(false);
  const { token, tenantId } = useSelector((state) => state.login);

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      const data = await GET(
        `${import.meta.env.VITE_API_URL}/api/v1/irrigation/tenantIrrigationProf?project_code=${tenantId}`, 
        token
      );
      
      if (data.success) {
        setProfiles(data.data);
        setError(null);
        toast({
          title: "Success",
          description: "Profiles updated successfully",
          variant: "default",
        });
      } else {
        throw new Error("Failed to fetch irrigation profiles");
      }
    } catch (error) {
      console.error("Error fetching profiles:", error);
      setError(error.message);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, [token, tenantId]);

  const calculateZoneStats = (zonesValvesMapping) => {
    const totalZones = Object.keys(zonesValvesMapping).length;
    const activeZones = Object.values(zonesValvesMapping).filter(valve => valve !== null).length;
    
    return {
      totalZones,
      activeZones,
      inactiveZones: totalZones - activeZones,
      efficiency: ((activeZones / totalZones) * 100).toFixed(1)
    };
  };

  const filteredProfiles = profiles.filter(profile => {
    const matchesSearch = profile._id.toLowerCase().includes(searchTerm.toLowerCase());
    const stats = calculateZoneStats(profile.zonesValvesMapping);
    
    if (filterStatus === 'active') {
      return matchesSearch && stats.activeZones === stats.totalZones;
    } else if (filterStatus === 'inactive') {
      return matchesSearch && stats.inactiveZones > 0;
    }
    return matchesSearch;
  });

  const exportToCSV = () => {
    const csvContent = profiles.map(profile => {
      const stats = calculateZoneStats(profile.zonesValvesMapping);
      return `${profile._id},${stats.totalZones},${stats.activeZones},${stats.efficiency}%`;
    }).join('\n');
    
    const blob = new Blob([`ID,Total Zones,Active Zones,Efficiency\n${csvContent}`], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'zones-mapping.csv';
    a.click();
  };

  return (
    // <motion.div
    //   initial={{ opacity: 0, y: 20 }}
    //   animate={{ opacity: 1, y: 0 }}
    //   transition={{ duration: 0.5 }}
    //   className="p-4 md:p-8"
    // >
      <Card className="w-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-2xl hover:shadow-green-100/50 transition-all duration-300 ease-in-out">
        <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-6 rounded-t-2xl">
          <div className="lg:flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle className="text-2xl font-bold text-green-900 dark:text-white flex items-center gap-3">
                <MapPin className="text-green-600 dark:text-blue-400" />
                Zones & Valves Mapping
              </CardTitle>
              <CardDescription className="text-green-700 dark:text-blue-200">
                Comprehensive irrigation zone configuration
              </CardDescription>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={fetchProfiles}
                disabled={loading}
                className="bg-white/30 dark:bg-black/30 hover:bg-green-100 dark:hover:bg-blue-900"
              >
                <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} /> 
                Refresh
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={exportToCSV}
                className="bg-white/30 dark:bg-black/30 hover:bg-green-100 dark:hover:bg-blue-900"
              >
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Badge variant="outline" className="bg-white/30 dark:bg-black/30">
                {profiles.length} Profiles
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-green-600 dark:text-blue-400" />
              <Input
                placeholder="Search profiles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/50 dark:bg-gray-800/50"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px] bg-white/50 dark:bg-gray-800/50">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Profiles</SelectItem>
                <SelectItem value="active">Fully Active</SelectItem>
                <SelectItem value="inactive">Has Inactive Zones</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((_, index) => (
                <Skeleton key={index} className="h-[100px] w-full bg-green-100/20 dark:bg-blue-900/20" />
              ))}
            </div>
          ) : error ? (
            <Alert variant="destructive" className="bg-red-50/50 dark:bg-red-900/20">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : filteredProfiles.length === 0 ? (
            <Alert className="bg-yellow-50/50 dark:bg-yellow-900/20">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>No Configurations Found</AlertTitle>
              <AlertDescription>
                No irrigation profiles match your current filters.
              </AlertDescription>
            </Alert>
          ) : (
            <AnimatePresence>
              <Table>
                <TableHeader className="bg-green-50 dark:bg-gray-800">
                  <TableRow>
                    <TableHead className="w-[200px]">Profile ID</TableHead>
                    <TableHead>Total Zones</TableHead>
                    <TableHead>Active Zones</TableHead>
                    <TableHead>Efficiency</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProfiles.map((profile) => {
                    const zoneStats = calculateZoneStats(profile.zonesValvesMapping);
                    return (
                      <motion.tr
                        key={profile._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="hover:bg-green-50/50 dark:hover:bg-blue-900/20 transition-colors"
                      >
                        <TableCell className="font-medium">
                          {profile._id.slice(-6)}
                        </TableCell>
                        <TableCell>{zoneStats.totalZones}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={zoneStats.activeZones === zoneStats.totalZones ? "default" : "outline"}
                            className="flex items-center gap-2"
                          >
                            {zoneStats.activeZones === zoneStats.totalZones ? (
                              <CheckCircle2 className="w-4 h-4" />
                            ) : null}
                            {zoneStats.activeZones}/{zoneStats.totalZones}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={parseInt(zoneStats.efficiency) > 80 ? "success" : "warning"}
                            className="bg-green-100 dark:bg-blue-900"
                          >
                            {zoneStats.efficiency}%
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => setSelectedProfile(profile)}
                                className="mr-2 hover:bg-green-100 dark:hover:bg-blue-900"
                              >
                                <Workflow className="mr-2 h-4 w-4" /> Details
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[625px] bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl">
                              <DialogHeader>
                                <DialogTitle className="text-green-900 dark:text-white">
                                  Zones & Valves Details - {profile._id.slice(-6)}
                                </DialogTitle>
                              </DialogHeader>
                              <div className="max-h-[400px] overflow-y-auto">
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead>Zone</TableHead>
                                      <TableHead>Valve</TableHead>
                                      <TableHead>Status</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {Object.entries(profile.zonesValvesMapping).map(([zone, valve]) => (
                                      <TableRow key={zone}>
                                        <TableCell>{zone}</TableCell>
                                        <TableCell>{valve || 'Not Assigned'}</TableCell>
                                        <TableCell>
                                          <Badge 
                                            variant={valve ? "success" : "destructive"}
                                            className={valve ? 
                                              "bg-green-100 dark:bg-blue-900" : 
                                              "bg-red-100 dark:bg-red-900"
                                            }
                                          >
                                            {valve ? 'Active' : 'Inactive'}
                                          </Badge>
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </div>
                              <DialogFooter>
                                <Button 
                                  variant="outline"
                                  onClick={() => setIsConfiguring(true)}
                                  className="hover:bg-green-100 dark:hover:bg-blue-900"
                                >
                                  <Settings2 className="mr-2 h-4 w-4" />
                                  Configure
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </motion.tr>
                    );
                  })}
                </TableBody>
              </Table>
            </AnimatePresence>
          )}
        </CardContent>
      </Card>
    // </motion.div>
  );
}
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertCircle,
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  CheckCircle,
  Clock,
  Cloud,
  CloudRain,
  CloudSun,
  Droplets,
  Factory,
  Gauge,
  HelpCircle,
  Leaf,
  Loader2,
  Package,
  PackageCheck,
  RefreshCw,
  Settings,
  Shield,
  Sun,
  Thermometer,
  Trees,
  Trash2,
  Truck,
  Upload,
  Wifi,
  Zap
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Log event types for agriculture
const LOG_TYPES = {
  WEATHER: { label: 'Weather', icon: <CloudSun className="h-4 w-4" />, color: 'text-blue-400' },
  IRRIGATION: { label: 'Irrigation', icon: <Droplets className="h-4 w-4" />, color: 'text-cyan-400' },
  CROP: { label: 'Crop Health', icon: <Leaf className="h-4 w-4" />, color: 'text-green-400' },
  SOIL: { label: 'Soil', icon: <Trees className="h-4 w-4" />, color: 'text-amber-400' },
  EQUIPMENT: { label: 'Equipment', icon: <Settings className="h-4 w-4" />, color: 'text-purple-400' },
  HARVEST: { label: 'Harvest', icon: <PackageCheck className="h-4 w-4" />, color: 'text-orange-400' },
  PEST: { label: 'Pest Control', icon: <Shield className="h-4 w-4" />, color: 'text-red-400' },
  TRANSPORT: { label: 'Transport', icon: <Truck className="h-4 w-4" />, color: 'text-indigo-400' }
};

// Mock log events for agriculture
const generateLogEvent = () => {
  const types = Object.keys(LOG_TYPES);
  const randomType = types[Math.floor(Math.random() * types.length)];
  const now = new Date();
  
  const fields = ['North Field', 'South Field', 'East Orchard', 'West Vineyard'];
  const crops = ['Wheat', 'Corn', 'Soybeans', 'Tomatoes', 'Apples', 'Grapes'];
  const equipment = ['Tractor #5', 'Irrigation System', 'Harvester #2', 'Drone #3'];
  const randomField = fields[Math.floor(Math.random() * fields.length)];
  const randomCrop = crops[Math.floor(Math.random() * crops.length)];
  const randomEquipment = equipment[Math.floor(Math.random() * equipment.length)];

  const baseEvent = {
    id: Date.now(),
    timestamp: now,
    type: randomType,
    source: ['Weather Station', 'Soil Sensor', 'Drone', 'Farm Manager'][Math.floor(Math.random() * 4)],
    status: ['success', 'warning', 'error', 'info'][Math.floor(Math.random() * 4)]
  };

  switch(randomType) {
    case 'WEATHER':
      return {
        ...baseEvent,
        message: `Weather update for ${randomField}`,
        details: {
          field: randomField,
          temperature: `${Math.floor(10 + Math.random() * 25)}°C`,
          humidity: `${Math.floor(40 + Math.random() * 50)}%`,
          conditions: ['Sunny', 'Partly Cloudy', 'Rainy', 'Foggy'][Math.floor(Math.random() * 4)],
          wind: `${Math.floor(1 + Math.random() * 15)} km/h`
        }
      };
    case 'IRRIGATION':
      return {
        ...baseEvent,
        message: `Irrigation activity in ${randomField}`,
        details: {
          field: randomField,
          crop: randomCrop,
          duration: `${Math.floor(30 + Math.random() * 180)} minutes`,
          waterUsed: `${Math.floor(1000 + Math.random() * 5000)} liters`,
          status: ['Completed', 'In Progress', 'Scheduled'][Math.floor(Math.random() * 3)]
        }
      };
    case 'CROP':
      return {
        ...baseEvent,
        message: `Crop health update for ${randomCrop}`,
        details: {
          field: randomField,
          crop: randomCrop,
          growthStage: ['Seedling', 'Vegetative', 'Flowering', 'Maturity'][Math.floor(Math.random() * 4)],
          health: ['Excellent', 'Good', 'Fair', 'Poor'][Math.floor(Math.random() * 4)],
          issues: ['None', 'Nutrient Deficiency', 'Disease', 'Weeds'][Math.floor(Math.random() * 4)]
        }
      };
    case 'SOIL':
      return {
        ...baseEvent,
        message: `Soil sensor reading from ${randomField}`,
        details: {
          field: randomField,
          moisture: `${Math.floor(10 + Math.random() * 30)}%`,
          pH: (5.5 + Math.random() * 3).toFixed(1),
          nitrogen: `${Math.floor(10 + Math.random() * 90)} ppm`,
          temperature: `${Math.floor(10 + Math.random() * 20)}°C`
        }
      };
    case 'EQUIPMENT':
      return {
        ...baseEvent,
        message: `Equipment status update for ${randomEquipment}`,
        details: {
          equipment: randomEquipment,
          status: ['Running', 'Idle', 'Maintenance', 'Fault'][Math.floor(Math.random() * 4)],
          fuel: `${Math.floor(20 + Math.random() * 80)}%`,
          hours: Math.floor(100 + Math.random() * 500),
          lastService: `${Math.floor(1 + Math.random() * 30)} days ago`
        }
      };
    case 'HARVEST':
      return {
        ...baseEvent,
        message: `Harvest activity for ${randomCrop}`,
        details: {
          field: randomField,
          crop: randomCrop,
          yield: `${Math.floor(100 + Math.random() * 900)} kg`,
          quality: ['Premium', 'Good', 'Fair', 'Poor'][Math.floor(Math.random() * 4)],
          harvester: `OP-${Math.floor(1000 + Math.random() * 9000)}`,
          status: ['Completed', 'In Progress', 'Scheduled'][Math.floor(Math.random() * 3)]
        }
      };
    case 'PEST':
      return {
        ...baseEvent,
        message: `Pest control activity in ${randomField}`,
        details: {
          field: randomField,
          crop: randomCrop,
          pest: ['Aphids', 'Locusts', 'Mites', 'None'][Math.floor(Math.random() * 4)],
          treatment: ['None', 'Organic', 'Chemical', 'Biological'][Math.floor(Math.random() * 4)],
          severity: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
          technician: `TECH-${Math.floor(1000 + Math.random() * 9000)}`
        }
      };
    default:
      return {
        ...baseEvent,
        message: 'Transport activity',
        details: {
          crop: randomCrop,
          quantity: `${Math.floor(100 + Math.random() * 900)} kg`,
          destination: ['Local Market', 'Processing Plant', 'Storage'][Math.floor(Math.random() * 3)],
          vehicle: `TRUCK-${Math.floor(1000 + Math.random() * 9000)}`,
          status: ['In Transit', 'Loaded', 'Unloaded'][Math.floor(Math.random() * 3)]
        }
      };
  }
};

export default function LogMonitor() {
  const [logs, setLogs] = useState([]);
  const [filter, setFilter] = useState('all');
  const [isPaused, setIsPaused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    warnings: 0,
    errors: 0,
    lastHour: 0,
    yieldEstimate: 0
  });
  const logsEndRef = useRef(null);

  // Auto-scroll to bottom when logs change
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Simulate live log events
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      const newEvent = generateLogEvent();
      setLogs(prev => [newEvent, ...prev].slice(0, 200));
      setStats(prev => ({
        total: prev.total + 1,
        warnings: prev.warnings + (newEvent.status === 'warning' ? 1 : 0),
        errors: prev.errors + (newEvent.status === 'error' ? 1 : 0),
        lastHour: prev.lastHour + 1,
        yieldEstimate: Math.max(0, prev.yieldEstimate + (Math.random() > 0.5 ? 0.1 : -0.1)) // Simulate yield fluctuation
      }));
    }, 1000 + Math.random() * 1500); // Random interval between 1-2.5s

    return () => clearInterval(interval);
  }, [isPaused]);

  // Reset last hour count every hour
  useEffect(() => {
    const hourTimer = setInterval(() => {
      setStats(prev => ({ ...prev, lastHour: 0 }));
    }, 3600000);

    return () => clearInterval(hourTimer);
  }, []);

  const filteredLogs = logs.filter(log => {
    const matchesFilter = filter === 'all' || log.type === filter.toUpperCase();
    const matchesSearch = searchQuery === '' || 
      log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.details.crop && log.details.crop.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (log.details.field && log.details.field.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (log.details.equipment && log.details.equipment.toLowerCase().includes(searchQuery.toLowerCase())) ||
      log.source.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const clearLogs = () => {
    setLogs([]);
    setStats(prev => ({ ...prev, total: 0, warnings: 0, errors: 0 }));
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  return (
    <div className="relative rounded-3xl overflow-hidden 
      p-6 h-full flex flex-col">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-green-300 
            to-amber-300 bg-clip-text text-transparent">
            Agriculture Digital Twin Monitor
          </h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <Badge className="bg-green-500/10 text-green-500">
              <Wifi className="h-4 w-4 mr-2" />
              Live Stream Active
            </Badge>
            <span className="flex items-center gap-2">
              <Leaf className="h-4 w-4" />
              {stats.total} total events
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            variant={isPaused ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => setIsPaused(!isPaused)}
            className="gap-2"
          >
            {isPaused ? (
              <>
                <RefreshCw className="h-4 w-4" />
                Resume
              </>
            ) : (
              <>
                <Loader2 className="h-4 w-4" />
                Pause
              </>
            )}
          </Button>
          <Button variant="outline" size="sm" onClick={clearLogs}>
            <Trash2 className="h-4 w-4 mr-2" />
            Clear
          </Button>
        </div>
      </div>

      {/* Stats and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground">Total Events</div>
              <div className="text-2xl font-bold">{stats.total}</div>
            </div>
            <div className="p-2 rounded-lg bg-green-500/10">
              <Gauge className="h-5 w-5 text-green-400" />
            </div>
          </div>
        </Card>
        <Card className="p-4 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground">Yield Estimate</div>
              <div className="text-2xl font-bold">{stats.yieldEstimate.toFixed(1)} t/ha</div>
              <Progress value={(stats.yieldEstimate / 10) * 100} className="h-1 mt-2" />
            </div>
            <div className="p-2 rounded-lg bg-amber-500/10">
              <PackageCheck className="h-5 w-5 text-amber-400" />
            </div>
          </div>
        </Card>
        <Card className="p-4 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground">Alerts</div>
              <div className="text-2xl font-bold">{stats.warnings}</div>
            </div>
            <div className="p-2 rounded-lg bg-yellow-500/10">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
            </div>
          </div>
        </Card>
        <Card className="p-4 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground">Critical Issues</div>
              <div className="text-2xl font-bold">{stats.errors}</div>
            </div>
            <div className="p-2 rounded-lg bg-red-500/10">
              <AlertCircle className="h-5 w-5 text-red-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search logs by crop, field, or equipment..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {Object.entries(LOG_TYPES).map(([key, value]) => (
              <SelectItem key={key} value={key.toLowerCase()}>
                <div className="flex items-center gap-2">
                  {value.icon}
                  {value.label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Log Container */}
      <Card className="flex-1 backdrop-blur-lg bg-white/5 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-4 space-y-4">
            {filteredLogs.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                <Leaf className="h-8 w-8 mb-2" />
                <p>No agriculture events match your filters</p>
              </div>
            ) : (
              filteredLogs.map((log) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`p-4 rounded-lg border ${
                    log.status === 'error' 
                      ? 'bg-red-500/10 border-red-500/20' 
                      : log.status === 'warning'
                      ? 'bg-yellow-500/10 border-yellow-500/20'
                      : 'bg-white/5 border-white/10'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${
                      log.status === 'error' 
                        ? 'bg-red-500/10 text-red-400' 
                        : log.status === 'warning'
                        ? 'bg-yellow-500/10 text-yellow-400'
                        : 'bg-white/5'
                    }`}>
                      {LOG_TYPES[log.type].icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className={`font-medium ${LOG_TYPES[log.type].color}`}>
                            {LOG_TYPES[log.type].label}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {log.source}
                          </Badge>
                          {log.status === 'error' && (
                            <Badge variant="destructive" className="text-xs">
                              Critical
                            </Badge>
                          )}
                          {log.status === 'warning' && (
                            <Badge variant="secondary" className="text-xs">
                              Alert
                            </Badge>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {formatTime(log.timestamp)}
                        </div>
                      </div>
                      <p className="mb-2">{log.message}</p>
                      <div className="text-sm text-muted-foreground">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {Object.entries(log.details).map(([key, value]) => (
                            <div key={key} className="flex items-center gap-1">
                              <span className="font-medium capitalize">{key}:</span>
                              <span>{value instanceof Date ? formatDate(value) : value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
            <div ref={logsEndRef} />
          </div>
        </ScrollArea>
      </Card>

      {/* Status Bar */}
      <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            {filteredLogs.filter(l => l.status === 'success').length} Normal
          </span>
          <span className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
            {filteredLogs.filter(l => l.status === 'warning').length} Alerts
          </span>
          <span className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-red-500"></div>
            {filteredLogs.filter(l => l.status === 'error').length} Critical
          </span>
        </div>
        <div>
          {isPaused ? 'Updates Paused' : 'Streaming Live'}
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 -z-10 opacity-20 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 bg-green-400 rounded-full"
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function Search(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
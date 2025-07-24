import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  Terminal, 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  Bell, 
  Filter, 
  ArrowDownUp 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";
import { Button } from '@/components/ui/button';
// Enum for Alert Types
const AlertType = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error'
};

// Advanced Alert Management Hook
const useAlertManager = () => {
  const [alerts, setAlerts] = useState([
    { 
      id: 1, 
      message: "Irrigation System operating normally", 
      type: AlertType.SUCCESS,
      timestamp: new Date()
    }
  ]);

  const [filteredAlertType, setFilteredAlertType] = useState(null);

  const generateMockAlerts = () => {
    const possibleAlerts = [
      { 
        message: "Irrigation System operating normally", 
        type: AlertType.SUCCESS
      },
      { 
        message: "Low water pressure detected in Zone 3", 
        type: AlertType.WARNING
      },
      { 
        message: "Soil moisture sensor malfunction", 
        type: AlertType.ERROR
      },
      { 
        message: "Optimal watering schedule activated", 
        type: AlertType.INFO
      }
    ];

    // Randomly add a new alert
    if (Math.random() > 0.5) {
      const newAlert = possibleAlerts[Math.floor(Math.random() * possibleAlerts.length)];
      addAlert(newAlert.message, newAlert.type);
    }
  };

  const addAlert = (message, type = AlertType.INFO) => {
    const newAlert = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date()
    };
    setAlerts(prev => [newAlert, ...prev].slice(0, 5)); // Keep last 5 alerts
  };

  const removeAlert = (id) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const filterAlerts = (type) => {
    setFilteredAlertType(type);
  };

  useEffect(() => {
    const interval = setInterval(generateMockAlerts, 15000); // Generate mock alerts every 15 seconds
    return () => clearInterval(interval);
  }, []);

  const displayAlerts = filteredAlertType 
    ? alerts.filter(alert => alert.type === filteredAlertType)
    : alerts;

  return {
    alerts: displayAlerts,
    addAlert,
    removeAlert,
    filterAlerts,
    filteredAlertType
  };
};

// Advanced Alerts Component
export default function Alerts() {
  const { 
    alerts, 
    removeAlert, 
    filterAlerts, 
    filteredAlertType 
  } = useAlertManager();

  // Alert Type Icon Mapping
  const getAlertIcon = (type) => {
    switch(type) {
      case AlertType.SUCCESS: return <CheckCircle2 className="text-green-500" />;
      case AlertType.WARNING: return <AlertCircle className="text-yellow-500" />;
      case AlertType.ERROR: return <XCircle className="text-red-500" />;
      default: return <Terminal className="text-blue-500" />;
    }
  };

  return (
    <Card className="w-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-2xl hover:shadow-green-100/50 transition-all duration-300 ease-in-out">
      <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-6 rounded-t-2xl">
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold text-green-900 dark:text-white flex items-center gap-3">
            <Bell className="text-green-600 dark:text-blue-400" />
            Smart Alerts Management
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-white/30 dark:bg-black/30">
              {alerts.length} Active Alerts
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-4">
        {/* Alert Filters */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-2">
            <Button 
              variant={filteredAlertType === null ? "default" : "outline"}
              size="sm"
              onClick={() => filterAlerts(null)}
            >
              All
            </Button>
            {Object.values(AlertType).map(type => (
              <Button
                key={type}
                variant={filteredAlertType === type ? "default" : "outline"}
                size="sm"
                onClick={() => filterAlerts(type)}
                className="capitalize"
              >
                {type}
              </Button>
            ))}
          </div>
          <Button variant="ghost" size="sm">
            <ArrowDownUp className="mr-2" /> Sort
          </Button>
        </div>

        {/* Alerts List */}
        <AnimatePresence>
          {alerts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-gray-500 p-4"
            >
              No active alerts
            </motion.div>
          ) : (
            alerts.map((alert) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
              >
                <Alert 
                  variant={alert.type === AlertType.ERROR ? "destructive" : "default"}
                  className="mb-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {getAlertIcon(alert.type)}
                      <div>
                        <AlertTitle className="capitalize">{alert.type} Alert</AlertTitle>
                        <AlertDescription>{alert.message}</AlertDescription>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeAlert(alert.id)}
                    >
                      <XCircle className="h-4 w-4 text-gray-500 hover:text-red-500" />
                    </Button>
                  </div>
                </Alert>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
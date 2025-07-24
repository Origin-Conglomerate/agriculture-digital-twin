import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const PestAlerts = ({ alerts }: { alerts: PestAlert[] }) => {
  return (
    <Card className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30">
      <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50">
        <CardTitle className="text-xl font-semibold text-green-900 dark:text-white flex items-center gap-2">
          <Bell className="text-green-600 dark:text-blue-400" />
          Active Alerts
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <AnimatePresence>
          {alerts.map((alert) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="mb-4 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-green-800 dark:text-blue-300">
                  {alert.type}
                </span>
                <Badge 
                  variant={alert.severity === 'high' ? 'destructive' : 'outline'}
                >
                  {alert.severity}
                </Badge>
              </div>
              <p className="text-green-700 dark:text-blue-200 text-sm">
                {alert.message}
              </p>
              <div className="flex justify-between items-center mt-2 text-xs text-green-600 dark:text-blue-400">
                <span>{alert.location}</span>
                <span>{new Date(alert.timestamp).toLocaleTimeString()}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};
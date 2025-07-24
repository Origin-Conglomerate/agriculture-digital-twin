import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bug, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export const PestDetection = ({ detection }: { detection: PestDetection }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 hover:shadow-green-100/50 transition-all">
        <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-semibold text-green-900 dark:text-white flex items-center gap-2">
              <Bug className="text-green-600 dark:text-blue-400" />
              {detection.pestType}
            </CardTitle>
            <Badge 
              variant={detection.riskLevel === 'high' ? 'destructive' : 'outline'}
              className="bg-white/30 dark:bg-black/30"
            >
              {detection.riskLevel.toUpperCase()}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4 space-y-2">
          <div className="flex justify-between text-green-700 dark:text-blue-200">
            <span>Confidence:</span>
            <span>{detection.confidence}%</span>
          </div>
          <div className="flex justify-between text-green-700 dark:text-blue-200">
            <span>Location:</span>
            <span>{detection.location}</span>
          </div>
          <div className="flex justify-between text-green-700 dark:text-blue-200">
            <span>Count:</span>
            <span>{detection.count}</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
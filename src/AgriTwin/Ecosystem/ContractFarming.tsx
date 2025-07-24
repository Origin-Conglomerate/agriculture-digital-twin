import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Handshake, FileClock, Coins , FileCheck} from 'lucide-react';

export const ContractFarming = () => {
  const contractDetails = {
    activeContracts: 3,
    totalValue: "₹1,200,000",
    duration: "6 months",
  };

  return (
    <Card className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-xl">
      <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-4">
        <div className="md:flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Handshake className="text-green-600 dark:text-blue-400" />
            <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300">
              Contract Farming
            </h3>
          </div>
          <Badge variant="outline" className="bg-white/30 dark:bg-black/30">
            Smart Contracts
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 dark:bg-gray-800 p-3 rounded-lg">
            <div className="flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-green-600 dark:text-blue-400" />
              <p className="text-sm text-green-700 dark:text-blue-200">Active Contracts</p>
            </div>
            <p className="text-lg font-bold text-green-900 dark:text-white">
              {contractDetails.activeContracts}
            </p>
          </div>
          <div className="bg-green-50 dark:bg-gray-800 p-3 rounded-lg">
            <div className="flex items-center gap-2">
              <Coins className="w-4 h-4 text-green-600 dark:text-blue-400" />
              <p className="text-sm text-green-700 dark:text-blue-200">Total Value</p>
            </div>
            <p className="text-lg font-bold text-green-900 dark:text-white">
              {contractDetails.totalValue}
            </p>
          </div>
          <div className="bg-green-50 dark:bg-gray-800 p-3 rounded-lg">
            <div className="flex items-center gap-2">
              <FileClock className="w-4 h-4 text-green-600 dark:text-blue-400" />
              <p className="text-sm text-green-700 dark:text-blue-200">Duration</p>
            </div>
            <p className="text-lg font-bold text-green-900 dark:text-white">
              {contractDetails.duration}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
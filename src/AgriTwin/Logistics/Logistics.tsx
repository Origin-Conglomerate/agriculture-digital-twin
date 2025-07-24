import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ChevronRight, 
  TruckIcon,
  BarChart3,
  MapPin,
  Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";

import { LogisticsStats } from './LogisticsStats';
import { DeliveryChart } from './DeliveryChart';
import { SupplyChainMap } from './SupplyChainMap';
import { OrdersList } from './OrdersList';

export default function Logistics() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className='container mx-auto px-4 py-6'>
      <Card className="w-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-2xl hover:shadow-green-100/50 transition-all duration-300 ease-in-out">
        <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-6 rounded-t-2xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle className="text-2xl font-bold text-green-900 dark:text-white flex items-center gap-3">
                <TruckIcon className="text-green-600 dark:text-blue-400" />
                Logistics & Supply Chain Dashboard
              </CardTitle>
              <CardDescription className="text-green-700 dark:text-blue-200">
                Comprehensive view of your agricultural supply chain
              </CardDescription>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                className="bg-white/30 dark:bg-black/30 hover:bg-green-100 dark:hover:bg-blue-900"
                onClick={() => {/* Add download logic */}}
              >
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Badge variant="outline" className="bg-white/30 dark:bg-black/30">
                Real-time
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          <Tabs
            defaultValue="overview"
            className="w-full"
            onValueChange={setActiveTab}
          >
            <TabsList className="grid w-full h-full grid-cols-2 md:grid-cols-4 bg-green-50 dark:bg-gray-800">
              <TabsTrigger
                value="overview"
                className={cn(
                  "flex items-center gap-2 transition-all duration-300",
                  activeTab === 'overview' ? 'bg-green-200 dark:bg-blue-900' : ''
                )}
              >
                <BarChart3 className="w-4 h-4" /> Overview
              </TabsTrigger>
              <TabsTrigger
                value="orders"
                className={cn(
                  "flex items-center gap-2 transition-all duration-300",
                  activeTab === 'orders' ? 'bg-green-200 dark:bg-blue-900' : ''
                )}
              >
                <TruckIcon className="w-4 h-4" /> Orders
              </TabsTrigger>
              <TabsTrigger
                value="tracking"
                className={cn(
                  "flex items-center gap-2 transition-all duration-300",
                  activeTab === 'tracking' ? 'bg-green-200 dark:bg-blue-900' : ''
                )}
              >
                <MapPin className="w-4 h-4" /> Tracking
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className={cn(
                  "flex items-center gap-2 transition-all duration-300",
                  activeTab === 'analytics' ? 'bg-green-200 dark:bg-blue-900' : ''
                )}
              >
                <BarChart3 className="w-4 h-4" /> Analytics
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="mt-6"
              >
                <TabsContent value="overview" className="space-y-6">
                  <LogisticsStats />
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <DeliveryChart />
                    <SupplyChainMap />
                  </div>
                </TabsContent>

                <TabsContent value="orders">
                  <OrdersList />
                </TabsContent>

                <TabsContent value="tracking">
                  <SupplyChainMap />
                </TabsContent>

                <TabsContent value="analytics">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <DeliveryChart />
                    <LogisticsStats />
                  </div>
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Network,
  ChevronRight,
  Sparkles,
  Shield,
  Users,
  Handshake,
  Map,
  BarChart
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";

import { CropInsurance } from './CropInsurance';
import { ContractFarming } from './ContractFarming';
import { FarmerNetwork } from './FarmerNetwork';
import { GeoMapping } from './Geomapping';
import { Benchmarking } from './Benchmarking';

export default function Ecosystem() {
  const [activeTab, setActiveTab] = useState('insurance');

  return (
    <div className="flex justify-center items-center p-4">
      <Card className="w-full max-w-6xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-2xl hover:shadow-green-100/50 transition-all duration-300 ease-in-out">
        <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-6 rounded-t-2xl">
          <div className="md:flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-bold text-green-900 dark:text-white flex items-center gap-3">
                <Network className="text-green-600 dark:text-blue-400" />
                Agricultural Ecosystem
              </CardTitle>
              <CardDescription className="text-green-700 dark:text-blue-200">
                Integrated farming solutions and network
              </CardDescription>
            </div>
            <Badge variant="outline" className="bg-white/30 dark:bg-black/30">
              Smart Ecosystem
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          <Tabs
            defaultValue="insurance"
            className="w-full"
            onValueChange={setActiveTab}
          >
            <TabsList className="grid w-full h-full grid-cols-3 bg-green-50 dark:bg-gray-800">
              <TabsTrigger
                value="insurance"
                className={cn(
                  "flex items-center gap-2 transition-all duration-300",
                  activeTab === 'insurance' ? 'bg-green-200 dark:bg-blue-900' : ''
                )}
              >
                <Shield className="w-4 h-4" /> Insurance
              </TabsTrigger>
              <TabsTrigger
                value="contract"
                className={cn(
                  "flex items-center gap-2 transition-all duration-300",
                  activeTab === 'contract' ? 'bg-green-200 dark:bg-blue-900' : ''
                )}
              >
                <Handshake className="w-4 h-4" /> Contracts
              </TabsTrigger>
              <TabsTrigger
                value="network"
                className={cn(
                  "flex items-center gap-2 transition-all duration-300",
                  activeTab === 'network' ? 'bg-green-200 dark:bg-blue-900' : ''
                )}
              >
                <Users className="w-4 h-4" /> Network
              </TabsTrigger>

              <TabsTrigger
                value="mapping"
                className={cn(
                  "flex items-center gap-2 transition-all duration-300",
                  activeTab === 'mapping' ? 'bg-green-200 dark:bg-blue-900' : ''
                )}
              >
                <Map className="w-4 h-4" /> Mapping
              </TabsTrigger>
              
              <TabsTrigger
                value="benchmark"
                className={cn(
                  "flex items-center gap-2 transition-all duration-300",
                  activeTab === 'benchmark' ? 'bg-green-200 dark:bg-blue-900' : ''
                )}
              >
                <BarChart className="w-4 h-4" /> Analytics
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
                <TabsContent value="insurance" className="mt-0">
                  <CropInsurance />
                </TabsContent>

                <TabsContent value="contract" className="mt-0">
                  <ContractFarming />
                </TabsContent>

                <TabsContent value="network" className="mt-0">
                  <FarmerNetwork />
                </TabsContent>

                <TabsContent value="mapping" className="mt-0">
                  <GeoMapping />
                </TabsContent>

                <TabsContent value="benchmark" className="mt-0">
                  <Benchmarking />
                </TabsContent>

              </motion.div>
            </AnimatePresence>
          </Tabs>

          <div className="mt-6 flex justify-between items-center gap-3">
            <Button
              variant="outline"
              className="group hover:bg-green-100 dark:hover:bg-blue-900 transition-all"
            >
              View Details
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <div className="flex items-center space-x-2">
              <Sparkles className="text-green-600 dark:text-blue-400" />
              <span className="text-sm text-green-700 dark:text-blue-200">
                Smart Ecosystem v1.0
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
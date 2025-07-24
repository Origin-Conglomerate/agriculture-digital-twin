import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";
import {
  ClipboardList,
  BarChart3,
  History,
  Sparkles,
  BarChart4,
} from 'lucide-react';

import { TradeOffer } from './TradeOffer';
import { Market } from './Market';
import { ActiveTrades } from './ActiveTrades';
import { PricePredictor } from './PricePredictor';
import BlockchainMarketplace from './BlockchainMarketplace';

export default function Trade() {
  const [activeTab, setActiveTab] = useState('offer');

  return (
    //<div className='flex justify-center items-center p-4 w-full'>
      <Card className="w-full max-w-[89vw] bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-2xl hover:shadow-green-100/50 transition-all duration-300 ease-in-out">
        <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-6 rounded-t-2xl">
          <div className="flex flex-wrap md:flex-nowrap justify-between items-center gap-4">
            <div className="flex flex-col">
              <CardTitle className="text-lg md:text-2xl font-bold text-green-900 dark:text-white flex items-center gap-3">
                <ClipboardList className="w-5 h-5 md:w-6 md:h-6 text-green-600 dark:text-blue-400" />
                Trade Center
              </CardTitle>
              <CardDescription className="text-sm md:text-base text-green-700 dark:text-blue-200">
                Smart trading platform with real-time insights
              </CardDescription>
            </div>
            <Badge variant="outline" className="min-w-fit whitespace-nowrap bg-white/30 dark:bg-black/30 px-3 py-1 text-xs md:text-sm">
              AI-Enhanced
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          <Tabs
            defaultValue="offer"
            className="w-full"
            onValueChange={setActiveTab}
          >
            <TabsList className="grid w-full h-full grid-cols-2 sm:grid-cols-4 md:grid-cols-3 bg-green-50 dark:bg-gray-800">
              <TabsTrigger
                value="offer"
                className={cn(
                  "flex items-center gap-2 transition-all duration-300",
                  activeTab === 'offer' ? 'bg-green-200 dark:bg-blue-900' : ''
                )}
              >
                <ClipboardList className="w-4 h-4" /> New Trade
              </TabsTrigger>
              <TabsTrigger
                value="market"
                className={cn(
                  "flex items-center gap-2 transition-all duration-300",
                  activeTab === 'market' ? 'bg-green-200 dark:bg-blue-900' : ''
                )}
              >
                <BarChart3 className="w-4 h-4" /> Market
              </TabsTrigger>
              <TabsTrigger
                value="marketplace"
                className={cn(
                  "flex items-center gap-2 transition-all duration-300",
                  activeTab === 'marketplace' ? 'bg-green-200 dark:bg-blue-900' : ''
                )}
              >
                <BarChart4 className="w-4 h-4" /> Marketplace
              </TabsTrigger>
              <TabsTrigger
                value="active"
                className={cn(
                  "flex items-center gap-2 transition-all duration-300",
                  activeTab === 'active' ? 'bg-green-200 dark:bg-blue-900' : ''
                )}
              >
                <History className="w-4 h-4" /> Active
              </TabsTrigger>
              <TabsTrigger
                value="predict"
                className={cn(
                  "flex items-center gap-2 transition-all duration-300",
                  activeTab === 'predict' ? 'bg-green-200 dark:bg-blue-900' : ''
                )}
              >
                <Sparkles className="w-4 h-4" /> Predict
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="mt-4"
              >
                <TabsContent value="offer" className="mt-0">
                  <div className="bg-white/50 dark:bg-gray-900/50 rounded-lg p-4">
                    <TradeOffer
                      onSubmit={() => console.log('Trade submitted')}
                      className="shadow-none border-none bg-transparent"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="market" className="mt-0">
                  <div className="bg-white/50 dark:bg-gray-900/50 rounded-lg p-4">
                    <Market
                      className="shadow-none border-none bg-transparent"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="marketplace" className="mt-0">
                  <div className="bg-white/50 dark:bg-gray-900/50 rounded-lg p-4">
                    <BlockchainMarketplace
                      className="shadow-none border-none bg-transparent"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="active" className="mt-0">
                  <div className="bg-white/50 dark:bg-gray-900/50 rounded-lg p-4">
                    <ActiveTrades
                      className="shadow-none border-none bg-transparent"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="predict" className="mt-0">
                  <div className="bg-white/50 dark:bg-gray-900/50 rounded-lg p-4">
                    <PricePredictor
                      className="shadow-none border-none bg-transparent"
                    />
                  </div>
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>

          <div className="mt-6 flex flex-wrap md:flex-nowrap justify-between items-center gap-3 md:gap-6">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4 md:w-5 md:h-5 text-green-600 dark:text-blue-400" />
              <span className="text-xs md:text-sm text-green-700 dark:text-blue-200 min-w-fit whitespace-nowrap">
                Market Status: Active
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-green-600 dark:text-blue-400" />
              <span className="text-xs md:text-sm text-green-700 dark:text-blue-200 min-w-fit whitespace-nowrap">
                AI Predictions: Updated
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    //</div>
  );
}
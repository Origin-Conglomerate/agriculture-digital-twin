import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  CreditCard,
  Clock,
  Calendar,
  IndianRupee,
  History,
  User,
  AlertCircle,
  ChevronRight,
  ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";

import SubscriptionBillingStats from './SubscriptionBillingStats';

import Usage from './Usage';
import Payment from './Payment';
import BillingHistory from './BillingHistory';


// Main Subscription Billing Component
export default function SubscriptionBilling() {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);

  const handleRenewSubscription = async () => {
    setLoading(true);
    // Implement Razorpay integration here
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <Card className="w-full max-w-[89vw] bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-2xl hover:shadow-green-100/50 transition-all duration-300 ease-in-out">
      <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-6 rounded-t-2xl">
  <div className="flex flex-wrap md:flex-nowrap justify-between items-center gap-4">
    <div className="flex flex-col">
      <CardTitle className="text-lg md:text-2xl font-bold text-green-900 dark:text-white flex items-center gap-3">
        <IndianRupee className="w-5 h-5 md:w-6 md:h-6 text-green-600 dark:text-blue-400" />
        Subscription & Billing
      </CardTitle>
      <CardDescription className="text-sm md:text-base text-green-700 dark:text-blue-200">
        Manage your subscription, payments, and usage
      </CardDescription>
    </div>
    <Badge variant="outline" className="min-w-fit whitespace-nowrap bg-white/30 dark:bg-black/30 px-3 py-1 text-xs md:text-sm">
      Professional Plan
    </Badge>
  </div>
</CardHeader>

      <CardContent className="p-6 space-y-6">
        {/* Current Plan Status */}
        
        <SubscriptionBillingStats />
        <Tabs 
          defaultValue="overview" 
          className="w-full"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full grid-cols-4 bg-green-50 dark:bg-gray-800">
            <TabsTrigger 
              value="overview" 
              className={cn(
                "flex items-center gap-2 transition-all duration-300",
                activeTab === 'overview' ? 'bg-green-200 dark:bg-blue-900' : ''
              )}
            >
              <IndianRupee className="w-4 h-4" /> Overview
            </TabsTrigger>
            <TabsTrigger 
              value="history" 
              className={cn(
                "flex items-center gap-2 transition-all duration-300",
                activeTab === 'history' ? 'bg-green-200 dark:bg-blue-900' : ''
              )}
            >
              <History className="w-4 h-4" /> History
            </TabsTrigger>
            <TabsTrigger 
              value="payment" 
              className={cn(
                "flex items-center gap-2 transition-all duration-300",
                activeTab === 'payment' ? 'bg-green-200 dark:bg-blue-900' : ''
              )}
            >
              <CreditCard className="w-4 h-4" /> Payment
            </TabsTrigger>
            <TabsTrigger 
              value="usage" 
              className={cn(
                "flex items-center gap-2 transition-all duration-300",
                activeTab === 'usage' ? 'bg-green-200 dark:bg-blue-900' : ''
              )}
            >
              <AlertCircle className="w-4 h-4" /> Usage
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
              <TabsContent value="overview" className="space-y-4">
                <Alert className="bg-green-50 dark:bg-blue-900/30 border-green-200 dark:border-blue-800">
                  <AlertDescription className="text-green-700 dark:text-blue-200">
                    Your subscription will renew automatically on May 1, 2025
                  </AlertDescription>
                </Alert>
                <Usage />
                <div className="flex justify-end">
                  <Button 
                    onClick={handleRenewSubscription}
                    disabled={loading}
                    className="bg-green-600 hover:bg-green-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                  >
                    {loading ? 'Processing...' : 'Renew Now'}
                    <ArrowUpRight className="ml-2" />
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="history">
                <BillingHistory />
              </TabsContent>

              <TabsContent value="payment">
                <div className="space-y-4">
                  <Payment />
                  <Button 
                    variant="outline" 
                    className="w-full hover:bg-green-100 dark:hover:bg-blue-900"
                  >
                    Add New Payment Method
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="usage">
                <Usage />
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>

        <div className="mt-6 flex justify-between items-center">
          <Button 
            variant="outline" 
            className="group hover:bg-green-100 dark:hover:bg-blue-900 transition-all"
          >
            Download Invoice 
            <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <div className="flex items-center space-x-2">
            <User className="text-green-600 dark:text-blue-400" />
            <span className="text-sm text-green-700 dark:text-blue-200">
              Professional Plan
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
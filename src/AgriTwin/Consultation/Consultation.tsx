import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Video, History, Settings } from 'lucide-react';
import { cn } from "@/lib/utils";
import { ConsultationHistory } from './ConsultationHistory';
import { ConsultationBooking } from './ConsultationBooking';

export default function Consultation() {
  const [activeTab, setActiveTab] = useState('book');

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="container h-full">
        <Card className="w-full max-w-[92vw] bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-2xl hover:shadow-green-100/50 transition-all duration-300 ease-in-out">
          <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-4 rounded-t-2xl">
            <div className="md:flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl font-bold text-green-900 dark:text-white flex items-center gap-3">
                  <Video className="text-green-600 dark:text-blue-400" />
                  Expert Consultations
                </CardTitle>
                <CardDescription className="text-green-700 dark:text-blue-200">
                  Schedule consultations with agricultural experts
                </CardDescription>
              </div>
              <Badge variant="outline" className="bg-white/30 dark:bg-black/30">
                Professional Support
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            <Tabs defaultValue="book" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 bg-green-50 dark:bg-gray-800">
                <TabsTrigger
                  value="book"
                  className={cn(
                    "flex items-center gap-2 transition-all duration-300",
                    activeTab === 'book' ? 'bg-green-200 dark:bg-blue-900' : ''
                  )}
                >
                  <Calendar className="w-4 h-4" /> Book
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
                {/* Uncomment below if you wish to add settings in the future */}
                {/* <TabsTrigger
                  value="settings"
                  className={cn(
                    "flex items-center gap-2 transition-all duration-300",
                    activeTab === 'settings' ? 'bg-green-200 dark:bg-blue-900' : ''
                  )}
                >
                  <Settings className="w-4 h-4" /> Settings
                </TabsTrigger> */}
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
                  <TabsContent value="book">
                    <ConsultationBooking />
                  </TabsContent>
                  
                  <TabsContent value="history">
                    <ConsultationHistory />
                  </TabsContent>

                  <TabsContent value="settings">
                    <Card className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300">
                          Consultation Settings
                        </h3>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </motion.div>
              </AnimatePresence>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

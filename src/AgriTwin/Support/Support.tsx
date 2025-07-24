// Support.tsx
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  TicketIcon,
  BookOpen,
  HelpCircle,
  Phone,
  Mail,
  Globe
} from 'lucide-react';
import { cn } from "@/lib/utils";

import TicketForm from './TicketForm';
import LiveChat from './LiveChat';
import TicketList from './TicketList';
import KnowledgeBase from './KnowledgeBase';
import FAQ from './FAQ';

export default function Support() {
  const [activeTab, setActiveTab] = useState('tickets');

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-2xl hover:shadow-green-100/50 transition-all duration-300">
        <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-6 rounded-t-2xl">
          <div className="flex flex-wrap md:flex-nowrap justify-between items-center gap-4">
            <div className="flex flex-col">
              <CardTitle className="text-lg md:text-2xl font-bold text-green-900 dark:text-white flex items-center gap-3">
                <HelpCircle className="w-5 h-5 md:w-6 md:h-6 text-green-600 dark:text-blue-400" />
                Support Center
              </CardTitle>
              <CardDescription className="text-sm md:text-base text-green-700 dark:text-blue-200">
                Get help with your farming operations
              </CardDescription>
            </div>
            <Badge variant="outline" className="min-w-fit whitespace-nowrap bg-white/30 dark:bg-black/30 px-3 py-1 text-xs md:text-sm">
              24/7 Support
            </Badge>
          </div>

          {/* Quick Contact Information */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2 text-green-700 dark:text-blue-200">
              <Phone className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-sm md:text-base">+918618944125</span>
            </div>
            <div className="flex items-center gap-2 text-green-700 dark:text-blue-200">
              <Mail className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-sm md:text-base">support@kiaaniot.com</span>
            </div>
            <div className="flex items-center gap-2 text-green-700 dark:text-blue-200">
              <Globe className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-sm md:text-base">help.kiaaniot.com</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          <Tabs
            defaultValue="tickets"
            className="w-full"
            onValueChange={setActiveTab}
          >
            <TabsList className="grid w-full h-full grid-cols-2 sm:grid-cols-4 bg-green-50 dark:bg-gray-800">
              <TabsTrigger
                value="tickets"
                className={cn(
                  "flex items-center gap-2 transition-all duration-300",
                  activeTab === 'tickets' ? 'bg-green-200 dark:bg-blue-900' : ''
                )}
              >
                <TicketIcon className="w-4 h-4" /> Support Tickets
              </TabsTrigger>
              <TabsTrigger
                value="chat"
                className={cn(
                  "flex items-center gap-2 transition-all duration-300",
                  activeTab === 'chat' ? 'bg-green-200 dark:bg-blue-900' : ''
                )}
              >
                <MessageSquare className="w-4 h-4" /> Live Chat
              </TabsTrigger>
              <TabsTrigger
                value="knowledge"
                className={cn(
                  "flex items-center gap-2 transition-all duration-300",
                  activeTab === 'knowledge' ? 'bg-green-200 dark:bg-blue-900' : ''
                )}
              >
                <BookOpen className="w-4 h-4" /> Knowledge Base
              </TabsTrigger>
              <TabsTrigger
                value="faq"
                className={cn(
                  "flex items-center gap-2 transition-all duration-300",
                  activeTab === 'faq' ? 'bg-green-200 dark:bg-blue-900' : ''
                )}
              >
                <HelpCircle className="w-4 h-4" /> FAQ
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
                <TabsContent value="tickets" className="m-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <TicketForm onSubmit={(ticket) => console.log(ticket)} />
                    <TicketList />
                  </div>
                </TabsContent>

                <TabsContent value="chat" className="m-0">
                  <LiveChat />
                </TabsContent>

                <TabsContent value="knowledge" className="m-0">
                  <KnowledgeBase />
                </TabsContent>

                <TabsContent value="faq" className="m-0">
                  <FAQ />
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
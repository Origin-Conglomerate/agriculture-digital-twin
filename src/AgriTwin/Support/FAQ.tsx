// FAQ.tsx
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, HelpCircle } from 'lucide-react';
import type { FaqItem } from './types';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock FAQ data - replace with actual data
  const faqs: FaqItem[] = [
    {
      question: "How do I configure my irrigation schedule?",
      answer: "You can configure your irrigation schedule through the Settings > Irrigation menu...",
      category: "irrigation"
    },
    // Add more FAQs
  ];

  return (
    <Card className="w-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-lg">
      <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-6 rounded-t-2xl">
        <CardTitle className="text-xl font-bold text-green-900 dark:text-white flex items-center gap-2">
          <HelpCircle className="text-green-600 dark:text-blue-400" />
          Frequently Asked Questions
        </CardTitle>
        <div className="mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600 dark:text-blue-400" />
            <Input
              placeholder="Search FAQs..."
              className="pl-10 bg-white/80 dark:bg-gray-800/80 border-green-100 dark:border-blue-900"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <ScrollArea className="h-[500px] pr-4">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white/80 dark:bg-gray-800/80 rounded-lg border border-green-100/50 dark:border-blue-900/30"
              >
                <AccordionTrigger className="px-4 text-green-900 dark:text-white hover:no-underline hover:bg-green-50 dark:hover:bg-gray-700/50 rounded-t-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 text-green-700 dark:text-blue-200">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default FAQ;
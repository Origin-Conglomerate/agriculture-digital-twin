import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ListFilter, Clock } from 'lucide-react';
import type { Ticket } from './types';

const getStatusColor = (status: Ticket['status']) => {
  const colors = {
    new: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    open: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    'in-progress': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    resolved: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    closed: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  };
  return colors[status];
};

const TicketList = () => {
  const tickets: Ticket[] = [
    {
      id: '1',
      title: 'Irrigation System Malfunction',
      description: 'Zone 3 irrigation not working properly',
      status: 'open',
      priority: 'high',
      category: 'technical',
      createdAt: new Date('2024-03-15'),
      updatedAt: new Date('2024-03-15')
    },
  ];

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-lg hover:shadow-green-100/50 transition-all duration-300">
      <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-6 rounded-t-2xl">
        <CardTitle className="text-lg md:text-xl font-bold text-green-900 dark:text-white flex items-center gap-2">
          <ListFilter className="text-green-600 dark:text-blue-400 w-5 h-5 md:w-6 md:h-6" />
          Recent Tickets
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 md:p-6">
        <ScrollArea className="h-[300px] md:h-[400px] pr-2 md:pr-4">
          <div className="space-y-3 md:space-y-4">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="p-3 md:p-4 bg-white/80 dark:bg-gray-800/80 rounded-lg border border-green-100/50 dark:border-blue-900/30"
              >
                <div className="flex flex-wrap justify-between items-start mb-2">
                  <h3 className="font-medium text-green-900 dark:text-white text-sm md:text-base">
                    {ticket.title}
                  </h3>
                  <Badge className={`${getStatusColor(ticket.status)} text-xs md:text-sm`}>
                    {ticket.status}
                  </Badge>
                </div>
                <p className="text-xs md:text-sm text-green-700 dark:text-blue-200 mb-2">
                  {ticket.description}
                </p>
                <div className="flex flex-wrap items-center justify-between text-xs md:text-sm text-green-600 dark:text-blue-300">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 md:w-4 md:h-4" />
                    {ticket.createdAt.toLocaleDateString()}
                  </div>
                  <Badge variant="outline" className="text-xs md:text-sm">
                    {ticket.priority}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default TicketList;

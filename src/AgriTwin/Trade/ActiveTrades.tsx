import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

export const ActiveTrades = () => {
  const trades = [
    { id: 1, crop: 'Wheat', quantity: 1000, price: 25, status: 'pending' },
    { id: 2, crop: 'Rice', quantity: 500, price: 35, status: 'accepted' },
    { id: 3, crop: 'Corn', quantity: 750, price: 20, status: 'completed' },
  ];

  return (
    <Card className="w-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl">
      <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-6 rounded-t-2xl">
        <CardTitle className="text-xl font-bold text-green-900 dark:text-white">
          Active Trades
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <ScrollArea className="h-72">
          <div className="space-y-4">
            {trades.map((trade) => (
              <div 
                key={trade.id}
                className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold text-green-800 dark:text-blue-300">
                    {trade.crop}
                  </h3>
                  <p className="text-sm text-green-600 dark:text-blue-200">
                    {trade.quantity}kg at ₹{trade.price}/kg
                  </p>
                </div>
                <Badge 
                  variant={
                    trade.status === 'completed' ? 'default' :
                    trade.status === 'accepted' ? 'secondary' : 'outline'
                  }
                >
                  {trade.status}
                </Badge>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
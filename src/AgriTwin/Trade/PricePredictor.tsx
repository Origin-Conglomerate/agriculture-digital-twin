import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from 'lucide-react';

export const PricePredictor = () => {
  return (
    <Card className="w-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl">
      <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-6 rounded-t-2xl">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold text-green-900 dark:text-white flex items-center gap-2">
            <Sparkles className="text-green-600 dark:text-blue-400" />
            AI Price Predictions
          </CardTitle>
          <Badge variant="outline" className="bg-white/30 dark:bg-black/30">
            AI-Powered
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
            <h3 className="font-semibold text-green-800 dark:text-blue-300 mb-2">
              Wheat
            </h3>
            <div className="flex justify-between items-center">
              <span className="text-green-700 dark:text-blue-200">
                Predicted price range (next 30 days)
              </span>
              <span className="font-bold text-green-600 dark:text-blue-300">
              ₹24-28/kg
              </span>
            </div>
          </div>
          <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
            <h3 className="font-semibold text-green-800 dark:text-blue-300 mb-2">
              Rice
            </h3>
            <div className="flex justify-between items-center">
              <span className="text-green-700 dark:text-blue-200">
                Predicted price range (next 30 days)
              </span>
              <span className="font-bold text-green-600 dark:text-blue-300">
              ₹32-37/kg
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
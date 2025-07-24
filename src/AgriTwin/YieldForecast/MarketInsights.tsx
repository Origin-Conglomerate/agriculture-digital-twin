import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const MarketInsights = ({ marketData }) => {
    if (!marketData) return null;
  
    return (
      <Card className="w-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-green-800 dark:text-blue-300">
            Market Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-green-700 dark:text-blue-200">Current Price</p>
                <p className="font-semibold text-green-800 dark:text-blue-300">{marketData.currentPrice}</p>
              </div>
              <div>
                <p className="text-sm text-green-700 dark:text-blue-200">Demand Trend</p>
                <p className="font-semibold text-green-800 dark:text-blue-300">{marketData.demandTrend}</p>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-green-800 dark:text-blue-300 mb-2">Top Buyers</h4>
              <div className="space-y-2">
                {marketData.topBuyers.map((buyer, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-green-700 dark:text-blue-200">{buyer.name}</span>
                    <Badge variant="outline" className="bg-green-50 dark:bg-blue-900">
                      {buyer.offer}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  export default MarketInsights;

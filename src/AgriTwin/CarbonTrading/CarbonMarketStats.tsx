import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IndianRupee, BarChart3, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
const CarbonMarketStats = () => {
    return (

        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300">
                Carbon Market Overview
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                    { label: 'Current Price', value: '₹35.00', icon: IndianRupee },
                    { label: 'Market Volume', value: '2.5M credits', icon: BarChart3 },
                    { label: 'Price Trend', value: '+5.3%', icon: TrendingUp }
                ].map((stat, index) => (
                    <Card key={index} className="bg-white/50 dark:bg-gray-900/50">
                        <CardContent className="p-4 flex items-center justify-between">
                            <div>
                                <p className="text-sm text-green-700 dark:text-blue-200">{stat.label}</p>
                                <p className="text-lg font-bold text-green-800 dark:text-blue-300">{stat.value}</p>
                            </div>
                            <stat.icon className="w-8 h-8 text-green-600 dark:text-blue-400" />
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div className="flex gap-4 mt-4">
                <Button
                    variant="default"
                    className="bg-green-600 hover:bg-green-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                    <IndianRupee className="w-4 h-4 mr-2" />
                    Purchase Credits
                </Button>
                <Button
                    variant="outline"
                    className="border-green-600 text-green-600 hover:bg-green-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/50"
                >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Sell Credits
                </Button>
            </div>
        </div>



    )
};

export default CarbonMarketStats

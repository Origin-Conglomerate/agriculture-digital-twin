import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import {
    ChevronRight,
    Sparkles,
    Leaf,
    TrendingUp,
    BarChart3,
    Target,
    History,
    Calculator,
    DollarSign,
    Battery,
    Workflow
} from 'lucide-react';
import CarbonFootprintCalculator from './CarbonFootprintCalculator';
import CarbonMarketplace from './CarbonMarketplace';
import CreditGenerationTracking from './CreditGenerationTraking';
import CarbonMarketStats from './CarbonMarketStats';

const useCarbonMetrics = () => {
    const [metrics, setMetrics] = useState({
        footprint: null,
        sequestration: null,
        credits: null,
        energy: null
    });

    const generateMetrics = () => {
        const footprintData = [
            { type: 'current', message: "Current Carbon Footprint: 25.3 tons CO2e", value: 25.3 },
            { type: 'reduction', message: "15% reduction from last month", trend: -15 },
            { type: 'forecast', message: "Projected 30% reduction by year end", projection: -30 }
        ];

        const sequestrationData = [
            { type: 'captured', message: "Carbon Sequestered: 12.8 tons CO2e", value: 12.8 },
            { type: 'rate', message: "Sequestration Rate: +2.3 tons/month", rate: 2.3 },
            { type: 'potential', message: "Additional sequestration potential: 8.5 tons", potential: 8.5 }
        ];

        const creditData = [
            { type: 'available', message: "Available Credits: 45", value: 45 },
            { type: 'market', message: "Current Market Value: $35/credit", price: 35 },
            { type: 'pending', message: "Pending Verification: 12 credits", pending: 12 }
        ];

        const energyData = [
            { type: 'usage', message: "Monthly Energy Usage: 2,450 kWh", value: 2450 },
            { type: 'renewable', message: "Renewable Energy: 65%", percentage: 65 },
            { type: 'efficiency', message: "Energy Efficiency Score: 88/100", score: 88 }
        ];

        setMetrics({
            footprint: footprintData[Math.floor(Math.random() * footprintData.length)],
            sequestration: sequestrationData[Math.floor(Math.random() * sequestrationData.length)],
            credits: creditData[Math.floor(Math.random() * creditData.length)],
            energy: energyData[Math.floor(Math.random() * energyData.length)]
        });
    };

    useEffect(() => {
        generateMetrics();
        const interval = setInterval(generateMetrics, 10000);
        return () => clearInterval(interval);
    }, []);

    return metrics;
};

// Historical Data Chart Component
const HistoricalChart = ({ data }) => (
    <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-green-200 dark:stroke-blue-900" />
            <XAxis dataKey="name" className="text-green-700 dark:text-blue-200" />
            <YAxis className="text-green-700 dark:text-blue-200" />
            <Tooltip
                contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid #4ade80'
                }}
            />
            <Line
                type="monotone"
                dataKey="value"
                stroke="#4ade80"
                strokeWidth={2}
                dot={{ fill: '#4ade80' }}
            />
        </LineChart>
    </ResponsiveContainer>
);

// Market Stats Component


// Main Carbon Trading Component
export default function CarbonTrading() {
    const metrics = useCarbonMetrics();
    const [activeTab, setActiveTab] = useState('footprint');

    // Sample historical data
    const historicalData = [
        { name: 'Jan', value: 30 },
        { name: 'Feb', value: 28 },
        { name: 'Mar', value: 25 },
        { name: 'Apr', value: 23 },
        { name: 'May', value: 20 },
        { name: 'Jun', value: 18 }
    ];

    return (
        <Card className="w-full max-w-[92vw] bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-2xl hover:shadow-green-100/50 transition-all duration-300 ease-in-out">
            <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-6 rounded-t-2xl">
                <div className="flex flex-wrap md:flex-nowrap justify-between items-center gap-4">
                    <div className="flex flex-col">
                        <CardTitle className="text-lg md:text-2xl font-bold text-green-900 dark:text-white flex items-center gap-3">
                            <Leaf className="w-5 h-5 md:w-6 md:h-6 text-green-600 dark:text-blue-400" />
                            Carbon Trading Dashboard
                        </CardTitle>
                        <CardDescription className="text-sm md:text-base text-green-700 dark:text-blue-200">
                            Comprehensive carbon management and trading platform
                        </CardDescription>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="min-w-fit whitespace-nowrap bg-white/30 dark:bg-black/30 px-3 py-1 text-xs md:text-sm">
                            Real-time
                        </Badge>
                        <Badge variant="outline" className="min-w-fit whitespace-nowrap bg-white/30 dark:bg-black/30 px-3 py-1 text-xs md:text-sm">
                            AI-Powered
                        </Badge>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
                <Tabs
                    defaultValue="footprint"
                    className="w-full"
                    onValueChange={setActiveTab}
                >
                    <TabsList className="grid w-full h-full grid-cols-2 md:grid-cols-3 bg-green-50 dark:bg-gray-800">
                        <TabsTrigger
                            value="footprint"
                            className={`flex items-center gap-2 transition-all duration-300 ${activeTab === 'footprint' ? 'bg-green-200 dark:bg-blue-900' : ''
                                }`}
                        >
                            <BarChart3 className="w-4 h-4" /> Footprint
                        </TabsTrigger>
                        <TabsTrigger
                            value="sequestration"
                            className={`flex items-center gap-2 transition-all duration-300 ${activeTab === 'sequestration' ? 'bg-green-200 dark:bg-blue-900' : ''
                                }`}
                        >
                            <Leaf className="w-4 h-4" /> Sequestration
                        </TabsTrigger>
                        <TabsTrigger
                            value="trading"
                            className={`flex items-center gap-2 transition-all duration-300 ${activeTab === 'trading' ? 'bg-green-200 dark:bg-blue-900' : ''
                                }`}
                        >
                            <TrendingUp className="w-4 h-4" /> Trading
                        </TabsTrigger>

                        <TabsTrigger value="calculator" className={`flex items-center gap-2 transition-all duration-300 ${activeTab === 'calculator' ? 'bg-green-200 dark:bg-blue-900' : ''
                            }`}>
                            <Calculator className="w-4 h-4" /> Calculator
                        </TabsTrigger>
                        <TabsTrigger value="generation" className={`flex items-center gap-2 transition-all duration-300 ${activeTab === 'generation' ? 'bg-green-200 dark:bg-blue-900' : ''
                            }`}>
                            <Sparkles className="w-4 h-4" /> Credit Generation
                        </TabsTrigger>
                        <TabsTrigger value="marketplace" className={`flex items-center gap-2 transition-all duration-300 ${activeTab === 'marketplace' ? 'bg-green-200 dark:bg-blue-900' : ''
                            }`}>
                            <Sparkles className="w-4 h-4" /> Marketplace
                        </TabsTrigger>
                    </TabsList>

                    <div className="mt-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Current Metrics */}
                            <Card className="bg-white/50 dark:bg-gray-900/50">
                                <CardContent className="p-4">
                                    <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300 mb-4">
                                        Current Metrics
                                    </h3>
                                    {activeTab === 'footprint' && metrics.footprint && (
                                        <div className="space-y-2">
                                            <Badge variant="secondary">{metrics.footprint.type}</Badge>
                                            <p className="text-green-700 dark:text-blue-200">{metrics.footprint.message}</p>
                                        </div>
                                    )}
                                    {/* Similar sections for other tabs */}
                                </CardContent>
                            </Card>

                            {/* Historical Data */}
                            <Card className="bg-white/50 dark:bg-gray-900/50">
                                <CardContent className="p-4">
                                    <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300 mb-4">
                                        Historical Trends
                                    </h3>
                                    <HistoricalChart data={historicalData} />
                                </CardContent>
                            </Card>
                        </div>

                        {/* Market Integration */}
                        {activeTab === 'trading' && (
                            <CarbonMarketStats />
                        )}

                        {activeTab === 'calculator' && (

                            <CarbonFootprintCalculator />

                        )}

                        {activeTab === 'generation' && (

                            <CreditGenerationTracking />

                        )}
                        {activeTab === 'marketplace' && (

                            <CarbonMarketplace />
                        )}
                    </div>
                </Tabs>

                <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <Button
                        variant="outline"
                        className="group hover:bg-green-100 dark:hover:bg-blue-900 transition-all w-full md:w-auto"
                    >
                        Generate Report
                        <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <div className="flex items-center space-x-2">
                        <Workflow className="text-green-600 dark:text-blue-400" />
                        <span className="text-sm text-green-700 dark:text-blue-200">
                            Carbon Analytics v1.0
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
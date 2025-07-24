import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  RecycleIcon, 
  Factory, 
  ShoppingBag, 
  Repeat 
} from 'lucide-react';

const MetricItem = ({ icon: Icon, title, value, target, trend }) => (
  <div className="space-y-3">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/50">
          <Icon className="w-4 h-4 text-green-600 dark:text-blue-400" />
        </div>
        <span className="text-sm font-medium text-green-700 dark:text-blue-200">
          {title}
        </span>
      </div>
      <Badge variant={trend >= 0 ? "success" : "destructive"}>
        {trend > 0 ? "+" : ""}{trend}%
      </Badge>
    </div>
    <Progress value={(value / target) * 100} className="h-2">
      <div className="bg-green-500 dark:bg-blue-500 h-full transition-all" />
    </Progress>
    <div className="flex justify-between text-sm">
      <span className="text-green-600 dark:text-blue-300">{value}%</span>
      <span className="text-green-700 dark:text-blue-200">Target: {target}%</span>
    </div>
  </div>
);

export const CircularEconomyMetrics = () => (
  <Card className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-green-100/50 dark:border-blue-900/30">
    <CardHeader>
      <CardTitle className="text-green-900 dark:text-white flex items-center gap-2">
        <RecycleIcon className="text-green-600 dark:text-blue-400" />
        Circular Economy Metrics
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-6">
      <MetricItem
        icon={Repeat}
        title="Material Recycling Rate"
        value={75}
        target={90}
        trend={15}
      />
      <MetricItem
        icon={Factory}
        title="Sustainable Production"
        value={62}
        target={80}
        trend={8}
      />
      <MetricItem
        icon={ShoppingBag}
        title="Eco-friendly Packaging"
        value={85}
        target={95}
        trend={25}
      />
    </CardContent>
  </Card>
);
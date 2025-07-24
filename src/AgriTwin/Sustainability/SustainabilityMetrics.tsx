import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Leaf, Droplets, Factory, Recycle } from "lucide-react";

const MetricCard = ({ icon: Icon, title, value, trend, className }) => (
  <Card className={`p-4 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-green-100/50 dark:border-blue-900/30 ${className}`}>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg">
          <Icon className="w-5 h-5 text-green-600 dark:text-blue-400" />
        </div>
        <div>
          <p className="text-sm text-green-700 dark:text-blue-200">{title}</p>
          <p className="text-xl font-bold text-green-900 dark:text-white">{value}</p>
        </div>
      </div>
      <Badge variant={trend > 0 ? "success" : "destructive"}>
        {trend > 0 ? "+" : ""}{trend}%
      </Badge>
    </div>
  </Card>
);

export const SustainabilityMetrics = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    <MetricCard
      icon={Leaf}
      title="Carbon Footprint"
      value="12.5 tons"
      trend={-15}
    />
    <MetricCard
      icon={Droplets}
      title="Water Usage"
      value="850 gal/day"
      trend={-8}
    />
    <MetricCard
      icon={Factory}
      title="Energy Efficiency"
      value="92%"
      trend={5}
    />
    <MetricCard
      icon={Recycle}
      title="Waste Recycled"
      value="78%"
      trend={12}
    />
  </div>
);
import React from 'react';
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { DropletIcon, Timer } from 'lucide-react';

interface ZoneProps {
  id: number;
  active: boolean;
  moisture: number;
  schedule: string;
  onToggle: (id: number) => void;
}

function Zone({ id, active, moisture, schedule, onToggle }: ZoneProps) {
  return (
    <div className="flex items-center justify-between p-3 border-b last:border-b-0">
      <div className="flex items-center space-x-4">
        <Switch 
          checked={active} 
          onCheckedChange={() => onToggle(id)}
        />
        <div>
          <p className="font-medium">Zone {id}</p>
          <div className="flex items-center space-x-2 text-sm text-green-700 dark:text-blue-200">
            <Timer className="h-4 w-4" />
            <span>{schedule}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <DropletIcon className="h-4 w-4 text-blue-500" />
        <Progress value={moisture} className="w-24" />
        <span className="text-sm">{moisture}%</span>
      </div>
    </div>
  );
}

export default function IrrigationSystemSimulation() {
  const [zones, setZones] = React.useState([
    { id: 1, active: true, moisture: 65, schedule: "06:00 - 07:00" },
    { id: 2, active: false, moisture: 78, schedule: "07:00 - 08:00" },
    { id: 3, active: true, moisture: 45, schedule: "08:00 - 09:00" },
    { id: 4, active: true, moisture: 82, schedule: "18:00 - 19:00" },
  ]);

  const handleToggle = (id: number) => {
    setZones(zones.map(zone => 
      zone.id === id ? { ...zone, active: !zone.active } : zone
    ));
  };

  return (
    <Card className="bg-white/60 dark:bg-gray-900/60 border-green-100/50 dark:border-blue-900/30">
      {zones.map(zone => (
        <Zone
          key={zone.id}
          {...zone}
          onToggle={handleToggle}
        />
      ))}
    </Card>
  );
}
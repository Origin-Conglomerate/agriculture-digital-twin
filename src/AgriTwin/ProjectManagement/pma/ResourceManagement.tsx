import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  Tractor,
  SproutIcon,
  Droplets,
  AlertCircle,
  CheckCircle2,
  Clock
} from 'lucide-react';

const ResourceManagement = () => {
  const [resources] = useState({
    equipment: [
      {
        name: "Tractors & Harvesters",
        status: "Operational",
        utilization: 75,
        nextService: "3 days",
        type: "Equipment"
      },
      {
        name: "Irrigation Systems",
        status: "Maintenance Required",
        utilization: 92,
        nextService: "Tomorrow",
        type: "Infrastructure"
      },
      {
        name: "Drones",
        status: "Active",
        utilization: 60,
        nextService: "Next week",
        type: "Technology"
      }
    ],
    workforce: [
      {
        role: "Field Operations",
        assigned: 12,
        total: 15,
        efficiency: 88
      },
      {
        role: "Technical Experts",
        assigned: 8,
        total: 10,
        efficiency: 95
      },
      {
        role: "Project Managers",
        assigned: 5,
        total: 6,
        efficiency: 92
      }
    ]
  });

  return (
    <div className="space-y-6">
      {/* Equipment & Infrastructure */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {resources.equipment.map((item, index) => (
          <Card key={index} className="bg-white/50 dark:bg-gray-800/50">
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-green-800 dark:text-blue-300">
                      {item.name}
                    </h3>
                    <p className="text-sm text-green-600 dark:text-blue-200">
                      {item.type}
                    </p>
                  </div>
                  <Badge 
                    variant={item.status === "Operational" ? "outline" : "destructive"}
                    className="bg-white/30 dark:bg-black/30"
                  >
                    {item.status}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-green-700 dark:text-blue-200">
                    <span>Utilization</span>
                    <span>{item.utilization}%</span>
                  </div>
                  <Progress value={item.utilization} className="h-2" />
                </div>

                <div className="flex items-center gap-2 text-sm text-green-600 dark:text-blue-200">
                  <Clock className="w-4 h-4" />
                  Next Service: {item.nextService}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Workforce Management */}
      <Card className="bg-white/50 dark:bg-gray-800/50">
        <CardContent className="p-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Workforce Distribution
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {resources.workforce.map((team, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-green-700 dark:text-blue-200">
                      {team.role}
                    </span>
                    <Badge variant="outline" className="bg-green-100/50 dark:bg-blue-900/50">
                      {team.assigned}/{team.total}
                    </Badge>
                  </div>
                  <Progress value={team.efficiency} className="h-2" />
                  <div className="flex justify-between text-sm text-green-600 dark:text-blue-200">
                    <span>Efficiency</span>
                    <span>{team.efficiency}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: <Tractor className="w-5 h-5" />, label: "Schedule Equipment" },
          { icon: <SproutIcon className="w-5 h-5" />, label: "Resource Planning" },
          { icon: <Droplets className="w-5 h-5" />, label: "Irrigation Control" },
          { icon: <Users className="w-5 h-5" />, label: "Team Assignment" }
        ].map((action, index) => (
          <button
            key={index}
            className="flex items-center justify-center gap-2 p-4 bg-green-100 dark:bg-blue-900 text-green-800 dark:text-blue-200 rounded-lg hover:bg-green-200 dark:hover:bg-blue-800 transition-colors"
          >
            {action.icon}
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ResourceManagement;
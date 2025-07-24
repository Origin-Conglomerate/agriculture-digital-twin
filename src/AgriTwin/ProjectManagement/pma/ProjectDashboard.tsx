import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Map,
  TrendingUp,
  Calendar,
  MessageSquare,
  FileText,
  CheckCircle2,
  Clock
} from 'lucide-react';

const ProjectDashboard = () => {
  const [clients] = useState({
    activeProjects: [
      {
        clientName: "Prestige Farms",
        location: "Karnataka, India",
        area: "450 acres",
        status: "On Track",
        progress: 75,
        crops: ["Rice", "Wheat", "Vegetables"],
        lastUpdate: "2 hours ago"
      },
      {
        clientName: "Global Agro Inc.",
        location: "Punjab, India",
        area: "280 acres",
        status: "Attention Needed",
        progress: 60,
        crops: ["Cotton", "Sugarcane"],
        lastUpdate: "1 day ago"
      },
      {
        clientName: "Tech Gardens LLC",
        location: "Maharashtra, India",
        area: "150 acres",
        status: "Excellent",
        progress: 90,
        crops: ["Organic Vegetables", "Fruits"],
        lastUpdate: "5 hours ago"
      }
    ],
    metrics: {
      totalClients: 28,
      activeProjects: 45,
      completedProjects: 120,
      satisfactionRate: 92
    }
  });

  return (
    <div className="space-y-6">
      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Total Clients",
            value: clients.metrics.totalClients,
            icon: <Users className="w-5 h-5" />,
            trend: "+5 this month"
          },
          {
            label: "Active Projects",
            value: clients.metrics.activeProjects,
            icon: <TrendingUp className="w-5 h-5" />,
            trend: "+3 new projects"
          },
          {
            label: "Completed Projects",
            value: clients.metrics.completedProjects,
            icon: <CheckCircle2 className="w-5 h-5" />,
            trend: "+12 this year"
          },
          {
            label: "Satisfaction Rate",
            value: `${clients.metrics.satisfactionRate}%`,
            icon: <TrendingUp className="w-5 h-5" />,
            trend: "+2.5% increase"
          }
        ].map((metric, index) => (
          <Card key={index} className="bg-white/50 dark:bg-gray-800/50">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-green-600 dark:text-blue-200 flex items-center gap-2">
                    {metric.icon} {metric.label}
                  </p>
                  <h3 className="text-2xl font-bold text-green-800 dark:text-blue-300">
                    {metric.value}
                  </h3>
                  <p className="text-sm text-green-600 dark:text-blue-200">
                    {metric.trend}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Active Projects */}
      <Card className="bg-white/50 dark:bg-gray-800/50">
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300 mb-4">
            Active Client Projects
          </h3>
          <div className="space-y-4">
            {clients.activeProjects.map((project, index) => (
              <div key={index} className="p-4 bg-white/30 dark:bg-gray-900/30 rounded-lg">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between md:justify-start gap-4">
                      <h4 className="font-semibold text-green-800 dark:text-blue-300">
                        {project.clientName}
                      </h4>
                      <Badge 
                        variant={project.status === "Attention Needed" ? "destructive" : "outline"}
                        className="bg-white/30 dark:bg-black/30"
                      >
                        {project.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-green-600 dark:text-blue-200">
                      <Map className="w-4 h-4" />
                      {project.location} • {project.area}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.crops.map((crop, i) => (
                        <Badge key={i} variant="secondary">
                          {crop}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button className="px-4 py-2 bg-green-100 dark:bg-blue-900 text-green-800 dark:text-blue-200 rounded-lg hover:bg-green-200 dark:hover:bg-blue-800 transition-colors flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Schedule Visit
                    </button>
                    <button className="px-4 py-2 bg-green-100 dark:bg-blue-900 text-green-800 dark:text-blue-200 rounded-lg hover:bg-green-200 dark:hover:bg-blue-800 transition-colors flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Contact
                    </button>
                    <button className="px-4 py-2 bg-green-100 dark:bg-blue-900 text-green-800 dark:text-blue-200 rounded-lg hover:bg-green-200 dark:hover:bg-blue-800 transition-colors flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Reports
                    </button>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm text-green-600 dark:text-blue-200">
                  <Clock className="w-4 h-4" />
                  Last updated {project.lastUpdate}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectDashboard;
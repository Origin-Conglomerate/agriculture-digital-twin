import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Workflow,
  Play,
  Pause,
  Plus,
  Settings,
  AlertTriangle,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const WorkflowCard = ({ name, status, triggers, actions, lastRun }) => (
  <Card className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 hover:shadow-green-100/50 transition-all duration-300">
    <CardContent className="p-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-green-800 dark:text-blue-200">{name}</h3>
          <p className="text-sm text-green-600 dark:text-blue-300">Last run: {lastRun}</p>
        </div>
        <Switch 
          checked={status === 'Active'} 
          className="bg-green-600 dark:bg-blue-600"
        />
      </div>
      
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-white/30 dark:bg-black/30">
            {triggers} Triggers
          </Badge>
          <ArrowRight className="w-4 h-4 text-green-600 dark:text-blue-400" />
          <Badge variant="outline" className="bg-white/30 dark:bg-black/30">
            {actions} Actions
          </Badge>
        </div>
      </div>
    </CardContent>
  </Card>
);

const WorkflowAutomation = () => {
  const [workflows] = useState([
    {
      name: "Irrigation Schedule",
      status: "Active",
      triggers: 3,
      actions: 2,
      lastRun: "2 hours ago"
    },
    {
      name: "Resource Alert System",
      status: "Active",
      triggers: 4,
      actions: 5,
      lastRun: "1 hour ago"
    },
    {
      name: "Equipment Maintenance",
      status: "Inactive",
      triggers: 2,
      actions: 3,
      lastRun: "1 day ago"
    }
  ]);

  return (
    // <div className="container mx-auto p-4">
      <Card className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-2xl">
        {/* <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-6 rounded-t-2xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle className="text-2xl font-bold text-green-900 dark:text-white flex items-center gap-3">
                <Workflow className="text-green-600 dark:text-blue-400" />
                Workflow Automation
              </CardTitle>
              <p className="text-green-700 dark:text-blue-200 mt-1">
                Automate and streamline your resource management processes
              </p>
            </div>
            <Button className="bg-green-600 hover:bg-green-700 dark:bg-blue-600 dark:hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" /> Create Workflow
            </Button>
          </div>
        </CardHeader> */}

        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Workflow Stats */}
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-white/80 dark:bg-gray-800/80">
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <p className="text-sm text-green-700 dark:text-blue-200">Active Workflows</p>
                    <h3 className="text-2xl font-bold text-green-900 dark:text-white">12</h3>
                  </div>
                  <Play className="w-6 h-6 text-green-600 dark:text-blue-400" />
                </CardContent>
              </Card>

              <Card className="bg-white/80 dark:bg-gray-800/80">
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <p className="text-sm text-green-700 dark:text-blue-200">Paused Workflows</p>
                    <h3 className="text-2xl font-bold text-green-900 dark:text-white">3</h3>
                  </div>
                  <Pause className="w-6 h-6 text-green-600 dark:text-blue-400" />
                </CardContent>
              </Card>

              <Card className="bg-white/80 dark:bg-gray-800/80">
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <p className="text-sm text-green-700 dark:text-blue-200">Total Automations</p>
                    <h3 className="text-2xl font-bold text-green-900 dark:text-white">47</h3>
                  </div>
                  <Settings className="w-6 h-6 text-green-600 dark:text-blue-400" />
                </CardContent>
              </Card>
            </div>

            {/* Workflow Builder Section */}
            <div className="lg:col-span-1">
              <Card className="bg-white/80 dark:bg-gray-800/80">
                <CardContent className="p-4 space-y-4">
                  <h3 className="font-semibold text-green-800 dark:text-blue-200">
                    Quick Workflow Builder
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="p-3 border-2 border-dashed border-green-200 dark:border-blue-800 rounded-lg">
                      <div className="flex items-center justify-center h-24 text-green-700 dark:text-blue-200">
                        <Plus className="w-6 h-6 mr-2" />
                        Drag triggers here
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <ArrowRight className="w-6 h-6 text-green-600 dark:text-blue-400" />
                    </div>

                    <div className="p-3 border-2 border-dashed border-green-200 dark:border-blue-800 rounded-lg">
                      <div className="flex items-center justify-center h-24 text-green-700 dark:text-blue-200">
                        <Plus className="w-6 h-6 mr-2" />
                        Drag actions here
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-green-600 hover:bg-green-700 dark:bg-blue-600 dark:hover:bg-blue-700">
                    <CheckCircle className="w-4 h-4 mr-2" /> Save Workflow
                  </Button>
                </CardContent>
              </Card>

              {/* Available Triggers/Actions */}
              <Card className="mt-4 bg-white/80 dark:bg-gray-800/80">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-green-800 dark:text-blue-200 mb-3">
                    Available Components
                  </h3>
                  
                  <div className="space-y-2">
                    {/* Triggers */}
                    <div className="p-2 bg-green-50 dark:bg-gray-700 rounded-lg">
                      <p className="text-sm font-medium text-green-700 dark:text-blue-200 mb-2">
                        Triggers
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        <Badge className="bg-white/30 dark:bg-black/30">Time Schedule</Badge>
                        <Badge className="bg-white/30 dark:bg-black/30">Sensor Alert</Badge>
                        <Badge className="bg-white/30 dark:bg-black/30">Resource Level</Badge>
                        <Badge className="bg-white/30 dark:bg-black/30">Weather Update</Badge>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="p-2 bg-green-50 dark:bg-gray-700 rounded-lg">
                      <p className="text-sm font-medium text-green-700 dark:text-blue-200 mb-2">
                        Actions
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        <Badge className="bg-white/30 dark:bg-black/30">Start Irrigation</Badge>
                        <Badge className="bg-white/30 dark:bg-black/30">Send Alert</Badge>
                        <Badge className="bg-white/30 dark:bg-black/30">Log Event</Badge>
                        <Badge className="bg-white/30 dark:bg-black/30">Adjust Settings</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Active Workflows */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {workflows.map((workflow, index) => (
                  <WorkflowCard key={index} {...workflow} />
                ))}
              </div>

              {/* Workflow Monitoring */}
              <Card className="mt-6 bg-white/80 dark:bg-gray-800/80">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-green-800 dark:text-blue-200">
                      Recent Executions
                    </h3>
                    <Button variant="outline" size="sm">
                      View All Logs
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {[
                      {
                        workflow: "Irrigation Schedule",
                        status: "Success",
                        time: "10 minutes ago",
                        message: "Completed irrigation cycle"
                      },
                      {
                        workflow: "Resource Alert",
                        status: "Warning",
                        time: "1 hour ago",
                        message: "Low water level detected"
                      }
                    ].map((execution, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-white/50 dark:bg-gray-900/50 rounded-lg"
                      >
                        <div className="flex items-center gap-2">
                          {execution.status === "Success" ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <AlertTriangle className="w-4 h-4 text-yellow-600" />
                          )}
                          <div>
                            <p className="text-sm font-medium text-green-800 dark:text-blue-200">
                              {execution.workflow}
                            </p>
                            <p className="text-xs text-green-600 dark:text-blue-300">
                              {execution.message}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs text-green-600 dark:text-blue-300">
                          {execution.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    // {/* </div> */}
  );
};

export default WorkflowAutomation;
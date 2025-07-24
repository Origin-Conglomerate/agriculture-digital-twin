import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Clock,
  Calendar as CalendarIcon,
  Users,
  Tractor,
  AlertCircle,
  Check,
  Plus
} from 'lucide-react';

const ScheduleCard = ({ title, time, assignee, equipment, status }) => (
  <Card className="w-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 hover:shadow-green-100/50 transition-all duration-300">
    <CardContent className="p-4">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-green-800 dark:text-blue-200">{title}</h3>
        <Badge 
          variant={status === 'Scheduled' ? 'outline' : status === 'In Progress' ? 'default' : 'secondary'}
          className="bg-white/30 dark:bg-black/30"
        >
          {status}
        </Badge>
      </div>
      <div className="space-y-2">
        <div className="flex items-center text-sm text-green-700 dark:text-blue-200">
          <Clock className="w-4 h-4 mr-2" />
          {time}
        </div>
        <div className="flex items-center text-sm text-green-700 dark:text-blue-200">
          <Users className="w-4 h-4 mr-2" />
          {assignee}
        </div>
        <div className="flex items-center text-sm text-green-700 dark:text-blue-200">
          <Tractor className="w-4 h-4 mr-2" />
          {equipment}
        </div>
      </div>
    </CardContent>
  </Card>
);

const ResourceScheduling = () => {
  const [date, setDate] = useState(new Date());
  const [schedules, setSchedules] = useState([
    {
      title: "Field Irrigation",
      time: "08:00 AM - 10:00 AM",
      assignee: "John Smith",
      equipment: "Irrigation System A",
      status: "In Progress"
    },
    {
      title: "Crop Inspection",
      time: "11:00 AM - 01:00 PM",
      assignee: "Emma Davis",
      equipment: "Drone #123",
      status: "Scheduled"
    },
    {
      title: "Fertilizer Application",
      time: "02:00 PM - 04:00 PM",
      assignee: "Mike Johnson",
      equipment: "Tractor B",
      status: "Pending"
    }
  ]);

  return (
    <Card className="w-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-2xl">
      <CardContent className="p-2 sm:p-4 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Calendar Section */}
          <div className="lg:col-span-1">
            <Card className="bg-white/80 dark:bg-gray-800/80">
              <CardContent className="p-2 sm:p-4">
                <div className="w-full overflow-x-auto">
                  <div className="min-w-[280px] w-full">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="border-2 border-green-100/50 dark:border-blue-900/30 rounded-lg w-full"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Schedule Form */}
            <Card className="mt-4 bg-white/80 dark:bg-gray-800/80">
              <CardContent className="p-4 space-y-4">
                <h3 className="font-semibold text-green-800 dark:text-blue-200">Quick Schedule</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="task">Task</Label>
                  <Input 
                    id="task" 
                    placeholder="Enter task name"
                    className="border-green-100 dark:border-blue-900"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="assignee">Assignee</Label>
                  <Select>
                    <SelectTrigger className="border-green-100 dark:border-blue-900">
                      <SelectValue placeholder="Select team member" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="john">John Smith</SelectItem>
                      <SelectItem value="emma">Emma Davis</SelectItem>
                      <SelectItem value="mike">Mike Johnson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="equipment">Equipment</Label>
                  <Select>
                    <SelectTrigger className="border-green-100 dark:border-blue-900">
                      <SelectValue placeholder="Select equipment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tractor-a">Tractor A</SelectItem>
                      <SelectItem value="tractor-b">Tractor B</SelectItem>
                      <SelectItem value="drone">Drone #123</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700 dark:bg-blue-600 dark:hover:bg-blue-700">
                  <Check className="w-4 h-4 mr-2" /> Schedule Task
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Schedule List Section */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {schedules.map((schedule, index) => (
                <ScheduleCard key={index} {...schedule} />
              ))}
            </div>

            {/* Schedule Timeline */}
            <Card className="mt-6 bg-white/80 dark:bg-gray-800/80">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-green-800 dark:text-blue-200">
                    Today's Timeline
                  </h3>
                  <Badge variant="outline" className="bg-white/30 dark:bg-black/30">
                    8 Tasks
                  </Badge>
                </div>
                
                <div className="h-24 flex items-center justify-center text-green-700 dark:text-blue-200">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Timeline visualization coming soon
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResourceScheduling;
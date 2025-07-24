import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { 
  Microscope, 
  TestTube2, 
  Save 
} from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const ScheduleLabTest: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [testType, setTestType] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');

  const labTestTypes = [
    { 
      value: 'soil', 
      label: 'Comprehensive Soil Analysis', 
      icon: <Microscope className="mr-2 h-4 w-4" /> 
    },
    { 
      value: 'plant', 
      label: 'Plant Health Pathology', 
      icon: <Microscope className="mr-2 h-4 w-4" /> 
    },
    { 
      value: 'nutrient', 
      label: 'Nutrient Composition Test', 
      icon: <TestTube2 className="mr-2 h-4 w-4" /> 
    }
  ];

  const handleScheduleTest = () => {
    // Placeholder for scheduling logic
    console.log('Scheduling Lab Test', {
      date: selectedDate,
      testType,
      additionalNotes
    });
    // TODO: Implement actual scheduling mechanism
  };

  return (
    // Changed from "grid md:grid-cols-2" to "grid grid-cols-1 lg:grid-cols-2" 
    // so that mobile and tablet views use a single column while laptop view uses two columns.
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 -mr-2">
      <Card className="p-3 bg-green-50 dark:bg-gray-800/50 space-y-3 ml-15">
  <div className="flex items-center justify-between">
    <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300">
      Select Test Date
    </h3>
  </div>
  {/* Wrapper added to center the calendar on tablet view */}
  <div className="md:flex md:justify-center lg:justify-start">
    <Calendar
      mode="range"
      selected={selectedDate}
      onSelect={setSelectedDate}
      className="rounded-md dark:border-blue-900/30"
    />
  </div>
</Card>

      <Card className="p-6 bg-green-50 dark:bg-gray-800/50 space-y-4">
        <div className="space-y-4">
          <div>
            <Label className="text-green-800 dark:text-blue-300">
              Select Test Type
            </Label>
            <Select onValueChange={setTestType}>
              <SelectTrigger className="w-full mt-2">
                <SelectValue placeholder="Choose a lab test" />
              </SelectTrigger>
              <SelectContent>
                {labTestTypes.map((test) => (
                  <SelectItem key={test.value} value={test.value}>
                    <div className="flex items-center">
                      {test.icon}
                      {test.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-green-800 dark:text-blue-300">
              Additional Notes
            </Label>
            <Textarea
              placeholder="Add specific instructions or observations"
              className="mt-2"
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
            />
          </div>

          <Button 
            onClick={handleScheduleTest}
            className="w-full bg-green-600 hover:bg-green-700 dark:bg-blue-800 dark:hover:bg-blue-900"
          >
            <Save className="mr-2 h-4 w-4" />
            Schedule Lab Test
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ScheduleLabTest;

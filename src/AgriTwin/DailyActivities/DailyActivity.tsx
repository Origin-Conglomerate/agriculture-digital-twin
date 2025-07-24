import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, BarChart2, List, Calendar } from 'lucide-react';
import { ActivityCard } from './ActivityCard';
import { ActivityForm } from './ActivityForm';
import { ActivityAnalytics } from './ActivityAnalytics';
import { ActivityList } from './ActivityList';

const dummyActivities = [
  {
    id: '1',
    type: 'Irrigation',
    date: '2024-03-01',
    description: 'Morning irrigation schedule for Zone A',
  },
  // Add more dummy data as needed
];

export default function DailyActivities() {
  const [activities, setActivities] = useState(dummyActivities);

  const handleAddActivity = (data: any) => {
    // Implement add logic
  };

  const handleEditActivity = (id: string) => {
    // Implement edit logic
  };

  const handleDeleteActivity = (id: string) => {
    // Implement delete logic
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <ActivityCard
        title="Daily Farm Activities"
        description="Manage and track your daily farming operations"
        badge="Smart Tracking"
      >
        <Tabs defaultValue="new" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 sm:grid-cols-3 bg-green-50 dark:bg-gray-800">
            <TabsTrigger value="new" className="flex items-center gap-2">
              <Plus className="w-4 h-4" /> New Activity
            </TabsTrigger>
            <TabsTrigger value="list" className="flex items-center gap-2">
              <List className="w-4 h-4" /> Activity List
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart2 className="w-4 h-4" /> Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="new" className="mt-6">
            <ActivityForm onSubmit={handleAddActivity} />
          </TabsContent>

          <TabsContent value="list" className="mt-6">
            <ActivityList
              activities={activities}
              onEdit={handleEditActivity}
              onDelete={handleDeleteActivity}
            />
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <ActivityAnalytics />
          </TabsContent>
        </Tabs>
      </ActivityCard>
    </div>
  );
}
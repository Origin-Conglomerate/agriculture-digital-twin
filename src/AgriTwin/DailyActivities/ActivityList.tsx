import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Save } from 'lucide-react';
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { useSelector } from 'react-redux';
import { GET, DELETE, PUT } from '@/utils/ApiHandler';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";

interface Activity {
  _id: string;
  type: string;
  date: string;
  description: string;
}

export function ActivityList() {
  const {token, tenantId} = useSelector((state: any) => state.login);
  const { toast } = useToast();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [loading, setLoading] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateFormData, setUpdateFormData] = useState({
    type: '',
    date: new Date(),
    description: ''
  });

  const fetchActivities = async () => {
    setLoading(true);
    try {
      const response = await GET(
        `${import.meta.env.VITE_API_URL}/api/v1/dailylogs/list?tenantId=${tenantId}&date=${selectedDate}`,
        token
      );
      if (response.data.activities) {
        setActivities(response.data.activities);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, [selectedDate]);

  const handleDelete = async (id: string) => {
    try {
      const response = await DELETE(
        `${import.meta.env.VITE_API_URL}/api/v1/dailylogs/delete`,{id:id},
        token
      );
      if (response.success) {
        toast({
          title: "Success",
          description: "Activity deleted successfully",
        });
        fetchActivities();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete activity",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (activity: Activity) => {
    setSelectedActivity(activity);
    setUpdateFormData({
      type: activity.type,
      date: activity.date,
      description: activity.description
    });
    setUpdateDialogOpen(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedActivity) return;
    
    setUpdateLoading(true);
    try {
      const response = await PUT(
        `${import.meta.env.VITE_API_URL}/api/v1/dailylogs/${selectedActivity._id}?tenantId=${tenantId}`,
        updateFormData,
        token
      );
      
      if (response.success) {
        toast({
          title: "Success",
          description: "Activity updated successfully",
        });
        setUpdateDialogOpen(false);
        fetchActivities();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update activity",
        variant: "destructive",
      });
    } finally {
      setUpdateLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Calendar
          mode="single"
          selected={new Date(selectedDate)}
          onSelect={(date) => date && setSelectedDate(format(date, 'yyyy-MM-dd'))}
          className="rounded-md border"
        />
      </div>

      <div className="overflow-x-auto">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-green-600 dark:text-blue-600" />
            <span className="ml-2 text-lg text-gray-600 dark:text-gray-400">Loading activities...</span>
          </div>
        ) : activities.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-lg text-gray-600 dark:text-gray-400">No activities found for this date</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activities.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell className="font-medium">{activity.type}</TableCell>
                  <TableCell> {new Date(activity.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</TableCell>
                  <TableCell className="max-w-xs">{activity.description}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEdit(activity)}
                        className="h-8 w-8"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDelete(activity._id)}
                        className="h-8 w-8 text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <Dialog open={updateDialogOpen} onOpenChange={setUpdateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Activity</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-green-700 dark:text-blue-200">
                  Activity Type
                </label>
                <Select
                  value={updateFormData.type}
                  onValueChange={(value) => setUpdateFormData({...updateFormData, type: value})}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select activity type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Land Preparation">Land Preparation</SelectItem>
                    <SelectItem value="Irrigation">Irrigation</SelectItem>
                    <SelectItem value="Trans-Planting">Trans-Planting</SelectItem>
                    <SelectItem value="Fertigation">Fertigation</SelectItem>
                    <SelectItem value="Gap-Filling">Gap-Filling</SelectItem>
                    <SelectItem value="Inter-Cultivation">Inter-Cultivation</SelectItem>
                    <SelectItem value="Drenching">Drenching</SelectItem>
                    <SelectItem value="Insecticides">Insecticides</SelectItem>
                    <SelectItem value="Fungicides">Fungicides</SelectItem>
                    <SelectItem value="Harvesting">Harvesting</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-green-700 dark:text-blue-200">
                  Date
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {updateFormData.date ? format(updateFormData.date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={updateFormData.date}
                      onSelect={(date) => date && setUpdateFormData({...updateFormData, date})}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-green-700 dark:text-blue-200">
                Description
              </label>
              <Textarea 
                value={updateFormData.description}
                onChange={(e) => setUpdateFormData({...updateFormData, description: e.target.value})}
                placeholder="Enter activity details..."
                className="min-h-[100px]"
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setUpdateDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={updateLoading}
                className="bg-green-600 hover:bg-green-700 dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                {updateLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Update Activity
                  </>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
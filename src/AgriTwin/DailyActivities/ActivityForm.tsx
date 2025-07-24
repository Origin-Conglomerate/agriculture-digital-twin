import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Save } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import axios from 'axios';
import { useSelector } from 'react-redux';
import { POST } from '@/utils/ApiHandler';

interface ActivityFormProps {
  onSubmit: (data: any) => void;
  onSuccess?: () => void;
  initialData?: any;
}

export function ActivityForm({ onSubmit, onSuccess, initialData }: ActivityFormProps) {
  const {tenantId, token} = useSelector((state: any) => state.login);
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: initialData?.type || '',
    date: initialData?.date || format(new Date(), 'yyyy-MM-dd'),
    description: initialData?.description || ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await POST(
        `${import.meta.env.VITE_API_URL}/api/v1/dailylogs/create?tenantId=${tenantId}`, 
        formData,
        token
      );
      if (response.data.activity) {
        toast({
          title: "Success",
          description: "Activity log created successfully",
        });
        
        // Reset form
        setFormData({
          type: '',
          date: format(new Date(), 'yyyy-MM-dd'),
          description: ''
        });
        
        onSuccess?.();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create activity log",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-green-700 dark:text-blue-200">
            Activity Type
          </label>
          <Select
            value={formData.type}
            onValueChange={(value) => setFormData({...formData, type: value})}
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
              <SelectItem value="Weeding">Weeding</SelectItem>
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
                {formData.date ? format(new Date(formData.date), "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={new Date(formData.date)}
                onSelect={(date) => date && setFormData({
                  ...formData, 
                  date: format(date, 'yyyy-MM-dd')
                })}
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
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          placeholder="Enter activity details..."
          className="min-h-[100px]"
        />
      </div>

      <Button 
        type="submit" 
        disabled={loading}
        className="w-full sm:w-auto bg-green-600 hover:bg-green-700 dark:bg-blue-600 dark:hover:bg-blue-700"
      >
        <Save className="w-4 h-4 mr-2" />
        {loading ? 'Saving...' : 'Save Activity'}
      </Button>
    </form>
  );
}
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Loader2, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api/v1/consultation`;

// Default time slots (always used as availability).
const defaultSlots = [
  { id: 1, time: "10:00", isBooked: false },
  { id: 2, time: "11:00", isBooked: false },
  { id: 3, time: "14:00", isBooked: false },
  { id: 4, time: "15:00", isBooked: false },
  { id: 5, time: "16:00", isBooked: false }
];

interface Expert {
  _id: string;
  name: string;
  specialty: string;
  prices: {
    video: number;
    audio: number;
    chat: number;
  };
  // Availability is not fetched; this field is ignored.
  availability?: {
    date: string;
    timeSlots: {
      id: number;
      time: string;
      isBooked: boolean;
    }[];
  }[];
}

interface ConsultationFormData {
  date: string;
  time: string;
  type: 'video' | 'audio' | 'chat';
  expert: string;
}

// Hardcoded experts with valid ObjectId strings.
const hardcodedExperts: Expert[] = [
  {
    _id: "Dr. Harish Kumar",
    name: "Dr. Harish Kumar",
    specialty: "Crop Management",
    prices: { video: 1000, audio: 800, chat: 600 }
  },
  {
    _id: "Dr. Narayan Swamy",
    name: "Dr. Narayan Swamy",
    specialty: "Soil Health",
    prices: { video: 1200, audio: 1000, chat: 700 }
  },
  {
    _id: "Dr. Ramesh",
    name: "Dr. Ramesh ",
    specialty: "Irrigation Techniques",
    prices: { video: 1500, audio: 1200, chat: 900 }
  }
  
];

export function ConsultationBooking() {
  // Use hardcoded experts; no fetching from backend.
  const [experts] = useState<Expert[]>(hardcodedExperts);
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const [consultationType, setConsultationType] = useState<'video' | 'audio' | 'chat'>('video');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState<ConsultationFormData>({
    date: '', // in "yyyy-MM-dd" format
    time: '',
    type: 'video',
    expert: ''
  });

  // When an expert is selected, update form data.
  const handleExpertChange = (expertId: string) => {
    const expert = experts.find(e => e._id === expertId) || null;
    setSelectedExpert(expert);
    setFormData(prev => ({ ...prev, expert: expertId }));
  };

  const handleDateSelect = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate);
      const formatted = format(newDate, 'yyyy-MM-dd');
      console.log("Date selected:", formatted);
      setFormData(prev => ({ ...prev, date: formatted }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    try {
      const response = await fetch(`${API_BASE_URL}/consultation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to book consultation');
      }
      
      // Show success toast notification
      toast({
        title: "Consultation Booked Successfully!",
        description: `Your ${consultationType} consultation with ${selectedExpert?.name} on ${formData.date} at ${formData.time} has been scheduled.`,
        variant: "default",
      });
      
      setSuccess(true);
      
      // Reset form after booking
      setFormData({
        date: '',
        time: '',
        type: 'video',
        expert: ''
      });
      setDate(undefined);
      setSelectedExpert(null);
      setConsultationType('video');
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to book consultation';
      setError(errorMessage);
      console.error('Error booking consultation:', err);
    } finally {
      setLoading(false);
    }
  };

  // Since we are not fetching availability, always use defaultSlots.
  const availableSlots = defaultSlots;
  console.log("Available slots:", availableSlots);

  return (
    <Card className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30">
      <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50">
        <CardTitle className="text-xl font-bold text-green-900 dark:text-white">
          Book Consultation
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        {error && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        
        {success && (
          <Alert className="bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400">
            <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-500" />
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>
              Your consultation has been booked successfully.
            </AlertDescription>
          </Alert>
        )}

        {/* Expert Selection */}
        <div className="space-y-2">
          <Label htmlFor="expert">Select Expert</Label>
          <Select onValueChange={handleExpertChange} value={formData.expert}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose an expert" />
            </SelectTrigger>
            <SelectContent>
              {experts.map(expert => (
                <SelectItem key={expert._id} value={expert._id}>
                  {expert.name} - {expert.specialty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Consultation Prices */}
        {selectedExpert && (
          <div className="space-y-2">
            <Label>Consultation Prices</Label>
            <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-center">
                <p className="font-semibold">Video Call</p>
                <p className="text-green-600 dark:text-green-400">₹{selectedExpert.prices.video}</p>
              </div>
              <div className="text-center">
                <p className="font-semibold">Audio Call</p>
                <p className="text-green-600 dark:text-green-400">₹{selectedExpert.prices.audio}</p>
              </div>
              <div className="text-center">
                <p className="font-semibold">Chat</p>
                <p className="text-green-600 dark:text-green-400">₹{selectedExpert.prices.chat}</p>
              </div>
            </div>
          </div>
        )}

        {/* Consultation Type */}
        <div className="space-y-2">
          <Label htmlFor="type">Consultation Type</Label>
          <Select 
            value={consultationType} 
            onValueChange={(value: 'video' | 'audio' | 'chat') => {
              setConsultationType(value);
              setFormData(prev => ({ ...prev, type: value }));
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="video">Video Call</SelectItem>
              <SelectItem value="audio">Audio Call</SelectItem>
              <SelectItem value="chat">Chat</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Date Selection */}
        {selectedExpert && (
          <div className="space-y-2">
            <Label>Select Date</Label>
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              // Optionally enable disabling weekends.
              disabled={(date) => {
                const day = date.getDay();
                return day === 0 || day === 6;
              }}
              className="rounded-md border"
            />
            <p className="text-sm text-gray-500">
              Only weekdays are available for booking
            </p>
          </div>
        )}

        {/* Time Slot Selection */}
        {selectedExpert && formData.date && (
          <div className="space-y-2">
            <Label htmlFor="time">Preferred Time</Label>
            <Select 
              onValueChange={(time) => {
                console.log("Time slot selected:", time);
                setFormData(prev => ({ ...prev, time }));
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select time slot" />
              </SelectTrigger>
              <SelectContent>
                {availableSlots.map(slot => (
                  <SelectItem key={slot.id} value={slot.time}>
                    {slot.time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Submit Button */}
        <Button 
          onClick={handleSubmit}
          className="w-full bg-green-600 hover:bg-green-700 dark:bg-blue-600 dark:hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Booking...</>
          ) : (
            'Schedule Consultation'
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
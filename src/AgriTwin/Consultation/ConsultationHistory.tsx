import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Video, PhoneCall, MessageSquare } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "@/hooks/use-toast";  // shadcn toast

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api/v1/consultation`;

interface Consultation {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  type: 'video' | 'audio' | 'chat';
  status: 'scheduled' | 'completed' | 'cancelled';
  expert: string;
  rescheduleReason?: string;
}

export function ConsultationHistory() {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchConsultations();
  }, []);

  const fetchConsultations = async () => {
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) throw new Error('Failed to fetch consultations');
      const data = await response.json();
      setConsultations(data);
    } catch (error) {
      console.error('Error fetching consultations:', error);
      setError('Failed to load consultations');
    }
  };

  const handleCancel = async (consultationId: string) => {
    if (!window.confirm("Are you sure you want to cancel this consultation?")) {
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/${consultationId}/cancel`, {
        method: 'POST'
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to cancel consultation');
      }
      toast({
        title: "Consultation Cancelled",
        description: "The consultation has been cancelled successfully.",
        variant: "destructive"
      });
      fetchConsultations();
    } catch (error) {
      console.error('Error cancelling consultation:', error);
      setError(error instanceof Error ? error.message : 'Failed to cancel consultation');
    }
  };

  const handleDelete = async (consultationId: string) => {
    if (!window.confirm("Are you sure you want to delete this consultation? This action cannot be undone.")) {
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/${consultationId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete consultation');
      }
      toast({
        title: "Consultation Deleted",
        description: "The consultation has been deleted successfully.",
        variant: "default"
      });
      fetchConsultations();
    } catch (error) {
      console.error('Error deleting consultation:', error);
      setError(error instanceof Error ? error.message : 'Failed to delete consultation');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return '';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="w-4 h-4" />;
      case 'audio':
        return <PhoneCall className="w-4 h-4" />;
      case 'chat':
        return <MessageSquare className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const now = new Date();
  const upcomingConsultations = consultations.filter(c => {
    const consultationDateTime = new Date(`${c.date}T${c.time}`);
    return c.status === 'scheduled' && consultationDateTime >= now;
  });

  const pastConsultations = consultations
    .filter(c => {
      const consultationDateTime = new Date(`${c.date}T${c.time}`);
      return (c.status === 'scheduled' && consultationDateTime < now) || c.status !== 'scheduled';
    })
    .map(c => {
      const consultationDateTime = new Date(`${c.date}T${c.time}`);
      if (c.status === 'scheduled' && consultationDateTime < now) {
        return { ...c, status: 'completed' };
      }
      return c;
    });

  return (
    <Card className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30">
      <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50">
        <CardTitle className="text-xl font-bold text-green-900 dark:text-white">
          Consultation History
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Upcoming Consultations</h3>
          <ScrollArea className="h-[200px] pr-4">
            {upcomingConsultations.length > 0 ? (
              upcomingConsultations.map(consultation => (
                <div key={consultation._id} className="mb-4 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-green-800 dark:text-blue-300">
                        {consultation.title}
                      </h4>
                      <p className="text-sm text-green-700 dark:text-blue-200">
                        {consultation.expert}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getTypeIcon(consultation.type)}
                      <Badge className={getStatusColor(consultation.status)}>
                        {consultation.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-green-600 dark:text-blue-300">
                    {consultation.date} at {consultation.time}
                  </div>
                  <div className="mt-2 flex gap-2">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleCancel(consultation._id)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-sm text-gray-500">No upcoming consultations.</div>
            )}
          </ScrollArea>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Past Consultations</h3>
          <ScrollArea className="h-[200px] pr-4">
            {pastConsultations.length > 0 ? (
              pastConsultations.map(consultation => (
                <div key={consultation._id} className="mb-4 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-green-800 dark:text-blue-300">
                        {consultation.title}
                      </h4>
                      <p className="text-sm text-green-700 dark:text-blue-200">
                        {consultation.expert}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getTypeIcon(consultation.type)}
                      <Badge className={getStatusColor(consultation.status)}>
                        {consultation.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-green-600 dark:text-blue-300">
                    {consultation.date} at {consultation.time}
                  </div>
                  {consultation.rescheduleReason && (
                    <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      Rescheduled: {consultation.rescheduleReason}
                    </div>
                  )}
                  <div className="mt-2 flex gap-2">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(consultation._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-sm text-gray-500">No past consultations.</div>
            )}
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
}

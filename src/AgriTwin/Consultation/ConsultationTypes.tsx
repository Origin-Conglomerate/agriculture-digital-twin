
export interface Expert {
  _id?: string;
  name: string;
  specialty: string;
  prices: {
    video: number;
    audio: number;
    chat: number;
  };
  availability: {
    date: string;
    timeSlots: {
      time: string;
      isBooked: boolean;
    }[];
  }[];
}

export interface Consultation {
  id(id: any, selectedDate: Date, reason: string): unknown;
  _id?: string;
  title: string;
  description: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  type: 'video' | 'audio' | 'chat';
  expert: Expert;
  rescheduleReason?: string;
}

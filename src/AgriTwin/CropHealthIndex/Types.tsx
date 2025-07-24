export interface CropHealthData {
    month: number;
    healthIndex: number;
    imageUrl?: string;
    status: 'Excellent' | 'Good' | 'Fair' | 'Poor';
    issues?: string[];
    recommendations?: string[];
  }
  
  export interface CropLifeCycleStage {
    stage: string;
    duration: string;
    currentStage: boolean;
    completed: boolean;
    healthIndex: number;
    description: string;
  }
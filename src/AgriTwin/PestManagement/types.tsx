type PestDetection = {
    pestType: string;
    confidence: number;
    location: string;
    timestamp: string;
    riskLevel: 'low' | 'medium' | 'high';
    count: number;
  };
  
  type PestAlert = {
    id: string;
    type: string;
    severity: 'low' | 'medium' | 'high';
    message: string;
    location: string;
    timestamp: string;
  };
  
  type PestTrend = {
    pestType: string;
    monthlyData: {
      month: string;
      count: number;
      damage: number;
    }[];
  };
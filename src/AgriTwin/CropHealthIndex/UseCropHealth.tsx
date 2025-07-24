import { useState, useEffect } from 'react';
import { CropHealthData } from './Types';

export const useCropHealth = () => {
  const [healthData, setHealthData] = useState<CropHealthData[]>([]);
  const [currentMonth, setCurrentMonth] = useState(0);

  const calculateStatus = (index: number): CropHealthData['status'] => {
    if (index >= 90) return 'Excellent';
    if (index >= 75) return 'Good';
    if (index >= 60) return 'Fair';
    return 'Poor';
  };

  useEffect(() => {
    // Simulate fetching historical data
    const mockData: CropHealthData[] = Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      healthIndex: Math.floor(Math.random() * (95 - 60) + 60),
      status: 'Good',
      issues: [],
      recommendations: []
    })).map(data => ({
      ...data,
      status: calculateStatus(data.healthIndex),
      issues: data.healthIndex < 75 ? ['Nutrient deficiency detected', 'Irregular growth pattern'] : [],
      recommendations: data.healthIndex < 75 ? ['Apply organic fertilizer', 'Adjust irrigation schedule'] : []
    }));

    setHealthData(mockData);
    setCurrentMonth(new Date().getMonth());
  }, []);

  return { healthData, currentMonth, setCurrentMonth };
};
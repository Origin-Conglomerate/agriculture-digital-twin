import { useState, useEffect } from 'react';

export const usePestData = () => {
  const [pestData, setPestData] = useState({
    detections: [] as PestDetection[],
    alerts: [] as PestAlert[],
    trends: [] as PestTrend[],
  });

  const generateMockData = () => {
    const detections: PestDetection[] = [
      {
        pestType: 'Aphids',
        confidence: 95.5,
        location: 'Zone A',
        timestamp: new Date().toISOString(),
        riskLevel: 'high',
        count: 150
      },
      {
        pestType: 'Spider Mites',
        confidence: 88.2,
        location: 'Zone B',
        timestamp: new Date().toISOString(),
        riskLevel: 'medium',
        count: 75
      }
    ];

    const alerts: PestAlert[] = [
      {
        id: '1',
        type: 'Infestation Risk',
        severity: 'high',
        message: 'High aphid population detected in Zone A',
        location: 'Zone A',
        timestamp: new Date().toISOString()
      },
      {
        id: '2',
        type: 'New Species',
        severity: 'medium',
        message: 'New pest species identified in Zone C',
        location: 'Zone C',
        timestamp: new Date().toISOString()
      }
    ];

    const trends: PestTrend[] = [
      {
        pestType: 'Aphids',
        monthlyData: [
          { month: 'Jan', count: 50, damage: 10 },
          { month: 'Feb', count: 75, damage: 15 },
          { month: 'Mar', count: 100, damage: 20 }
        ]
      }
    ];

    setPestData({ detections, alerts, trends });
  };

  useEffect(() => {
    generateMockData();
    const interval = setInterval(generateMockData, 10000);
    return () => clearInterval(interval);
  }, []);

  return pestData;
};
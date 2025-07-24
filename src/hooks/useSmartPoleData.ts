import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { GET } from '../utils/ApiHandler';

interface Analytics {
    temperatureAnalytics?: {
        status: string;
        description: string;
    };
    humidityAnalytics?: {
        status: string;
        description: string;
    };
    pressureAnalytics?: {
        status: string;
        description: string;
    };
    rainfallAnalytics?: {
        status: string;
        description: string;
    };
    soilMoistureAnalytics?: {
        status: string;
        description: string;
    };
    leafWetnessAnalytics?: {
        status: string;
        description: string;
    };
    lightAnalytics?: {
        status: string;
        description: string;
    };
    windAnalytics?: {
        status: string;
        description: string;
    };
}

interface SmartPoleData {
    // Soil Data
    soilTemp?: number | string;
    soilMoisture1?: number;
    soilMoisture2?: number;
    leafWetness?: number;
    
    // Environment Data
    lightIntensity?: number;
    baroPressure?: number;
    windSpeed?: number | string;
    windDirection?: string;
    
    // Weather Data
    airTemp?: number | string;
    airHumidity?: number;
    airPressure?: number;
    rainFall?: number;
    
    // Analytics data
    iotData?: any;
    analytics?: any;
}

export const useSmartPoleData = () => {
    const { token, tenantId } = useSelector((state: any) => state.login);
    const [data, setData] = useState<SmartPoleData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                setError(null);

                // Get analytics data first
                const analyticsResponse = await GET(`${import.meta.env.VITE_API_URL}/api/v1/analytics`, token);
                const analytics = analyticsResponse?.data?.analytics;

                // Get device data based on tenantId
                const endpoint = tenantId === 'MYSKGLBN05' 
                    ? '/api/v1/fyllo/fylloData'
                    : '/api/v1/iot/iotData';

                const deviceResponse = await GET(`${import.meta.env.VITE_API_URL}${endpoint}`, token);

                if (!deviceResponse?.data) {
                    throw new Error('No data received from the server');
                }

                if (tenantId === 'MYSKGLBN05') {
                    // Handle Fyllo data
                    const fylloData = deviceResponse.data?.fylloData?.data;
                    const latestData = fylloData?.[fylloData.length - 1];
                    
                    if (latestData) {
                        setData({
                            soilTemp: latestData.soilTemp,
                            soilMoisture1: latestData.soilMoisture1,
                            soilMoisture2: latestData.soilMoisture2,
                            leafWetness: latestData.leafWetness,
                            lightIntensity: latestData.lightIntensity,
                            baroPressure: latestData.baroPressure,
                            windSpeed: latestData.windSpeed,
                            windDirection: latestData.windDirection,
                            airTemp: latestData.airTemp,
                            airHumidity: latestData.airHumidity,
                            airPressure: latestData.airPressure,
                            rainFall: latestData.rainFall,
                            analytics: analytics,
                            iotData: { // Map Fyllo data to IoT data structure for analytics
                                lux: { latestReading: latestData.lightIntensity },
                                pressure: { latestReading: latestData.baroPressure },
                                windSpeed: latestData.windSpeed,
                                windDirection: latestData.windDirection,
                                temprature: { latestReading: latestData.airTemp },
                                humidity: { latestReading: latestData.airHumidity },
                                rainFall: { lastHour: latestData.rainFall }
                            }
                        });
                    }
                } else {
                    // Handle IoT data
                    const iotData = deviceResponse.data?.iotData?.[0];
                    
                    if (iotData) {
                        setData({
                            soilTemp: iotData.soilTemprature,
                            soilMoisture1: iotData.soilMoistureL1,
                            soilMoisture2: iotData.soilMoistureL2,
                            leafWetness: Number(iotData.leafWetness),
                            lightIntensity: Number(iotData.lux?.latestReading),
                            baroPressure: iotData.pressure?.latestReading,
                            windSpeed: iotData.windSpeed,
                            windDirection: iotData.windDirection,
                            airTemp: iotData.temprature?.latestReading,
                            airHumidity: Number(iotData.humidity?.latestReading),
                            airPressure: iotData.pressure?.latestReading,
                            rainFall: iotData.rainFall?.lastHour,
                            analytics: analytics,
                            iotData: iotData
                        });
                    }
                }

                setLastUpdated(new Date());
            } catch (err: any) {
                setError(err.message || 'Failed to fetch smart pole data');
                console.error('Smart pole data fetch error:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 300000);
        return () => clearInterval(interval);
    }, [token, tenantId]);

    return { data, isLoading, error, lastUpdated };
}; 
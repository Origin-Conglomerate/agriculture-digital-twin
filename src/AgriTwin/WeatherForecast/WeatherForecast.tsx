import { useState, useEffect } from "react";
import { CurrentWeather } from "./CurrentWeather";
import { WeatherForecastChart } from "./WeatherForecastChart";
import { AirConditions } from "./AirConditions";
import { DetailedForecast } from "./DetailedForecast";
import { Skeleton } from "@/components/ui/skeleton";
interface WeatherForecastProps {
    weatherData: any;
}
import { GET } from "@/utils/ApiHandler";
import { useSelector } from "react-redux";

const WeatherForecast = () => {
    const { tenantId } = useSelector((state) => state.login)
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const date = new Date().toLocaleDateString();

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchWeatherData();
    }, []);

    const fetchWeatherData = async () => {
        try {
            const response = await GET(`${import.meta.env.VITE_API_URL}/api/v1/fivedaysforecast/fiveDaysForecastData`);
            if (response.data.fiveDaysForecastData || [])
                setWeatherData(response.data.fiveDaysForecastData);
        } catch (error) {
            console.error("Error fetching weather data:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8 space-y-8 flex flex-col items-center">
                <div className="flex flex-col items-center">
                    <h2 className="text-2xl font-bold animate-pulse">Forecasting Data...</h2>
                    <div className="mt-4">
                        <div className="loader"></div>
                    </div>
                </div>
            </div>
        )
    }

    if (!weatherData) return null;
    const dailyForecasts = weatherData[0].DailyForecasts;

    return (
        <div className="container mx-auto p-4 space-y-6">
            <CurrentWeather
                city={tenantId}
                date={date}
                temperature="29"
                description="broken clouds"
            />

            <WeatherForecastChart dailyForecasts={dailyForecasts} />

            <AirConditions
                realFeel="29.1"
                wind="3.09"
                clouds="75"
                humidity="91"
            />
            <DetailedForecast data={weatherData[0]} />
        </div>
    );
};

export default WeatherForecast;
import React, { useEffect, useState } from "react";
import axios from "axios";

function Forecast7Days({ search }) {
    const [forecastData, setForecastData] = useState([]);
    const baseUrl = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        const fetch7DayForecast = async () => {
            try {
                if (!search) return;
                const response = await axios.get(`${baseUrl}?location=${search}&forecast=true`);
                setForecastData(response.data.forecast.forecastday);
                console.log(response.data.forecast.forecastday)
            } catch (error) {
                console.error("Error fetching 7-day forecast:", error);
            }
        };

        fetch7DayForecast();
    }, [search]);

    return (
        <div className="w-full flex flex-col gap-y-2">
            {forecastData.length > 0 ? (
                forecastData.map((day, index) => (
                    <div key={index} className="flex justify-between w-full px-4">
                        <span>{day.date}</span>
                        <img src={day.day.condition.icon} alt="Weather Icon" className="w-6" />
                        <span>{day.day.maxtemp_c}°C / {day.day.mintemp_c}°C</span>
                    </div>
                ))
            ) : (
                <p className="text-white text-sm text-center">No forecast data available.</p>
            )}
        </div>
    );
}

export default Forecast7Days;
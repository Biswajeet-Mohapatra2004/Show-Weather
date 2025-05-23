import { useState, useEffect } from "react";
import axios from "axios";

export const useWeatherData = (search, setLoading) => {
    const [weatherData, setWeatherData] = useState(null);
    const [hourlyData, setHourlyData] = useState([]);
    const [astroData, setAstroData] = useState(null);
    const [isDaytime, setIsDaytime] = useState(false);
    const [location, setLocation] = useState("");

    const baseUrl = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                setLoading(true);
                let locationQuery = search;


                if (!search) {
                    const locationData = await new Promise((resolve, reject) => {
                        navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 10000 });
                    });
                    const { latitude, longitude } = locationData.coords;
                    locationQuery = `${latitude},${longitude}`;
                }

                const currentResponse = await axios.get(`${baseUrl}/weather?location=${locationQuery}`);
                const forecastResponse = await axios.get(`${baseUrl}/forecast?location=${currentResponse.data.location.name}`);

                setLocation(currentResponse.data.location.name);
                setWeatherData(currentResponse.data.current);
                setHourlyData(forecastResponse.data.forecast.forecastday[0].hour);
                setAstroData(forecastResponse.data.forecast.forecastday[0].astro);
                setIsDaytime(currentResponse.data.current.is_day === 1);

                console.log("Location Name:", currentResponse.data.location.name);

            } catch (error) {
                console.error("Error fetching weather data:", error);
                if (error.message.includes("Geolocation")) {
                    alert("Location access denied or unavailable. Please search manually.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchWeatherData();
    }, [search, setLoading]);

    return { weatherData, hourlyData, astroData, isDaytime, location };
};
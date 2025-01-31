import { useEffect, useState } from "react";
import axios from "axios";

function AQI({ search }) {
    const [aqi, setAqi] = useState(null);
    const baseUrl = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        const fetchAqiData = async () => {
            try {
                if (!search) return;
                const response = await axios.get(`${baseUrl}/weather?location=${search}&aqi=true`);
                const aqiValue = response.data.current.air_quality["pm2_5"];
                setAqi(aqiValue);
            } catch (error) {
                console.error("Error fetching AQI data:", error);
            }
        };

        fetchAqiData();
    }, [search]);

    if (aqi === null) {
        return <p className="text-xs text-white">Fetching AQI...</p>;
    }

    return (
        <p className={`text-xs ${aqi > 100 ? 'text-red-500' : 'text-green-500'}`}>
            PM2.5: {aqi.toFixed(2)} ({aqi > 100 ? 'Poor Air Quality' : 'Good Air Quality'})
        </p>
    );
}

export default AQI;
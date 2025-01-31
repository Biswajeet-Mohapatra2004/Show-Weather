import React from "react";

function Timeline({ hourData }) {
    if (!hourData || hourData.length === 0) {
        return <p className="text-white text-sm text-center">No hourly data available.</p>;
    }

    return (
        <div className="flex gap-x-4">
            {hourData.slice(0, 8).map((hour, index) => (
                <div key={index} className="flex flex-col items-center text-xs">
                    <p>{hour.time.split(" ")[1]}</p>
                    <p>{hour.temp_c}°C</p>
                    <img src={hour.condition.icon} alt="Weather Icon" className="w-8" />
                </div>
            ))}
        </div>
    );
}

export default Timeline;
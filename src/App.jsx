import { useState, useEffect } from "react";
import Timeline from "./components/Timeline";
import Prediction from "./components/Forecast7days";
import AQI from "./components/AQI";
import { useWeatherData } from "./hooks/userWeatherData";
import { FaRegSun } from "react-icons/fa";
import { BsThermometerSun } from "react-icons/bs";
import { WiHumidity } from "react-icons/wi";
import { GiWindSlap } from "react-icons/gi";
import { LuWind } from "react-icons/lu";
import { MdOutlineVisibility } from "react-icons/md";
import { FiSunrise, FiSunset } from "react-icons/fi";

function App() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const { weatherData, hourlyData, astroData, isDaytime, location } = useWeatherData(search, setLoading);

  return (
    <div
      id="main-container"
      className={`mx-auto w-full md:w-11/12 h-screen rounded-lg overflow-y-scroll flex flex-col gap-y-1 bg-cover justify-around items-center ${isDaytime ? "bg-gradient-to-b from-orange-400 to-gray-600" : "bg-gradient-to-b from-gray-500 to-blue-800"
        }`}
    >
      <div className="w-11/12 text-left text-white text-xs font-semibold mt-2 px-3 flex justify-between items-center">
        {search}
        <div className="flex items-center gap-x-1">
          <input
            id="input"
            type="text"
            className="rounded-sm bg-white text-black font-extralight text-center w-20"
            placeholder="Search Cities"
          />
          <button
            className="bg-transparent opacity-70 text-white border border-white rounded-sm px-2 py-1 hover:bg-white hover:text-black transition"
            onClick={() => setSearch(document.getElementById("input").value)}
          >
            Search
          </button>
        </div>
      </div>

      {/* Loader */}
      {loading && (
        <div className="flex justify-center items-center h-full">
          <div className="loader border-t-4 border-b-4 border-white rounded-full w-12 h-12 animate-spin"></div>
          <p className="text-white mt-4">Loading...</p>
        </div>
      )}

      {!loading && weatherData && (
        <>
          <div className="text-white mt-2 font-semibold text-center text-3xl">
            {weatherData.temp_c}°C
            <p className="text-sm font-extralight">Last updated: {weatherData.last_updated}</p>
          </div>

          <div className="bg-transparent font-semibold rounded-xl w-11/12 h-32 text-white text-sm flex overflow-x-scroll gap-x-3">
            <Timeline hourData={hourlyData} />
          </div>

          <div className="bg-gray-900 opacity-40 rounded-xl w-11/12 h-96 text-white text-xs flex flex-col items-center justify-around">
            <Prediction search={location} />
            <button className="rounded-md text-white border border-white px-10 py-1 hover:bg-white hover:text-black transition">
              15-Day Forecast
            </button>
          </div>

          <div className="bg-gray-900 opacity-40 rounded-xl w-11/12 h-12 text-white text-sm text-left px-2 flex items-center justify-between m-1">
            <b>Air Quality: <AQI search={location} /></b>
          </div>

          <div className="w-11/12 flex flex-wrap gap-4 justify-between">
            {[
              { icon: <FaRegSun />, label: "UV", value: weatherData.uv },
              { icon: <BsThermometerSun />, label: "Feels like", value: `${weatherData.feelslike_c}°C` },
              { icon: <WiHumidity />, label: "Humidity", value: `${weatherData.humidity}%` },
              { icon: <LuWind />, label: "Wind", value: `${weatherData.wind_dir}, ${weatherData.wind_kph} kph` },
              { icon: <GiWindSlap />, label: "Pressure", value: `${weatherData.pressure_mb} mb` },
              { icon: <MdOutlineVisibility />, label: "Visibility", value: `${weatherData.vis_km} km` }
            ].map((info, index) => (
              <div key={index} className="w-1/4 sm:w-1/5 lg:w-1/6 bg-gray-900 opacity-40 rounded-xl text-white text-center flex flex-col items-center justify-around p-1 m-1">
                {info.icon}
                <b className="text-xs">{info.label}: {info.value}</b>
              </div>
            ))}
          </div>

          {astroData && (
            <div className="bg-gray-900 opacity-40 rounded-xl w-11/12 h-24 text-white flex justify-around items-center">
              <div className="flex flex-col items-center">
                <FiSunrise />
                <p>{astroData.sunrise}</p>
                <span>Sunrise</span>
              </div>
              <div className="flex flex-col items-center">
                <FiSunset />
                <p>{astroData.sunset}</p>
                <span>Sunset</span>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
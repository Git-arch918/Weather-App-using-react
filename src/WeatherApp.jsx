import React, { useState } from "react";
import SearchBox from "./SearchBox";
import InfoBox from "./InfoBox";
import "./WeatherApp.css";

export default function WeatherApp() {
  const [weatherInfo, setWeatherInfo] = useState({
    city: "Delhi",
    temp: 36,
    tempMin: 34,
    tempMax: 38,
    humidity: 54,
    feelsLike: 37,
    weather: "haze",
  });

  const updateInfo = (newInfo) => {
    setWeatherInfo(newInfo);
  };

  return (
    <div className="WeatherApp">
      <h2>🌤️ Weather App</h2>
      <SearchBox updateinfo={updateInfo} />
      <InfoBox info={weatherInfo} />
    </div>
  );
}

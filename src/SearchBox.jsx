import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SearchBox.css";

export default function SearchBox({ updateinfo }) {
  const [city, setCity] = useState("");
  const [error, setError] = useState(false);

  // Use HTTPS and a valid OpenWeatherMap API key
  const api_url = "https://api.openweathermap.org/data/2.5/weather";
  const api_key = import.meta.env.VITE_WEATHER_API_KEY;


  const getWeatherInfo = async () => {
    try {
      const response = await fetch(`${api_url}?q=${city}&appid=${api_key}&units=metric`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const jsonResponse = await response.json();
      console.log(jsonResponse); // Helpful for debugging

      if (jsonResponse.cod !== 200) {
        console.error("API Error:", jsonResponse.message);
        throw new Error(jsonResponse.message || "City not found");
      }

      const result = {
        city: jsonResponse.name,
        temp: jsonResponse.main.temp,
        tempMin: jsonResponse.main.temp_min,
        tempMax: jsonResponse.main.temp_max,
        humidity: jsonResponse.main.humidity,
        feelsLike: jsonResponse.main.feels_like,
        weather: jsonResponse.weather[0].description,
      };

      return result;

    } catch (err) {
      console.error("Error fetching weather data:", err);
      throw err;
    }
  };

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const info = await getWeatherInfo();
      updateinfo(info);
      setError(false);
    } catch (err) {
      setError(true);
    }

    setCity(""); // Clear the input after submit
  };

  return (
    <div className="SearchBox">
      <form onSubmit={handleSubmit}>
        <TextField
          id="city"
          label="City Name"
          variant="outlined"
          required
          value={city}
          onChange={handleChange}
        />
        <br /><br />
        <Button variant="contained" type="submit">
          Search
        </Button>
        {error && <p style={{ color: "red" }}>No such place exists</p>}
      </form>
    </div>
  );
}

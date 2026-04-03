import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import SearchIcon from '@mui/icons-material/Search';
import "./SearchBox.css";

export default function SearchBox({ updateinfo }) {
  const [city, setCity] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    try {
      const info = await getWeatherInfo();
      updateinfo(info);
      setError(false);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }

    setCity(""); // Clear the input after submit
  };

  return (
    <div className="SearchBox">
      <form onSubmit={handleSubmit}>
        <TextField
          id="city"
          label="🌍 Search City"
          variant="outlined"
          required
          value={city}
          onChange={handleChange}
          placeholder="Enter city name..."
          size="medium"
        />
        <Button 
          variant="contained" 
          type="submit"
          disabled={loading}
          startIcon={<SearchIcon />}
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
            },
            '&:disabled': {
              background: 'rgba(102, 126, 234, 0.5)',
            }
          }}
        >
          {loading ? "Searching..." : "Search"}
        </Button>
        {error && (
          <Alert severity="error" sx={{ width: '100%', marginTop: '1rem' }}>
            City not found! Please try another city name.
          </Alert>
        )}
      </form>
    </div>
  );
}

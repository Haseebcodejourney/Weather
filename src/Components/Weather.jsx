import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../src/style/weather.css';  // Import the CSS

const Weather = ({ location }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiKey = '0e6da7bbeb0432426ea751b0315a63a8';

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
      try {
        const response = await axios.get(url);
        setWeatherData(response.data);
      } catch (error) {
        console.error(error);
        alert('Error fetching weather data');
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [location]);

  if (loading) return <div className="loading">Loading...</div>;

  if (!weatherData) return <div className="error">Weather data not available</div>;

  return (
    <div className="weather-card">
      <h2 className="city-name">{weatherData.name}</h2>
      <h3 className="weather-description">{weatherData.weather[0].description}</h3>
      <h4 className="temperature">{weatherData.main.temp}°C</h4>
      <p className="humidity">Humidity: {weatherData.main.humidity}%</p>
      <p className="wind-speed">Wind: {weatherData.wind.speed} m/s</p>
    </div>
  );
};

export default Weather;

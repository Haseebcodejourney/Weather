import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../src/style/weather.css';

const Weather = ({ location = "New York" }) => { // Default location added
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiKey = '0e6da7bbeb0432426ea751b0315a63a8';

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
        );
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

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const isGoodWeather = weatherData.weather[0].main === 'Clear' || weatherData.weather[0].main === 'Clouds';

  return (
    <div className='weather-card-wrapper'>
      {days.map((day, index) => (
        <div key={index} className="weather-card">
          <h2 className="city-name"><span>{day.charAt(0)}</span>{day.slice(1)}</h2>
          <div className='event-wrapper'>
            <div className='event-box'>
              <div><strong style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span className='green'></span>In-Door
              </strong></div>
              <br></br>
              <span>Good</span>
            </div>
            <div className='event-box'>
              <div><strong style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span className={isGoodWeather ? 'green' : 'red'}></span>Out-Door
              </strong></div>
              <br></br>
              <span>{isGoodWeather ? 'Good' : 'Not Good'}</span>
            </div>
          </div>
          <p className="temperature">{weatherData.main.temp}°C</p>
        </div>
      ))}
    </div>
  );
};

export default Weather;

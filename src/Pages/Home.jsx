import React, { useState, useEffect } from 'react';
import Weather from '../Components/Weather';

const Home = () => {
  const [location, setLocation] = useState('');
  const [defaultLocation, setDefaultLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=0e6da7bbeb0432426ea751b0315a63a8&units=metric`
      )
        .then((response) => response.json())
        .then((data) => setDefaultLocation(data.name))
        .catch((error) => console.error('Error fetching location', error));
    });
  }, []);

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSearch = () => {
    if (location) {
      setDefaultLocation(location);
    } else {
      alert('Please enter a location');
    }
  };

  return (
    <div className="home-container">
      <h1>Weather App</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={handleLocationChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {/* <h3>{defaultLocation ? `Weather in ${defaultLocation}` : 'Loading your location'}</h3> */}
      <Weather location={defaultLocation || 'London'} />
    </div>
  );
};

export default Home;

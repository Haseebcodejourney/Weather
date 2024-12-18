import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';  // Importing Auth context
import Weather from '../Components/Weather';

const Home = () => {
  const [location, setLocation] = useState('');
  const [defaultLocation, setDefaultLocation] = useState(null);
  const { user } = useAuth();  // Accessing user data from AuthContext

  useEffect(() => {
    if (user) {
      console.log('Logged in user data:', user);  // Log user info after successful login/signup
    }

    // Geolocation functionality to get current location
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=0e6da7bbeb0432426ea751b0315a63a8&units=metric`
      )
        .then((response) => response.json())
        .then((data) => setDefaultLocation(data.name))  // Set the location name based on geolocation
        .catch((error) => console.error('Error fetching location:', error));
    });
  }, [user]);  // Dependency on user data to log when user is present

  const handleLocationChange = (e) => {
    setLocation(e.target.value);  // Update location value
  };

  const handleSearch = () => {
    if (location) {
      setDefaultLocation(location);  // Update default location to searched location
    } else {
      alert('Please enter a location');  // Alert if no location entered
    }
  };

  return (
    <div className="home-container">
      {/* <h1>Weather App</h1> */}
      
      {/* User Greeting */}
      {user ? (
        <div className="welcome-message">
          <h2>Welcome, {user.email}</h2>  {/* Display logged in user email */}
        </div>
      ) : (
        <div className="welcome-message">
          <h2>Welcome, Guest</h2>
        </div>
      )}

      {/* Search bar to change location */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={handleLocationChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Display weather info based on location */}
      <Weather location={defaultLocation || 'London'} />
    </div>
  );
};

export default Home;

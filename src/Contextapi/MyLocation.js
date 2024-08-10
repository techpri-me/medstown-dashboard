
import React, { useState, useEffect } from 'react';

const MyLocation = ({ latitude, longitude }) => {
  const [locationName, setLocationName] = useState('Fetching location...');

  useEffect(() => {
    const fetchLocationName = async () => {
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
        const data = await response.json();
        setLocationName(data.display_name);
      } catch (error) {
        console.error('Error fetching location:', error);
        setLocationName('Unable to fetch location');
      }
    };

    fetchLocationName();
  }, [latitude, longitude]);

  return (
    <div>
      {/* <h3>Location Details</h3>
      <p>Latitude: {latitude}</p>
      <p>Longitude: {longitude}</p> */}
      <p>{locationName}</p>
    </div>
  );
};

export default MyLocation;

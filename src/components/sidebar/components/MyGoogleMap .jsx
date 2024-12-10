import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MyGoogleMap = ({ latitude, longitude }) => {
  // Define map container style
  const mapContainerStyle = {
    height: "400px",
    width: "100%",
  };

  // Check if latitude and longitude are valid
  if (!latitude || !longitude) {
    console.error("Invalid coordinates", latitude, longitude);
    return <div>Invalid location</div>;
  }

  // Define center position of the map based on latitude and longitude
  const center = {
    lat: latitude,
    lng: longitude,
  };

  console.log(latitude, longitude, "Map coordinates");
  

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={15}
      >
        {/* Place a marker at the given location */}
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MyGoogleMap;

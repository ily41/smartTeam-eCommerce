import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const center = {
  lat: 40.4093, // Baku
  lng: 49.8671,
};

const markers = [
  { lat: 40.4093, lng: 49.8671, title: "Baku Center" },
  { lat: 40.4929, lng: 49.7689, title: "Sumqayit" },
];

function MyMap() {
  return (
    <LoadScript googleMapsApiKey="AIzaSyD41sWartpep37guUs7W7ipsbijuI2nMzE">
      <GoogleMap
        mapContainerClassName="w-full h-[400px] lg:h-[600px] rounded-lg"
        center={center}
        zoom={10}
        options={{
          mapTypeControl: true, // Map / Satellite switcher
          fullscreenControl: true, // Fullscreen button
          zoomControl: true, // Zoom +/- buttons
          streetViewControl: false, // disable Street View icon
        }}
      >
        {markers.map((marker, i) => (
          <Marker
            key={i}
            position={{ lat: marker.lat, lng: marker.lng }}
            title={marker.title}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}

export default MyMap;

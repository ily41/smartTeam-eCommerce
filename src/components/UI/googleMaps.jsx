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
      <div className="w-full h-[400px] lg:h-[600px] rounded-lg overflow-hidden">
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={center}
          zoom={10}
          options={{
            mapTypeControl: true,
            fullscreenControl: true,
            zoomControl: true,
            streetViewControl: false,
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
      </div>
    </LoadScript>
  );
}

export default MyMap;

import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const markers = [
  { lat: 40.3419741, lng: 49.8399698, title: "Smartteam Office 1" },
  { lat: 40.329590, lng: 49.781784, title: "Smartteam Office 2" },
];

// Calculate center between both markers
const center = {
  lat: (markers[0].lat + markers[1].lat) / 2,
  lng: (markers[0].lng + markers[1].lng) / 2,
};

function MyMap() {
  return (
    <LoadScript googleMapsApiKey="AIzaSyD41sWartpep37guUs7W7ipsbijuI2nMzE">
      <div className="w-full h-[400px] lg:h-[600px] rounded-lg overflow-hidden">
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={center}
          zoom={13}
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

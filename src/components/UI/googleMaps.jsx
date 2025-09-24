import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const center = {
  lat: 40.3423741, lng: 49.8412698,
};

const markers = [
{ lat: 40.3423741, lng: 49.8412698, title: "Smartteam" },];

function MyMap() {
  return (
    <LoadScript googleMapsApiKey="AIzaSyD41sWartpep37guUs7W7ipsbijuI2nMzE">
      <div className="w-full h-[400px] lg:h-[600px] rounded-lg overflow-hidden">
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={center}
          zoom={15}
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

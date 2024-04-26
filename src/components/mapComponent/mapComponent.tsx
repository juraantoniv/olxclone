import { APIProvider, Map } from "@vis.gl/react-google-maps";
import GoogleMapReact from "google-map-react";
import React from "react";
import { createRoot } from "react-dom/client";

export const GoogleMapsComponent = () => (
  <APIProvider apiKey="AIzaSyAM8I2kzsBJy0rnoY3VGZnQAHSHI6G-O5Y">
    <Map
      defaultCenter={{ lat: 22.54992, lng: 0 }}
      defaultZoom={3}
      gestureHandling={"greedy"}
      disableDefaultUI={true}
    />
  </APIProvider>
);

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { APIProvider, Map, useMapsLibrary } from "@vis.gl/react-google-maps";
import React, { useEffect, useState } from "react";
import Geocode from "react-geocode";

export const GoogleMapsComponent = () => {
  const [center, setCenter] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    console.log("ok");
    const geo = () => {
      Geocode?.fromAddress("New York").then((response) => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(response);

        setCenter({ lat, lng });
      });
    };
    geo();
  }, []);

  return (
    <APIProvider apiKey="AIzaSyAM8I2kzsBJy0rnoY3VGZnQAHSHI6G-O5Y">
      <Map center={center} zoom={10}>
        <Marker position={center} />
      </Map>
    </APIProvider>
  );
};

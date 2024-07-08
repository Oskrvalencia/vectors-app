"use client";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-contextmenu";

import {
  MapContainer,
  useMapEvents,
  TileLayer,
  Polygon,
  Marker,
  Circle,
} from "react-leaflet";
import { Suspense, useContext } from "react";
import { latLng } from "leaflet";

import MapContext from "@/context/MapContext";

export default function Map() {
  const {
    coordinates,
    setCoordinates,
    option,
    polygon,
    setPolygon,
    setCircle,
    circlepoint,
  } = useContext(MapContext);

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        if (option === "Point") {
          setPolygon([]);
          setCircle(null);
          setCoordinates([e.latlng.lat, e.latlng.lng]);
        } else if (option === "Polygon") {
          setCoordinates(null);
          setCircle(null);
          setPolygon([...polygon, latLng(e.latlng.lat, e.latlng.lng)]);
        } else if (option === "Circle") {
          setCoordinates(null);
          setPolygon([]);
          setCircle([e.latlng.lat, e.latlng.lng]);
        }
      },
    });

    return null;
  };

  const pathOptions = {
    color: "purple",
    fillColor: "red",
  };

  return (
    <Suspense>
      <MapContainer
        center={[4.671107231738902, -74.08559362300092]}
        zoom={11}
        scrollWheelZoom={true}
        style={{
          height: "calc(100vh - 50px)",
          width: "80%",
          position: "absolute",
          top: "50px",
          left: "20%",
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler />
        {coordinates && (
          <Marker
            key={coordinates[0]}
            position={latLng(coordinates[0], coordinates[1])}
          ></Marker>
        )}
        {circlepoint && (
          <Circle center={circlepoint} pathOptions={pathOptions} radius={500} />
        )}

        {polygon.length > 2 && (
          <Polygon
            positions={polygon}
            color="purple"
            contextmenu={true}
            contextmenuInheritItems={false}
            contextmenuItems={[
              {
                text: "Eliminar",
                callback: () => {
                  setPolygon([]);
                },
              },
            ]}
          />
        )}
      </MapContainer>
    </Suspense>
  );
}

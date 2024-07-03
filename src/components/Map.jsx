"use client";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-contextmenu";

import {
  MapContainer,
  Marker,
  Polygon,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import { useContext, useEffect, useState } from "react";
import { latLng } from "leaflet";

import MapContext from "@/context/MapContext";

export default function Map() {
  const { coordinates, setCoordinates, option, polygon, setPolygon } =
    useContext(MapContext);
  const [points, setPoints] = useState([]);

  /* useEffect(() => {
    fetch(`/api/point`, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setPoints(data);
      });
  }, []); */

  const MapClickHandler = () => {
    if (option === "Point") {
      useMapEvents({
        click(e) {
          setCoordinates([e.latlng.lat, e.latlng.lng]);
        },
      });

      return null;
    } else if (option === "Polygon") {
      setCoordinates(null);
      useMapEvents({
        click(e) {
          setPolygon([...polygon, latLng(e.latlng.lat, e.latlng.lng)]);
        },
      });

      return null;
    }
  };

  return (
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
      {points.length > 0
        ? points.map((e) => {
            return (
              <Marker key={e._id} position={latLng(e.latLng[0], e.latLng[1])}>
                <Popup>{e.description}</Popup>
              </Marker>
            );
          })
        : null}
      <Polygon
        positions={polygon}
        color="purple"
        contextmenu={true}
        contextmenuItems={[{ text: "Zoom in" }, { text: "Zoom out" }]}
      />
    </MapContainer>
  );
}

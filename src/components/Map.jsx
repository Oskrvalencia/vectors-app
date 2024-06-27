"use client";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import 'leaflet-contextmenu';

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
      useMapEvents({
        click(e) {
          setPolygon([...polygon, latLng(e.latlng.lat, e.latlng.lng)]);
        },
      });

      return null;
    }
  };

  const togglePolygonVisibility = () => {
    setPolygonVisible(!polygonVisible);
  };

  const handlePolygonContextMenu = () => {
    setPolygonVisible(false);
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

/* 
Error

      <div data-nextjs-toast="true" class="nextjs-toast-errors-parent">
        <div data-nextjs-toast-wrapper="true">
          <div class="nextjs-toast-errors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>1 error</span>
            <button
              data-nextjs-toast-errors-hide-button="true"
              class="nextjs-toast-errors-hide-button"
              type="button"
              aria-label="Hide Errors"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M6 6L18 18"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>*/

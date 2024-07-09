"use client";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-contextmenu";

import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Circle,
  Polygon,
} from "react-leaflet";
import React, { useEffect, useState } from "react";
import { latLng } from "leaflet";

const List = () => {
  const [points, setPoints] = useState([]);
  const [circles, setCircles] = useState([]);
  const [polygons, setPolygons] = useState([]);

  const fetchData = async () => {
    await getPoints();
    await getPolygons();
    await getCircles();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getPoints = async () => {
    let d = await fetch(`/api/point`, { method: "GET" })
      .then((response) => response.json())
      .then((e) => {
        setPoints(e);
      });
    return d;
  };

  const getPolygons = async () => {
    let d = await fetch(`/api/polygon`, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setPolygons(data);
      });
    return d;
  };

  const getCircles = async () => {
    let d = await fetch(`/api/circle`, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setCircles(data);
      });
    return d;
  };

  return (
    <>
      <MapContainer
        center={[4.671107231738902, -74.08559362300092]}
        zoom={11}
        scrollWheelZoom={true}
        style={{
          height: "calc(100vh - 50px)",
          width: "100%",
          position: "absolute",
          top: "50px",
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {points.length > 0
          ? points.map((e) => {
              return (
                <Marker key={e._id} position={latLng(e.latLng[0], e.latLng[1])}>
                  <Popup>{e.description}</Popup>
                </Marker>
              );
            })
          : null}

        {circles.length > 0
          ? circles.map((e) => {
              return (
                <Circle
                  center={[e.latLng[0], e.latLng[1]]}
                  pathOptions={{ color: "purple", fillColor: "red" }}
                  radius={500}
                >
                  <Popup>{e.description}</Popup>
                </Circle>
              );
            })
          : null}

        {polygons.length > 0
          ? polygons.map((e) => {
              return (
                <Polygon positions={e.coordinates} color="blue">
                  <Popup>{e.name}</Popup>
                </Polygon>
              );
            })
          : null}
      </MapContainer>
    </>
  );
};

export default List;

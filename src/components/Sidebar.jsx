"use client";

import { useContext, useEffect, useState } from "react";

import MapContext from "@/context/MapContext";

import "./../app/globals.css";
import Point from "./Point";

export default function Sidebar() {
  const [description, setDescription] = useState(null);
  const { coordinates, option, setOption } = useContext(MapContext);

  useEffect(() => {
    if (coordinates) {
      fetch(`/api/nominatim`, {
        method: "POST",
        body: JSON.stringify({
          lat: coordinates[0],
          lng: coordinates[1],
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setDescription(data);
        })
        .catch((error) => {
          // Maneja el error
        });
    }
  }, [coordinates]);

  const options = ["Point", "Polygon", "Route", "Circle"];

  return (
    <div className="sidebar snap-y overflow-auto h-auto ">
      <ul>
        {options.map((op) => (
          <li
            key={op}
            className={`sidebar-option ${
              option === op ? "bg-lime-900 rounded-md" : ""
            }`}
            onClick={() => setOption(op)}
          >
            {op}
          </li>
        ))}
      </ul>
      {option && option === "Point" && coordinates && (
        <Point coordinates={coordinates} description={description} />
      )}
    </div>
  );
}

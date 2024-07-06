"use client";

import { useContext, useEffect, useState } from "react";

import MapContext from "@/context/MapContext";

import "./../app/globals.css";
import Point from "./Point";
import Polygon from "./Polygon";

export default function Sidebar() {
  const [description, setDescription] = useState(null);
  const { coordinates, option, setOption, session, polygon, circlepoint } =
    useContext(MapContext);

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
        <Point
          coordinates={coordinates}
          description={description}
          session={session}
        />
      )}
      {option && option === "Polygon" && polygon.length > 2 && (
        <Polygon coordinates={polygon} session={session} />
      )}
      {option && option === "Circle" && circlepoint && <h1>{circlepoint}</h1>}
    </div>
  );
}

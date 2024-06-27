"use client";

import React, { createContext, useState } from "react";

const MapContext = createContext();

export const MapProvider = ({ children }) => {
  const [coordinates, setCoordinates] = useState(null);
  const [polygon, setPolygon] = useState([]);
  const [option, setOption] = useState(null);

  return (
    <MapContext.Provider
      value={{
        coordinates,
        setCoordinates,
        option,
        setOption,
        polygon,
        setPolygon,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export default MapContext;

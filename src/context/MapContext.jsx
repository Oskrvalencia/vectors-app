"use client";

import React, { createContext, useState } from "react";
import { useSession } from "next-auth/react";

const MapContext = createContext();

export const MapProvider = ({ children }) => {
  const { data: session } = useSession();
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
        session,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export default MapContext;

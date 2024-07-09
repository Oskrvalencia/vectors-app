"use client";

import React, { useContext, useState } from "react";
import MapContext from "@/context/MapContext";
import { toast } from "react-toastify";

const Polygon = ({ coordinates, session }) => {
  const { setPolygon } = useContext(MapContext);

  const [formValues, setFormValues] = useState({
    name: "",
  });

  const optionsToast = {
    position: "bottom-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  const notify = () => {
    toast.success("Created polygon!", optionsToast);
  };

  const notifyError = (error) => {
    toast.error(error, optionsToast);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`/api/polygon`, {
      method: "POST",
      body: JSON.stringify({
        coordinates,
        name: formValues.name,
        user: session.user.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((e) => {
        if (typeof e !== "boolean") {
          notifyError(e);
        } else {
          notify();
          setPolygon([]);
          setFormValues({ name: "" });
        }
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <hr className="w-full mb-8" />
        <h5 className="text-slate-200 font-bold text-lg mb-4">Polygon:</h5>
        <label className="text-slate-400 text-xs" htmlFor="">
          Name:
        </label>
        <textarea
          rows="2"
          className="bg-gray-700 text-white p-3 rounded-lg mt-2 mb-2 w-full text-xs resize-none scroll-m-1"
          type="text"
          value={formValues.name ? formValues.name : ""}
          onChange={(e) =>
            setFormValues({ ...formValues, name: e.target.value })
          }
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-lg mt-6"
        >
          SAVE
        </button>
      </div>
    </form>
  );
};
``;

export default Polygon;

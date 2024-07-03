"use client";

import React from "react";
import { toast } from "react-toastify";

const Point = ({ coordinates, description, session }) => {
  const notify = () => {
    toast.success("En punto se ha creado!", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const notifyError = (error) => {
    toast.error(error, {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`/api/point`, {
      method: "POST",
      body: JSON.stringify({
        lat: coordinates[0],
        lng: coordinates[1],
        description: description,
        user: session.user.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((e) => {
        if (e.includes("E11000 duplicate key error collection")) {
          notifyError("El punto ya fue creado anteriormente");
        } else {
          notify();
        }
      })
      .catch((error) => {
        notifyError(error.message);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <hr className="w-full mb-8" />
        <h5 className="text-slate-200 font-bold text-lg mb-4">
          Selected coordinates:
        </h5>
        <label className="text-slate-400 text-xs" htmlFor="">
          Latitude:
        </label>
        <input
          className="bg-gray-700 text-white p-3 rounded-lg mt-2 mb-2 w-full text-xs"
          type="text"
          readOnly
          value={coordinates[0]}
        />
        <label className="text-slate-400 text-xs" htmlFor="">
          Longitude:
        </label>
        <input
          className="bg-gray-700 text-white p-3 rounded-lg mt-2 mb-2 w-full text-xs"
          type="text"
          readOnly
          value={coordinates[1]}
        />
        <label className="text-slate-400 text-xs" htmlFor="">
          Description:
        </label>
        <textarea
          rows="2"
          className="bg-gray-700 text-white p-3 rounded-lg mt-2 mb-2 w-full text-xs resize-none scroll-m-1"
          type="text"
          readOnly
          value={description ? description.slice(0, 50) : ""}
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

export default Point;

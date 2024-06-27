"use client";

import React from "react";

const Point = ({ coordinates, description }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`/api/point`, {
      method: "POST",
      body: JSON.stringify({
        lat: coordinates[0],
        lng: coordinates[1],
        description: description,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(() => {
        alert("Save point");
      })
      .catch((error) => {
        alert(error.message);
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

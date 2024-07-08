"use client";

import React, { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";

const List = () => {
  const [points, setPoints] = useState([]);
  const [view, setView] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const alldata = [];
      let po = await getPoints();
      let pl = await getPolygons();
      let c = await getCircles();
      alldata.push(...po);
      alldata.push(...pl);
      alldata.push(...c);
      setPoints(alldata);
      setView(true);
    };

    fetchData();
  }, []);

  const getPoints = async () => {
    let d = await fetch(`/api/point`, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        return data.map((e) => {
          e.type = "Point";
          return e;
        });
      });
    return d;
  };

  const getPolygons = async () => {
    let d = await fetch(`/api/polygon`, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        return data.map((e) => {
          e.type = "Polygon";
          return e;
        });
      });
    return d;
  };

  const getCircles = async () => {
    let d = await fetch(`/api/circle`, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        return data.map((e) => {
          e.type = "Circle";
          return e;
        });
      });
    return d;
  };

  return (
    <>
      {view ? (
        <table className="w-[calc(100vw-7rem)] m-12 divide-y divide-gray-200 table-fixed dark:divide-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th
                scope="col"
                className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
              >
                Type
              </th>
              <th
                scope="col"
                className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
              >
                Name
              </th>
              <th
                scope="col"
                className="py-3 px-6 text-xs font-medium tracking-wider text-right text-gray-700 uppercase dark:text-gray-400"
              >
                Delete
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
            {points && points.length > 0
              ? points.map((e) => {
                  return (
                    <tr
                      className="hover:bg-gray-100 dark:hover:bg-gray-700"
                      key={e._id}
                    >
                      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {e.type}
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                        {e.name
                          ? e.name.slice(0, 60)
                          : e.description.slice(0, 60)}
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap flex justify-end">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-6 cursor-pointer"
                        >
                          <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375Z" />
                          <path
                            fillRule="evenodd"
                            d="m3.087 9 .54 9.176A3 3 0 0 0 6.62 21h10.757a3 3 0 0 0 2.995-2.824L20.913 9H3.087Zm6.133 2.845a.75.75 0 0 1 1.06 0l1.72 1.72 1.72-1.72a.75.75 0 1 1 1.06 1.06l-1.72 1.72 1.72 1.72a.75.75 0 1 1-1.06 1.06L12 15.685l-1.72 1.72a.75.75 0 1 1-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 0 1 0-1.06Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      ) : (
        <Oval
          visible={true}
          height="150"
          width="150"
          color="#4fa94d"
          ariaLabel="oval-loading"
          wrapperStyle={{
            display: "flex",
            position: "absolute",
            top: "40%",
            left: "45%",
          }}
        />
      )}
    </>
  );
};

export default List;

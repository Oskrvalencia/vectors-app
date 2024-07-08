"use client";

import React, { useContext } from "react";

import MapContext from "@/context/MapContext";

export default function Users() {
  const { option, setOption, session } = useContext(MapContext);

  return (
    <div class="bg-slate-900 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl m-10 ">
      <div class="bg-slate-800 rounded-lg px-6 py-4 ring-1 ring-slate-900/5 shadow-xl flex">
        <h3 class=" text-white mr-8 text-base font-medium tracking-tight col-4">
          User:
        </h3>
        <p class="text-slate-400 text-sm col-8">{session.user.name}</p>
      </div>
      <div class="bg-slate-800 rounded-lg px-6 py-4 ring-1 ring-slate-900/5 shadow-xl flex mt-5">
        <h3 class=" text-white mr-8 text-base font-medium tracking-tight col-4">
          Email:
        </h3>
        <p class="text-slate-400 text-sm col-8">{session.user.email}</p>
      </div>
    </div>
  );
}

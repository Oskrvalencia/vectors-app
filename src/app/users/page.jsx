"use client";

import React, { useEffect, useState } from "react";

const Users = () => {
  /* const [data, setUsers] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("http://localhost:3000/api/users");
      console.log("first", response);
      const result = await response.json();
      console.log("first", result);
      setUsers(result);
    };

    fetchUsers();
  }, []); */

  return (
    <div>
      Users
      {/* {data?.map((e) => {
        <h1>{e.name}</h1>;
      })} */}
      {/* {JSON.stringify(data)} */}
    </div>
  );
};

export default Users;

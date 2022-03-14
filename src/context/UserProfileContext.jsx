import React, { createContext, useContext, useState, useEffect } from "react";
import { database } from "../mics/config";
import { transformToArrWithId } from "../mics/helpers";

//user hook
const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState(null);
  useEffect(() => {
    const userListRef = database.ref("profiles");

    userListRef.on("value", (snap) => {
      const data = transformToArrWithId(snap.val());
      setUsers(data);
    });
    return () => {
      userListRef.off();
    };
  }, []);

  return (
    <UsersContext.Provider value={users}>{children}</UsersContext.Provider>
  );
};

export const useUsers = () => useContext(UsersContext);

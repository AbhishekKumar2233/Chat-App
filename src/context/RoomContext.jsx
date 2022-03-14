import React, { createContext, useContext, useState, useEffect } from "react";
import { database } from "../mics/config";
import { transformToArrWithId } from "../mics/helpers";

const RoomsContext = createContext();

export const RoomsProvider = ({ children }) => {
  const [rooms, setRooms] = useState(null);
  useEffect(() => {
    const roomListRef = database.ref("rooms");

    roomListRef.on("value", (snap) => {
      const data = transformToArrWithId(snap.val());
      setRooms(data);
    });
    return () => {
      roomListRef.off();
    };
  }, []);

  return (
    <RoomsContext.Provider value={rooms}>{children}</RoomsContext.Provider>
  );
};

export const useRooms = () => useContext(RoomsContext);

//user hook
const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState(null);
  useEffect(() => {
    const userListRef = database.ref("/profiles");

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

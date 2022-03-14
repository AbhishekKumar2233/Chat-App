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

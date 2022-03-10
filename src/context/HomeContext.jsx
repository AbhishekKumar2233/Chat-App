import React, { createContext, useState, useEffect } from "react";
import { database } from "../misc/config";

const RoomsContext = createContext();

export const RoomsProvider = ({ children }) => {
  const [rooms, setRooms] = useState(null);
  useEffect(() => {
    const roomListRef = database.ref("rooms");

    roomListRef.on("value", (snap) => {
      console.log(snap.value);
    });
  }, []);

  return (
    <RoomsContext.Provider value="Hello">{children}</RoomsContext.Provider>
  );
};

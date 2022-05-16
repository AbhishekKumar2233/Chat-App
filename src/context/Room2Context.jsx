import React, { createContext, useContext, useState, useEffect } from "react";
import { database } from "../mics/config";
import { transformToArrWithId } from "../mics/helpers";

const Room2Context = createContext();

export const Room2Provider = ({ children }) => {
  const [profiles, setProfiles] = useState(null);
  useEffect(() => {
    const roomListRef = database.ref("profiles");

    roomListRef.on("value", (snap) => {
      const data = transformToArrWithId(snap.val());
      setProfiles(data);
    });
    return () => {
      roomListRef.off();
    };
  }, []);

  return (
    <Room2Context.Provider value={profiles}>{children}</Room2Context.Provider>
  );
};

export const useProfiles = () => useContext(Room2Context);

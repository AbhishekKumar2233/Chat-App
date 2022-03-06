import React, { createContext, useState, useContext, useEffect } from "react";
import { auth, database } from "../mics/config";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((authObj) => {
      if (authObj) {
        database.ref(`/profiles/${authObj.uid}`).on("value", (snap) => {});
        const data = {
          uid: authObj.uid,
          email: authObj.email
        };

        setProfile(data);
      } else {
        setProfile(null);
      }
    });
  }, []);

  return (
    <ProfileContext.Provider value={profile}>
      {children}
    </ProfileContext.Provider>
  );
};
export const useProfile = () => useContext(ProfileContext);

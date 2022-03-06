import React, { createContext, useState, useContext, useEffect } from "react";
import { auth, database } from "../mics/config";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((authObj) => {
      if (authObj) {
        database.ref(`/profiles/${authObj.uid}`).on("value", (snap) => {
          const { name, createdAt } = snap.val();
          const data = {
            name,
            createdAt,
            uid: authObj.uid,
            email: authObj.email
          };
          setProfile(data);
          setLoading(false);
        });
      } else {
        setProfile(null);
        setLoading(false);
      }
    });
  }, []);

  return (
    <ProfileContext.Provider value={{ isLoading, profile }}>
      {children}
    </ProfileContext.Provider>
  );
};
export const useProfile = () => useContext(ProfileContext);

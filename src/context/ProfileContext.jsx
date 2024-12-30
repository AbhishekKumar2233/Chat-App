import React, { createContext, useState, useContext, useEffect } from "react";
import { auth, database } from "../mics/config";
import { ref, onValue, set, onDisconnect, get } from "firebase/database"; // Firebase v9+ imports

export const isOfflineForDatabase = {
  state: "offline",
  last_changed: Date.now() // Use JavaScript's Date.now() instead of Firebase's ServerValue.TIMESTAMP
};

export const isOnlineForDatabase = {
  state: "online",
  last_changed: Date.now() // Use JavaScript's Date.now() instead of Firebase's ServerValue.TIMESTAMP
};

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null); // Initialize with null instead of false
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    let userRef;
    let userStatusRef;
    let connectedRef;
    const authUnsub = auth.onAuthStateChanged((authObj) => {
      if (authObj) {
        console.log(authObj.uid);
        userStatusRef = ref(database, `/status/${authObj.uid}`);
        userRef = ref(database, `/profiles/${authObj.uid}`);
        
        get(userRef).then((snap) => {
          const { name, createdAt, avatar } = snap.val();

          const data = {
            name,
            createdAt,
            avatar,
            uid: authObj.uid,
            email: authObj.email
          };
          setProfile(data);
          setLoading(false);
        });

        connectedRef = ref(database, ".info/connected");
        
        onValue(connectedRef, (snapshot) => {
          // If we're not currently connected, don't do anything
          if (snapshot.val() === false) {
            return;
          }

          // Set online/offline status with onDisconnect()
          onDisconnect(userStatusRef)
            .set(isOfflineForDatabase)
            .then(() => {
              set(userStatusRef, isOnlineForDatabase);
            });
        });

      } else {
        if (userRef) {
          // Ensure proper cleanup
          userRef.off(); // Unsubscribe from the user data
        }
        if (userStatusRef) {
          // Unsubscribe from the status listener
          userStatusRef.off();
        }
        if (connectedRef) {
          // Unsubscribe from connectedRef listener when user is not authenticated
          connectedRef.off();
        }
        setProfile(null);
        setLoading(false);
      }
    });

    return () => {
      authUnsub(); // Unsubscribe from auth changes
      if (connectedRef) {
        connectedRef.off(); // Properly unsubscribe from the connectedRef listener
      }
      if (userRef) {
        userRef.off(); // Unsubscribe from user data
      }
    };
  }, []);

  return (
    <ProfileContext.Provider value={{ isLoading, profile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);

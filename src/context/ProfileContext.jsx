import React, { createContext, useState, useContext, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Firebase v9+ imports
import { getDatabase, ref, onValue, set, onDisconnect, get } from "firebase/database"; // Firebase v9+ imports

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
    const auth = getAuth(); // Get the Firebase auth instance
    const database = getDatabase(); // Get the Firebase database instance
    let userRef;
    let userStatusRef;
    let connectedRef;

    // Subscribe to authentication state changes
    const authUnsub = onAuthStateChanged(auth, async (authObj) => {
      if (authObj) {
        console.log(authObj.uid);

        // Use ref to get database references
        userStatusRef = ref(database, `/status/${authObj.uid}`);
        userRef = ref(database, `/profiles/${authObj.uid}`);

        try {
          const snap = await get(userRef);
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
        } catch (error) {
          console.error("Error fetching profile:", error);
          setLoading(false);
        }

        // Monitor the connection status
        connectedRef = ref(database, ".info/connected");

        onValue(connectedRef, (snapshot) => {
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
        // Cleanup listeners if no user is authenticated
        if (userRef) {
          userRef.off(); // Unsubscribe from user data
        }
        if (userStatusRef) {
          userStatusRef.off(); // Unsubscribe from user status
        }
        if (connectedRef) {
          connectedRef.off(); // Unsubscribe from connection status
        }
        setProfile(null); // Clear profile state
        setLoading(false); // Stop loading when no user is authenticated
      }
    });

    // Cleanup function for unsubscribing from listeners
    return () => {
      authUnsub(); // Unsubscribe from auth state changes
      if (connectedRef) {
        connectedRef.off(); // Unsubscribe from the connectedRef listener
      }
      if (userRef) {
        userRef.off(); // Unsubscribe from user data
      }
    };
  }, []); // Empty dependency array ensures this only runs once on mount

  return (
    <ProfileContext.Provider value={{ isLoading, profile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);

import React, { createContext, useState, useContext, useEffect } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  getDatabase,
  ref,
  onValue,
  set,
  onDisconnect,
  get,
  child,
} from "firebase/database";

// Define online/offline status objects
export const isOfflineForDatabase = {
  state: "offline",
  last_changed: Date.now(),
};

export const isOnlineForDatabase = {
  state: "online",
  last_changed: Date.now(),
};

// Create a context for the profile
const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth(); // Firebase auth instance
    const database = getDatabase(); // Firebase database instance
    let userStatusRef = null;
    let connectedRef = null;

    // Listen for authentication state changes
    const authUnsub = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        const { uid, email } = authUser;

        // References for user's profile and status in the database
        const userRef = ref(database, `/profiles/${uid}`);
        userStatusRef = ref(database, `/status/${uid}`);
        connectedRef = ref(database, ".info/connected");

        try {
          // Fetch the user's profile from the database
          const snap = await get(userRef);
          if (snap.exists()) {
            const { name, createdAt, avatar } = snap.val();

            setProfile({
              name,
              createdAt,
              avatar,
              uid,
              email,
            });
          } else {
            console.warn("Profile not found for user:", uid);
            setProfile({ uid, email }); // Set minimal profile if no data exists
          }
          // setLoading(false);
        } catch (error) {
          console.error("Error fetching profile:", error);
          // setLoading(false);
        }

        // Monitor the connection status
        onValue(connectedRef, (snapshot) => {
          if (snapshot.val() === false) return;

          // Set up disconnect and online status
          onDisconnect(userStatusRef)
            .set(isOfflineForDatabase)
            .then(() => {
              set(userStatusRef, isOnlineForDatabase);
            });
        });
      } else {
        // If the user logs out or is unauthenticated, clear profile and clean up
        if (userStatusRef) set(userStatusRef, isOfflineForDatabase);
        setProfile(null);
        // setLoading(false);
      }
    });

    // Cleanup function to remove listeners
    return () => {
      authUnsub(); // Unsubscribe from auth state changes
      if (connectedRef) onValue(connectedRef, () => {}); // Detach connected listener
      if (userStatusRef) onValue(userStatusRef, () => {}); // Detach status listener
    };
  }, []);

  return (
    <ProfileContext.Provider value={{ isLoading, profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

// Hook to use the profile context
export const useProfile = () => useContext(ProfileContext);

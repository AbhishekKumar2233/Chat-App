import React, { createContext, useContext, useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database"; // Firebase v9+ modular imports
import { transformToArrWithId } from "../mics/helpers"; // Assuming this function transforms data

// Create context
const Room2Context = createContext();

// Provider component
export const Room2Provider = ({ children }) => {
  const [profiles, setProfiles] = useState(null);
  const [loading, setLoading] = useState(true); // Optional: to track loading state

  useEffect(() => {
    const database = getDatabase(); // Initialize the Firebase database
    const roomListRef = ref(database, "profiles"); // Reference to the "profiles" node

    // Subscribe to the profiles data in Firebase
    const unsubscribe = onValue(roomListRef, (snapshot) => {
      const data = snapshot.val();
      const profilesArray = transformToArrWithId(data); // Transform data to array with IDs
      setProfiles(profilesArray); // Set the profiles state with transformed data
      setLoading(false); // Mark loading as complete
    });

    // Cleanup: Unsubscribe when component unmounts
    return () => {
      unsubscribe();
    };
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  return (
    <Room2Context.Provider value={ profiles }>
      {children}
    </Room2Context.Provider>
  );
};

// Custom hook to use the profiles data
export const useProfiles = () => useContext(Room2Context);

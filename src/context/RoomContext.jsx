import React, { createContext, useContext, useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database"; // Firebase v9+ imports

// Function to transform Firebase data into an array with IDs
const transformToArrWithId = (data) => {
  if (!data) return []; // Check if the data is empty or undefined
  return Object.keys(data).map((key) => ({
    id: key,
    ...data[key],
  }));
};

// Create a context for rooms
const RoomsContext = createContext();

// RoomsProvider component to manage the rooms state and fetch data from Firebase
export const RoomsProvider = ({ children }) => {
  const [rooms, setRooms] = useState(null); // State to hold the rooms data
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null); // State to track errors

  useEffect(() => {
    const database = getDatabase(); // Initialize Firebase database
    const roomListRef = ref(database, "rooms"); // Reference to the "rooms" data in Firebase

    // Set up a listener for changes to the rooms data
    const unsubscribe = onValue(
      roomListRef,
      (snapshot) => {
        const data = snapshot.val(); // Get the raw data from Firebase
        const roomsArray = transformToArrWithId(data); // Transform data into an array with IDs
        setRooms(roomsArray); // Update the state with the transformed data
        setLoading(false); // Mark loading as complete
        setError(null); // Clear any previous errors
      },
      (err) => {
        // Error handling
        console.error("Error fetching rooms data: ", err);
        setError("Failed to fetch rooms data");
        setLoading(false); // Mark loading as complete even in case of error
      }
    );

    // Cleanup: Unsubscribe from the database listener when the component unmounts
    return () => {
      unsubscribe(); // Remove the listener
    };
  }, []); // Empty dependency array ensures this effect runs only once, when the component mounts

  return (
    <RoomsContext.Provider value={ rooms }>
      {children} {/* Render child components, passing rooms, loading, and error state */}
    </RoomsContext.Provider>
  );
};

// Custom hook to access rooms context
export const useRooms = () => useContext(RoomsContext);

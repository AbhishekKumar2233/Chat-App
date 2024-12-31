import { useState, useCallback, useEffect, useRef } from "react";
import { database,ref } from "./config";
import { onValue, off } from "firebase/database";


//hook for Drawer open/close
export function useModelState() {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return { isOpen, open, close };
}

//hook for screen size
export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  );

  useEffect(() => {
    const queryList = window.matchMedia(query);
    setMatches(queryList.matches);

    const listener = (evt) => setMatches(evt.matches);

    queryList.addListener(listener);
    return () => queryList.removeListener(listener);
  }, [query]);
  return matches;
};

export function usePresence(uid) {
  const [presence, setPresence] = useState(null);

  useEffect(() => {
    if (!uid) return; // Avoid running if UID is not provided

    const userStatusRef = ref(database, `/status/${uid}`);

    // Attach the listener
    const unsubscribe = onValue(userStatusRef, (snapshot) => {
      if (snapshot.exists()) {
        setPresence(snapshot.val());
      } else {
        setPresence(null); // Set presence to null if no data exists
      }
    });

    // Cleanup listener
    return () => {
      off(userStatusRef);
    };
  }, [uid]);

  return presence;
}


// Hover Hook
export function useHover() {
  const [value, setValue] = useState(false);
  const ref = useRef(null);
  const handleMouseOver = () => setValue(true);
  const handleMouseOut = () => setValue(false);
  useEffect(
    () => {
      const node = ref.current;
      if (node) {
        node.addEventListener("mouseover", handleMouseOver);
        node.addEventListener("mouseout", handleMouseOut);
      }
      return () => {
        node.removeEventListener("mouseover", handleMouseOver);
        node.removeEventListener("mouseout", handleMouseOut);
      };
    },
    [ref.current] // Recall only if ref changes
  );
  return [ref, value];
}

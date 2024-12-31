import React, { useCallback } from "react";
import { Button, Drawer } from "rsuite";
import { useModelState, useMediaQuery } from "../../mics/custom-hook";
import Dashboard from "./Index";
import { getAuth, signOut } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import DashboardIcon from "@rsuite/icons/Dashboard";

export default function DashboardToggle() {
  const { isOpen, close, open } = useModelState();
  const isMobile = useMediaQuery("(max-width:992px)");

  // Firebase instances
  const auth = getAuth();
  const database = getDatabase();

  const isOfflineForDatabase = {
    state: "offline",
    lastChanged: Date.now(),
  };

  // sign-out function
  const onSignOut = useCallback(async () => {
    try {
      const userId = auth.currentUser.uid;
      const statusRef = ref(database, `/status/${userId}`);
      
      // Update the database to reflect the offline status
      await set(statusRef, isOfflineForDatabase);

      // Sign out the user
      await signOut(auth);

      alert("Signed out successfully");
      close();
    } catch (error) {
      alert(`Error signing out: ${error.message}`);
      console.error("Sign out error:", error);
    }
  }, [auth, database, close]);

  return (
    <>
      <Button block color="blue" appearance="primary" onClick={open}>
        <DashboardIcon /> Dashboard
      </Button>
      <Drawer full={isMobile} open={isOpen} onClose={close} placement="left">
        <Dashboard onSignOut={onSignOut} />
      </Drawer>
    </>
  );
}

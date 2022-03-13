import React, { useCallback } from "react";
import { Button, Drawer } from "rsuite";
import { useModelState, useMediaQuery } from "../../mics/custom-hook";
import Dashboard from "./Index";
import { auth, database } from "../../mics/config";
import DashboardIcon from "@rsuite/icons/Dashboard";
import { isOfflineForDatabase } from "../../context/ProfileContext";

export default function DashboardToggle() {
  const { isOpen, close, open } = useModelState();
  // const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:992px)");

  //signout func
  const onSignOut = useCallback(() => {
    database
      .ref(`/status/${auth.currentUser.uid}`)
      .set(isOfflineForDatabase)
      .then(() => {
        auth.signOut();
        alert("Signed out");
        close();
      })
      .catch((err) => {
        alert(err);
      });
  }, [close]);

  return (
    <>
      <Button block color="blue" appearance="primary" onClick={open}>
        {/* <Icon icon="dashboard" /> */}
        <DashboardIcon /> Dashboard
      </Button>
      {/* <Button onClick={() => setOpen(true)}>Open</Button> */}
      <Drawer full={isMobile} open={isOpen} onClose={close} placement="left">
        <Dashboard onSignOut={onSignOut} />
      </Drawer>
      {/* <Drawer placement="left" open={open} onClose={() => setOpen(false)}>
        <Dashboard />
      </Drawer> */}
    </>
  );
}

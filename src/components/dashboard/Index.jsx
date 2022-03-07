import React from "react";
import { Button, Drawer } from "rsuite";
import { useProfile } from "../../context/ProfileContext";

export default function Dashboard({ onSignOut }) {
  const { profile } = useProfile();
  return (
    <div>
      <Drawer.Header>
        <Drawer.Title>Dashboard</Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
        <h3>Hey, {profile.name}</h3>
      </Drawer.Body>
      <Drawer.Footer>
        <Button block color="red" appearance="primary" onClick={onSignOut}>
          Sign Out
        </Button>
      </Drawer.Footer>
    </div>
  );
}

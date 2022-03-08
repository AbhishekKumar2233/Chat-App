import React from "react";
import { Button, Drawer, Divider } from "rsuite";
import { useProfile } from "../../context/ProfileContext";
import EditableInput from "../EditableInput";

export default function Dashboard({ onSignOut }) {
  const { profile } = useProfile();

  const onSave = async (newData) => {
    console.log(newData);
  };

  return (
    <div>
      <Drawer.Header>
        <Drawer.Title>Dashboard</Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
        <h3>Hey, {profile.name}</h3>
        <Divider />
        <EditableInput
          name="nickname"
          initialValue={profile.name}
          onSave={onSave}
          label={<h6 className="md-2">Nickname</h6>}
        />
      </Drawer.Body>
      <Drawer.Footer>
        <Button block color="red" appearance="primary" onClick={onSignOut}>
          Sign Out
        </Button>
      </Drawer.Footer>
    </div>
  );
}

import React from "react";
import { Button, Drawer, Divider } from "rsuite";
import { useProfile } from "../../context/ProfileContext";
import EditableInput from "../EditableInput";
import { database } from "../../mics/config";
import AvtarUploadBtn from "./AvtarUploadBtn";
import { getUserUpdates } from "../../mics/helpers";

export default function Dashboard({ onSignOut }) {
  const { profile } = useProfile();

  const onSave = async (newData) => {
    // const userNicknameRef = database
    //   .ref(`/profiles/${profile.uid}`)
    //   .child("name");

    try {
      // await userNicknameRef.set(newData);

      const updates = await getUserUpdates(
        profile.uid,
        "name",
        newData,
        database
      );
      await database.ref().update(updates);

      alert("Nickname has been updated");
    } catch (err) {
      alert(err.message);
    }
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
        <AvtarUploadBtn />
      </Drawer.Body>
      <Drawer.Footer>
        <Button block color="red" appearance="primary" onClick={onSignOut}>
          Sign Out
        </Button>
      </Drawer.Footer>
    </div>
  );
}

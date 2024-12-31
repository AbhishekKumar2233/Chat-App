import React, { useState } from "react";
import { Button, Drawer, Divider, Notification } from "rsuite";
import { useProfile } from "../../context/ProfileContext";
import EditableInput from "../EditableInput";
import { database } from "../../mics/config";
import AvatarUploadBtn from "./AvtarUploadBtn";
import { getUserUpdates } from "../../mics/helpers";

export default function Dashboard({ onSignOut }) {
  const { profile } = useProfile();
  const [loading, setLoading] = useState(false);

  // Function to save the new nickname
  const onSave = async (newData) => {
    setLoading(true); // Set loading state while saving data

    try {
      // Get updates for user profile in the database
      const updates = await getUserUpdates(
        profile.uid,
        "name",
        newData,
        database
      );

      // Apply updates to the database
      await database.ref().update(updates);

      // Notify user on success
      Notification.success({
        title: "Success",
        description: "Nickname has been updated",
      });
    } catch (err) {
      // Handle error if the operation fails
      Notification.error({
        title: "Error",
        description: err.message,
      });
    } finally {
      setLoading(false); // Reset loading state
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

        {/* Editable Input for nickname */}
        <EditableInput
          name="nickname"
          initialValue={profile.name}
          onSave={onSave}
          label={<h6 className="md-2">Nickname</h6>}
        />

        {/* Avatar upload button */}
        <AvatarUploadBtn />

      </Drawer.Body>
      <Drawer.Footer>
        {/* Sign out button */}
        <Button
          block
          color="red"
          appearance="primary"
          onClick={onSignOut}
          loading={loading} // Disable button while loading
        >
          Sign Out
        </Button>
      </Drawer.Footer>
    </div>
  );
}

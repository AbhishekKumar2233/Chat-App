import React, { useState, useEffect } from "react";
import { Button, Drawer, Notification, useToaster } from "rsuite";
import { useProfile } from "../../context/ProfileContext";
import EditableInput from "../EditableInput";
import { ref, update } from "firebase/database";
import { database } from "../../mics/config";
import AvatarUploadBtn from "./AvtarUploadBtn";

export default function Dashboard({ onSignOut }) {
  const { profile, setProfile } = useProfile(); // Ensure setProfile is accessible
  const [loading, setLoading] = useState(false);
  const toaster = useToaster(); // Initialize the toaster for notifications

  // Helper to show notifications
  const showNotification = (type, title, description) => {
    toaster.push(
      <Notification type={type} header={title}>
        {description}
      </Notification>,
      { placement: "topCenter" }
    );
  };

  // Function to save the new nickname
  const onSave = async (newData) => {
    if (!profile.uid) {
      showNotification("error", "Error", "User ID is missing. Please try again.");
      return;
    }

    setLoading(true);

    try {
      // Path to the user's profile in the database
      const userRef = ref(database, `profiles/${profile.uid}`);

      // Update the nickname in the database
      await update(userRef, { name: newData });

      // Update profile state locally
      setProfile((prev) => ({ ...prev, name: newData }));

      showNotification("success", "Success", "Nickname has been updated.");
    } catch (err) {
      console.error("Error updating nickname:", err.message);
      showNotification("error", "Error", err.message || "Failed to update nickname.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Drawer.Header>
        <Drawer.Title>Hey, {profile.name}</Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
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

import React, { useCallback, useState } from "react";
import { InputGroup, Input } from "rsuite";
import { useParams } from "react-router";
import { useProfile } from "../../../context/ProfileContext";
import { database } from "../../../mics/config";
import SendIcon from "@rsuite/icons/Send";
import AttachmentBtnModel from "./AttactmentBtnModal"; // Modal for file attachment
import { getDatabase, ref, push, serverTimestamp } from "firebase/database"; // Firebase v9+ imports for Database
import { getAuth } from "firebase/auth"; // Firebase v9+ import for Auth

// Function to assemble the message object
function assembleMessage(profile, chatId) {
  return {
    roomId: chatId,
    author: {
      name: profile.name,
      uid: profile.uid,
      createdAt: profile.createdAt,
      ...(profile.avatar ? { avatar: profile.avatar } : {}),
    },
    createdAt: serverTimestamp(),
    likeCount: 0,
  };
}

export default function Bottom() {
  const [input, setInput] = useState(""); // State for the text input
  const [isLoading, setLoading] = useState(false); // Loading state to disable input when sending
  const { chatId } = useParams(); // Get chatId from URL params
  const { profile } = useProfile(); // Get profile data from context

  // Handle input change
  const onInputChange = useCallback((value) => {
    setInput(value);
  }, []);

  // Handle Send button click
  const onSendClick = async () => {
    if (input.trim() === "") {
      return; // Do not send empty messages
    }
    const msgData = assembleMessage(profile, chatId);
    msgData.text = input;

    const updates = {};

    // Get a unique ID for the message
    const messageId = database.ref("messages").push().key;
    updates[`/messages/${messageId}`] = msgData;
    updates[`/rooms/${chatId}/lastMessage`] = {
      ...msgData,
      msgData: messageId, // Link lastMessage to the newly created message
    };
    setLoading(true); // Set loading to true while sending the message

    try {
      await database.ref().update(updates); // Update Firebase with the new message
      setInput(""); // Clear the input after sending the message
      setLoading(false); // Set loading to false when done
    } catch (err) {
      setLoading(false);
      alert(err); // Handle error and show an alert
    }
  };

  // Handle pressing "Enter" key to send the message
  const onKeyDown = (ev) => {
    if (ev.keyCode === 13) {
      ev.preventDefault();
      onSendClick(); // Trigger send click
    }
  };

  // Handle file upload after selecting attachments
  const afterUpload = useCallback(
    async (files) => {
      setLoading(true); // Set loading to true when uploading files
      const updates = {};
      files.forEach((file) => {
        const msgData = assembleMessage(profile, chatId);
        msgData.file = file; // Attach the file to the message

        // Get a unique ID for each message with an attachment
        const messageId = database.ref("messages").push().key;
        updates[`/messages/${messageId}`] = msgData;
      });

      // Get the last message's ID and update the room's lastMessage
      const lastMsgId = Object.keys(updates).pop();
      updates[`/rooms/${chatId}/lastMessage`] = {
        ...updates[lastMsgId],
        msgId: lastMsgId, // Link the last message to the room
      };

      try {
        await database.ref().update(updates); // Update Firebase with the file messages
        setLoading(false); // Set loading to false after upload
      } catch (err) {
        setLoading(false);
        alert(err); // Handle errors during the upload process
      }
    },
    [chatId, profile] // Ensure this runs when chatId or profile changes
  );

  return (
    <div>
      <InputGroup>
        {/* Attachment button modal */}
        <AttachmentBtnModel afterUpload={afterUpload} />
        {/* Message input field */}
        <Input
          placeholder="Write a new message.."
          value={input}
          onChange={onInputChange} // Update input state on change
          onKeyDown={onKeyDown} // Send message when Enter is pressed
        />
        {/* Send button */}
        <InputGroup.Button
          color="blue"
          appearance="primary"
          onClick={onSendClick} // Trigger sending message on click
          disabled={isLoading} // Disable button while loading
        >
          <SendIcon />
        </InputGroup.Button>
      </InputGroup>
    </div>
  );
}

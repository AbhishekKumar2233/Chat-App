import React, { useCallback, useState } from "react";
import { InputGroup, Input } from "rsuite";
import { useParams } from "react-router";
import { useProfile } from "../../../context/ProfileContext";
import { ref, push, serverTimestamp, update } from "firebase/database";
import { database } from "../../../mics/config";
import SendIcon from "@rsuite/icons/Send";
import AttachmentBtnModel from "./AttactmentBtnModal";

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
  const [input, setInput] = useState("");
  const [isLoading, setLoading] = useState(false);
  const { chatId } = useParams();
  const { profile } = useProfile();

  const onInputChange = useCallback((value) => {
    setInput(value);
  }, []);

  // const onSendClick = async () => {
  //   if (!input.trim()) return;
  
  //   // Assemble the message data
  //   const msgData = {
  //     ...assembleMessage(profile, chatId),
  //     text: input.trim(),
  //   };
  
  //   // Generate the message ID before updating
  //   const messageRef = push(ref(database, "messages"));
  //   const messageId = messageRef.key;
  
  //   const updates = {
  //     [`/messages/${messageId}`]: msgData,
  //     [`/rooms/${chatId}/lastMessage`]: { ...msgData, msgId: messageId },
  //   };
  
  //   // isLoading(true);
  
  //   try {
  //     // Update both messages and room's lastMessage
  //     await update(ref(database), updates);
  
  //     // Clear input only after a successful send
  //     setInput("");
  //   } catch (error) {
  //           console.log(database,"databaseupdates",updates)

  //     console.error("Error sending message:", error);
  //     alert("Failed to send message. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };  

// import { ref, push, update, serverTimestamp } from "firebase/database";
// import { database } from "./firebase"; // adjust path if needed

const onSendClick = async () => {
  if (!input || !input.trim()) return;

  try {
    setLoading(true);

    // Create message ref FIRST
    const messageRef = push(ref(database, "messages"));
    const messageId = messageRef.key;

    // Build FULLY DEFINED message object
    const msgData = {
      msgId: messageId,
      chatId: chatId,
      text: input.trim(),

      author: {
        uid: profile.uid,
        name: profile.name || "Unknown",
        avatar: profile.avatar || "",
        createdAt: serverTimestamp(), // 🔥 NEVER undefined
      },

      createdAt: serverTimestamp(),
      type: "text",
    };

    const updates = {};
    updates[`/messages/${messageId}`] = msgData;
    updates[`/rooms/${chatId}/lastMessage`] = {
      msgId: messageId,
      text: msgData.text,
      authorId: profile.uid,
      createdAt: serverTimestamp(),
    };

    await update(ref(database), updates);

    setInput("");
        alert("Message is send successfully.");
  } catch (error) {
    console.error("Error sending message:", error);
    alert("Failed to send message.");
  } finally {
    setLoading(false);
  }
};


  const onKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onSendClick();
    }
  };

  const afterUpload = useCallback(
    async (files) => {
      // setLoading(true);
      const updates = {};

      files.forEach((file) => {
        const msgData = {
          ...assembleMessage(profile, chatId),
          file,
        };
        const messageId = push(ref(database, "messages")).key;
        updates[`/messages/${messageId}`] = msgData;
      });

      const lastMsgId = Object.keys(updates).pop();
      updates[`/rooms/${chatId}/lastMessage`] = {
        ...updates[`/messages/${lastMsgId}`],
        msgId: lastMsgId,
      };

      try {
        await update(ref(database), updates);
      } catch (error) {
        console.error("Error uploading files:", error);
        alert("Failed to upload files. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [chatId, profile]
  );

  return (
    <div>
      <InputGroup>
        {/* <AttachmentBtnModel afterUpload={afterUpload} /> */}
        <Input
          placeholder="Write a new message..."
          value={input}
          onChange={onInputChange}
          onKeyDown={onKeyDown}
          disabled={isLoading}
        />
        <InputGroup.Button
          color="blue"
          appearance="primary"
          onClick={onSendClick}
          disabled={isLoading}
        >
          <SendIcon />
        </InputGroup.Button>
      </InputGroup>
    </div>
  );
}

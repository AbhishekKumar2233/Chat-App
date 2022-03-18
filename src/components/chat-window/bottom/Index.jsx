import React, { useCallback, useState } from "react";
import { InputGroup, Input } from "rsuite";
import firebase from "firebase/app";
import { useParams } from "react-router";
import { useProfile } from "../../../context/ProfileContext";
import { database } from "../../../mics/config";
import SendIcon from "@rsuite/icons/Send";
import AttactmentBtnModel from "./AttactmentBtnModal";

function assembleMessage(profile, chatId) {
  return {
    roomId: chatId,
    author: {
      name: profile.name,
      uid: profile.uid,
      createdAt: profile.createdAt,
      ...(profile.avatar ? { avatar: profile.avatar } : {})
    },
    createdAt: firebase.database.ServerValue.TIMESTAMP,
    likeCount: 0
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

  const onSendClick = async () => {
    if (input.trim() === "") {
      return;
    }
    const msgData = assembleMessage(profile, chatId);
    msgData.text = input;

    const updates = {};

    const messageId = database.ref("messages").push().key; //using this method we get unique key from real time database
    updates[`/messages/${messageId}`] = msgData;
    updates[`/rooms/${chatId}/lastMessage`] = {
      ...msgData,
      msgData: messageId
    };
    setLoading(true);

    try {
      await database.ref().update(updates);
      setInput("");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      alert(err);
    }
  };

  const onKeyDown = (ev) => {
    if (ev.keyCode === 13) {
      ev.preventDefault();
      onSendClick();
    }
  };

  return (
    <div>
      <InputGroup>
        <AttactmentBtnModel />
        <Input
          placeholder="Write a new message.."
          value={input}
          onChange={onInputChange}
          onKeyDown={onKeyDown}
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

import React, { useCallback, useState } from "react";
import { InputGroup, Input } from "rsuite";
import firebase from "firebase/app";

function assembleMessage(profile, chatId) {
  return {
    roomId: chatId,
    author: {
      name: profile.name,
      uid: profile.uid,
      createdAt: profile.createdAt,
      ...(profile.avatar ? { avatar: profile.avatar } : {})
    },
    createdAt: firebase.databse.ServerValue.TIMESTAMP
  };
}

export default function Bottom() {
  const [input, setInput] = useState("");

  const onInputChange = useCallback((value) => {
    setInput(value);
  }, []);

  const onSendClick = () => {
    if (input.trim() === "") {
      return;
    }
    // const msgData = assembleMessage(profile, chatId);
  };

  return (
    <div>
      <InputGroup>
        <Input
          placeholder="Write a new message.."
          value={input}
          onChange={onInputChange}
        />
        <InputGroup.Button
          color="blue"
          appearance="primary"
          onClick={onSendClick}
        >
          Send
        </InputGroup.Button>
      </InputGroup>
    </div>
  );
}

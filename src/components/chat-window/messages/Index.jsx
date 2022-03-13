import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { database } from "../../../mics/config";
import { transformToArrWithId } from "../../../mics/helpers";
import MessageItem from "./MessageItem";

export default function Message() {
  const { chatId } = useParams();
  const [messages, setMessages] = useState(null);

  const isChatEmpty = messages && messages.length === 0;
  const canShowMessages = messages && messages.length > 0;

  useEffect(() => {
    const messagesRef = database.ref("/messages");
    messagesRef
      .orderByChild("roomId")
      .equalTo(chatId)
      .on("value", (snap) => {
        const data = transformToArrWithId(snap.val());
        setMessages(data);
      });

    return () => {
      messagesRef.off("value");
    };
  }, [chatId]);

  return (
    <ul className="msg-list custom-scroll">
      {isChatEmpty && <li>No Message</li>}
      {canShowMessages &&
        messages.map((msg) => <MessageItem key={msg.id} message={msg} />)}
    </ul>
  );
}

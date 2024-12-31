import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { auth, database } from "../../../mics/config";
import { groupBy, transformToArrWithId } from "../../../mics/helpers";
import MessageItem from "./MessageItem";
import { Button } from "rsuite";
import { ref, query, orderByChild, equalTo, limitToLast, onValue, off, update } from "firebase/database";

const PAGE_SIZE = 15;

function shouldScrollToBottom(node, threshold = 30) {
  const percentage = (100 * node.scrollTop) / (node.scrollHeight - node.clientHeight) || 0;
  return percentage > threshold;
}

export default function Message() {
  const { chatId } = useParams();
  const [messages, setMessages] = useState([]);
  const [limit, setLimit] = useState(PAGE_SIZE);
  const selfRef = useRef(null);

  const isChatEmpty = messages.length === 0;
  const canShowMessages = messages.length > 0;

  const loadMessages = useCallback(
    (limitToLastCount = PAGE_SIZE) => {
      const node = selfRef.current;
      const messagesRef = query(
        ref(database, "/messages"),
        orderByChild("roomId"),
        equalTo(chatId),
        limitToLast(limitToLastCount)
      );

      onValue(messagesRef, (snap) => {
        const data = transformToArrWithId(snap.val());
        setMessages(data);

        if (node && shouldScrollToBottom(node)) {
          node.scrollTop = node.scrollHeight;
        }
      });

      setLimit((prev) => prev + PAGE_SIZE);
    },
    [chatId]
  );

  const onLoadMore = useCallback(() => {
    const node = selfRef.current;
    const oldHeight = node.scrollHeight;

    loadMessages(limit);

    setTimeout(() => {
      const newHeight = node.scrollHeight;
      node.scrollTop += newHeight - oldHeight;
    }, 200);
  }, [loadMessages, limit]);

  useEffect(() => {
    const node = selfRef.current;

    loadMessages();

    if (node) {
      setTimeout(() => {
        node.scrollTop = node.scrollHeight;
      }, 200);
    }

    return () => {
      const messagesRef = ref(database, "/messages");
      off(messagesRef);
    };
  }, [loadMessages]);

  const handleAdmin = useCallback(
    async (uid) => {
      const adminRef = ref(database, `/rooms/${chatId}/admins`);

      try {
        await update(adminRef, (admins) => {
          if (admins) {
            if (admins[uid]) {
              admins[uid] = null;
              alert("Admin permission removed");
            } else {
              admins[uid] = true;
              alert("Admin permission granted");
            }
          }
          return admins;
        });
      } catch (err) {
        alert("Failed to update admin permissions");
      }
    },
    [chatId]
  );

  const handleLike = useCallback(
    async (msgId) => {
      const { uid } = auth.currentUser || {};
      const messageRef = ref(database, `/messages/${msgId}`);

      try {
        await update(messageRef, (msg) => {
          if (msg) {
            if (msg.likes && msg.likes[uid]) {
              msg.likeCount -= 1;
              msg.likes[uid] = null;
            } else {
              msg.likeCount = (msg.likeCount || 0) + 1;
              msg.likes = { ...msg.likes, [uid]: true };
            }
          }
          return msg;
        });
      } catch (err) {
        alert("Failed to update likes");
      }
    },
    []
  );

  const handleDelete = useCallback(
    async (msgId) => {
      if (!window.confirm("Delete this message?")) return;

      const isLast = messages[messages.length - 1]?.id === msgId;

      const updates = {
        [`/messages/${msgId}`]: null,
      };

      if (isLast && messages.length > 1) {
        updates[`/rooms/${chatId}/lastMessage`] = {
          ...messages[messages.length - 2],
          msgId: messages[messages.length - 2].id,
        };
      } else if (isLast && messages.length === 1) {
        updates[`/rooms/${chatId}/lastMessage`] = null;
      }

      try {
        await update(ref(database), updates);
        alert("Message deleted");
      } catch (err) {
        alert("Failed to delete message");
      }
    },
    [chatId, messages]
  );

  const renderMessages = () => {
    const groupedMessages = groupBy(messages, (msg) =>
      new Date(msg.createdAt).toDateString()
    );

    return Object.entries(groupedMessages).map(([date, msgs]) => (
      <React.Fragment key={date}>
        <li className="text-center mb-1 padded">{date}</li>
        {msgs.map((msg) => (
          <MessageItem
            key={msg.id}
            message={msg}
            handleAdmin={handleAdmin}
            handleLike={handleLike}
            handleDelete={handleDelete}
          />
        ))}
      </React.Fragment>
    ));
  };

  return (
    <ul ref={selfRef} className="msg-list custom-scroll">
      {messages.length >= PAGE_SIZE && (
        <li className="text-center mt-2 mb-2">
          <Button onClick={onLoadMore} appearance="primary" color="green">
            Load More
          </Button>
        </li>
      )}
      {isChatEmpty && <li>No messages</li>}
      {canShowMessages && renderMessages()}
    </ul>
  );
}

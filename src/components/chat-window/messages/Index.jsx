import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { auth, database } from "../../../mics/config";
import { groupBy, transformToArrWithId } from "../../../mics/helpers";
import MessageItem from "./MessageItem";
import { Button } from "rsuite";

const PAGE_SIZE = 15;
const messagesRef = database.ref("/messages");

function shouldScrollToBottom(node, threshold = 30) {
  const percentage =
    (100 * node.scrollTop) / (node.scrollHeight - node.clientHeight) || 0;
  return percentage > threshold;
}
export default function Message() {
  const { chatId } = useParams();
  const [messages, setMessages] = useState(null);
  const [limit, setLimit] = useState(PAGE_SIZE);
  const selfRef = useRef();

  const isChatEmpty = messages && messages.length === 0;
  const canShowMessages = messages && messages.length > 0;

  const loadMessages = useCallback(
    (limitToLast) => {
      const node = selfRef.current;
      messagesRef.off();

      messagesRef
        .orderByChild("roomId")
        .equalTo(chatId)
        .limitToLast(limitToLast || PAGE_SIZE)
        .on("value", (snap) => {
          const data = transformToArrWithId(snap.val());
          setMessages(data);

          if (shouldScrollToBottom(node)) {
            node.scrollTop = node.scrollHeight;
          }
        });
      setLimit((p) => p + PAGE_SIZE);
    },
    [chatId]
  );

  const onLoadMore = useCallback(() => {
    const node = selfRef.current;
    const oldHeight = node.scrollHeight;
    loadMessages(limit);

    setTimeout(() => {
      const newHeight = node.scrollHeight;
      node.scrollHeight = newHeight - oldHeight;
    }, 200);
  }, [loadMessages, limit]);

  useEffect(() => {
    const node = selfRef.current;
    loadMessages();

    setTimeout(() => {
      node.scrollTop = node.scrollHeight;
    }, 200);

    return () => {
      messagesRef.off("value");
    };
  }, [loadMessages]);

  const handleAdmin = useCallback(
    async (uid) => {
      const adminRef = database.ref(`/rooms/${chatId}/admins`);
      let alertMsg;
      await adminRef.transaction((admins) => {
        if (admins) {
          if (admins[uid]) {
            admins[uid] = null;
            alertMsg = "Admin permission is removed";
          } else {
            admins[uid] = true;
            alertMsg = "Admin permission is granted";
          }
        }
        return admins;
      });
      alert(alertMsg);
    },
    [chatId]
  );

  const handleLike = useCallback(async (msgId) => {
    const { uid } = auth.currentUser;
    const messageRef = database.ref(`/messages/${msgId}`);
    // let alertMsg;
    await messageRef.transaction((msg) => {
      if (msg) {
        if (msg.likes && msg.likes[uid]) {
          msg.likeCount -= 1;
          msg.likes[uid] = null;
          // alertMsg = "Like removed";
        } else {
          msg.likeCount += 1;
          if (!msg.likes) {
            msg.likes = {};
          }
          msg.likes[uid] = true;
          // alertMsg = "like added";
        }
      }
      return msg;
    });
    // alert(alertMsg);
  }, []);

  const handleDelete = useCallback(
    async (msgId) => {
      if (!window.confirm("Delete this message now ?")) {
        return;
      }
      const isLast = messages[messages.length - 1].id === msgId;

      const updates = {};

      updates[`/messages/${msgId}`] = null;

      if (isLast && messages.length > 1) {
        updates[`/rooms/${chatId}/lastMessage`] = {
          ...messages[messages.length - 2],
          msgId: messages[messages.length - 2].id
        };
      }

      if (isLast && messages.length === 1) {
        updates[`/rooms/${chatId}/lastMessage`] = null;
      }
      try {
        await database.ref().update(updates);
        alert("Message is deleted now");
      } catch (err) {
        alert(err);
      }
    },
    [chatId, messages]
  );

  const renderMessages = () => {
    const groups = groupBy(messages, (item) =>
      new Date(item.createdAt).toDateString()
    );

    const items = [];

    Object.keys(groups).forEach((date) => {
      items.push(
        <li key={date} className="text-center mb-1 padded">
          {date}
        </li>
      );

      const msgs = groups[date].map((msg) => (
        <MessageItem
          key={msg.id}
          message={msg}
          handleAdmin={handleAdmin}
          handleLike={handleLike}
          handleDelete={handleDelete}
        />
      ));

      items.push(...msgs);
      // items.push(1,2,3,4,5)
    });
    return items;
  };

  return (
    <ul ref={selfRef} className="msg-list custom-scroll">
      {messages && messages.length >= PAGE_SIZE && (
        <li className="text-center mt-2 mb-2">
          <Button onClick={onLoadMore} appearence="primary" color="green">
            Load More
          </Button>
        </li>
      )}
      {isChatEmpty && <li>No Message</li>}
      {canShowMessages && renderMessages()}
    </ul>
  );
}

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { auth, database } from "../../../mics/config"; // Correct import
import { groupBy, transformToArrWithId } from "../../../mics/helpers";
import MessageItem from "./MessageItem";
import { Button } from "rsuite";
import { ref, onValue, off, update } from "firebase/database"; // Correct import for modular Firebase v9+

const PAGE_SIZE = 15;

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
      const messagesRef = ref(database, "/messages"); // Use `ref` with `database`

      // Remove existing listeners
      off(messagesRef);

      // Attach new value listener with limit and query
      onValue(
        messagesRef.orderByChild("roomId").equalTo(chatId).limitToLast(limitToLast || PAGE_SIZE),
        (snap) => {
          const data = transformToArrWithId(snap.val());
          setMessages(data);

          if (shouldScrollToBottom(node)) {
            node.scrollTop = node.scrollHeight;
          }
        }
      );
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
      const messagesRef = ref(database, "/messages");
      off(messagesRef, "value"); // Remove listener on cleanup
    };
  }, [loadMessages]);

  const handleAdmin = useCallback(
    async (uid) => {
      const adminRef = ref(database, `/rooms/${chatId}/admins`);
      let alertMsg;

      await update(adminRef, (admins) => {
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
    const messageRef = ref(database, `/messages/${msgId}`); // Corrected ref

    await update(messageRef, (msg) => {
      if (msg) {
        if (msg.likes && msg.likes[uid]) {
          msg.likeCount -= 1;
          msg.likes[uid] = null;
        } else {
          msg.likeCount += 1;
          if (!msg.likes) {
            msg.likes = {};
          }
          msg.likes[uid] = true;
        }
      }
      return msg;
    });
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
        const updatesRef = ref(database); // Get reference to database
        await update(updatesRef, updates); // Perform the update
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

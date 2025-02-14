import React from "react";
import { useParams } from "react-router";
import Top from "../../components/chat-window/top/Index";
import Message from "../../components/chat-window/messages/Index";
import Bottom from "../../components/chat-window/bottom/Index";
import { useRooms } from "../../context/RoomContext";
import { Loader } from "rsuite";
import { CurrentRoomProvider } from "../../context/CurrentRoomContext";
import { transformToArr } from "../../mics/helpers";
import { auth } from "../../mics/config";
import { getDatabase, ref, onValue, set, onDisconnect, get } from "firebase/database"; // Firebase v9+ imports


export default function Chat() {
  const { chatId } = useParams();
  const rooms = useRooms();

  if (!rooms) {
    return <Loader center vertical size="md" content="Loading" speed="slow" />;
  }

  const currentRoom = rooms.find((room) => room.id === chatId);

  if (!currentRoom) {
    return <h6 className="text-center mt-page">Chat {chatId} is not found</h6>;
  }

  const { name, description } = currentRoom;

  const admins = transformToArr(currentRoom.admins);
  const isAdmin = admins.includes(auth.currentUser.uid);

  const currentRoomData = {
    name,
    description,
    admins,
    isAdmin
  };

  return (
    <CurrentRoomProvider data={currentRoomData}>
      <div className="chat-top">
        <Top />
      </div>
      <div className="chat-middle">
        <Message />
      </div>
      <div className="chat-bottom">
        <Bottom />
      </div>
    </CurrentRoomProvider>
  );
}

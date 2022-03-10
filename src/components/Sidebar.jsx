import React from "react";
import { Divider } from "rsuite";
import CreateRoomBtnModel from "./CreateRoomBtnModel";
import DashboardToggle from "./dashboard/DashboardToggle";
import ChatRoomList from "./rooms/ChatRoomList";

export default function Sidebar() {
  return (
    <div className="h-100 pt-2 ">
      <div>
        <DashboardToggle />
        <CreateRoomBtnModel />
        <Divider>Join Conversation</Divider>
      </div>
      <ChatRoomList />
    </div>
  );
}

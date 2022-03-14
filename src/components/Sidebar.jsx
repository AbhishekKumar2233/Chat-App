import React, { useRef, useState, useEffect } from "react";
import { Divider } from "rsuite";
import CreateRoomBtnModel from "./CreateRoomBtnModel";
import DashboardToggle from "./dashboard/DashboardToggle";
import ChatRoomList from "./rooms/ChatRoomList";
import ProfileList from "./UserProfiles/ProfileList";

export default function Sidebar() {
  const topSidebarRef = useRef();
  const [height, setHeight] = useState(0);
  useEffect(() => {
    if (topSidebarRef.current) {
      setHeight(topSidebarRef.current.scrollHeight);
    }
  }, [topSidebarRef]);

  return (
    <div className="h-100 pt-2 ">
      <div ref={topSidebarRef}>
        <DashboardToggle />
        <CreateRoomBtnModel />
        <Divider>Join Conversation</Divider>
      </div>

      <ChatRoomList aboveElHeight={height} />
      <ProfileList />
    </div>
  );
}

import React from "react";
import { Nav } from "rsuite";
import RoomItem from "./RoomItem";

export default function ChatRoomList() {
  return (
    <div>
      <Nav
        appearance="subtle"
        vertical
        reversed
        className="overflow-y-scroll custom-scoll"
      >
        <Nav.Item>
          <RoomItem />
        </Nav.Item>
      </Nav>
    </div>
  );
}

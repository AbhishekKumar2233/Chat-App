import React from "react";
import { Nav, Loader } from "rsuite";
import RoomItem from "./RoomItem";
import { useRooms } from "../../context/RoomContext";
import { Link, useLocation } from "react-router-dom";

export default function ChatRoomList({ aboveElHeight }) {
  const rooms = useRooms();
  // const location = useLocation();

  return (
    <div>
      <Nav
        appearance="subtle"
        vertical
        reversed
        className="overflow-y-scroll custom-scroll"
        style={{
          height: `calc(100% - ${aboveElHeight}px)`
        }}
        // active={location.pathname}
      >
        {!rooms && (
          <Loader center vertical content="Loading" speed="slow" size="md" />
        )}
        {rooms &&
          rooms.length > 0 &&
          rooms.map((room) => (
            <Nav.Item
              to={`/chat/${room.id}`}
              key={room.id}
              eventKey={`/chat/${room.id}`}
              as={Link}
            >
              <RoomItem room={room} />
            </Nav.Item>
          ))}
      </Nav>
    </div>
  );
}

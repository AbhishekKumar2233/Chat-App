import React from "react";
import { Nav, Loader } from "rsuite";
import RoomItem from "../rooms/RoomItem";
import { useProfiles } from "../../context/Room2Context";
import { Link, useLocation } from "react-router-dom";
import UserItem from "../UserProfiles/UserItem";

export default function ProfileList() {
  const profiles = useProfiles();
  // const location = useLocation();

  return (
    <div>
      <Nav
        appearance="subtle"
        vertical
        reversed
        className="overflow-y-scroll custom-scroll"

        // active={location.pathname}
      >
        {!profiles && (
          <Loader center vertical content="Loading" speed="slow" size="md" />
        )}
        {profiles &&
          profiles.length > 0 &&
          profiles.map((profiles) => (
            <Nav.Item
              to={`/chat/${profiles.id}`}
              key={profiles.id}
              eventKey={`/chat/${profiles.id}`}
              as={Link}
            >
              <UserItem profile={profiles} />
            </Nav.Item>
          ))}
      </Nav>
    </div>
  );
}

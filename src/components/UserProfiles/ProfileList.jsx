import React from "react";
import { Nav, Loader } from "rsuite";
import { useUsers } from "../../context/UserProfileContext";
import { Link, useLocation } from "react-router-dom";
import UserItem from "./UserItem";

export default function ProfileList({ aboveElHeight }) {
  const users = useUsers();
  // const location = useLocation();

  return (
    <div>
      Profile List
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
        {!users && (
          <Loader center vertical content="Loading" speed="slow" size="md" />
        )}
        {users &&
          users.length > 0 &&
          users.map((user) => (
            <Nav.Item
              to={`/chat/${user.id}`}
              key={user.id}
              eventKey={`/chat/${user.id}`}
              as={Link}
            >
              <UserItem user={user} />
            </Nav.Item>
          ))}
      </Nav>
      Done?
    </div>
  );
}

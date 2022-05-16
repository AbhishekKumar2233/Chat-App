import React from "react";
import TimeAgo from "timeago-react";
import ProfileAvatar from "../ProfileAvatar";

export default function RoomItem({ profile }) {
  const { avatar, createdAt, name, lastMessage } = profile;

  return (
    <div>
      <div className="d-flex  align-items-center">
        <ProfileAvatar src={profile.avatar} name={profile.name} size="sm" />
        <h4 className="ml-3 text-disappear text-black-45">{name}</h4>

        {/* <TimeAgo
          datetime={
            lastMessage ? new Date(lastMessage.createdAt) : new Date(createdAt)
          }
          className="font-normal align-items-right text-black-80"
        /> */}
        {/* using TimeAgo to get relative time like when published */}
      </div>
      <div className="d-flex align-items-center text-black-70">
        {lastMessage ? (
          <>
            <div className="d-flex align-items-center">
              <ProfileAvatar
                src={profile.avatar}
                name={profile.name}
                size="sm"
              />
            </div>{" "}
            <div className="text-disappear ml-2">
              <div className="italic">{lastMessage.author.name}</div>
              <span>{lastMessage.text || lastMessage.file.name}</span>
            </div>
          </>
        ) : (
          <span>No Message..</span>
        )}
      </div>
    </div>
  );
}

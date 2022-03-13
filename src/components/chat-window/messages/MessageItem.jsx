import React from "react";
import TimeAgo from "timeago-react";
import { Avatar } from "rsuite";
import ProfileAvatar from "../../ProfileAvatar";

export default function MessageItem({ message }) {
  const { author, createdAt, text } = message;
  return (
    <li className="padded mb-1">
      <div className="d-flex align-items-center font-bolder mb-1">
        <ProfileAvatar
          className="ml-1"
          size="xs"
          src={author.name}
          name={author.name}
        />
        <span className="ml-2">{Avatar.name}</span>
        <TimeAgo
          datetime={createdAt}
          className="font-normal text-black-45 ml-2"
        />
      </div>
      <div>
        <span className="word-breal-all">{text}</span>
      </div>
    </li>
  );
}

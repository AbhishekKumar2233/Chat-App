import React, { memo } from "react";
import TimeAgo from "timeago-react";
import { Avatar, Button } from "rsuite";
import ProfileAvatar from "../../ProfileAvatar";
import ProfileInfoBtnModel from "./ProfileInfoBtnModel";
import PresenceUserDot from "../../PresenceUserDot";
import { useCurrentRoom } from "../../../context/CurrentRoomContext";
import { auth } from "../../../mics/config";

function MessageItem({ message }) {
  const { author, createdAt, text } = message;
  const isAdmin = useCurrentRoom((v) => v.isAdmin);
  const admins = useCurrentRoom((v) => v.admins);

  const isMsgAuthorAdmin = admins.includes(author.uid);
  const isAuthor = auth.currentUser.uid === author.uid;
  const canGrantAdmin = isAdmin && !isAuthor;

  return (
    <li className="padded mb-1">
      <div className="d-flex align-items-center font-bolder mb-1">
        <ProfileAvatar
          className="ml-1"
          size="xs"
          src={author.avatar}
          name={author.name}
        >
          <Button block color="blue" appearance="primary" onClick={() => {}}>
            Make Admin
          </Button>
        </ProfileAvatar>
        <span className="ml-2">{Avatar.name}</span>
        <ProfileInfoBtnModel profile={author} />
        <PresenceUserDot uid={author.uid} />
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
export default memo(MessageItem);

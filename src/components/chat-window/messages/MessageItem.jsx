import React, { memo } from "react";
import TimeAgo from "timeago-react";
import { Avatar, Button } from "rsuite";
import ProfileAvatar from "../../ProfileAvatar";
import ProfileInfoBtnModel from "./ProfileInfoBtnModel";
import PresenceUserDot from "../../PresenceUserDot";
import { useCurrentRoom } from "../../../context/CurrentRoomContext";
import { auth } from "../../../mics/config";
import IconBtnControl from "./IconBtnControl";
import Icon from "@rsuite/icons/lib/Icon";
import { useHover, useMediaQuery } from "../../../mics/custom-hook";

function MessageItem({ message, handleAdmin, handleLike, handleDelete }) {
  const { author, createdAt, text, likes, likeCount } = message;
  const isAdmin = useCurrentRoom((v) => v.isAdmin);
  const admins = useCurrentRoom((v) => v.admins);

  const [selfRef, isHovered] = useHover();

  const isMobile = useMediaQuery("(max-width:992px)");
  const canShowIcons = isMobile || isHovered;
  const isMsgAuthorAdmin = admins.includes(author.uid);
  const isAuthor = auth.currentUser.uid === author.uid;
  const canGrantAdmin = isAdmin && !isAuthor;

  const isLiked = likes && Object.keys(likes).includes(auth.currentUser.uid);

  return (
    <li
      className={`padded mb-1 cursor-pointer ${isHovered ? "bg-black-02" : ""}`}
      ref={selfRef}
    >
      <div className="d-flex align-items-center font-bolder mb-1">
        <ProfileAvatar
          className="ml-1"
          size="xs"
          src={author.avatar}
          name={author.name}
        ></ProfileAvatar>
        <span className="ml-2">{Avatar.name}</span>
        <ProfileInfoBtnModel profile={author}>
          {canGrantAdmin && (
            <Button
              block
              color="blue"
              appearance="primary"
              onClick={() => handleAdmin(author.uid)}
            >
              {isMsgAuthorAdmin
                ? " Remove as Admin Permission"
                : " Give admin in the Group"}
            </Button>
          )}
        </ProfileInfoBtnModel>
        <PresenceUserDot uid={author.uid} />
        <TimeAgo
          datetime={createdAt}
          className="font-normal text-black-45 ml-2"
        />
        <IconBtnControl
          {...(isLiked ? { backgroundColor: "red" } : {})}
          isVisible={canShowIcons}
          iconName="heart"
          tooltip="Like Message"
          onClick={() => handleLike(message.id)}
          badgeContent={likeCount}
        />
        {isAuthor && (
          <IconBtnControl
            isVisible={canShowIcons}
            iconName="close"
            tooltip="Delete Message"
            onClick={() => handleDelete(message.id)}
          />
        )}
      </div>
      <div>
        <span className="word-breal-all">{text}</span>
      </div>
    </li>
  );
}
export default memo(MessageItem);

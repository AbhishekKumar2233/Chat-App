import React from "react";
import { Avatar } from "rsuite";
import { getNameInitails } from "../mics/helpers";

export default function ProfileAvatar({ name, ...avatarProps }) {
  return (
    <Avatar size="lg" circle {...avatarProps}>
      {getNameInitails(name || '')}
    </Avatar>
  );
}


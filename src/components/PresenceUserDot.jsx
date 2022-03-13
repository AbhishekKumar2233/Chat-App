import React from "react";
import { Badge, Tooltip, Whisper } from "rsuite";
import { usePresence } from "../mics/custom-hook";

export default function PresenceUserDot({ uid }) {
  const presence = usePresence(uid);

  const getColor = (presence) => {
    if (!presence) {
      return "grey";
    }
    switch (presence.state) {
      case "online":
        return "green";
      case "offline":
        return "red";
      default:
        return "grey";
    }
  };

  const getText = (presence) => {
    if (!presence) {
      return "Unknown state";
    }
    return presence.state === "online"
      ? "Online"
      : `Last Seen ${new Date(presence.last_changed).toLocaleDateString()} `;
  };
  return (
    <Whisper
      placement="top"
      trigger="hover"
      speaker={<Tooltip>{getText(presence)}</Tooltip>}
    >
      <Badge
        className="cursor-pointer"
        style={{ backgroundColor: getColor(presence) }}
      />
    </Whisper>
  );
}

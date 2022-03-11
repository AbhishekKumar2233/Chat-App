import React from "react";
import { useCurrentRoom } from "../../../context/CurrentRoomContext";

export default function Top() {
  const name = useCurrentRoom((v) => v.name);
  return <div>{name}</div>;
}

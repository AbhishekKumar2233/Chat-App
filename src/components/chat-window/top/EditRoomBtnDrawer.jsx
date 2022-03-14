import React from "react";
import { Button, Drawer } from "rsuite";
import { useModelState } from "../../../mics/custom-hook";
import EditableInput from "../../EditableInput";
import { useCurrentRoom } from "../../../context/CurrentRoomContext";

export default function EditRoomBtnDrawer() {
  const { open, close, isOpen } = useModelState();

  const name = useCurrentRoom((v) => v.name);
  const description = useCurrentRoom((v) => v.description);
  return (
    <div>
      <Button className="br-circle" size="sm" onClick={open}>
        Admin
      </Button>
    </div>
  );
}

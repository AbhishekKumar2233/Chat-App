import React from "react";
import { Button, Drawer } from "rsuite";
import { useModelState } from "../../../mics/custom-hook";
import EditableInput from "../../EditableInput";
import { useCurrentRoom } from "../../../context/CurrentRoomContext";

export default function EditRoomBtnDrawer() {
  const { open, close, isOpen } = useModelState();

  const onNameSave = () => {};
  const onDescription = () => {};

  const name = useCurrentRoom((v) => v.name);
  const description = useCurrentRoom((v) => v.description);
  return (
    <div>
      <Button className="br-circle" size="sm" onClick={open}>
        Admin
      </Button>

      <Drawer show={isOpen} onClose={close} placement="right">
        <Drawer.Header>
          <Drawer.Title>Edit Room</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          <EditableInput
            initialValue={name}
            onSave={onNameSave}
            label={<h6 classname="mb-2">Name</h6>}
            emptyMsg="Name can not be Empty"
          />
          <EditableInput
            as="textarea"
            initialValue={description}
            onSave={onDescription}
            emptyMsg="Description can not be Empty"
            label={<h6 classname="mb-2"> Description</h6>}
          />
        </Drawer.Body>
        <Drawer.Footer>
          <Button appearance="primary" block onClick={close}>
            Close
          </Button>
        </Drawer.Footer>
      </Drawer>
    </div>
  );
}

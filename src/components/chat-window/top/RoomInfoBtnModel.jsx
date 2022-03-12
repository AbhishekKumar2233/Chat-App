import React from "react";
import { Button, Modal } from "rsuite";

import { useCurrentRoom } from "../../../context/CurrentRoomContext";
import { useModelState } from "../../../mics/custom-hook";

export default function RoomInfoBtnModel() {
  const { isOpen, open, close } = useModelState();
  const description = useCurrentRoom((v) => v.description);
  const name = useCurrentRoom((v) => v.name);

  return (
    <>
      Room Info Btn Model
      <Button onClick={open} appearance="link" className="px-0">
        Room Info
      </Button>
      <Modal open={isOpen} onClose={close}>
        <Modal.Header>
          <Modal.Title>About {name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6 className="md-1">Description</h6>
          <p>{description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button block onClick={close}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

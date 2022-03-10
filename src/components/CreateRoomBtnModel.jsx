import React from "react";
import { Modal, Button, Form, Input } from "rsuite";
import { useModelState } from "../mics/custom-hook";

export default function CreateRoomBtnModel() {
  const { isOpen, open, close } = useModelState();
  const Description = React.forwardRef((props, ref) => (
    <Input {...props} as="textarea" ref={ref} />
  ));

  return (
    <div className="mt-1">
      <Button block color="green" appearance="primary" onClick={open}>
        Create new chat room
      </Button>
      <Modal open={isOpen} onClose={close}>
        <Modal.Header>
          <Modal.Title>Create New Chat Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form fluid>
            <Form.Group>
              <Form.ControlLabel>Room Name</Form.ControlLabel>
              <Form.Control name="name" placeholder="Enter chat room name.." />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Description</Form.ControlLabel>
              <Form.Control
                rows={5}
                name="description"
                accepter={Description}
                placeholder="Enter chat room description.."
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button block appearance="primary">
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

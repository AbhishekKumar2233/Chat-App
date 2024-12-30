import { getDatabase, ref, push, serverTimestamp } from "firebase/database"; // Firebase v9+ imports for Database
import { getAuth } from "firebase/auth"; // Firebase v9+ import for Auth
import React, { useState, useCallback, useRef } from "react";
import { Modal, Button, Form, Input, Schema } from "rsuite";
import { useModelState } from "../mics/custom-hook";

//form validation
const { StringType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired("Chat name is required"),
  description: StringType().isRequired("Chat description is required")
});

const INITIAL_FORM = {
  name: "",
  description: ""
};

export default function CreateRoomBtnModel() {
  const { isOpen, open, close } = useModelState();
  const Description = React.forwardRef((props, ref) => (
    <Input {...props} as="textarea" ref={ref} />
  ));

  const [formValue, setFormValue] = useState(INITIAL_FORM);
  const [isLoading, setLoading] = useState(false);
  const fromRef = useRef();

  const onFormChange = useCallback((value) => {
    setFormValue(value);
  }, []);

  //submit func
  const onSubmit = async () => {
    if (!fromRef.current.check()) {
      return;
    }
    setLoading(true);

    const newRoomdata = {
      ...formValue,
      createdAt: serverTimestamp(), // Updated for Firebase v9
      admins: {
        [getAuth().currentUser.uid]: true, // Updated for Firebase v9
      }
    };

    try {
      const db = getDatabase(); // Initialize the database
      const roomsRef = ref(db, 'rooms'); // Reference to 'rooms'
      await push(roomsRef, newRoomdata); // Push new data

      alert(`${formValue.name} has been created`);
      setLoading(false);
      setFormValue(INITIAL_FORM);
      close();
    } catch (err) {
      setLoading(false);
      alert(err);
    }
  };

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
          <Form
            fluid
            onChange={onFormChange}
            formValue={formValue}
            model={model}
            ref={fromRef}
          >
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
          <Button
            block
            appearance="primary"
            onClick={onSubmit}
            disabled={isLoading}
          >
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

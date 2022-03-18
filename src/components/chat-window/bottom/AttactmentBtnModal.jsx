import React from "react";
import { Button, InputGroup, Modal } from "rsuite";
import AttachmentIcon from "@rsuite/icons/Attachment";
import { useModelState } from "../../../mics/custom-hook";

export default function AttactmentBtnModel() {
  const { isOpen, open, close } = useModelState();
  return (
    <>
      <InputGroup.Button onClick={open}>
        <AttachmentIcon />
      </InputGroup.Button>
      <Modal open={isOpen} close={close}>
        <Modal.Header>Upload Files</Modal.Header>
        <Modal.Body>Upload</Modal.Body>
        <Modal.Footer>
          <div className="text-right mt-2">
            <small>* only files less than 5 mb are allowed</small>
          </div>
          <Button block>Send to chat</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

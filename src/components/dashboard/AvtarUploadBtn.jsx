import React from "react";
import { Modal, Button } from "rsuite";
import { useModelState } from "../../mics/custom-hook";

const AvtarUploadBtn = () => {
  const fileInputType = ".png, .jpeg, .jpg";
  const { isOpen, close, open } = useModelState();

  const onFileInputChange = (ev) => {};

  return (
    <div className="mt-3 text-center">
      <div>
        <label htmlFor="avtar-upload" className="d-block cursor-pointer padded">
          Select Your New Avatar
          <input
            id="avtar-upload"
            type="file"
            className="d-none"
            accept={fileInputType}
            onChange={onFileInputChange}
          />
        </label>
        <Modal open={isOpen} onClose={close}>
          <Modal.Header>
            <Modal.Title>Adjust and Upload new avtar</Modal.Title>
          </Modal.Header>
          <Modal.Body>XXX</Modal.Body>
          <Modal.Footer>
            <Button block appearance="ghost">
              Upload
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default AvtarUploadBtn;

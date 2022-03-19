import React from "react";
import { Modal } from "rsuite";
import { useModelState } from "../../../mics/custom-hook";

export default function ImgBtnModal({ src, fileName }) {
  const { isOpen, open, close } = useModelState();
  return (
    <>
      <input
        type="image"
        src={src}
        alt="file"
        onClick={open}
        className="mw-100 mh-100 w-auto"
      />
      <Modal open={isOpen} onClose={close}>
        <Modal.Header>{fileName}</Modal.Header>
        <Modal.Body>
          <img src={src} height="100%" width="100%" alt="file" />
        </Modal.Body>
        <Modal.Footer>
          <a href={src} target="_blank" rel="noopener noreferrer">
            View Original
          </a>
        </Modal.Footer>
      </Modal>
    </>
  );
}

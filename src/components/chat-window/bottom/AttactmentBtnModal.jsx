import React, { useState } from "react";
import { Button, InputGroup, Modal, Uploader } from "rsuite";
import AttachmentIcon from "@rsuite/icons/Attachment";
import { useModelState } from "../../../mics/custom-hook";

const MAX_FILE_SIZE = 1000 * 1024 * 5;

export default function AttactmentBtnModel() {
  const { isOpen, open, close } = useModelState();
  const [fileList, setFileList] = useState([]);

  const onChange = (fileArr) => {
    const filtered = fileArr
      .filter((el) => el.blobFile.size <= MAX_FILE_SIZE)
      .slice(0, 5);

    setFileList(filtered);
  };
  return (
    <>
      <InputGroup.Button onClick={open}>
        <AttachmentIcon />
      </InputGroup.Button>
      <Modal open={isOpen} onClose={close}>
        <Modal.Header>Upload Files</Modal.Header>
        <Modal.Body>
          {" "}
          <Uploader
            className="w-100"
            autoUpload={false}
            action=""
            fileList={fileList}
            onChange={onChange}
            multiple
            listType="picture-text"
          />
        </Modal.Body>
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

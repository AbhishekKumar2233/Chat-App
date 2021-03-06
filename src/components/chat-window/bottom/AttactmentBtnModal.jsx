import React, { useState } from "react";
import { Button, InputGroup, Modal, Uploader } from "rsuite";
import AttachmentIcon from "@rsuite/icons/Attachment";
import { useModelState } from "../../../mics/custom-hook";
import { storage } from "../../../mics/config";
import { useParams } from "react-router";

const MAX_FILE_SIZE = 1000 * 1024 * 50;

export default function AttactmentBtnModel({ afterUpload }) {
  const { chatId } = useParams;
  const { isOpen, open, close } = useModelState();
  const [fileList, setFileList] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const onChange = (fileArr) => {
    const filtered = fileArr
      .filter((el) => el.blobFile.size <= MAX_FILE_SIZE)
      .slice(0, 5);

    setFileList(filtered);
  };
  const onUpload = async () => {
    try {
      const UploadPromises = fileList.map((f) => {
        return storage
          .ref(`/chat/${chatId}`)
          .child(Date.now() + f.name)
          .put(f.blobFile, {
            cacheControl: `public, max-age=${3600 * 24 * 3} `
          });
      });

      const uploadSnapshots = await Promise.all(UploadPromises);

      const shapePromises = uploadSnapshots.map(async (snap) => {
        return {
          contentType: snap.metadata.contentType,
          name: snap.metadata.name,
          url: await snap.ref.getDownloadURL()
        };
      });
      const files = await Promise.all(shapePromises);

      await afterUpload(files);
      setLoading(false);
      close();
    } catch (err) {
      alert(err);
      setLoading(false);
    }
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
            disabled={isLoading}
          />
        </Modal.Body>
        <Modal.Footer>
          <div className="text-right mt-2">
            <small>* only files less than 50 mb are allowed</small>
          </div>
          <Button block disabled={isLoading} onClick={onUpload}>
            Send to chat
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

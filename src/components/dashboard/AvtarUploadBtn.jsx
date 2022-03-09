import React, { useState } from "react";
import AvatarEditor from "react-avatar-editor";
import { Modal, Button } from "rsuite";
import { useModelState } from "../../mics/custom-hook";

const fileInputType = ".png, .jpeg, .jpg";
const acceptedFileTypes = ["image/png", "image/jpeg", "image/pjpeg"];
const isValidFile = (file) => acceptedFileTypes.includes(file.type);

const AvtarUploadBtn = () => {
  const { isOpen, close, open } = useModelState();
  const [img, setImg] = useState(null);

  const onFileInputChange = (ev) => {
    const currFiles = ev.target.files;

    if (currFiles.length === 1) {
      const file = currFiles[0];

      if (isValidFile(file)) {
        setImg(file);
        open();

        alert(`Right File`);
      } else {
        alert(`Wrong File Type ${file.type}`);
      }
    }
  };

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
        <Button onClick={open}>Open Modal</Button>
        <Modal open={isOpen} onClose={close}>
          <Modal.Header>
            <Modal.Title>Adjust and Upload new avatar</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {img && (
              <AvatarEditor
                image={img}
                width={200}
                height={200}
                border={10}
                borderRadius={100}
                rotate={0}
              />
            )}
          </Modal.Body>
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

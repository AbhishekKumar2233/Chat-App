import React from "react";
import { Button, Modal } from "rsuite";
import { useModelState } from "../../../mics/custom-hook";
import ProfileAvatar from "../../ProfileAvatar";

export default function ProfileInfoBtnModel({ profile, ...btnProps }) {
  const { isOpen, close, open } = useModelState();
  const { name, avatar, createdAt } = profile;
  const memberSince = new Date(createdAt).toLocaleDateString();

  const shortName = profile.name.split(" ")[0];
  return (
    <div>
      <Button appearance="link" {...btnProps} onClick={open}>
        {shortName}
      </Button>
      <Modal open={isOpen} onClose={close}>
        <Modal.Header>
          <Modal.Title>{shortName}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <ProfileAvatar
            className="width-200 height-200 img-fullsize font-huge"
            src={avatar}
            name={name}
          />
          <h4 className="mt-2">{name}</h4>
          <p>Member since {memberSince}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            block
            appearance="primary"
            onClick={close}
            color="blue"
            className="p-0 ml-1 text-block"
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

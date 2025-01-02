import React, { useState, useRef } from "react";
import AvatarEditor from "react-avatar-editor";
import { Modal, Button } from "rsuite";
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage"; // Firebase storage methods (v9+)
import { getDatabase, update } from "firebase/database"; // Firebase database methods (v9+)
import { storage, database,ref } from "../../mics/config";
import { useModelState } from "../../mics/custom-hook";
import { useProfile } from "../../context/ProfileContext";
import ProfileAvatar from "../ProfileAvatar";
import { getUserUpdates } from "../../mics/helpers";

// File type validation
const fileInputType = ".png, .jpeg, .jpg, .mp4, .mp3";
const acceptedFileTypes = ["image/png", "image/jpeg", "image/pjpeg"];
const isValidFile = (file) => acceptedFileTypes.includes(file.type);

// Convert canvas to blob
const getBlob = (canvas) => {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error("process error "));
      }
    });
  });
};

const AvtarUploadBtn = () => {
  const { isOpen, close, open } = useModelState();
  const [img, setImg] = useState(null);
  const avatarEditorRef = useRef();
  const { profile } = useProfile();
  const [loading, setLoading] = useState(false);

  // Handle file input change
  const onFileInputChange = (ev) => {
    const currFiles = ev.target.files;

    if (currFiles.length === 1) {
      const file = currFiles[0];

      if (isValidFile(file)) {
        setImg(file);
        open();
      } else {
        alert(`Wrong File Type ${file.type}`);
      }
    }
  };

  const getUserUpdates = (uid, field, value) => {
    const updates = {};
    updates[`/profiles/${uid}/${field}`] = value;
    return updates; // Return the updates object
  };

  // Handle upload click
  const onUploadClick = async () => {
    const canvas = avatarEditorRef.current.getImageScaledToCanvas();
    setLoading(true);
  
    try {
      const blob = await getBlob(canvas);
  
      const storage = getStorage();
      const avatarFileRef = storageRef(storage, `/profile/${profile.uid}/avatar`);
  
      const uploadAvatarResult = uploadBytesResumable(avatarFileRef, blob, {
        cacheControl: `public, max-age=${3600 * 24 * 3}`,
      });
  
      uploadAvatarResult.on(
        "state_changed",
        null,
        (error) => {
          throw new Error(error.message);
        },
        async () => {
          const downloadUrl = await getDownloadURL(uploadAvatarResult.snapshot.ref);
  
          const db = getDatabase();
          const updates = getUserUpdates(profile.uid, "avatar", downloadUrl);
          const dbRef = ref(db);
          await update(dbRef, updates);
  
          setLoading(false);
          alert("Avatar has been uploaded!");
  
          // Close the modal
          close(); // Ensure this function is closing the modal properly
        }
      );
    } catch (err) {
      setLoading(false);
      alert(err.message);
    }
  };
  

  return (
    <div className="mt-3 text-center">
      <ProfileAvatar
        className="width-200 height-200 img-fullsize font-huge"
        src={profile.avatar}
        name={profile.name}
      />
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
            <Modal.Title>Adjust and Upload new avatar</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex justify-content-center align-items-center h-1000">
              {img && (
                <AvatarEditor
                  ref={avatarEditorRef}
                  image={img}
                  width={200}
                  height={200}
                  border={10}
                  borderRadius={100}
                  rotate={0}
                />
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              block
              appearance="ghost"
              onClick={onUploadClick}
              disabled={loading}
            >
              Upload
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default AvtarUploadBtn;

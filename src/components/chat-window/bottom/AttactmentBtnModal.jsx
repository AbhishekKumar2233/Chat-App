import React, { useState } from "react";
import { Button, InputGroup, Modal, Uploader, Notification } from "rsuite";
import AttachmentIcon from "@rsuite/icons/Attachment";
import { useModelState } from "../../../mics/custom-hook";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; // Firebase storage imports
import { useParams } from "react-router";

const MAX_FILE_SIZE = 1000 * 1024 * 50; // 50 MB

export default function AttachmentBtnModel({ afterUpload }) {
  const { chatId } = useParams(); // UseParams must be called as a function
  const { isOpen, open, close } = useModelState();
  const [fileList, setFileList] = useState([]);
  const [isLoading, setLoading] = useState(false);

  // Handle file selection and filtering
  const onChange = (fileArr) => {
    const filtered = fileArr
      .filter((file) => file.blobFile.size <= MAX_FILE_SIZE)
      .slice(0, 5); // Limit to 5 files

    setFileList(filtered);
  };

  // Handle file upload
  const onUpload = async () => {
    if (fileList.length === 0) {
      Notification.error({
        title: "Error",
        description: "Please select files to upload.",
      });
      return;
    }

    setLoading(true);

    try {
      const storage = getStorage(); // Initialize Firebase storage

      // Upload files
      const uploadPromises = fileList.map((file) => {
        const fileRef = ref(storage, `chat/${chatId}/${Date.now()}_${file.name}`);
        const uploadTask = uploadBytesResumable(fileRef, file.blobFile);

        return new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            null, // Progress function (optional, for future use)
            (error) => reject(error), // Handle errors
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              resolve({
                contentType: file.blobFile.type,
                name: file.name,
                url: downloadURL,
              });
            }
          );
        });
      });

      const files = await Promise.all(uploadPromises);

      // Callback after successful uploads
      await afterUpload(files);

      Notification.success({
        title: "Success",
        description: "Files uploaded successfully.",
      });

      setFileList([]);
      close();
    } catch (error) {
      Notification.error({
        title: "Error",
        description: "Failed to upload files. Please try again.",
      });
      console.error("Upload Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <InputGroup.Button onClick={open}>
        <AttachmentIcon />
      </InputGroup.Button>

      <Modal open={isOpen} onClose={close}>
        <Modal.Header>
          <Modal.Title>Upload Files</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Uploader
            className="w-100"
            autoUpload={false}
            fileList={fileList}
            onChange={onChange}
            multiple
            listType="picture-text"
            disabled={isLoading}
          />
          <div className="text-right mt-2">
            <small>* Only files less than 50 MB are allowed.</small>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            block
            appearance="primary"
            onClick={onUpload}
            loading={isLoading}
            disabled={fileList.length === 0 || isLoading}
          >
            Send to Chat
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

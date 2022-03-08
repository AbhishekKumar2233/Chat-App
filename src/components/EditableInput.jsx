import React, { useState, useCallback } from "react";
import { Button, Input, InputGroup } from "rsuite";
import CloseOutlineIcon from "@rsuite/icons/CloseOutline";
import EditIcon from "@rsuite/icons/Edit";
import CheckOutlineIcon from "@rsuite/icons/CheckOutline";

export default function EditableInput({
  initialValue,
  onSave,
  label = "null",
  placeholder = "Write your value",
  emptyMsg = "Input is empty now",
  ...inputProps
}) {
  const [input, setInput] = useState(initialValue);
  const [isEditable, setEditable] = useState(false);

  const onInputChange = useCallback((value) => {
    setInput(value);
  }, []);

  const onEditClick = useCallback(() => {
    setEditable((p) => !p);
    setInput(initialValue);
  }, [initialValue]);

  const onSaveClick = async () => {
    const trimmed = input.trim();
    if (trimmed === "") {
      alert(emptyMsg);
    }

    if (trimmed !== initialValue) {
      await onSave(trimmed);
    }
    setEditable(false);
  };

  return (
    <div>
      {label}
      <InputGroup>
        <Input
          {...inputProps}
          value={input}
          disabled={!isEditable}
          placeholder={placeholder}
          onChange={onInputChange}
        />
        <InputGroup.Button onClick={onEditClick}>
          {isEditable ? <CloseOutlineIcon /> : <EditIcon />}
        </InputGroup.Button>
        {isEditable && (
          <InputGroup.Button onClick={onSaveClick}>
            <CheckOutlineIcon />
          </InputGroup.Button>
        )}
      </InputGroup>
    </div>
  );
}

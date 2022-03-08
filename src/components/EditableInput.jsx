import React from "react";
import { Button, Input } from "rsuite";

export default function EditableInput({
  initialValue,
  onSave,
  label = "null",
  placeholder = "Write your value",
  emptyMsg = "Input is empty now",
  ...inputProps
}) {
  return (
    <div>
      {label}
      <Input {...inputProps} placeholder={placeholder} />
    </div>
  );
}

import React from "react";
import { Button, Icon, Drawer } from "rsuite";
import { useModelState } from "../../mics/custom-hook";
import Dashboard from "./Index";

export default function DashboardToggle() {
  const { isOpen, close, open } = useModelState();

  return (
    <div>
      <Button block color="blue" appearance="primary" onClick={open}>
        {/* <Icon icon="dashboard" /> */}
        Dashboard
      </Button>
      <Drawer show={isOpen} onHide={close} placement="left">
        <Dashboard />
        Hyy
      </Drawer>
    </div>
  );
}

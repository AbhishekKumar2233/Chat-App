import React from "react";
import { Button, Icon, Drawer } from "rsuite";
import { useModelState } from "../../mics/custom-hook";
import Dashboard from "./Index";

export default function DashboardToggle() {
  const { isOpen, close, open } = useModelState();
  // const [open, setOpen] = useState(false);

  return (
    <div>
      <Button block color="blue" appearance="primary" onClick={open}>
        {/* <Icon icon="dashboard" /> */}
        Dashboard
      </Button>
      {/* <Button onClick={() => setOpen(true)}>Open</Button> */}
      <Drawer open={isOpen} onClose={close} placement="left">
        <Dashboard />
      </Drawer>
      {/* <Drawer placement="left" open={open} onClose={() => setOpen(false)}>
        <Dashboard />
      </Drawer> */}
    </div>
  );
}

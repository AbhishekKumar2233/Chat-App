import React from "react";
import { Button, Drawer } from "rsuite";
import { useModelState, useMediaQuery } from "../../mics/custom-hook";
import Dashboard from "./Index";

export default function DashboardToggle() {
  const { isOpen, close, open } = useModelState();
  // const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:992px)");

  return (
    <div>
      <Button block color="blue" appearance="primary" onClick={open}>
        {/* <Icon icon="dashboard" /> */}
        Dashboard
      </Button>
      {/* <Button onClick={() => setOpen(true)}>Open</Button> */}
      <Drawer full={isMobile} open={isOpen} onClose={close} placement="left">
        <Dashboard />
        <Button onClick={close}>X</Button>
      </Drawer>
      {/* <Drawer placement="left" open={open} onClose={() => setOpen(false)}>
        <Dashboard />
      </Drawer> */}
    </div>
  );
}

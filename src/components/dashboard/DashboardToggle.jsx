import React from "react";
import { Button, Icon, Drawer } from "rsuite";

export default function DashboardToggle() {
  return (
    <div>
      <Button block color="blue" appearance="primary">
        {/* <Icon icon="dashboard" /> */}
        Dashboard
      </Button>
      <Drawer placement="left">Hyy</Drawer>
    </div>
  );
}

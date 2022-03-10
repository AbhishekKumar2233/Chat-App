import React from "react";
import CreateRoomBtnModel from "./CreateRoomBtnModel";
import DashboardToggle from "./dashboard/DashboardToggle";

export default function Sidebar() {
  return (
    <div className="h-100 pt-2 ">
      <div>
        <DashboardToggle />
        <CreateRoomBtnModel />
      </div>
      bottom
    </div>
  );
}

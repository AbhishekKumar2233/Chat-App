import React, { memo } from "react";
import ArrowLeftLineIcon from "@rsuite/icons/ArrowLeftLine";
import { ButtonToolbar } from "rsuite";
import { Link } from "react-router-dom";
import { useCurrentRoom } from "../../../context/CurrentRoomContext";
import { useMediaQuery } from "../../../mics/custom-hook";
import RoomInfoBtnModel from "./RoomInfoBtnModel";

function Top() {
  const name = useCurrentRoom((v) => v.name);
  const isMobile = useMediaQuery("(max-width: 992px");
  return (
    <div>
      <div className="d-flex justify-content-between align-item-center">
        <h4>
          {/* <Icon as={Link} to="/" icon="arrow-circle-left" size="2x" /> */}
          <Link
            to="/"
            className={
              isMobile
                ? "d-inline-block p-0 mr-2 text-blue link-unstyled"
                : "d-none"
            }
          >
            <ArrowLeftLineIcon />
          </Link>
          <span className="text-disappear">{name}</span>
        </h4>
        <ButtonToolbar className="ws-nowrap">todo</ButtonToolbar>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <span> todo</span>
        <RoomInfoBtnModel />
      </div>
    </div>
  );
}

export default memo(Top);

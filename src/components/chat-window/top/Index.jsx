import React, { memo } from "react";
import ArrowLeftLineIcon from "@rsuite/icons/ArrowLeftLine";
import { ButtonToolbar } from "rsuite";
import { Link } from "react-router-dom";
import { useCurrentRoom } from "../../../context/CurrentRoomContext";
import { useMediaQuery } from "../../../mics/custom-hook";
import RoomInfoBtnModel from "./RoomInfoBtnModel";
import EditRoomBtnDrawer from "./EditRoomBtnDrawer";

function Top() {
  const name = useCurrentRoom((v) => v.name);
  const isAdmin = useCurrentRoom((v) => v.isAdmin);
  const isMobile = useMediaQuery("(max-width: 992px");
  return (
    <div>
      <div className="d-flex justify-content-between align-item-center" style={{marginTop:'20px'}}>
        <h4 className="text-disappear d-flex align-items-center">
          {/* <Icon as={Link} to="/" icon="arrow-circle-left" size="2x" /> */}
          <Link
            to="/"
            className={
              isMobile
                ? "d-inline-block d-flex p-0 mr-2 text-blue link-unstyled"
                : "d-none"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="24"
              height="24"
              viewBox="0 0 172 172"
            >
              <g
                fill="none"
                fill-rule="nonzero"
                stroke="none"
                stroke-width="1"
                stroke-linecap="butt"
                stroke-linejoin="miter"
                stroke-miterlimit="10"
                stroke-dasharray=""
                stroke-dashoffset="0"
                font-family="none"
                font-weight="none"
                font-size="none"
                text-anchor="none"
              >
                <path d="M0,172v-172h172v172z" fill="none"></path>
                <g fill="#3498db">
                  <path d="M61.47997,149c-0.774,0 -1.5136,-0.31214 -2.05253,-0.86482l-58.61473,-60.13636c-1.0836,-1.11109 -1.0836,-2.88368 0,-3.99764l58.61473,-60.13636c0.53893,-0.55268 1.2814,-0.86482 2.0554,-0.86482v0c0.774,0 1.5136,0.31214 2.05253,0.86482l15.9186,16.33132c1.08647,1.11682 1.08073,2.89227 -0.00573,4.00336l-26.9782,27.48232h116.66187c1.5824,0 2.86667,1.28291 2.86667,2.86364v22.90909c0,1.58073 -1.28427,2.86364 -2.86667,2.86364h-116.66187l26.9782,27.48232c1.08933,1.11109 1.0922,2.88941 0.00573,4.00336l-15.9186,16.33132c-0.5418,0.55268 -1.2814,0.86482 -2.0554,0.86482z"></path>
                </g>
              </g>
            </svg>
          </Link>
          <span className="text-disappear" style={{marginTop:'10px'}}>{name}</span>
        </h4>
        <ButtonToolbar className="ws-nowrap">
          {isAdmin && <EditRoomBtnDrawer />}
        </ButtonToolbar>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <span> </span>
        <RoomInfoBtnModel />
      </div>
    </div>
  );
}

export default memo(Top);

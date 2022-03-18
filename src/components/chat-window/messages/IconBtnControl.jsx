import Icon from "@rsuite/icons/lib/Icon";
import React from "react";
import { Badge, IconButton, Tooltip, Whisper } from "rsuite";
import EditIcon from "@rsuite/icons/Edit";
import CloseIcon from "@rsuite/icons/Close";

const ConditionalBadge = ({ condition, children }) => {
  return condition ? <Badge content={condition}>{children}</Badge> : children;
};

const IconBtnControl = ({
  isVisible,
  iconName,
  tooltip,
  onClick,
  badgeContent,
  ...props
}) => {
  return (
    <div
      className="ml-2"
      style={{ visibility: isVisible ? "visible" : "hidden" }}
    >
      <ConditionalBadge condition={badgeContent}>
        <Whisper
          placement="top"
          delay={0}
          delayClose={0}
          delayOpen={0}
          trigger="hover"
          speaker={<Tooltip>{tooltip}</Tooltip>}
        >
          {iconName === "heart" ? (
            <img
              className="likeIcon"
              {...props}
              onClick={onClick}
              src="https://img.icons8.com/ios-glyphs/30/000000/like--v1.png"
            />
          ) : (
            <CloseIcon {...props} onClick={onClick} />
          )}
        </Whisper>
      </ConditionalBadge>
    </div>
  );
};

export default IconBtnControl;

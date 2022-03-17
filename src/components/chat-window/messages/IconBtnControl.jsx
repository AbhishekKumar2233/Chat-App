import Icon from "@rsuite/icons/lib/Icon";
import React from "react";
import { Badge, IconButton, Tooltip, Whisper } from "rsuite";

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
          <img
            {...props}
            onClick={onClick}
            src="https://img.icons8.com/ios-glyphs/30/000000/like--v1.png"
          />
        </Whisper>
      </ConditionalBadge>
    </div>
  );
};

export default IconBtnControl;

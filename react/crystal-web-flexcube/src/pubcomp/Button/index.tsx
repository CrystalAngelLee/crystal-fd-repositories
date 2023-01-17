import React, { FC } from "react";
import styled from "@emotion/styled";
import classnames from "classnames";
import { style } from "./styles";
import { ButtonProps, StyledProps } from "./index.d";
import { Link } from "react-router-dom";

const Button: FC<ButtonProps> = ({
  className: prefixCls,
  children,
  to,
  type,
  onClick,
}) => {
  const btnCls = classnames([prefixCls], {
    fastener: type?.includes("fastener"),
  });
  let defaultBtn = <button className={btnCls} onClick={onClick}>{children}</button>;
  if (type === "fastenerlink") {
    defaultBtn = (
      <Link className={btnCls} to={to!}>
        {children}
      </Link>
    );
  }
  switch (type) {
    case "fastener":
    case "fastenerlink":
      return <div className={`${prefixCls}-box`}>{defaultBtn}</div>;
    default:
      return defaultBtn;
  }
};

Button.defaultProps = {
  type: "default",
};
export default styled(Button)<StyledProps>`
  ${style}
`;

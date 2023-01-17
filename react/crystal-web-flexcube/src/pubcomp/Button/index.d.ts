import Common from "../../types/common";
import AntButtonProps from "antd";

type types = "primary" | "link" | "default" | "fastener" | "fastenerlink";

export interface ButtonProps extends Common {
  to?: string;
  type?: types;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

export interface StyledProps {}

import React, { FC } from "react";
import styled from "@emotion/styled";
import { style } from "./Element.style";
import { StyledProps, ElementProps } from "./Element.types";

const Element: FC<ElementProps> = ({ className: prefixCls }) => {
  return <div className={prefixCls}>Element</div>;
};

export default styled(Element)<StyledProps>`
  ${style}
`;

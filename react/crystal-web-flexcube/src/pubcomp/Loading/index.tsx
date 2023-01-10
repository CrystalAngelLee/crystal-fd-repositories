import React, { FC } from "react";
import styled from "@emotion/styled";
import { style } from "./styles";
import { LoadingProps, StyledProps } from "./index.d";
import { Spin } from "antd";

const Loading: FC<LoadingProps> = ({ className: prefixCls }) => {
  return <div className={prefixCls}>
    <div className={`${prefixCls}-container`}><Spin/></div>
  </div>;
};
export default styled(Loading)<StyledProps>`
  ${style}
`;

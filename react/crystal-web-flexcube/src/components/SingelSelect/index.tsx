import React, { FC } from "react";
import styled from "@emotion/styled";
import { Checkbox, Select } from "antd";
import { style } from "./styles";
import { SingelSelectProps, StyledProps } from "./index.d";
const separate = [
  { id: "left", name: "左", selectProps: { value: "0" } },
  { id: "top", name: "上", selectProps: { value: "0" } },
  { id: "right", name: "右", selectProps: { value: "0" } },
  { id: "bottom", name: "下", selectProps: { value: "0" } },
];

const SingelSelect: FC<SingelSelectProps> = ({
  className: prefixCls,
  ...props
}) => {
  return (
    <div className={prefixCls}>
      <div className={`${prefixCls}-unified`}>
        <Select {...props} />
        <Checkbox checked={false}>独立配置</Checkbox>
      </div>
      <div className={`${prefixCls}-separate`}>
        {separate.map(({ id, selectProps, name }) => {
          return (
            <div key={id} className={`${prefixCls}-separate-item`}>
              <Select {...selectProps} />
              <div className={`${prefixCls}-separate-item-title`}>{name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default styled(SingelSelect)<StyledProps>`
  ${style}
`;

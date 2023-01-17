import React, { FC, useState } from "react";
import styled from "@emotion/styled";
import { ColorPickerProps, StyledProps } from "../types";
import { SketchPicker, ColorResult } from "react-color";
import { Tooltip } from "antd";
import { style } from "../styles";

const ColorCard = styled.span`
  display: inline-block;
  width: 18px;
  height: 18px;
  background-color: ${(props) => props.color};
  border: 1px solid #ddd;
  cursor: pointer;
`;

const ColorPicker: FC<ColorPickerProps> = ({
  className: prefixCls,
  value,
  onChange,
}) => {
  const [color, setColor] = useState(value);
  const $onColorChange = ($color: ColorResult) => {
    setColor($color.hex);
    onChange?.($color.hex);
  };
  return (
    <div className={prefixCls}>
      <Tooltip
        placement='topLeft'
        title={<SketchPicker color={color} onChangeComplete={$onColorChange} />}
        overlayClassName={`${prefixCls}-tooltip`}
        trigger='hover'
      >
        <ColorCard color={color} />
      </Tooltip>
      <span>{color}</span>
      {/* <Button size='small'>恢复默认</Button> */}
    </div>
  );
};

export default styled(ColorPicker)<StyledProps>`
  ${style}
`;

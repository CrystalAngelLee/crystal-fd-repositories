import React, { FC } from "react";
import styled from "@emotion/styled";
import { Col, Row } from "antd";
import { FormItemProps } from "../types";
import { filedStyle } from "../Form.styles";
import InputSlider from "../../InputSlider";
import RadioGroup from "../../Radio";
import ColorPicker from "../../ColorPicker";
import SingelSelect from "../../SingelSelect";

const FormItem: FC<FormItemProps> = ({
  className: prefixCls,
  type,
  name,
  onChange,
  id,
  ...props
}) => {
  const $type = type.toLocaleUpperCase();
  const filedId = Math.random().toString(36).slice(3, 9);
  let filed = null;
  const $onChange = (value: any) => {
    onChange?.(id, value);
  };
  switch ($type) {
    case "INPUTSLIDER":
      filed = <InputSlider onChange={$onChange} {...props} />;
      break;
    case "RADIO":
      filed = <RadioGroup {...props.params} {...props} />;
      break;
    case "COLORPICKER":
      filed = <ColorPicker {...props} onChange={$onChange} />;
      break;
    case "SINGELSELECT":
      filed = <SingelSelect {...props} onChange={$onChange} />;
      break;
    default:
      filed = "";
      break;
  }
  return (
    <Row className={prefixCls}>
      {name && <Col span={4}>{<label htmlFor={filedId}>{name}</label>}</Col>}
      <Col span={16}>
        <div id={filedId}>{filed}</div>
      </Col>
    </Row>
  );
};

interface StyledProps {}

export default React.memo(
  styled(FormItem)<StyledProps>`
    ${filedStyle}
  `
);

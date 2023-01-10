import React, { FC, useCallback, useState } from "react";
import { InputSliderProps } from "./InputSlider.types";
import { Slider, InputNumber, Row, Col } from "antd";

const InputSlider: FC<InputSliderProps> = ({
  label,
  onChange,
  value,
  ...props
}) => {
  const [$value, setValue] = useState(value);
  const $onChange = useCallback(
    (v: number) => {
      onChange?.(v);
      setValue(v);
    },
    [onChange]
  );
  return (
    <Row>
      <Col span={18}>
        <Slider
          min={1}
          max={20}
          {...props}
          value={$value}
          onChange={$onChange}
        />
      </Col>
      <Col span={6}>
        <InputNumber
          min={1}
          max={20}
          style={{ margin: "0 16px" }}
          {...props}
          value={$value}
          onChange={$onChange}
        />
      </Col>
    </Row>
  );
};

export default React.memo(InputSlider);

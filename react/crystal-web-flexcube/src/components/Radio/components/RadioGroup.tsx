import React, { FC, useState } from "react";
import { Radio } from "antd";
interface RadioGroupProps {
  value: string;
}

const RadioGroup: FC<RadioGroupProps> = ({ value, ...props }) => {
  const [$value, setValue] = useState(value);
  const $onChange = (e: any) => {
    setValue(e.target.value);
  };
  return <Radio.Group {...props} value={$value} onChange={$onChange} />;
};

export default RadioGroup;

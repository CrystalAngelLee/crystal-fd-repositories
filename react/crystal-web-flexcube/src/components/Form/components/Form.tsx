import React, { FC } from "react";
import styled from "@emotion/styled";
import classNames from "classnames";
import { observer } from "mobx-react-lite";
import { style } from "../Form.styles";
import { FiledProps, FormProps, StyledProps } from "../types";
import FormItem from "./Form.Item";
import Collapse from "../../Collapse";

const Form: FC<FormProps> = ({ className: prefixCls, store, onChange }) => {
  const { fileds, formData, setFormData } = store;

  const $onChange = (filed: string, val: any) => {
    onChange?.(filed, val);
    setFormData({ [filed]: val });
  };

  const $renderChild = (fileds: Array<FiledProps> = []) => (
    <div className={`${prefixCls}-content`}>
      {fileds?.map((item) => {
        if (item.fileds) return $renderFileds(item);
        return (
          <FormItem
            key={item.id}
            value={formData[item.id]}
            {...item}
            onChange={$onChange}
          />
        );
      })}
    </div>
  );

  const $renderFileds = ({ id, type, name, ...filedProps }: FiledProps) => {
    return (
      <Collapse
        header={name}
        key={id}
        className={classNames("collapse", filedProps.className)}
      >
        {$renderChild(filedProps.fileds)}
      </Collapse>
    );
  };

  return (
    <form className={prefixCls}>
      {fileds.length
        ? fileds.map((filed) => {
            if (filed.type === "collapse" && filed.name)
              return $renderFileds(filed);
            return $renderChild(filed.fileds);
          })
        : null}
    </form>
  );
};

export default styled(observer(Form))<StyledProps>`
  ${style}
`;

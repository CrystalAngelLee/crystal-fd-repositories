import { ReactNode } from "react";
import Common from "../../types/common";
import { FormStore } from "./store";

/**
 * common types
 */
export interface FiledProps {
  id: string; // 唯一标识
  type: any; // 组件名称
  name?: string; // label
  className?: string;
  params?: any; // 组件 props 传递
  fileds?: Array<FiledProps>; // 二级
}

/**
 * componets types
 */
export interface FormProps extends Common {
  store: FormStore;
  onChange?: (filed: string, value: any) => void;
}
export interface FormItemProps extends FiledProps, Common {
  onChange?: (filed: string, value: any) => void;
  value?: any;
}

export interface StyledProps {}

/**
 * store types
 */
export type GroupItemProps = {
  key: string; // 分组唯一标识
  header: ReactNode; // header 展示内容
};
export enum FormItems {
  "inputnumber" = "INPUTNUMBER",
  "collapse" = "COLLAPSE",
}
export type FormDataProps = {
  [_: string]: any; // 传递过来的 key 对应的 value
};
export interface FromStoreProps {
  fileds: Array<FiledProps>;
  formData: FormDataProps;
}
